import fs from "fs/promises";
import { Fabbrica } from "./fabbrica";
import { Articolo } from "./articolo";
import { Counter } from "./counter";

export async function readArticoli(file: string): Promise<Articolo[]> {
  let articoli: Articolo[] = [];
  try {
    const data = await fs.readFile(file);
    let arts = JSON.parse(data.toString());
    articoli = arts.map((art: { nome: String; fabbrica: Fabbrica }) => {
      return new Articolo(art.nome, art.fabbrica);
    });
    return articoli;
  } catch (error) {
    throw new Error("File " + file + " non trovato");
  }
}

export async function readFabbriche(file: string): Promise<Fabbrica[]> {
  let fabbriche: Fabbrica[] = [];
  try {
    const data = await fs.readFile(file);
    let fabs = JSON.parse(data.toString());
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
    return fabbriche;
  } catch (error) {
    throw new Error("File " + file + " non trovato");
  }
}

export async function readDeposito(file: string): Promise<Counter> {
  let deposito: Counter = new Counter();
  try {
    const data = await fs.readFile(file);
    let dep = JSON.parse(data.toString());
    let value = Number(dep.deposito);
    if (value) deposito.set(value);
    else throw new Error("Valore del deposito non valido:  " + value);
    return deposito;
  } catch (error) {
    throw new Error("File " + file + " non trovato");
  }
}
