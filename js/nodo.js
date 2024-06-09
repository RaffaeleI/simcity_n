"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nodo = void 0;
class Nodo {
    constructor(articolo, figlio) {
        this.articolo = articolo;
        this.figlio = figlio;
        this.fratello = undefined;
        this.inMagazzino = false;
        this.inProduzione = false;
    }
    reset() {
        this.inMagazzino = false;
        this.inProduzione = false;
        if (this.figlio)
            this.figlio.reset();
        if (this.fratello)
            this.fratello.reset();
    }
    isFigliInMagazzino() {
        let esito = true;
        if (!this.inMagazzino && !this.inProduzione) {
            if (this.figlio) {
                let n = this.figlio;
                while (n && esito) {
                    esito = esito && n.inMagazzino;
                    n = n.fratello;
                }
            }
        }
        return esito;
    }
    contaDaRaccogliere() {
        let count = 0;
        if (this.inProduzione)
            count = 1;
        else if (!this.inMagazzino) {
            if (!this.figlio)
                count = 1;
            else
                count += this.figlio.contaDaRaccogliere();
        }
        if (this.fratello)
            count += this.fratello.contaDaRaccogliere();
        return count;
    }
    get() {
        let fi = undefined;
        let fr = undefined;
        if (this.figlio)
            fi = this.figlio.get();
        if (this.fratello)
            fr = this.fratello.get();
        return {
            articolo: this.articolo.getNome(),
            inMagazzino: this.inMagazzino,
            inProduzione: this.inProduzione,
            figlio: fi,
            fratello: fr,
        };
    }
    setArticoloDaRaccogliere(nodo, deposito) {
        if (nodo) {
            if (nodo.contaArticoliDaRaccogliere()) {
            }
        }
    }
    contaArticoliDaRaccogliere() {
        let count = 0;
        if (!this.inMagazzino) {
            if (this.inProduzione)
                count = 1;
            else {
                if (this.figlio)
                    count = this.figlio.contaArticoliDaRaccogliere();
            }
        }
        if (this.fratello)
            count += this.fratello.contaArticoliDaRaccogliere();
        return count;
    }
}
exports.Nodo = Nodo;
