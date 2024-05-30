import { Articolo } from "./articolo";
import { Fabbrica } from "./fabbrica";
import { Counter } from "./counter";
import { readArticoli, readDeposito, readFabbriche } from "./readfile";
import { Richiesta } from "./richiesta";
import { regola } from "./regola";
import { Nodo } from "./nodo";

export class Controller {
  private articoli: Articolo[] = [];
  private fabbriche: Fabbrica[] = [];
  private deposito: Counter = new Counter();
  private richieste: Richiesta[] = [];

  constructor(
    articoliFile: string,
    fabbricheFile: string,
    depositoFile: string
  ) {
    this.readFiles(articoliFile, fabbricheFile, depositoFile);
  }

  private async readFiles(
    articoliFile: string,
    fabbricheFile: string,
    depositoFile: string
  ) {
    this.fabbriche = await readFabbriche(fabbricheFile);
    this.articoli = await readArticoli(articoliFile, this.fabbriche);
    this.deposito = await readDeposito(depositoFile);
  }

  get(): any {
    return {
      articoli: this.articoli.map((art) => {
        return art.get();
      }),
      fabbriche: this.fabbriche.map((el) => {
        return el.get();
      }),
      deposito: this.deposito.get(),
      richieste: this.richieste.map((el) => {
        return el.get();
      }),
    };
  }

  incArticoloInProduzione(nome: string, inc: number): void {
    if (inc !== 0) {
      let articolo = this.getArticolo(nome);
      if (articolo) {
        articolo.incInProduzione(inc);
        this.resetArticoli();
        this.resetAlbero();
        this.assegnaArticoli();
        // this.setDaProdurre();
        // this.setDaRaccogliere();
        // this.setRichiesteEseguibili();
      }
    }
  }

  incArticoloInMagazzino(nome: string, inc: number): void {
    if (inc != 0) {
      let articolo = this.getArticolo(nome);
      if (articolo) {
        articolo.incInProduzione(inc);
        this.setArticoloProducibile();
        this.resetArticoli();
        this.resetAlbero();
        this.assegnaArticoli();
        // this.setDaProdurre();
        // this.setDaRaccogliere();
        // this.setRichiesteEseguibili();
        
      }
    }
  }

  addRichiesta(nome: String): void {
    if (nome && nome !== "") {
      let ric = this.richieste.find(
        (el) => el.getNome() === nome.toUpperCase()
      );
      if (!ric) {
        this.richieste.push(new Richiesta(nome.toUpperCase(), this.articoli));
      }
    }
  }

  removeRichiesta(nome: String): void {
    let index = this.richieste.findIndex(
      (el) => el.getNome() === nome.toUpperCase()
    );
    if (index >= 0) {
      this.richieste.splice(index, 1);
    }
  }

  upRichiesta(nome: String): void {
    let index = this.richieste.findIndex(
      (el) => el.getNome() === nome.toUpperCase()
    );
    this.moveRichiesta(index, index - 1);
  }

  downRichiesta(nome: String): void {
    let index = this.richieste.findIndex(
      (el) => el.getNome() === nome.toUpperCase()
    );
    this.moveRichiesta(index, index + 1);
  }

  incArticoloNecessario(
    richiesta: String,
    necessario: String,
    incremento: number
  ): void {
    let ric = this.getRichiesta(richiesta);
    let nec = this.getArticolo(necessario);
    if (ric && nec) {
      ric.incNecessari(nec, incremento);
    }
  }

  eseguiRichiesta(nome: String): void {}

  private moveRichiesta(index: number, position: number): void {
    if (
      0 <= index &&
      index < this.richieste.length &&
      0 <= position &&
      position < this.richieste.length &&
      index !== position
    ) {
      let ric = this.richieste[index];
      this.richieste[index] = this.richieste[position];
      this.richieste[position] = ric;
    }
  }

  incDeposito(inc: number): void {
    if (inc != 0) {
      this.deposito.inc(inc);
    }
  }

  raccogliArticolo(nome: String): void {
    let articolo = this.getArticolo(nome);
    if (articolo) {
      if (articolo.isProducibile) {
        articolo.incInProduzione(-1);
        articolo.incInMagazzino(1);
      }
    }
  }

  produciArticolo(nome: String): void {
    let articolo = this.getArticolo(nome);
    if (articolo) {
      if (articolo.isProducibile) {
        this.articoli.forEach((el) => el.incInMagazzino(-regola(articolo, el)));
        articolo.incInProduzione(1);
      }
    }
  }

  private setArticoloProducibile() {
    this.articoli.forEach((art) => {
      let producibile = false;
      if (art.fabbrica.fabbricabile) {
        producibile = true;
        this.articoli.forEach((nec) => {
          producibile = producibile && nec.getInMagazzino() >= regola(art, nec);
        });
      }
      art.isProducibile = producibile;
    });
  }

  private getArticolo(nome: String): Articolo | undefined {
    let articolo: Articolo | undefined = undefined;
    if (nome)
      articolo = this.articoli.find((el) => el.nome === nome.toUpperCase());
    return articolo;
  }

  private getRichiesta(nome: String): Richiesta | undefined {
    let richiesta: Richiesta | undefined = undefined;
    if (nome)
      richiesta = this.richieste.find(
        (el) => el.getNome() === nome.toUpperCase()
      );
    return richiesta;
  }

  private assegnaArticoli(): void {
    this.richieste.forEach((richiesta) => {
      this.assegnaArticoliR(richiesta.tree);
    });
  }

  private assegnaArticoliR(nodo: Nodo | undefined) {
    if (nodo) {
      if (nodo.articolo.getInMagazzino() > nodo.articolo.richiesti.get()) {
        nodo.isInMagazzino = true;
      } else if (
        nodo.articolo.getInMagazzino() + nodo.articolo.getInProduzione() >
        nodo.articolo.richiesti.get()
      ) {
        nodo.isInProduzione = true;
      } else {
        this.assegnaArticoliR(nodo.figlio);
      }
      nodo.articolo.richiesti.inc(1);
      this.assegnaArticoliR(nodo.fratello);
    }
  }

  private resetArticoli(): void {
    this.articoli.forEach((articolo) => articolo.reset()    );
  }

  private resetDaProdurre(): void {
    this.articoli.forEach((articolo) => (articolo.isDaProdurre = false));
  }

  private resetDaRaccogliere(): void {
    this.articoli.forEach((articolo) => (articolo.isDaRaccogliere = false));
  }

  private resetAlbero(): void {
    this.richieste.forEach((richiesta) => {
      if (richiesta.tree) richiesta.tree.reset();
    });
  }

  private resetRichiesteEseguibili(): void {
    this.richieste.forEach((richiesta) => {
      richiesta.eseguibile = false;
    });
  }

  private contaArticoliInDeposito(): number {
    let count: number = 0;
    this.articoli.forEach((articolo) => (count += articolo.getInMagazzino()));
    return count;
  }
}
