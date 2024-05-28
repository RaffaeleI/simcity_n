export class Counter {

    private value: number = 0;
    constructor() {}
    get(): number {
        return this.value;
    }

    set(value: number): void {
        if(value >= 0) this.value = value;
        else throw new Error('Valore negativo');
    }

    inc(inc: number): void {
        if(inc !== 0){
            this.set(this.get() + inc);
        }
    }
  }