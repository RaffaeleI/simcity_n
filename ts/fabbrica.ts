import { Counter } from "./counter";

export class Fabbrica {
  constructor(
    public nome: String,
    public fabbricabile: boolean,
    public stagionale: boolean,
    public coda: Counter
  ) {}
}
