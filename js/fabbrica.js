"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fabbrica = void 0;
const counter_1 = require("./counter");
class Fabbrica {
    constructor(nome, fabbricabile, stagionale, size) {
        this.nome = nome;
        this.fabbricabile = fabbricabile;
        this.stagionale = stagionale;
        this.size = new counter_1.Counter();
        this.nextDaProdurre = undefined;
        this.nextDaRaccogliere = undefined;
        this.coda = [];
        if (!nome || nome === "")
            throw new Error("Nome fabbrica non valido: " + nome);
        try {
            this.size.set(size);
        }
        catch (error) {
            throw new Error(error + ". Dimensione coda non valida: " + size);
        }
    }
    getNome() {
        return this.nome;
    }
    isFabbricabile() {
        return this.fabbricabile;
    }
    isStagionale() {
        return this.stagionale;
    }
    getSize() {
        return this.size.get();
    }
    incSize(inc) {
        this.size.inc(inc);
    }
    reset() {
        this.nextDaProdurre = undefined;
        this.nextDaRaccogliere = undefined;
        this.coda = [];
    }
    get() {
        return {
            nome: this.nome,
            fabbricabile: this.fabbricabile,
            stagionale: this.stagionale,
            size: this.size.get(),
            coda: this.coda
        };
    }
}
exports.Fabbrica = Fabbrica;
