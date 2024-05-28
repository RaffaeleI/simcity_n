import { Articolo } from "./articolo";

export class Nodo {
    public fratello: Nodo | undefined= undefined;
    public isInMagazzino: boolean = false;
    public isInProduzione: boolean = false;
    public isDaProdurre: boolean = false;
    public isDaRaccogliere: boolean = false;
    
    constructor(public articolo: Articolo, public figlio: Nodo){}

    figliInMagazzino():boolean {
        return true;
    }

    contaFigliDaRaccogliere(): number {
        return 0;
    }
}