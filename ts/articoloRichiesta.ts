import { Articolo } from "./articolo";
import { Counter } from "./counter";

export class ArticoloRichiesta {
    constructor(public articolo: Articolo, public necessari: Counter, public ottenuti: Counter){}
}