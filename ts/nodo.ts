import { Articolo } from "./articolo";

export class Nodo {
  public fratello: Nodo | undefined = undefined;
  public isInMagazzino: boolean = false;
  public isInProduzione: boolean = false;
  public isDaProdurre: boolean = false;
  public isDaRaccogliere: boolean = false;

  constructor(public articolo: Articolo, public figlio: Nodo | undefined) {}

  figliInMagazzino(): boolean {
    let esito: boolean = true;
    if(!this.isInMagazzino && !this.isInProduzione) {
      if(this.figlio){
        let f: Nodo | undefined= this.figlio;
        while(f && esito) {
          esito = esito && f.isInMagazzino;
          f = f.figlio;
        }
      }
    }
    return esito;
  }

  contaDaRaccogliere(): number {
    let count: number = 0
    if(!this.isInMagazzino){
      if(this.isInProduzione) count = 1;
      else {
        if(this.figlio) count = this.figlio.contaDaRaccogliere();
      }
    }
    if(this.fratello) count += this.fratello.contaDaRaccogliere();
    return count;
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

  reset(): void {
    this.isDaProdurre = false;
    this.isDaRaccogliere = false;
    this.isInMagazzino = false;
    this.isInProduzione = false;
  }
}
