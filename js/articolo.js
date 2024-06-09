"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Articolo = void 0;
const counter_1 = require("./counter");
class Articolo {
    constructor(nome, fabbrica) {
        this.nome = nome;
        this.fabbrica = fabbrica;
        this.magazzino = new counter_1.Counter();
        this.produzione = new counter_1.Counter();
        this.richiesti = new counter_1.Counter();
        this.producibile = false;
        this.daProdurre = false;
        this.daRaccogliere = false;
    }
    getNome() {
        return this.nome;
    }
    getFabbrica() {
        return this.fabbrica;
    }
    getMagazzino() {
        return this.magazzino.get();
    }
    getProduzione() {
        return this.produzione.get();
    }
    incMagazzino(inc) {
        this.magazzino.inc(inc);
    }
    incProduzione(inc) {
        this.produzione.inc(inc);
    }
    isRaccoglibile() {
        return this.produzione.get() > 0;
    }
    isProducibile() {
        return this.producibile;
    }
    setProducibile(value) {
        this.producibile = this.fabbrica.isFabbricabile() && value;
    }
    isDaProdurre() {
        return this.daProdurre;
    }
    isDaRaccogliere() {
        return this.daRaccogliere;
    }
    reset() {
        this.richiesti.set(0);
        this.daProdurre = false;
        this.daRaccogliere = false;
    }
    raccogli() {
        if (this.isRaccoglibile()) {
            this.incProduzione(-1);
            this.incMagazzino(1);
        }
    }
    get() {
        return {
            nome: this.getNome(),
            fabbrica: this.getFabbrica().getNome(),
            fabbricabile: this.getFabbrica().isFabbricabile(),
            stagionale: this.getFabbrica().isStagionale(),
            magazzino: this.getMagazzino(),
            produzione: this.getProduzione(),
            richiesti: this.richiesti.get(),
            producibile: this.isProducibile(),
            raccoglibile: this.isRaccoglibile(),
            daProdurre: this.isDaProdurre(),
            daRaccogliere: this.isDaRaccogliere(),
        };
    }
}
exports.Articolo = Articolo;
