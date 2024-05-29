import { Articolo } from "./articolo";
import { Nodo } from "./nodo";
import { regola } from "./regola";
import { Richiesta } from "./richiesta";

export function crea(
  richiesta: Richiesta,
  articoli: Articolo[]
): void {
  let radice: Nodo | undefined = undefined;
  if (richiesta) {
    articoli.forEach((art) => {
      for (let i = 0; i < richiesta.getNecessari(art); i++) {
        let nodo = creaR(art, articoli);
        if (nodo) {
          nodo.fratello = radice;
          radice = nodo;
        }
      }
    });
  }
  richiesta.tree = radice;
}

function creaR(articolo: Articolo, articoli: Articolo[]): Nodo | undefined {
  let radice: Nodo | undefined = undefined;
  articoli.forEach((el) => {
    for (let i = 0; i < regola(articolo, el); i++) {
      let nodo = creaR(el, articoli);
      if (nodo) nodo.fratello = radice;
      radice = nodo;
    }
  });
  let nodo = new Nodo(articolo, radice);
  radice = nodo;
  return radice;
}