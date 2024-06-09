"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creaVista = void 0;
function creaVista(nodo) {
    let fi = undefined;
    let fr = undefined;
    if (!nodo.inMagazzino && !nodo.inProduzione && nodo.figlio)
        fi = creaVista(nodo.figlio);
    if (nodo.fratello)
        fr = creaVista(nodo.fratello);
    let borthers = [];
    if (fi) {
        borthers.push({ name: stato(nodo), children: fi });
    }
    else {
        borthers.push({ name: stato(nodo) });
    }
    if (fr) {
        fr.forEach((el) => borthers.push(el));
    }
    return borthers;
}
exports.creaVista = creaVista;
function stato(nodo) {
    if (nodo.inMagazzino)
        return nodo.articolo.getNome() + ' m';
    else if (nodo.inProduzione)
        return nodo.articolo.getNome() + ' p';
    else
        return nodo.articolo.getNome();
}
