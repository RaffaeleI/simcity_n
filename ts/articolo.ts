import { Counter } from "./counter";
import { Fabbrica } from "./fabbrica";

export class Articolo {
  private inMagazzino: Counter = new Counter();
  private inProduzione: Counter = new Counter();

  public isProducibile: boolean = false;
  public isDaProdurre: boolean = false;
  public isDaRaccogliere: boolean = false;

  public richiesti: Counter = new Counter();

  constructor(public nome: String, public fabbrica: Fabbrica) {}

  get(): any {
    return {
      nome: this.nome,
      fabbrica: this.fabbrica.nome,
      inMagazzino: this.inMagazzino.get(),
      inProduzione: this.inProduzione.get(),
      richiesta: this.richiesti.get(),
      producibile: this.isProducibile,
      raccoglibile: this.isRaccoglibile(),
      daProdurre: this.isDaProdurre,
      daRaccogliere: this.isDaRaccogliere,
    };
  }

  getInMagazzino(): number {
    return this.inMagazzino.get();
  }

  getInProduzione(): number {
    return this.inProduzione.get();
  }

  incInMagazzino(inc: number): void {
    if (inc != 0) {
      this.inMagazzino.inc(inc);
    }
  }

  incInProduzione(inc: number): void {
    if (this.fabbrica.fabbricabile && inc !== 0) {
      this.inProduzione.inc(inc);
    }
  }

  isRaccoglibile(): boolean {
    return this.inProduzione.get() > 0;
  }

  reset() {
    this.richiesti.set(0);
    this.isProducibile = false;
    this.isDaProdurre = false;
    this.isDaRaccogliere = false;
  }
}
