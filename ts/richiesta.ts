import { Nodo } from "./nodo";
import { Articolo } from "./articolo";
import { ArticoloRichiesta } from "./articoloRichiesta";
import { Counter } from "./counter";
import { regola } from "./regola";

export class Richiesta {
  public articoliRichiesta: ArticoloRichiesta[] = [];
  public albero: Nodo | undefined = undefined;
  public vista: Nodo | undefined = undefined;

  constructor(private nome: String, private articoli: Articolo[]) {
    this.articoliRichiesta = articoli.map((art) => {
      return new ArticoloRichiesta(art, new Counter(), new Counter());
    });
  }

  getNome(): String {
    return this.nome;
  }

  incNecessario(nome: string, inc: number): void {
    let articoloRichiesta = this.articoliRichiesta.find(
      (el) => el.articolo.getNome() === nome
    );
    if (articoloRichiesta) {
      articoloRichiesta.necessari.inc(inc);
      this.creaAlbero();
    }
  }

  incOttenuto(nome: string, inc: number): void {
    let articoloRichiesta = this.articoliRichiesta.find(
      (el) => el.articolo.getNome() === nome
    );
    if (articoloRichiesta) articoloRichiesta.ottenuti.inc(inc);
  }

  isEseguibile(): boolean {
    let eseguibile = true;
    this.articoliRichiesta.forEach(
      (el) =>
        (eseguibile =
          eseguibile && el.articolo.getMagazzino() >= el.necessari.get())
    );
    return eseguibile;
  }

  isDaEseguire(): boolean {
    let eseguibile = true;
    if (this.albero) {
      let nodo: Nodo | undefined = this.albero;
      while (nodo && eseguibile) {
        eseguibile = eseguibile && nodo.isFigliInMagazzino();
        nodo = nodo.fratello;
      }
    }
    return eseguibile;
  }

  esegui() {
    if (this.isEseguibile())
      this.articoliRichiesta.forEach((el) =>
        el.articolo.incMagazzino(-el.necessari.get())
      );
  }

  private creaAlbero() {
    let nodo: Nodo | undefined = undefined;
    this.albero = undefined;
    this.articoliRichiesta.forEach((el) => {
      for (let i = 0; i < el.necessari.get(); i++) {
        nodo = this.albero;
        this.albero = this.creaAlberoR(el.articolo);
        if (this.albero) this.albero.fratello = nodo;
      }
    });
  }

  private creaAlberoR(articolo: Articolo): Nodo | undefined {
    let radice: Nodo | undefined = undefined;
    let nodo: Nodo | undefined = undefined;
    this.articoli.forEach((nec) => {
      for (let i = 0; i < regola(articolo.getNome(), nec.getNome()); i++) {
        nodo = radice;
        radice = this.creaAlberoR(nec);
        if (radice) radice.fratello = nodo;
      }
    });
    nodo = radice;
    radice = new Nodo(articolo, nodo);
    return radice;
  }

  creaVista(): void {
    this.vista = this.creaVistaR(this.albero);
  }

  private creaVistaR(nodo: Nodo | undefined): Nodo | undefined {
    let radice: Nodo | undefined = undefined;
    let fi: Nodo | undefined = undefined;
    let fr: Nodo | undefined = undefined;
    if (nodo) {
      fr = this.creaVistaR(nodo.fratello);
      if (!nodo.inMagazzino && !nodo.inProduzione)
        fi = this.creaVistaR(nodo.figlio);
      radice = new Nodo(nodo.articolo, fi);
      radice.inMagazzino = nodo.inMagazzino;
      radice.inProduzione = nodo.inProduzione;
      radice.fratello = fr;
    }
    return radice;
  }

  get() {
    let vista = undefined;
    if (this.vista) vista = this.vista.get();
    return {
      nome: this.getNome(),
      eseguibile: this.isEseguibile(),
      daEseguire: this.isDaEseguire(),
      necessari: this.articoliRichiesta
        .filter((el) => el.necessari.get() > 0)
        .map((articolo) => {
          return {
            articolo: articolo.articolo.getNome(),
            necessari: articolo.necessari.get(),
          };
        }),
      ottenuti: this.articoliRichiesta
        .filter((el) => el.ottenuti.get() > 0)
        .map((articolo) => {
          return {
            articolo: articolo.articolo.getNome(),
            ottenuti: articolo.ottenuti.get(),
          };
        }),
    };
  }
}
