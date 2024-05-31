import { Articolo } from "./articolo";
import { Counter } from "./counter";

export class Fabbrica {
  private coda = new Counter();
  public next: Articolo | undefined = undefined;
  constructor(
    private nome: String,
    private fabbricabile: boolean,
    private stagionale: boolean,
    coda: number
  ) {
    if (!nome || nome === "")
      throw new Error("Nome fabbrica non valido: " + nome);
    try {
        this.coda.set(coda);
    } catch {
        throw new Error("Dimensione coda non valida: " + coda);
    }
  }

  getNome(): String {
    return this.nome;
  }

  isFabbricabile(): boolean {
    return this.fabbricabile;
  }

  isStagionale(): boolean {
    return this.stagionale;
  }

  getCoda(): number {
    return this.coda.get();
  }

  incCoda(inc: number){
    this.coda.inc(inc);
  }
}
