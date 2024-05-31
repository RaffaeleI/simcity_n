import { Counter } from "./counter";
import { Fabbrica } from "./fabbrica";

export class Articolo {
  private magazzino: Counter = new Counter();
  private produzione: Counter = new Counter();
  public richiesti: Counter = new Counter();
  private producibile: boolean = false;
  public daProdurre: boolean = false;
  public daRaccogliere: boolean = false;
  constructor(private nome: String, private fabbrica: Fabbrica) {}

  getNome(): String {
    return this.nome;
  }

  getFabbrica(): Fabbrica {
    return this.fabbrica;
  }

  getMagazzino(): number {
    return this.magazzino.get();
  }

  getProduzione(): number {
    return this.produzione.get();
  }

  incMagazzino(inc: number): void {
    this.magazzino.inc(inc);
  }

  incProduzione(inc: number): void {
    this.produzione.inc(inc);
  }

  isRaccoglibile(): boolean {
    return this.produzione.get() > 0;
  }

  isProducibile(): boolean {
    return this.producibile;
  }

  setProducibile(value: boolean) {
    this.producibile = this.fabbrica.isFabbricabile() && value;
  }

  isDaProdurre(): boolean {
    return this.daProdurre;
  }

  isDaRaccogliere(): boolean {
    return this.daRaccogliere;
  }

  reset() {
    this.richiesti.set(0);
    this.daProdurre = false;
    this.daRaccogliere = false;
  }

  get()  {
    return {
      nome: this.getNome(),
      fabbrica: this.getFabbrica().getNome(),
      fabbricabile: this.getFabbrica().isFabbricabile(),
      stagionale: this.getFabbrica().isStagionale(),
      magazzino: this.getMagazzino(),
      produzione: this.getProduzione(),
      producibile: this.isProducibile(),
      raccoglibile: this.isRaccoglibile(),
      daProdurre: this.isDaProdurre(),
      daRaccogliere: this.isDaRaccogliere(),
    }
  }
}
