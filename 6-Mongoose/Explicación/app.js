let express = require('express')
let mongoose = require('mongoose')
let app = express()
let port = process.env.PORT || 3000

let { Autor, Libro } = require('./schemas')
const e = require('express')


mongoose.connect('mongodb://127.0.0.1:27017/prueba')
    .then(console.log('Mongoose conectado'))
    .catch((e) => console.log('Mongoose no conectado: ' + e))



/* let murakamiAutor = new Autor({
    _id: new mongoose.Types.ObjectId(),
    name: {
        firstName: "Haruki",
        lastName: "Murakami",
    },
    biography: "Murakami es un escritor y traductor japonés, autor de novelas, relatos y ensayos",
    twitter: 'https://twitter.com/harukimurakami_',
})


murakamiAutor.save().then(console.log("Murakami añadido")).catch(e=> console.error("No se ha podido añadir a Murakami" + e)) */

/* let Libro1 = new Libro({
    _id: new mongoose.Types.ObjectId(),
    title: '1Q84',
    author: murakamiAutor._id,
    ratings: [{
        summary: 'Novela fantástica escrita por Haruki Murakami, publicada en Japón en tres libros, entre los años 2009 y 2010. Se convirtió rápidamente en best-seller, con un millón de ejemplares vendidos en un mes.',
    },
    ],
})

let Libro2 = new Libro({
    _id: new mongoose.Types.ObjectId(),
    title: 'El fin del mundo y un despiadado país de las maravillas',
    author: murakamiAutor._id,
})


Libro1.save().then(console.log("Libro1 guardado")).catch(e=>console.error("Libro1 no guardado: " + e))

Libro2.save().then(console.log("Libro2 creado")).catch(e=>console.error("Libro2 no añadido: "+ e)) */


app.get('/libros', async (req, res) => {
    try {
        let results = await Libro.find()
        res.send({ mensaje: "Se ha completado la petición", results })
    } catch (error) {
        res.send({ mensaje: "No se ha podido completar la petición", error })
    }
})

app.get('/libros/:id', async (req, res) => {
    try {
        let results = await Libro.findById(req.params.id)
        results.title = "1Q83"
        results.save()
        res.send({ mensaje: "Se ha completado la petición", results })
    } catch (error) {
        res.send({ mensaje: "No se ha podido completar la petición", error })
    }
})

app.put('/libros/:id', async (req, res) => {
    try {
        let results = await Libro.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { 
                new: true, 
            }
        )
        res.send({ mensaje: "Se ha actualizado el documento", results })
    } catch (error) {
        res.send({ mensaje: "No se ha podido completar la petición", error })
    }
})


app.listen(port, (e) =>
    e
        ? console.log("Servidor fallido")
        : console.log("Servidor conectado en el puerto: " + port))