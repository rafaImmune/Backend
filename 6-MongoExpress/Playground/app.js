let express = require('express')
let app = express()

let PORT = process.env.PORT || 3000

let { MongoClient, ObjectId } = require('mongodb')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const client = new MongoClient('mongodb://127.0.0.1:27017')

async function connectMongo() {
    try {
        await client.connect().then((client) => app.locals.db = client.db('prueba'))
        console.log('🟢 MongoDB conectado')
    } catch (error) {
        console.error('🔴 MongoDB no conectado')
    }
}

connectMongo()

// Catálogo 

app.get('/catalogo', async (req, res) => {
    try {
        let results = await app.locals.db.collection('tienda').find().toArray()
        res.status(200).send({ mensaje: "Petición correcta", results })
    } catch (error) {
        res.status(500).send({mensaje: "Petición no resuelta"})
    }

})

// Insertar producto

app.post('/anyadir', async(req, res)=>{
    try {
        let {talla, stock, precio, color, marca, tipo} = req.body
      let results = await app.locals.db.collection('tienda').insertOne({color, stock, precio, marca, tipo, talla})  
      res.status(200).send({mensaje: "Producto insertado", results})
    } catch (error) {
        res.status(500).send({mensaje: "Error interno del servidor"})
    }
})

// Actualizar producto

app.put('/modificar', async (req, res)=>{
    try {
        let { talla, stock, precio, color, marca, tipo } = req.body
        let results = await app.locals.db.collection('tienda')
        .updateOne({_id: new ObjectId(req.body._id)},{ $set: {color, stock, precio, marca, tipo, talla} })
        res.status(200).send({ mensaje: "Producto modificado", results })
    } catch (error) {
        res.status(500).send({mensaje: "Error al modificar"})
    }
})

// Borrar product
app.delete('/borrar', async (req, res) => {
    try {
        let results = await app.locals.db.collection('tienda')
            .deleteOne({ _id: new ObjectId(req.body._id) })
        res.status(200).send({ mensaje: "Producto borrado", results })
    } catch (error) {
        res.status(500).send({ mensaje: "Error al borrar" })
    }
})

// Checkout - Realiza la modificación del stock de varios productos al mismo tiempo por sus _id's ( Genera un array de promesas )

app.put('/checkout', async (req, res) => {
    try {
        const updatePromises = req.body.map(async (update) =>{
            let filter = { _id: new ObjectId(update._id)}
            let orden = { $set: {stock: update.stock}}
            return app.locals.db.collection('tienda').updateOne(filter, orden)
        })
         const results = await Promise.all(updatePromises)
         res.status(200).send({mensaje: "Stock actualizado", results})

    } catch (error) {
        res.status(500).send({ mensaje: "Error al modificar" })
    }
})



app.listen(PORT, (e) => {
    e
        ? console.error('🔴 Error al conectar Express')
        : console.log('🟢 Express conectado y a la escucha en el puerto: ' + PORT)
})

