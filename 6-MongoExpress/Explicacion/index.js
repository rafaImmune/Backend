const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(async (req, res, next) => {
    await connectToMongo();
    next();
});


async function connectToMongo() {
    let client = new MongoClient('mongodb://localhost:27017');
    try {
        await client.connect().then((client)=>app.locals.db=client.db('prueba'))
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error al conectar MongoDB:', error);
    }
}


app.get('/naves', async (req, res) => {
    try {
        const results = await app.locals.db.collection('naves').find({}).toArray();
        res.send({mensaje: "todo way", results});

    } catch (error) {
        console.error('Error fetching ships:', error);
        res.status(500).send('Internal Server Error');
    }
});



app.post('/anyadir', async (req, res)=>{
    try {
        let {planeta, distanciaRecorrida} = req.body

        const results = await app.locals.db.collection('naves').insertOne({planeta, distanciaRecorrida})
        res.send({mensaje: "que sea lo que el señor quiera", results})
        
    } catch (error) {
        console.error('Error en la petición')
        res.status(500).send('Internal Server Error')
    }
})

app.put('/modificar', async(req,res)=>{
    try {
        let {planeta, distanciaRecorrida} = req.body
        const results = await app.locals.db.collection('naves').updateOne({planeta: planeta},{$set: {distanciaRecorrida: distanciaRecorrida}})
        res.send({mensaje: "actualizado", results})        
    } catch (error) {
        console.error('Error en la peticion')
        res.status(500).send('Internal Server Error')
    }
})

app.delete('/borrar', async(req,res)=>{
    try {
        let { planeta } = req.body
        const results = await app.locals.db.collection('naves').deleteOne({ planeta: planeta })
        res.send({ mensaje: "borrado", results })        
        
    } catch (error) {
        console.error('Error en la peticion')
        res.status(500).send('Internal Server Error')
    }
})

app.listen(PORT, (e) => {
    e
        ? console.error("Nos se ha podido conectar el servidor")
        : console.log("Servidor conectado y a la escucha en el puerto: " + PORT)
})