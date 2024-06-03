const Controller = require('./js/controller')

const express = require('express')
const app = express()
const port = 3000;

const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const articoliFile = "./json/articoli.json";
const fabbricheFile = "./json/fabbriche.json";
const depositoFile = "./json/deposito.json";

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const controller = new Controller.Controller(fabbricheFile, articoliFile, depositoFile);

//Middleware
// app.use(session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: true,
// }))

// app.use(passport.initialize()) // init passport on every route call
// app.use(passport.session())    //allow passport to use "express-session"

var cors = require('cors');
app.use(cors());

// authUser = (user, password, done) => {
//     console.log(`Value of "User" in authUser function ----> ${user}`)         //passport will populate, user = req.body.username
//     console.log(`Value of "Password" in authUser function ----> ${password}`) //passport will popuplate, password = req.body.password

//     // Use the "user" and "password" to search the DB and match user/password to authenticate the user
//     // 1. If the user not found, done (null, false)
//     // 2. If the password does not match, done (null, false)
//     // 3. If user found and password match, done (null, user)


//     let authenticated_user = undefined//{ id: 123, name: "Kyle"} 
//     //Let's assume that DB search that user found and password matched for Kyle
//     if (user === "raffaele" && password === "1234") {
//         console.log("authUser: autenticate");
//         authenticated_user = { id: 1, name: user }
//         return done(null, authenticated_user)
//     }

//     return done(null, false)
// }


// passport.use(new LocalStrategy(authUser))

// passport.serializeUser((user, done) => {
//     console.log(`--------> Serialize User`)
//     console.log(user)

//     done(null, user.id)

//     // Passport will pass the authenticated_user to serializeUser as "user" 
//     // This is the USER object from the done() in auth function
//     // Now attach using done (null, user.id) tie this user to the req.session.passport.user = {id: user.id}, 
//     // so that it is tied to the session object

// })

// const error = {
//     state: "error"
// }

// passport.deserializeUser((id, done) => {
//     console.log("---------> Deserialize Id")
//     console.log(id)

//     done(null, { name: "raffaele", id: id })

//     // This is the id that is saved in req.session.passport.{ user: "id"} during the serialization
//     // use the id to find the user in the DB and get the user object with user details
//     // pass the USER object in the done() of the de-serializer
//     // this USER object is attached to the "req.user", and can be used anywhere in the App.

// })


//Middleware to see how the params are populated by Passport
// let count = 1

// printData = (req, res, next) => {
//     console.log("\n==============================")
//     console.log(`------------>  ${count++}`)

//     console.log(`req.body.username -------> ${req.body.username}`)
//     console.log(`req.body.password -------> ${req.body.password}`)

//     console.log(`\n req.session.passport -------> `)
//     console.log(req.session.passport)

//     console.log(`\n req.user -------> `)
//     console.log(req.user)

//     console.log("\n Session and Cookie")
//     console.log(`req.session.id -------> ${req.session.id}`)
//     console.log(`req.session.cookie -------> `)
//     console.log(req.session.cookie)

//     console.log("===========================================\n")

//     next()
// }

//   app.use(printData) //user printData function as middleware to print populated variables

// function checkAuthentication(req, res, next) {
//     if (req.isAuthenticated()) {
//         //req.isAuthenticated() will return true if user is logged in
//         next();
//     } else {
//         res.send(res);
//     }
// }

//  app.get("/error", (req, res) => {
//     //res.send('<h1> Login </h1><form action="/login" method="POST">USER <input type="text" name="username">PASSWORD <input type="password" name="password"><button type="submit"> Submit </button></form>');
//     //res.send(controller.get());
//     res.send(error);
// })

// app.post("/login", passport.authenticate('local', {
//     successRedirect: "/produzione",
//     failureRedirect: "/error",
//     failureFlash: true,
// }))

app.post("/articoli/magazzino", /* checkAuthentication, */ (req, res) => {
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

app.post("/articoli/produzione", /* checkAuthentication, */ (req, res) => {
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

app.post("/articoli/produci", /* checkAuthentication, */ (req, res) => {
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

app.post("/articoli/raccogli", /* checkAuthentication, */ (req, res) => {
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



app.post("/richiesta/su", /* checkAuthentication, */ (req, res) => {
    let richiesta = req.body.richiesta;
    const start = Date.now();
    controller.upRichiesta(richiesta);
    console.log("Up richiesta. Eseguito in: " + (Date.now() - start) + " millisecondi");
    res.send(controller.get());
})

app.post("/richiesta/down", /* checkAuthentication, */ (req, res) => {
    let richiesta = req.body.richiesta;
    const start = Date.now();
    controller.downRichiesta(richiesta);
    console.log("Down richiesta. Eseguito in: " + (Date.now() - start) + " millisecondi");
    res.send(controller.get());
})

app.post("/richiesta", /* checkAuthentication, */ (req, res) => {
    let richiesta = req.body.richiesta;
    const start = Date.now();
    controller.addRichiesta(richiesta);
    console.log("Aggiunta richiesta. Eseguito in: " + (Date.now() - start) + " millisecondi");
    res.send(controller.get());
})

app.delete("/richiesta", /* checkAuthentication, */ (req, res) => {
    let richiesta = req.body.richiesta;
    const start = Date.now();
    controller.deleteRichiesta(richiesta);
    console.log("Elimina richiesta. Eseguito in: " + (Date.now() - start) + " millisecondi");
    res.send(controller.get());
})

app.patch("/richiesta/necessario", /* checkAuthentication, */ (req, res) => {
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

app.patch("/richiesta/ottenuto", /* checkAuthentication, */ (req, res) => {
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

app.get("/", /* checkAuthentication, */ (req, res) => {
    res.send(controller.get());
})

// app.get('/logout', function (req, res, next) {
//     req.session.destroy(function (err) {
//         res.redirect('/login');
//     });
// });

app.all('*', (req, res) => {
    res.send(controller.get());
})

app.listen(port, () => console.log(`Server started on port ${port}...`))