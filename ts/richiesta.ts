import { Articolo } from "./articolo";
import { Counter } from "./counter";

export class Richiesta {
  public eseguibile: boolean = false;
  private nome: String = "";
  private arts: { articolo: Articolo; necessari: Counter; ottenuti: Counter }[] = [];

  constructor(nome: String, articoli: Articolo[]) {
    if (!nome || nome === "") throw new Error("Nome non valido: " + nome);
    this.nome = nome.toUpperCase();
    this.arts = articoli.map(el => {
        return { articolo:  el, necessari: new Counter(), ottenuti: new Counter() }
    })
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
    if (art) art.necessari.set(value);
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
        .map((nec) => nec.necessari.get()),
      ottenuti: this.arts
        .filter((el) => el.ottenuti,this.get() !== 0)
        .map((nec) => nec.ottenuti.get()),
    };
  }
}
