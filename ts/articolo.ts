import { Counter } from "./counter";
import { Fabbrica } from "./fabbrica";

export class Articolo {
  public inMagazzino: Counter = new Counter();
  public inProduzione: Counter = new Counter();

  public isProducibile: boolean = false;
  public isRaccoglibile: boolean = false;
  public isDaProdurre: boolean = false;
  public isDaRaccogliere: boolean = false;

  public richiesti: Counter = new Counter();
  
  constructor(public nome: String, public fabbrica: Fabbrica) {}

  public isFabbricabile(): boolean {
    return this.fabbrica.fabbricabile;
  }
}
