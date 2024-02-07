const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const mongodb = require("mongodb");
const MongoStore = require("connect-mongo");

const app = express();
const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 3001;

const secreto = "patata";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);


app.use(
    session({
        secret: secreto,
        resave: false, // No se guarda sesión nueva si no hay cambios
        saveUninitialized: false, //Evita crear sesiones vacías
        store: MongoStore.create({
            //Nos guarda las sesiones en la colección "sesiones" en la base de datos "prueba"
            mongoUrl: "mongodb://127.0.0.1:27017",
            dbName: "prueba",
            collectionName: "sesiones",
            ttl: 1000 * 60 * 60 * 24, //Time To Live de las sesiones
            autoRemove: "native", //Utiliza el registro TTL de Mongo para ir borrando las sesiones caducadas.
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, //Caducidad de la cookie en el navegador del cliente.
        },
    })
);

const client = new MongoClient('mongodb://127.0.0.1:27017')

async function connectMongo() {
    try {
        await client.connect()
            .then((client) => app.locals.db = client.db('prueba'))
        console.log("🟢 MongoDB está conectado")
    } catch (error) {
        console.error("🔴 MongoDB no conectado:", error)
    }
}

connectMongo()

app.use(cookieParser(secreto));
app.use(passport.initialize());
app.use(passport.session());


passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async function (email, password, done) {
            try {
                let user = await app.locals.db.collection('users')
                    .findOne({ email: email })
                if (!user) {
                    console.log('Usuario no encontrado')
                    return done(null, false);
                }
                if (!validoPass( //Aún no hemos visto como funcia validoPass
                    password,
                    user.password.hash,
                    user.password.salt
                )) {
                    console.log('Contraseña incorrecta')
                    return done(null, false);
                }
                console.log("Login correcto")
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    try {
        let usuario = app.locals.db.collection('users')
            .findOne({ email: user.email, })
        if (!usuario) {
            return done(null, null)
        } else {
            done(null, user)
        }
    } catch (error) {
        return done(err);
    }
});

app.post("/signup", async (req, res) => {
    try {
        let user = await app.locals.db.collection('users')
            .find({ email: req.body.email }).toArray()
        if (user.length > 0) {
            res.send({ error: true, contendio: "Credenciales no validas" })
        } else {
            let passwordCrypt = creaPass(req.body.password);
            let result = await app.locals.db.collection('users')
                .insertOne({
                    email: req.body.email,
                    password: passwordCrypt
                })
            res.send({ error: false, contendio: result })
        }
    } catch (error) {
        res.send({ error: true, contenido: error });
    }
});


app.post("/login",
    passport.authenticate("local", { failureRedirect: "/fail" })
    , (req, res) => {
        res.redirect('/welcome')
    }
);

app.all("/welcome", (req, res) => {
    res.send({
        logged: true,
        mensaje: 'Login correcto',
    });
});

app.all("/fail", (req, res) => {
    res.send({
        logged: false,
        mensaje: 'Login Fallido',
    });
});

app.post("/logout", (req, res) => {
    req.logout(() => {
        res.send({
            logged: false,
            mensaje: "Logout correcto",
        });
    });
});





app.get("/perfil", (req, res) => {
    req.isAuthenticated()
        ?res.send({
            logged: true,
            mensaje: "Todo correcto: Esto es información confidencial",
            user: req.user,
        })
        : res.send({
            looged: false,
            mensaje: "Necesitas loguearte",
            user: req.user
        });
});




function creaPass(password) {
    let semilla = crypto.randomBytes(32).toString("hex");
    let genHash = crypto
        .pbkdf2Sync(password, semilla, 10000, 64, "sha512")
        .toString("hex");
    return {
        salt: semilla,
        hash: genHash,
    };
}

function validoPass(password, hash, salt) {
    let hashVerify = crypto
        .pbkdf2Sync(password, salt, 10000, 64, "sha512")
        .toString("hex");
    return hashVerify === hash;
}





app.listen(port, (err) => {
    err
        ? console.error("🔴 Servidor fallido")
        : console.log("🟢 Servidor a la escucha en el puerto:" + port);
});