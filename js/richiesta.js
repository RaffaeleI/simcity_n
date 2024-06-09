"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Richiesta = void 0;
const nodo_1 = require("./nodo");
const articoloRichiesta_1 = require("./articoloRichiesta");
const counter_1 = require("./counter");
const regola_1 = require("./regola");
const view_1 = require("./view");
class Richiesta {
    constructor(nome, articoli) {
        this.nome = nome;
        this.articoli = articoli;
        this.articoliRichiesta = [];
        this.albero = undefined;
        this.articoliRichiesta = articoli.map((art) => {
            return new articoloRichiesta_1.ArticoloRichiesta(art, new counter_1.Counter(), new counter_1.Counter());
        });
        this.creaVista();
    }
    getNome() {
        return this.nome;
    }
    incNecessario(nome, inc) {
        let articoloRichiesta = this.articoliRichiesta.find((el) => el.articolo.getNome() === nome);
        if (articoloRichiesta) {
            articoloRichiesta.necessari.inc(inc);
            this.creaAlbero();
        }
    }
    incOttenuto(nome, inc) {
        let articoloRichiesta = this.articoliRichiesta.find((el) => el.articolo.getNome() === nome);
        if (articoloRichiesta)
            articoloRichiesta.ottenuti.inc(inc);
    }
    isEseguibile() {
        let eseguibile = true;
        this.articoliRichiesta.forEach((el) => (eseguibile =
            eseguibile && el.articolo.getMagazzino() >= el.necessari.get()));
        return eseguibile;
    }
    isDaEseguire() {
        let eseguibile = true;
        if (this.albero) {
            let nodo = this.albero;
            while (nodo && eseguibile) {
                eseguibile = eseguibile && nodo.isFigliInMagazzino();
                nodo = nodo.fratello;
            }
        }
        return eseguibile;
    }
    esegui() {
        this.articoliRichiesta.forEach((el) => el.articolo.incMagazzino(-el.necessari.get()));
    }
    creaAlbero() {
        let nodo = undefined;
        this.albero = undefined;
        this.articoliRichiesta.forEach((el) => {
            for (let i = 0; i < el.necessari.get(); i++) {
                nodo = this.albero;
                this.albero = this.creaAlberoR(el.articolo);
                if (this.albero)
                    this.albero.fratello = nodo;
            }
        });
        this.creaVista();
    }
    creaAlberoR(articolo) {
        let radice = undefined;
        let nodo = undefined;
        this.articoli.forEach((nec) => {
            for (let i = 0; i < (0, regola_1.regola)(articolo.getNome(), nec.getNome()); i++) {
                nodo = radice;
                radice = this.creaAlberoR(nec);
                if (radice)
                    radice.fratello = nodo;
            }
        });
        nodo = radice;
        radice = new nodo_1.Nodo(articolo, nodo);
        return radice;
    }
    creaVista() {
        console.log(this.albero);
        if (this.albero) {
            this.vista = {
                name: this.nome,
                children: (0, view_1.creaVista)(this.albero),
            };
        }
        else {
            this.vista = {
                name: this.nome,
            };
        }
    }
    get() {
        return {
            nome: this.getNome(),
            eseguibile: this.isEseguibile(),
            daEseguire: this.isDaEseguire(),
            necessari: this.articoliRichiesta
                //.filter((el) => el.necessari.get() > 0)
                .map((articolo) => {
                return {
                    articolo: articolo.articolo.getNome(),
                    necessari: articolo.necessari.get(),
                };
            }),
            ottenuti: this.articoliRichiesta
                //.filter((el) => el.ottenuti.get() > 0)
                .map((articolo) => {
                return {
                    articolo: articolo.articolo.getNome(),
                    ottenuti: articolo.ottenuti.get(),
                };
            }),
            vista: this.vista,
        };
    }
}
exports.Richiesta = Richiesta;
