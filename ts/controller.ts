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
        coda: number;
      }) => {
        return new Fabbrica(el.nome, el.fabbricabile, el.stagionale, el.coda);
      }
    );
    this.fabbriche = JSON.parse(readFileSync(articoliFile).toString()).map(
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
    this.articoli.forEach((articolo) => articolo.richiesti.set(0));
    this.richieste.forEach((richiesta) => {
      if (richiesta.albero) {
        richiesta.albero.reset();
        this.assegnaArticoliR(richiesta.albero);
      }
    });
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
      } else {
        this.assegnaArticoliR(nodo.figlio);
      }
      this.assegnaArticoliR(nodo.fratello);
    }
  }
}
