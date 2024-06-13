const Controller = require('./js/controller')

const express = require('express')
const app = express()
const port = process.env.port || 3000;

const articoliFile = "./json/articoli.json";
const fabbricheFile = "./json/fabbriche.json";
const depositoFile = "./json/deposito.json";

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const controller = new Controller.Controller(fabbricheFile, articoliFile, depositoFile);

var cors = require('cors');
app.use(cors());

app.post("/articoli/magazzino", (req, res) => {
    let articolo = req.body.articolo;
    let inc = req.body.incremento;
    const start = Date.now();
    try {
        controller.incArticoloMagazzino(articolo, inc);
    } catch (error) {
        console.log(error);
        console.log("Bad request! " + articolo + ": incremento " + inc + " del magazzino");
    }
    console.log("Incremento magazzino. Eseguito in: " + (Date.now() - start) + " millisecondi");
    res.send(controller.get());
})

app.post("/articoli/produzione", (req, res) => {
    let articolo = req.body.articolo;
    let inc = req.body.incremento;
    const start = Date.now();
    try {
        controller.incArticoloProduzione(articolo, inc);
    } catch (error) {
        console.log(error);
        console.log("Bad request! " + articolo + ": incremento " + inc + " della produzione");
    }
    console.log("Incremento articolo. Eseguito in: " + (Date.now() - start) + " millisecondi");
    res.send(controller.get());
})

app.post("/articoli/produci", (req, res) => {
    let articolo = req.body.articolo;
    const start = Date.now();
    try {
        controller.produci(articolo);
    } catch (error) {
        console.log(error);
        console.log("Bad request! " + articolo + ": produzione ");
    }
    console.log("Produzione articolo. Eseguito in: " + (Date.now() - start) + " millisecondi");
    res.send(controller.get());
})

app.post("/articoli/raccogli", (req, res) => {
    let articolo = req.body.articolo;
    const start = Date.now();
    try {
        controller.raccogli(articolo);
    } catch (error) {
        console.log(error);
        console.log("Bad request! " + articolo + ": raccolta ");
    }
    console.log("Raccolta articolo. Eseguito in: " + (Date.now() - start) + " millisecondi");
    res.send(controller.get());
})



app.post("/richiesta/up", (req, res) => {
    let richiesta = req.body.richiesta;
    const start = Date.now();
    controller.upRichiesta(richiesta);
    console.log("Up richiesta. Eseguito in: " + (Date.now() - start) + " millisecondi");
    res.send(controller.get());
})

app.post("/richiesta/down", (req, res) => {
    let richiesta = req.body.richiesta;
    const start = Date.now();
    controller.downRichiesta(richiesta);
    console.log("Down richiesta. Eseguito in: " + (Date.now() - start) + " millisecondi");
    res.send(controller.get());
})

app.post("/richiesta/esegui", (req, res) => {
    let richiesta = req.body.richiesta;
    const start = Date.now();
    controller.eseguiRichiesta(richiesta);
    console.log("Esegui richiesta. Eseguito in: " + (Date.now() - start) + " millisecondi");
    res.send(controller.get());
})

app.post("/richiesta", (req, res) => {
    let richiesta = req.body.richiesta;
    const start = Date.now();
    controller.addRichiesta(richiesta);
    console.log("Aggiunta richiesta. Eseguito in: " + (Date.now() - start) + " millisecondi");
    res.send(controller.get());
})

app.delete("/richiesta", (req, res) => {
    let richiesta = req.body.richiesta;
    const start = Date.now();
    controller.deleteRichiesta(richiesta);
    console.log("Elimina richiesta. Eseguito in: " + (Date.now() - start) + " millisecondi");
    res.send(controller.get());
})

app.patch("/richiesta/necessario", (req, res) => {
    let richiesta = req.body.richiesta;
    let necessario = req.body.necessario;
    let incremento = req.body.incremento;
    const start = Date.now();
    try {
        controller.incArticoloNecessario(richiesta, necessario, incremento);
    } catch (error) {
        console.log(error);
        console.log("Bad request! " + richiesta + " " + articolo + ": incremento " + inc + " necessario");
    }
    console.log("Incremento neccessario. Eseguito in: " + (Date.now() - start) + " millisecondi");
    res.send(controller.get());
})

app.patch("/richiesta/ottenuto", (req, res) => {
    let richiesta = req.body.richiesta;
    let ottenuto = req.body.ottenuto;
    let incremento = req.body.incremento;
    const start = Date.now();
    try {
        controller.incArticoloOttenuto(richiesta, ottenuto, incremento);
    } catch (error) {
        console.log(error);
        console.log("Bad request! " + richiesta + " " + articolo + ": incremento " + inc + " necessario");
    }
    console.log("Incremento ottenuto. Eseguito in: " + (Date.now() - start) + " millisecondi");
    res.send(controller.get());
})

app.post("/deposito", (req, res) => {
    let incremento = req.body.incremento;
    const start = Date.now();
    controller.incDeposito(incremento);
    console.log("Incremento deposito. Eseguito in: " + (Date.now() - start) + " millisecondi");
    res.send(controller.get());
})

app.get("/", (req, res) => {
    res.send(controller.get());
})

app.all('*', (req, res) => {
    res.send(controller.get());
})

app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
    console.log("Control-c to stop server");
})