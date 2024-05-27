module.exports.incProduzione = function (nome, inc, stato) {
    let articolo = stato.articoli.find(el => el.nome === nome);
    let value = articolo.inProduzione + inc;
    if (value >= 0) articolo.inProduzione = value;
    raccoglibile(stato);
};

module.exports.incMagazzino = function (nome, inc, stato) {
    let articolo = stato.articoli.find(el => el.nome === nome);
    let value = articolo.inMagazzino + inc;
    if (value >= 0) articolo.inMagazzino = value;
    raccoglibile(stato);
};

raccoglibile = function (stato) {
    stato.articoli.forEach(articolo => {
        let fabbrica = stato.fabbriche.find(f => f.nome === articolo.fabbrica);
        if(fabbrica) {
            articolo.raccoglibile = fabbrica.fabbricabile && articolo.inProduzione > 0;
        } else articolo.raccoglibile = false;
    });
};