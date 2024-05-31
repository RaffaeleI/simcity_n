import { Articolo } from "./articolo";

export class Nodo {
  public fratello: Nodo | undefined = undefined;
  public inMagazzino: boolean = false;
  public inProduzione: boolean = false;
  public daProdurre: boolean = false;
  public daRaccogliere: boolean = false;
  constructor(public articolo: Articolo, public figlio: Nodo | undefined) {}

  reset() {
    this.inMagazzino = false;
    this.inProduzione = false;
    this.daProdurre = false;
    this.daRaccogliere = false;
    if (this.figlio) this.figlio.reset();
    if (this.fratello) this.fratello.reset();
  }

  isFigliInMagazzino(): boolean {
    let esito: boolean = true;
    if (!this.inMagazzino && !this.inProduzione) {
      if (this.figlio) {
        let n: Nodo | undefined = this.figlio;
        while (n && esito) {
          esito = esito && n.inMagazzino;
          n = n.fratello;
        }
      }
    }
    return esito;
  }

  contaDaRaccogliere(): number {
    let count: number = 0;
    if (this.inProduzione) count = 1;
    else if (!this.inMagazzino) {
      if (!this.figlio) count = 1;
      else count += this.figlio.contaDaRaccogliere();
    }
    if (this.fratello) count += this.fratello.contaDaRaccogliere();
    return count;
  }
}
