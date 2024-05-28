const Nodo = require('./nodo.js');

module.exports = function() {
    
}

assegna = function (stato) {
    stato.articoli.forEach(art => art.richiesti = 0);
    stato.tree.forEach(ric => {
        assegnaR(ric.necessari, stato);
    });
}

assegnaR = function (necessari, stato) {
    necessari.forEach(nec => {
        let articolo = stato.articoli.find(art => art.nome == nec.nome);
        if (articolo) {
            if (articolo.inMagazzino > articolo.richiesti) {
                nec.inMagazzino = true;
                articolo.richiesti++;
            } else if (articolo.inMagazzino + articolo.inProduzione > articolo.richiesti) {
                nec.inProduzione = true;
                articolo.richiesti++;
            } else {
                assegnaR(nec.necessari, stato);
            }
        }
    });
}

daRaccogliere = function (stato) {

}

daProdurre = function (stato) {

}

contaFigliR = function(necessari){
    let count = 0;
    necessari.forEach(nec => {
        if(!nec.inMagazzino){
            if(nec.necessari.lenght === 0) count++;
            else count += contaFigliR(nec.necessari);
        }
    });
    return count;
}

tree = function (stato) {
    stato.tree = [];
    stato.richieste.forEach(richiesta => {
        let albero = creaAlbero(richiesta, stato);
        stato.tree.push(albero);
    })
}

creaAlbero = function (richiesta, stato) {
    let necessari = [];
    richiesta.necessari.forEach(nec => {
        for (let i = 0; i < nec.valore; i++) {
            necessari.unshift(creaAlberoR(nec.necessario, stato));
        }
    });
    return { nome: richiesta.nome, necessari: necessari };
}

creaAlberoR = function (articolo, stato) {
    let necessari = [];
    let regola = stato.regole.find(reg => reg.nome === articolo);
    if (regola) {
        regola.regola.forEach(el => {
            for (let i = 0; i < el.valore; i++) {
                necessari.unshift(creaAlberoR(el.necessario, stato));
            }
        });
    }
    let nodo = new Nodo();
    nodo.nome = articolo;
    nodo.necessari = necessari;
    return nodo;
}

resetAlbero = function (stato) {
    stato.tree.forEach(ric => {
        resetAlberoR(ric.necessari);
    });
}

resetAlberoR = function (necessari) {
    necessari.forEach(nec => {
        nec.inMagazzino = false;
        nec.inProduzione = false;
        nec.daRaccogliere = false;
        nec.daProdurre = false;
        resetAlberoR(nec.necessari);
    })
}

view = function(stato){

}

resetDaRaccogliere = function(stato) {

}



