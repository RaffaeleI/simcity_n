import { Fabbrica } from "./fabbrica";
import { Articolo } from "./articolo";
import { Counter } from "./counter";
import { Richiesta } from "./richiesta";
import { regola } from "./regola";
import { Nodo } from "./nodo";
import { ARTICOLI } from "./articoli";
import { FABBRICHE } from "./fabbriche";
import { DEPOSITO } from "./deposito";

export class Controller {
  private fabbriche: Fabbrica[] = [];
  private articoli: Articolo[] = [];
  private deposito: Counter = new Counter();
  private richieste: Richiesta[] = [];
  private contaDaRaccogliere: Counter = new Counter();

  constructor() {
    this.fabbriche = FABBRICHE.map(
      (el: {
        nome: String;
        fabbricabile: boolean;
        stagionale: boolean;
        size: number;
      }) => new Fabbrica(el.nome, el.fabbricabile, el.stagionale, el.size)
    );
    this.articoli = ARTICOLI.map((el: { fabbrica: String; nome: String }) => {
      let fabbrica = this.getFabbrica(el.fabbrica);
      return new Articolo(el.nome, fabbrica);
    });
    this.deposito.set(DEPOSITO);
    this.setProducibile();
  }

  produci(nome: string) {
    let articolo = this.getArticolo(nome);
    if (articolo) {
      if (articolo.isProducibile()) {
        this.articoli.forEach((el) => {
          if (articolo) {
            el.incMagazzino(-regola(articolo.getNome(), el.getNome()));
          }
        });
        articolo.incProduzione(1);
        this.setProducibile();
        this.assegnaArticoli();
      }
    }
  }

  raccogli(nome: string) {
    let articolo = this.getArticolo(nome);
    if (articolo) {
      articolo.raccogli();
      this.setProducibile();
      this.assegnaArticoli();
    }
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
    if (richiesta && richiesta.isEseguibile()) {
      richiesta.esegui();
      this.deleteRichiesta(nome);
      this.assegnaArticoli();
    }
  }

  upRichiesta(nome: String): void {
    if (nome) {
      let index = this.richieste.findIndex(
        (el) => el.getNome() === nome.toUpperCase()
      );
      this.moveRichiesta(index, index - 1);
    }
  }

  downRichiesta(nome: String): void {
    if (nome) {
      let index = this.richieste.findIndex(
        (el) => el.getNome() === nome.toUpperCase()
      );
      this.moveRichiesta(index, index + 1);
    }
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

  private getArticolo(nome: String): Articolo {
    let a = this.articoli.find(
      (el) => el.getNome() === String(nome).toUpperCase()
    );
    if (!a) throw new Error("Articolo non presente: " + nome);
    return a;
  }

  private getFabbrica(nome: String): Fabbrica {
    let f = this.fabbriche.find(
      (el) => el.getNome() === String(nome).toUpperCase()
    );
    if (!f) throw new Error("Fabbrica non presente: " + nome);
    return f;
  }

  private getRichiesta(nome: String): Richiesta {
    let r = this.richieste.find((el) => el.getNome() === nome.toUpperCase());
    if (!r) throw new Error("Richiesta non presente :" + nome);
    return r;
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
        nodo.articolo.richiesti.inc(1);
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
      this.enqueueR(richiesta.albero);
    });
  }

  private enqueueR(nodo: Nodo | undefined) {
    if (nodo) {
      if (nodo.articolo.getFabbrica().isFabbricabile() && !nodo.inMagazzino) {
        if (!nodo.inProduzione) this.enqueueR(nodo.figlio);
        nodo.articolo.getFabbrica().coda.push({
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

  incDeposito(incremento: number) {
    this.deposito.inc(incremento);
    this.assegnaArticoli();
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
      deposito: this.deposito.get(),
      vista:
        this.richieste.length > 0
          ? [
              {
                name: "RICHIESTE",
                children: this.richieste.map((richiesta) => {
                  return richiesta.vista;
                }),
              },
            ]
          : [{ name: "RICHIESTE" }],
    };
  }
}
