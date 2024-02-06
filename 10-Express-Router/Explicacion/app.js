const express = require('express');
const app = express();
const libros = require('./routes/libros')
let {MongoClient} = require('mongodb')
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const client = new MongoClient('mongodb://127.0.0.1:27017')

async function connectMongo() {
    try {
        await client.connect().then((client) => app.locals.db = client.db('prueba'));
        await client.db("admin").command({ ping: 1 });
        console.log("🟢 MongoDB está conectado");
    } catch (error) {
        console.error("🔴 MongoDB no conectado:", error);
    }
}

connectMongo()

app.use('/libros', libros)


app.get('/televisiones', function (req, res) {
    res.send("Televisiones");
});

app.get('/ordenadores', function (req, res) {
    res.send("Ordenadores");
});

app.get('/sillas', function (req, res) {
    res.send("Sillas");
});  

app.listen(PORT, (e) => {
    e
        ? console.error("🔴 Express no conectado")
        : console.log("🟢 Express conectado y a la escucha en el puerto: " + PORT)
})