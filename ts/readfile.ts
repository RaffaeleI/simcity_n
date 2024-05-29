import fs from "fs/promises";
import { Fabbrica } from "./fabbrica";
import { Articolo } from "./articolo";
import { Counter } from "./counter";

export function readArticoli(file: string): any {
  let articoli: Articolo[] = [];
  fs.readFile(file)
    .then((data: any) => {
      let arts = JSON.parse(data);
      articoli = arts.map((art: { nome: String; fabbrica: Fabbrica }) => {
        return new Articolo(art.nome, art.fabbrica);
      });
    })
    .catch((error) => {
      throw new Error("File " + file + " non trovato");
    });
}

export function readFabbriche(file: string): any {
  let fabbriche: Fabbrica[] = [];
  fs.readFile(file)
    .then((data: any) => {
      let fabs = JSON.parse(data);
      fabbriche = fabs.map(
        (fab: {
          nome: String;
          fabbricabile: boolean;
          stagionale: boolean;
          coda: number;
        }) => {
          let newFab = new Fabbrica(
            fab.nome,
            fab.fabbricabile,
            fab.stagionale,
            new Counter()
          );
          newFab.coda.set(fab.coda);
          return newFab;
        }
      );
    })
    .catch((error) => {
      throw new Error("File " + file + " non trovato");
    });
  return fabbriche;
}

export function readDeposito(file: string): any {
  let deposito: Counter = new Counter();
  fs.readFile(file)
    .then((data: any) => {
      let dep = JSON.parse(data);
      let value = Number(dep.deposito);
      if (value) deposito.set(value);
      else throw new Error("Valore del deposito non valido:  " + value);
    })
    .catch((error) => {
      throw new Error("File " + file + " non trovato");
    });
  return deposito;
}
