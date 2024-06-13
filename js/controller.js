"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const fabbrica_1 = require("./fabbrica");
const articolo_1 = require("./articolo");
const counter_1 = require("./counter");
const richiesta_1 = require("./richiesta");
const regola_1 = require("./regola");
const articoli_1 = require("./articoli");
const fabbriche_1 = require("./fabbriche");
const deposito_1 = require("./deposito");
class Controller {
    constructor() {
        this.fabbriche = [];
        this.articoli = [];
        this.deposito = new counter_1.Counter();
        this.richieste = [];
        this.contaDaRaccogliere = new counter_1.Counter();
        this.fabbriche = fabbriche_1.FABBRICHE.map((el) => new fabbrica_1.Fabbrica(el.nome, el.fabbricabile, el.stagionale, el.size));
        this.articoli = articoli_1.ARTICOLI.map((el) => {
            let fabbrica = this.getFabbrica(el.fabbrica);
            return new articolo_1.Articolo(el.nome, fabbrica);
        });
        this.deposito.set(deposito_1.DEPOSITO);
        this.setProducibile();
    }
    produci(nome) {
        let articolo = this.getArticolo(nome);
        if (articolo) {
            if (articolo.isProducibile()) {
                this.articoli.forEach((el) => {
                    if (articolo) {
                        el.incMagazzino(-(0, regola_1.regola)(articolo.getNome(), el.getNome()));
                    }
                });
                articolo.incProduzione(1);
                this.setProducibile();
                this.assegnaArticoli();
            }
        }
    }
    raccogli(nome) {
        let articolo = this.getArticolo(nome);
        if (articolo) {
            articolo.raccogli();
            this.setProducibile();
            this.assegnaArticoli();
        }
    }
    incArticoloMagazzino(nome, inc) {
        let articolo = this.getArticolo(nome);
        if (articolo) {
            articolo.incMagazzino(inc);
            this.setProducibile();
            this.assegnaArticoli();
        }
    }
    incArticoloProduzione(nome, inc) {
        let articolo = this.getArticolo(nome);
        if (articolo) {
            articolo.incProduzione(inc);
            this.assegnaArticoli();
        }
    }
    addRichiesta(nome) {
        if (nome && nome !== "") {
            let richiesta = this.richieste.find((ric) => ric.getNome() === nome.toUpperCase());
            if (!richiesta) {
                this.richieste.push(new richiesta_1.Richiesta(nome.toUpperCase(), this.articoli));
            }
        }
    }
    deleteRichiesta(nome) {
        if (nome) {
            let index = this.richieste.findIndex((el) => el.getNome() === nome.toUpperCase());
            if (index >= 0) {
                this.richieste.splice(index, 1);
                this.assegnaArticoli();
            }
        }
    }
    eseguiRichiesta(nome) {
        let richiesta = this.getRichiesta(nome);
        if (richiesta && richiesta.isEseguibile()) {
            richiesta.esegui();
            this.deleteRichiesta(nome);
            this.assegnaArticoli();
        }
    }
    upRichiesta(nome) {
        if (nome) {
            let index = this.richieste.findIndex((el) => el.getNome() === nome.toUpperCase());
            this.moveRichiesta(index, index - 1);
        }
    }
    downRichiesta(nome) {
        if (nome) {
            let index = this.richieste.findIndex((el) => el.getNome() === nome.toUpperCase());
            this.moveRichiesta(index, index + 1);
        }
    }
    moveRichiesta(index, position) {
        if (0 <= index &&
            index < this.richieste.length &&
            0 <= position &&
            position < this.richieste.length &&
            index !== position) {
            let richiesta = this.richieste[index];
            this.richieste[index] = this.richieste[position];
            this.richieste[position] = richiesta;
            this.assegnaArticoli();
        }
    }
    incArticoloNecessario(nomeRichiesta, necessario, incremento) {
        let richiesta = this.getRichiesta(nomeRichiesta);
        if (richiesta) {
            richiesta.incNecessario(necessario, incremento);
            this.assegnaArticoli();
        }
    }
    incArticoloOttenuto(nomeRichiesta, necessario, incremento) {
        let richiesta = this.getRichiesta(nomeRichiesta);
        if (richiesta) {
            richiesta.incOttenuto(necessario, incremento);
        }
    }
    getArticolo(nome) {
        let a = this.articoli.find((el) => el.getNome() === String(nome).toUpperCase());
        if (!a)
            throw new Error("Articolo non presente: " + nome);
        return a;
    }
    getFabbrica(nome) {
        let f = this.fabbriche.find((el) => el.getNome() === String(nome).toUpperCase());
        if (!f)
            throw new Error("Fabbrica non presente: " + nome);
        return f;
    }
    getRichiesta(nome) {
        let r = this.richieste.find((el) => el.getNome() === nome.toUpperCase());
        if (!r)
            throw new Error("Richiesta non presente :" + nome);
        return r;
    }
    assegnaArticoli() {
        this.contaDaRaccogliere.set(0);
        this.fabbriche.forEach((fabbrica) => fabbrica.reset());
        this.articoli.forEach((articolo) => articolo.reset());
        this.richieste.forEach((richiesta) => {
            if (richiesta.albero)
                richiesta.albero.reset();
            this.assegnaArticoliR(richiesta.albero);
            richiesta.creaVista();
        });
        this.enqueue();
    }
    assegnaArticoliR(nodo) {
        if (nodo) {
            if (nodo.articolo.getMagazzino() > nodo.articolo.richiesti.get()) {
                nodo.inMagazzino = true;
                nodo.articolo.richiesti.inc(1);
            }
            else if (nodo.articolo.getMagazzino() + nodo.articolo.getProduzione() >
                nodo.articolo.richiesti.get()) {
                nodo.inProduzione = true;
                nodo.articolo.richiesti.inc(1);
                if (this.contaDaRaccogliere.get() <
                    this.deposito.get() - this.contaArticoliInMagazzino()) {
                    this.contaDaRaccogliere.inc(1);
                    nodo.articolo.daRaccogliere = true;
                }
            }
            else {
                nodo.articolo.richiesti.inc(1);
                this.assegnaArticoliR(nodo.figlio);
                if (!nodo.articolo.getFabbrica().nextDaProdurre) {
                    nodo.articolo.getFabbrica().nextDaProdurre = nodo.articolo;
                    if (nodo.isFigliInMagazzino()) {
                        nodo.articolo.daProdurre = true;
                    }
                }
            }
            this.assegnaArticoliR(nodo.fratello);
        }
    }
    enqueue() {
        this.richieste.forEach((richiesta) => {
            this.enqueueR(richiesta.albero);
        });
    }
    enqueueR(nodo) {
        if (nodo) {
            if (nodo.articolo.getFabbrica().isFabbricabile() && !nodo.inMagazzino) {
                if (!nodo.inProduzione)
                    this.enqueueR(nodo.figlio);
                nodo.articolo.getFabbrica().coda.push({
                    nome: nodo.articolo.getNome(),
                    inProduzione: nodo.inProduzione,
                });
            }
            this.enqueueR(nodo.fratello);
        }
    }
    contaArticoliInMagazzino() {
        let count = 0;
        this.articoli.forEach((articolo) => (count += articolo.getMagazzino()));
        return count;
    }
    setProducibile() {
        this.articoli
            .filter((el) => el.getFabbrica().isFabbricabile())
            .forEach((articolo) => {
            let producibile = true;
            this.articoli.forEach((necessario) => {
                producibile =
                    producibile &&
                        necessario.getMagazzino() >=
                            (0, regola_1.regola)(articolo.getNome(), necessario.getNome());
            });
            articolo.setProducibile(producibile);
        });
    }
    incDeposito(incremento) {
        this.deposito.inc(incremento);
        this.assegnaArticoli();
    }
    get() {
        return {
            articoli: this.articoli.map((articolo) => {
                return articolo.get();
            }),
            fabbriche: this.fabbriche.map((fabbrica) => {
                return fabbrica.get();
            }),
            richieste: this.richieste.map((richiesta) => {
                return richiesta.get();
            }),
            deposito: this.deposito.get(),
            vista: this.richieste.length > 0
                ? [
                    {
                        name: "RICHIESTE",
                        children: this.richieste.map((richiesta) => {
                            return richiesta.vista;
                        }),
                    },
                ]
                : [{ name: "RICHIESTE" }],
        };
    }
}
exports.Controller = Controller;
