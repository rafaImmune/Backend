const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors')
const bcrypt = require('bcrypt')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(loggin)

const corsOptions = {
    methods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
}

app.use(cors())

//CRUD

let contrasenyaCifrada = bcrypt.hashSync('Pepito35', 10)
console.log("contraseña cifrada: ", contrasenyaCifrada)

console.log('Match de Hashes:', bcrypt.compareSync('Pepito35', contrasenyaCifrada))

app.get("/", function (req, res) {
    res.json("Hola desde /");
});

app.put('/', (req, res) => {
    res.json("hola desde el PUT")
})

app.get("/saludo", function (req, res) {
    res.send("hola desde /saludo");
});

app.post('/registro', async (req, res) => {
    try {
        let contraseinaCifrada = bcrypt.hashSync(req.body.password, 10)
        let result = await app.locals.db.collection('users')
            .insertOne({
                username: req.body.username,
                password: contraseinaCifrada
            })
        res.send({ mensaje: "Usuario registrado correctamente", result })
    } catch (error) {
        res.send({ mensaje: "Error al registrar al usuario", error })
    }
})

app.post('/login', async (req, res) => {
    try {
        let result = await app.locals.db.collection('users')
            .find({ username: req.body.username })
        if (result.length > 0) {
            bcrypt.compareSync(req.body.password, result[0].password)
                ? res.send({ mensaje: 'Logueado correctamente' })
                : res.send({ mensaje: 'Contraseña incorrecta' })
        } else {
            res.send({ mensaej: 'El Usuario no existe' })
        }
    } catch (error) {
        res.send({ mensaje: "Error al registrar al usuario", error })
    }
})

function loggin(req, res, next) {
    console.log(req.ip, req.originalUrl);
    next()
}



app.listen(PORT, (e) => {
    e
        ? console.error("🔴 Express no conectado")
        : console.log("🟢 Express conectado y a la escucha en el puerto: " + PORT)
})