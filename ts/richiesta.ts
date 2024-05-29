import { crea } from "./albero";
import { Articolo } from "./articolo";
import { Counter } from "./counter";
import { Nodo } from "./nodo";

export class Richiesta {
  public eseguibile: boolean = false;
  private nome: String = "";
  private arts: {
    articolo: Articolo;
    necessari: Counter;
    ottenuti: Counter;
  }[] = [];
  public tree: Nodo | undefined = undefined;

  constructor(nome: String, private articoli: Articolo[]) {
    if (!nome || nome === "") throw new Error("Nome non valido: " + nome);
    this.nome = nome.toUpperCase();
    this.arts = articoli.map((el) => {
      return {
        articolo: el,
        necessari: new Counter(),
        ottenuti: new Counter(),
      };
    });
    crea(this, articoli);
  }

  getNome(): String {
    return this.nome;
  }

  getNecessari(articolo: Articolo): number {
    let value = 0;
    let art = this.arts.find((el) => el.articolo === articolo);
    if (art) value = art.necessari.get();
    return value;
  }

  getOttenuti(articolo: Articolo): number {
    let value = 0;
    let art = this.arts.find((el) => el.articolo === articolo);
    if (art) value = art.ottenuti.get();
    return value;
  }

  incNecessari(articolo: Articolo, value: number): void {
    let art = this.arts.find((el) => el.articolo === articolo);
    if (art) {
      art.necessari.set(value);
      crea(this, this.articoli);
    }
  }

  incOttenuti(articolo: Articolo, value: number): void {
    let art = this.arts.find((el) => el.articolo === articolo);
    if (art) art.ottenuti.set(value);
  }

  get(): any {
    return {
      nome: this.nome,
      eseguibile: this.eseguibile,
      necessari: this.arts
        .filter((el) => el.necessari.get() !== 0)
        .map((nec) => {
          return {
            articolo: nec.articolo.nome,
            valore: nec.necessari.get()
          }
        }),
      ottenuti: this.arts
        .filter((el) => el.ottenuti.get() !== 0)
        .map((nec) => {
          return {
            articolo: nec.articolo.nome,
            valore: nec.ottenuti.get()
          }
        }),
    };
  }
}
