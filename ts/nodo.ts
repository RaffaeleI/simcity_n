import { Articolo } from "./articolo";

export class Nodo {
  public fratello: Nodo | undefined = undefined;
  public inMagazzino: boolean = false;
  public inProduzione: boolean = false;
  constructor(public articolo: Articolo, public figlio: Nodo | undefined) {}

  reset() {
    this.inMagazzino = false;
    this.inProduzione = false;
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

  get(): any {
    let fi = undefined;
    let fr = undefined;
    if (this.figlio) fi = this.figlio.get();
    if (this.fratello) fr = this.fratello.get();
    return {
      articolo: this.articolo.getNome(),
      inMagazzino: this.inMagazzino,
      inProduzione: this.inProduzione,
      figlio: fi,
      fratello: fr,
    };
  }

  setArticoloDaRaccogliere(nodo: Nodo | undefined, deposito: number): void {
    if (nodo) {
      if (nodo.contaArticoliDaRaccogliere()) {
      }
    }
  }

  contaArticoliDaRaccogliere(): number {
    let count: number = 0;
    if (!this.inMagazzino) {
      if (this.inProduzione) count = 1;
      else {
        if (this.figlio) count = this.figlio.contaArticoliDaRaccogliere();
      }
    }
    if (this.fratello) count += this.fratello.contaArticoliDaRaccogliere();

    return count;
  }
}
