import { Nodo } from "./nodo";

export function creaVista(nodo: Nodo) {
  let fi: any = undefined;
  let fr: any = undefined;
  if (!nodo.inMagazzino && !nodo.inProduzione && nodo.figlio) fi = creaVista(nodo.figlio);
  if (nodo.fratello) fr = creaVista(nodo.fratello);
  let borthers = [];
  if (fi) {
    borthers.push({ name: stato(nodo), children: fi });
  } else {
    borthers.push({ name: stato(nodo) });
  }
  if (fr) {
    fr.forEach((el: any) => borthers.push(el));
  }
  return borthers;
}

function stato(nodo: Nodo): String {
    if(nodo.inMagazzino) return nodo.articolo.getNome() + ' m';
    else if(nodo.inProduzione) return nodo.articolo.getNome() + ' p';
    else return nodo.articolo.getNome()
}
