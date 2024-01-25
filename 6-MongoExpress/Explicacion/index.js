const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }))
app.use(express.json())



// Logeo de peticiones y respuestas 
app.use((req, res, next) => {
    console.log('↘️  Petición recibida')
    next()
}
)
function respuesta(mensaje) {
    console.log('↗️  Respuesta enviada: ' + mensaje)

}



// Instanciamos el cliente
const client = new MongoClient('mongodb://127.0.0.1:27017'); //en macOS localhost puede no redirigir al 127.0.0.1

// Creamos la conexión a la base de datos y la almacenamos en el app.locals
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


//CRUD

app.get('/buscar', async (req, res) => {
    try {
        const results = await app.locals.db.collection('naves').find().toArray();
        respuesta("Documentos encontrados: " + results.length)
        res.send({ mensaje: "Documentos encontrados: " + results.length, results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al hacer la consulta', error });
    }
});

app.post('/anyadir', async (req, res) => {
    try {
        let { planeta, distanciaRecorrida } = req.body
        const results = await app.locals.db.collection('naves').insertOne({ planeta, distanciaRecorrida })
        respuesta("Documento insertado: " + results.insertedId)
        res.send({ mensaje: "Documento insertado: " + results.insertedId, results })

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al hacer la inserción', error });
    }
})

app.put('/modificar', async (req, res) => {
    try {
        let { planeta, distanciaRecorrida } = req.body
        const results = await app.locals.db.collection('naves').updateOne({ planeta: planeta }, { $set: { distanciaRecorrida: distanciaRecorrida } })
        respuesta("Documento modificado: " + results.modifiedCount)
        res.send({ mensaje: "Documento modificado: " + results.modifiedCount, results })

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al hacer la modificación', error });
    }
})

app.delete('/borrar', async (req, res) => {
    try {
        let { planeta } = req.body
        const results = await app.locals.db.collection('naves').deleteOne({ planeta: planeta })
        respuesta("Documento borrado: " + results.deletedCount)
        res.send({ mensaje: "Documento borrado: " + results.deletedCount, results })

    } catch (error) {
        console.error('Error en la peticion')
        res.status(500).send('Internal Server Error')
    }
})



app.listen(PORT, (e) => {
    e
        ? console.error("🔴 Express no conectado")
        : console.log("🟢 Express conectado y a la escucha en el puerto: " + PORT)
})