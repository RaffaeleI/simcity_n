const express = require('express')
const app = express()
//const port = 3000
const fs = require('fs/promises');

let articoli = undefined;
let fabbriche = undefined;
let richieste = [];
let code = {};

fs.readFile('./articoli.json')
    .then((data) => {
        let arts = JSON.parse(data);
        articoli = arts.map((art, i) => {
            return {
                nome: art.nome,
                fabbrica: art.fabbrica,
                regola: art.regola,
                inMagazzino: 0,
                inProduzione: 0,
                rechiesti: 0,
                producibile: false,
                raccoglibile: false,
                daProdurre: false,
                daRaccogliere: false
            }
        });
    })
    .catch((error) => {
        // Do something if error 
    });

fs.readFile('./fabbriche.json')
    .then((data) => {
        fabbriche = JSON.parse(data);
    })
    .catch((error) => {
        // Do something if error 
    });
/*
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/articoli', (req, res) => {
    res.send(JSON.stringify(articoli));
})

app.get('/fabbriche', (req, res) => {
    res.send(JSON.stringify(fabbriche));
})

app.get('/richieste', (req, res) => {
    res.send(JSON.stringify(richieste));
})

app.post('/', function (req, res) {
    res.send('Got a POST request');
});

app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user');
});

app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user');
});

app.listen(port, () => {
    console.log(`Controller listening on port ${port}`)
}) */

//const express = require('express')
//const app = express()

const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

app.use(express.urlencoded({extended: false}))

//Middleware
app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
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
if(user === "raffaele" && password === "1234"){
    authenticated_user = { id: 1, name: "raffaele"}
    return done (null, authenticated_user )
}
    
    return done (null, false ) 
}


passport.use(new LocalStrategy (authUser))

passport.serializeUser( (user, done) => { 
    console.log(`--------> Serialize User`)
    console.log(user)     

    done(null, user.id)
  
// Passport will pass the authenticated_user to serializeUser as "user" 
// This is the USER object from the done() in auth function
// Now attach using done (null, user.id) tie this user to the req.session.passport.user = {id: user.id}, 
// so that it is tied to the session object

} )


passport.deserializeUser((id, done) => {
        console.log("---------> Deserialize Id")
        console.log(id)

        done (null, {name: "raffaele", id: 1} )      
  
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

app.use(printData) //user printData function as middleware to print populated variables

app.listen(3001, () => console.log(`Server started on port 3001...`))

app.get("/login", (req, res) => {
    res.send('<h1> Login </h1><form action="/login" method="POST">USER <input type="text" name="username">PASSWORD <input type="password" name="password"><button type="submit"> Submit </button></form>');
})

app.post ("/login", passport.authenticate('local', {
    successRedirect: "/articoli",
    failureRedirect: "/login",
}))

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.redirect("/login");
    }
}

app.get("/articoli", checkAuthentication, (req, res) => {   
    //res.send("<h1> " + req.user.name + " is logged in </h1>");
    res.send(articoli);
})

app.get("/fabbriche", checkAuthentication, (req, res) => {   
    //res.send("<h1> " + req.user.name + " is logged in </h1>");
    res.send(fabbriche);
})

app.get("/richieste", checkAuthentication, (req, res) => {   
    //res.send("<h1> " + req.user.name + " is logged in </h1>");
    res.send(richieste);
})

app.get("/code", checkAuthentication, (req, res) => {   
    //res.send("<h1> " + req.user.name + " is logged in </h1>");
    res.send(code);
})

app.get('/logout', function(req, res, next){
    req.session.destroy(function (err) {
        res.redirect('/login'); //Inside a callback… bulletproof!
      });
    //res.redirect('/login')
  });

app.all('*', (req, res) => {
    res.redirect('/articoli');
})

/*
 richiesta di modifica di un articolo
    --> modifica alrticolo
    --> producibile
    --> raccoglibile
    --> assegna
    --> da produrre
    --> da raccogliere -
    -> richiesti 
    --> vista ad albero 
    --> code 
    --> json
    --> invio risposta

 richiesta di modifica di una richiesta 
    --> modifica richiesta 
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