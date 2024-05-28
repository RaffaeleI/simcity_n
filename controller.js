const albero = require('./albero.js')
const Richiesta = require('./richiesta.js')

module.exports.incProduzione = function (nome, inc, stato) {
    let articolo = stato.articoli.find(el => el.nome === nome);
    let fabbrica = stato.fabbriche.find(f => f.nome === articolo.fabbrica);
    if (fabbrica && fabbrica.fabbricabile) {
        let value = articolo.inProduzione + inc;
        if (inc !== 0 && value >= 0) articolo.inProduzione = value;
        raccoglibile(stato);
        albero.resetAlbero(stato);
        albero.assegna(stato);
        albero.daRaccogliere(stato);
        albero.daProdurre(stato);
        albero.view(stato);
    }
};

module.exports.incMagazzino = function (nome, inc, stato) {
    let articolo = stato.articoli.find(el => el.nome === nome);
    let value = articolo.inMagazzino + inc;
    if (inc !== 0 && value >= 0) articolo.inMagazzino = value;
    raccoglibile(stato);
    producibile(stato);
    albero.resetAlbero(stato);
    albero.assegna(stato);
    albero.daRaccogliere(stato);
    albero.daProdurre(stato);
    albero.view(stato);
};

module.exports.addRichiesta = function (nome, stato) {
    if (nome) {
        let upNome = String(nome).toUpperCase();
        let richiesta = stato.richieste.find(ric => ric.nome === upNome);
        if (!richiesta) {
            let necessari = stato.articoli.map(nec => { return { necessario: nec.nome, valore: 0 } });
            let ottenuti = stato.articoli.map(ott => { return { ottenuto: ott.nome, valore: 0 } });
            let eseguibile = false;
            stato.richieste.push(new Richiesta(upNome, eseguibile, necessari, ottenuti));
            albero.tree(stato);
            albero.view(stato);
        }
    }
};

module.exports.incNecessario = function (nomeRichiesta, nomeNecessario, inc, stato) {
    let richiesta = stato.richieste.find(ric => ric.nome === nomeRichiesta);
    if (richiesta) {
        let necessario = richiesta.necessari.find(nec => nec.necessario === nomeNecessario);
        if (!necessario) {
            necessario = { necessario: nomeNecessario, valore: 0 };
            richiesta.necessari.push(necessario);
        }
        let value = necessario.valore + inc;
        if (inc !== 0 && value >= 0) {
            necessario.valore = value;
            albero.tree(stato);
            albero.resetAlbero(stato);
            albero.assegna(stato);
            albero.daRaccogliere(stato);
            albero.daProdurre(stato);
            albero.view(stato);
        }
    }
}

module.exports.incOttenuto = function (nomeRichiesta, nomeOttenuto, inc, stato) {
    let richiesta = stato.richieste.find(ric => ric.nome === nomeRichiesta);
    if (richiesta) {
        let ottenuto = richiesta.necessari.find(nec => nec.ottenuto === nomeOttenuto);
        if (!ottenuto) {
            ottenuto = { ottenuto: nomeOttenuto, valore: 0 };
            richiesta.ottenuti.push(ottenuto);
        }
        let value = ottenuto.valore + inc;
        if (inc !== 0 && value >= 0) {
            ottenuto.valore = value;
        }
    }
};

module.exports.upRichiesta = function (nomeRichiesta, stato) {
    if (nomeRichiesta) {
        let index = stato.richieste.findIndex(ric => ric.nome === nomeRichiesta);
        if (index > 0) {
            let richiesta = stato.richieste[index];
            stato.richieste[index] = stato.richieste[index - 1];
            stato.richieste[index - 1] = richiesta;
            albero.tree(stato);
            albero.resetAlbero(stato);
            albero.assegna(stato);
            albero.daRaccogliere(stato);
            albero.daProdurre(stato);
            albero.view(stato);
        }
    }
};

module.exports.downRichiesta = function (nomeRichiesta, stato) {
    if (nomeRichiesta) {
        let index = stato.richieste.findIndex(ric => ric.nome === nomeRichiesta);
        if (index >= 0 && index < stato.richieste.lenght - 1) {
            let richiesta = stato.richieste[index];
            stato.richieste[index] = stato.richieste[index + 1];
            stato.richieste[index + 1] = richiesta;
            albero.tree(stato);
            albero.resetAlbero(stato);
            albero.assegna(stato);
            albero.daRaccogliere(stato);
            albero.daProdurre(stato);
            albero.view(stato);
        }
    }
};

module.exports.deleteRichiesta = function (nomeRichiesta, stato) {
    if (nomeRichiesta) {
        let index = stato.richieste.findIndex(ric => ric.nome === nomeRichiesta);
        if (index >= 0) {
            stato.richieste[index].splice(index, 1);
            albero.tree(stato);
            albero.resetAlbero(stato);
            albero.assegna(stato);
            albero.daRaccogliere(stato);
            albero.daProdurre(stato);
            albero.view(stato);
        }
    }
};

module.exports.eseguiRichiesta = function (nomeRichiesta, stato) {
    if (nomeRichiesta) {
        let index = stato.richieste.findIndex(ric => ric.nome === nomeRichiesta);
        if (index >= 0) {
            albero.tree(stato);
            albero.resetAlbero(stato);
            albero.assegna(stato);
            albero.daRaccogliere(stato);
            albero.daProdurre(stato);
            albero.view(stato);
        }
    }
};

module.exports.incDeposito = function (inc, stato) {
    let value = stato.deposito + inc;
    if (inc !== 0 && value >= 0) {
        stato.deposito = value;
        albero.resetDaRaccogliere(stato);
        albero.daRaccogliere(stato);
        albero.view(stato);
    }
};

raccoglibile = function (stato) {
    stato.articoli.forEach(articolo => {
        articolo.raccoglibile = articolo.inProduzione > 0;
    });
};

producibile = function (stato) {
    stato.articoli.forEach(articolo => {
        let esito = false;
        let fabbrica = stato.fabbriche.find(f => f.nome === articolo.fabbrica);
        if (fabbrica && fabbrica.fabbricabile && stato.regole) {
            esito = true;
            stato.articoli.forEach(art => {
                let regolaArticolo = stato.regole.find(ar => ar.nome === articolo.nome);
                if (regolaArticolo) {
                    let necessario = regolaArticolo.regola.find(nec => nec.necessario === art.nome);
                    if (necessario) esito = esito && art.inMagazzino >= necessario.valore;
                }
            });
            articolo.producibile = esito;
        } else articolo.producibile = false;
    });
};

contaInMagazzino = function (stato) {
    stato.totale = stato.articoli.reduce((acc, val) => acc + val, 0);
}

