import { Articolo } from "./articolo";

export class Nodo {
  public fratello: Nodo | undefined = undefined;
  public isInMagazzino: boolean = false;
  public isInProduzione: boolean = false;
  public isDaProdurre: boolean = false;
  public isDaRaccogliere: boolean = false;

  constructor(public articolo: Articolo, public figlio: Nodo | undefined) {}

  figliInMagazzino(): boolean {
    return true;
  }

  contaFigliDaRaccogliere(): number {
    return 0;
  }

  get(): any {
    let figlio: any = undefined;
    if (this.figlio) figlio = this.figlio.get();
    let fratello: any = undefined;
    if (this.fratello) fratello = this.fratello.get();
    return {
      nome: this.articolo.nome,
      isInMagazzino: this.isInMagazzino,
      isInProduzione: this.isInProduzione,
      isDaProdurre: this.isDaProdurre,
      isDaRaccogliere: this.isDaRaccogliere,
      figlio: figlio,
      fratello: fratello,
    };
  }
}
