import { Counter } from "./counter";

export class Fabbrica {
  constructor(
    public nome: String,
    public fabbricabile: boolean,
    public stagionale: boolean,
    public coda: Counter
  ) {}

  get(): any {
    return {
      nome: this.nome,
      fabbricabile: this.fabbricabile,
      stagionale: this.stagionale,
      coda: this.coda.get(),
    };
  }
}
