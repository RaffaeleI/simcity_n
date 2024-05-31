import { readFileSync } from "fs";
import { Fabbrica } from "./fabbrica";
import { Articolo } from "./articolo";
import { Counter } from "./counter";
import { Richiesta } from "./richiesta";
import { regola } from "./regola";
import { Nodo } from "./nodo";

export class Controller {
  private fabbriche: Fabbrica[] = [];
  private articoli: Articolo[] = [];
  private deposito: Counter = new Counter();
  private richieste: Richiesta[] = [];
  private contaDaRaccogliere: Counter = new Counter();

  constructor(
    fabbricheFile: string,
    articoliFile: string,
    depositoFile: string
  ) {
    this.fabbriche = JSON.parse(readFileSync(fabbricheFile).toString()).map(
      (el: {
        nome: String;
        fabbricabile: boolean;
        stagionale: boolean;
        size: number;
      }) => {
        return new Fabbrica(el.nome, el.fabbricabile, el.stagionale, el.size);
      }
    );
    this.articoli = JSON.parse(readFileSync(articoliFile).toString()).map(
      (el: { fabbrica: String; nome: String }) => {
        let fabbrica = this.getFabbrica(el.fabbrica);
        if (fabbrica) return new Articolo(el.nome, fabbrica);
      }
    );
    this.deposito.set(
      Number.parseInt(
        JSON.parse(readFileSync(depositoFile).toString()).deposito
      )
    );
  }

  incArticoloMagazzino(nome: string, inc: number): void {
    let articolo = this.getArticolo(nome);
    if (articolo) {
      articolo.incMagazzino(inc);
      this.setProducibile();
      this.assegnaArticoli();
    }
  }

  incArticoloProduzione(nome: string, inc: number): void {
    let articolo = this.getArticolo(nome);
    if (articolo) {
      articolo.incProduzione(inc);
      this.assegnaArticoli();
    }
  }

  addRichiesta(nome: String): void {
    if (nome && nome !== "") {
      let richiesta = this.richieste.find(
        (ric) => ric.getNome() === nome.toUpperCase()
      );
      if (!richiesta) {
        this.richieste.push(new Richiesta(nome.toUpperCase(), this.articoli));
      }
    }
  }

  deleteRichiesta(nome: String): void {
    if (nome) {
      let index = this.richieste.findIndex(
        (el) => el.getNome() === nome.toUpperCase()
      );
      if (index >= 0) {
        this.richieste.splice(index, 1);
        this.assegnaArticoli();
      }
    }
  }

  eseguiRichiesta(nome: string): void {
    let richiesta = this.getRichiesta(nome);
    if (richiesta) {
      richiesta.esegui();
      this.assegnaArticoli();
    }
  }

  upRichiesta(nome: String): void {
    let index = this.richieste.findIndex(
      (el) => el.getNome() === nome.toUpperCase()
    );
    this.moveRichiesta(index, index - 1);
  }

  downRisposta(nome: string): void {
    let index = this.richieste.findIndex(
      (el) => el.getNome() === nome.toUpperCase()
    );
    this.moveRichiesta(index, index + 1);
  }

  private moveRichiesta(index: number, position: number): void {
    if (
      0 <= index &&
      index < this.richieste.length &&
      0 <= position &&
      position < this.richieste.length &&
      index !== position
    ) {
      let richiesta = this.richieste[index];
      this.richieste[index] = this.richieste[position];
      this.richieste[position] = richiesta;
      this.assegnaArticoli();
    }
  }

  incArticoloNecessario(
    nomeRichiesta: String,
    necessario: string,
    incremento: number
  ) {
    let richiesta = this.getRichiesta(nomeRichiesta);
    if (richiesta) {
      richiesta.incNecessario(necessario, incremento);
      this.assegnaArticoli();
    }
  }

  incArticoloOttenuto(
    nomeRichiesta: String,
    necessario: string,
    incremento: number
  ) {
    let richiesta = this.getRichiesta(nomeRichiesta);
    if (richiesta) {
      richiesta.incOttenuto(necessario, incremento);
    }
  }

  private getArticolo(nome: String): Articolo | undefined {
    return this.articoli.find(
      (el) => el.getNome() === String(nome).toUpperCase()
    );
  }

  private getFabbrica(nome: String): Fabbrica | undefined {
    return this.fabbriche.find(
      (el) => el.getNome() === String(nome).toUpperCase()
    );
  }

  private getRichiesta(nome: String): Richiesta | undefined {
    return this.richieste.find((el) => el.getNome() === nome.toUpperCase());
  }

  private assegnaArticoli() {
    this.contaDaRaccogliere.set(0);
    this.fabbriche.forEach((fabbrica) => fabbrica.reset());
    this.articoli.forEach((articolo) => articolo.reset());
    this.richieste.forEach((richiesta) => {
      if (richiesta.albero) richiesta.albero.reset();
      this.assegnaArticoliR(richiesta.albero);
      richiesta.creaVista();
    });
    this.enqueue();
  }

  assegnaArticoliR(nodo: Nodo | undefined) {
    if (nodo) {
      if (nodo.articolo.getMagazzino() > nodo.articolo.richiesti.get()) {
        nodo.inMagazzino = true;
        nodo.articolo.richiesti.inc(1);
      } else if (
        nodo.articolo.getMagazzino() + nodo.articolo.getProduzione() >
        nodo.articolo.richiesti.get()
      ) {
        nodo.inProduzione = true;
        nodo.articolo.richiesti.inc(1);
        if (
          this.contaDaRaccogliere.get() <
          this.deposito.get() - this.contaArticoliInMagazzino()
        ) {
          this.contaDaRaccogliere.inc(1);
          nodo.articolo.daRaccogliere = true;
        }
      } else {
        this.assegnaArticoliR(nodo.figlio);
        if (!nodo.articolo.getFabbrica().nextDaProdurre) {
          nodo.articolo.getFabbrica().nextDaProdurre = nodo.articolo;
          if (nodo.isFigliInMagazzino()) {
            nodo.articolo.daProdurre = true;
          }
        }
      }
      this.assegnaArticoliR(nodo.fratello);
    }
  }

  private enqueue() {
    this.richieste.forEach((richiesta) => {
      this.enqueueR(richiesta.vista);
    });
  }

  private enqueueR(nodo: Nodo | undefined) {
    if (nodo) {
      if (nodo.articolo.getFabbrica().isFabbricabile() && !nodo.inMagazzino) {
        this.enqueueR(nodo.figlio);
        nodo.articolo
          .getFabbrica()
          .coda.push({
            nome: nodo.articolo.getNome(),
            inProduzione: nodo.inProduzione,
          });
      }
      this.enqueueR(nodo.fratello);
    }
  }

  private contaArticoliInMagazzino(): number {
    let count = 0;
    this.articoli.forEach((articolo) => (count += articolo.getMagazzino()));
    return count;
  }

  private setProducibile() {
    this.articoli
      .filter((el) => el.getFabbrica().isFabbricabile())
      .forEach((articolo) => {
        let producibile = true;
        this.articoli.forEach((necessario) => {
          producibile =
            producibile &&
            necessario.getMagazzino() >=
              regola(articolo.getNome(), necessario.getNome());
        });
        articolo.setProducibile(producibile);
      });
  }

  get() {
    return {
      articoli: this.articoli.map((articolo) => {
        return articolo.get();
      }),
      fabbriche: this.fabbriche.map((fabbrica) => {
        return fabbrica.get();
      }),
      richieste: this.richieste.map((richiesta) => {
        return richiesta.get();
      }),
      vista: this.richieste
        .filter((el) => el.vista)
        .map((richiesta) => {
          return richiesta.vista?.get();
        }),
    };
  }
}
