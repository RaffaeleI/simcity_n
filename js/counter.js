"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counter = void 0;
class Counter {
    constructor() {
        this.value = 0;
    }
    get() {
        return this.value;
    }
    set(value) {
        if (value >= 0)
            this.value = value;
        else
            throw new Error('Valore negativo');
    }
    inc(inc) {
        if (inc !== 0) {
            this.set(this.get() + inc);
        }
    }
}
exports.Counter = Counter;
