const express = require('express')
const app = express()
const fs = require('fs/promises');

let controller = require('./js/controller.js');

let stato = require('./js/stato.js')

let Articolo = require('./js/articolo.js');

fs.readFile('./json/articoli.json')
    .then((data) => {
        let arts = JSON.parse(data);
        stato.articoli = arts.map((art, i) => {
            let articolo = new Articolo();
            articolo.nome = art.nome;
            articolo.fabbrica = art.fabbrica;
            return articolo;
        });
    })
    .catch((error) => {
        // Do something if error 
    });

fs.readFile('./json/fabbriche.json')
    .then((data) => {
        stato.fabbriche = JSON.parse(data);
    })
    .catch((error) => {
        // Do something if error 
    });

fs.readFile('./json/regole.json')
    .then((data) => {
        stato.regole = JSON.parse(data);
    })
    .catch((error) => {
        // Do something if error 
    });

fs.readFile('./json/deposito.json')
    .then((data) => {
        stato.deposito = JSON.parse(data);
    })
    .catch((error) => {
        // Do something if error 
    });

const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Middleware
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}))

app.use(passport.initialize()) // init passport on every route call
app.use(passport.session())    //allow passport to use "express-session"

authUser = (user, password, done) => {
    console.log(`Value of "User" in authUser function ----> ${user}`)         //passport will populate, user = req.body.username
    console.log(`Value of "Password" in authUser function ----> ${password}`) //passport will popuplate, password = req.body.password

    // Use the "user" and "password" to search the DB and match user/password to authenticate the user
    // 1. If the user not found, done (null, false)
    // 2. If the password does not match, done (null, false)
    // 3. If user found and password match, done (null, user)


    let authenticated_user = undefined//{ id: 123, name: "Kyle"} 
    //Let's assume that DB search that user found and password matched for Kyle
    if (user === "raffaele" && password === "1234") {
        authenticated_user = { id: 1, name: "raffaele" }
        return done(null, authenticated_user)
    }

    return done(null, false)
}


passport.use(new LocalStrategy(authUser))

passport.serializeUser((user, done) => {
    console.log(`--------> Serialize User`)
    console.log(user)

    done(null, user.id)

    // Passport will pass the authenticated_user to serializeUser as "user" 
    // This is the USER object from the done() in auth function
    // Now attach using done (null, user.id) tie this user to the req.session.passport.user = {id: user.id}, 
    // so that it is tied to the session object

})


passport.deserializeUser((id, done) => {
    console.log("---------> Deserialize Id")
    console.log(id)

    done(null, { name: "raffaele", id: 1 })

    // This is the id that is saved in req.session.passport.{ user: "id"} during the serialization
    // use the id to find the user in the DB and get the user object with user details
    // pass the USER object in the done() of the de-serializer
    // this USER object is attached to the "req.user", and can be used anywhere in the App.

})


//Middleware to see how the params are populated by Passport
let count = 1

printData = (req, res, next) => {
    console.log("\n==============================")
    console.log(`------------>  ${count++}`)

    console.log(`req.body.username -------> ${req.body.username}`)
    console.log(`req.body.password -------> ${req.body.password}`)

    console.log(`\n req.session.passport -------> `)
    console.log(req.session.passport)

    console.log(`\n req.user -------> `)
    console.log(req.user)

    console.log("\n Session and Cookie")
    console.log(`req.session.id -------> ${req.session.id}`)
    console.log(`req.session.cookie -------> `)
    console.log(req.session.cookie)

    console.log("===========================================\n")

    next()
}

// app.use(printData) //user printData function as middleware to print populated variables

app.listen(3001, () => console.log(`Server started on port 3001...`))

app.get("/login", (req, res) => {
    res.send('<h1> Login </h1><form action="/login" method="POST">USER <input type="text" name="username">PASSWORD <input type="password" name="password"><button type="submit"> Submit </button></form>');
})

app.post("/login", passport.authenticate('local', {
    successRedirect: "/stato",
    failureRedirect: "/login",
}))

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else {
        res.redirect("/login");
    }
}

app.post("/articoli/produzione", checkAuthentication, (req, res) => {
    let nome = req.body.articolo;
    let inc = Number(req.body.incremento);
    controller.incProduzione(nome, inc, stato);
    res.send(stato);
})

app.post("/articoli/magazzino", checkAuthentication, (req, res) => {
    let nome = req.body.articolo;
    let inc = Number(req.body.incremento);
    controller.incMagazzino(nome, inc, stato);
    res.send(stato);
})

app.get("/richieste", checkAuthentication, (req, res) => {
    res.send(stato.tree);
})

app.post("/richieste", checkAuthentication, (req, res) => {
    let nome = req.body.nome;
    controller.addRichiesta(nome, stato);
    res.send(stato);
})

app.delete("/richieste", checkAuthentication, (req, res) => {
    let nome = req.body.nome;
    controller.deleteRichiesta(nome, stato);
    res.send(stato);
})

app.patch("/richieste/necessari", checkAuthentication, (req, res) => {
    let nome = req.body.nome;
    let inc = req.body.incremento;
    let nec = req.body.necessario;
    controller.incNecessario(nome, nec, inc, stato);
    res.send(stato);
})

app.patch("/richieste/ottenuti", checkAuthentication, (req, res) => {
    let nome = req.body.nome;
    let inc = req.body.incremento;
    let ott = req.body.ottenuto;
    controller.incOttenuto(nome, ott, inc, stato);
    res.send(stato);
})

app.get("/stato", checkAuthentication, (req, res) => {
    res.send(stato);
})

app.get('/logout', function (req, res, next) {
    req.session.destroy(function (err) {
        res.redirect('/login'); //Inside a callback… bulletproof!
    });
});

app.all('*', (req, res) => {
    res.redirect('/stato');
})

/*
 richiesta di modifica di un articolo
    --> modifica alrticolo
    --> raccoglibile
    --> producibile
    --> assegna
    --> da produrre
    --> da raccogliere
    --> richiesti 
    --> vista ad albero 
    --> code 
    --> json
    --> invio risposta

 richiesta di modifica di una richiesta 
    --> modifica richiesta 
    --> albero
    --> assegna 
    --> da produrre 
    --> da raccogliere 
    --> richiesti 
    --> vista ad albero 
    --> code 
    --> json
    --> invio risposta

 richiesta di modifica del deposito 
    --> raccogliere 
    --> vista al albero 
    --> json
    --> invio risposta
 */