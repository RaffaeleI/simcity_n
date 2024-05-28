import { Articolo } from "./articolo";
import fs from "fs/promises";
import { Fabbrica } from "./fabbrica";
import { Counter } from "./counter";

// const articoliFile: string = "./../json/articoli.json";
// const fabbricheFile = "./../json/articoli.json";
// const regoleFile = "./../json/articoli.json";
// const depositoFile = "./../json/articoli.json";

export class Controller {
  private articoli: Articolo[] = [];
  private fabbriche: Fabbrica[] = [];
  private deposito: Counter = new Counter();

  constructor(articoliFile: string, fabbricheFile: string, depositoFile: string) {
    fs.readFile(articoliFile)
      .then((data: any) => {
        let arts = JSON.parse(data);
        this.articoli = arts.map(
          (art: { nome: String; fabbrica: Fabbrica }) => {
            return new Articolo(art.nome, art.fabbrica);
          }
        );
      })
      .catch((error) => {
        throw new Error("File " + articoliFile + " non trovato");
      });

    fs.readFile(fabbricheFile)
      .then((data: any) => {
        let fabs = JSON.parse(data);
        this.fabbriche = fabs.map((fab: { nome: String; fabbricabile: boolean; stagionale: boolean; coda: number; }) => {
            let newFab = new Fabbrica(fab.nome, fab.fabbricabile, fab.stagionale, new Counter());
            newFab.coda.set(fab.coda);
            return newFab;
        });
      })
      .catch((error) => {
        throw new Error("File " + fabbricheFile + " non trovato");
      });

      fs.readFile(depositoFile)
    .then((data: any) => {
        let dep = JSON.parse(data);
        let value = Number(dep.deposito);
        if(value) this.deposito.set(value);
        else throw new Error("Valore del deposito non valido:  " + this.deposito);
    })
    .catch((error) => {
        throw new Error("File " + depositoFile + " non trovato");
    });
  }

}
