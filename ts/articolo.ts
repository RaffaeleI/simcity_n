import { Counter } from "./counter";
import { Fabbrica } from "./fabbrica";

export class Articolo {
  private magazzino: Counter = new Counter();
  private produzione: Counter = new Counter();
  public richiesti: Counter = new Counter();
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
}
