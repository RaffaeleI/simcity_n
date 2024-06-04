import { Articolo } from "./articolo";
import { Counter } from "./counter";

export class Fabbrica {
  private size = new Counter();
  public nextDaProdurre: Articolo | undefined = undefined;
  public nextDaRaccogliere: Articolo | undefined = undefined;
  public coda:any[] = [];
  constructor(
    private nome: String,
    private fabbricabile: boolean,
    private stagionale: boolean,
    size: number
  ) {
    if (!nome || nome === "")
      throw new Error("Nome fabbrica non valido: " + nome);
    try {
      this.size.set(size);
    } catch {
      throw new Error("Dimensione coda non valida: " + size);
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

  getSize(): number {
    return this.size.get();
  }

  incSize(inc: number) {
    this.size.inc(inc);
  }

  reset() {
    this.nextDaProdurre = undefined;
    this.nextDaRaccogliere = undefined;
    this.coda = [];
  }

  get() {
    return {
      nome: this.nome,
      fabbricabile: this.fabbricabile,
      stagionale: this.stagionale,
      size: this.size.get(),
      coda: this.coda
    };
  }
}
