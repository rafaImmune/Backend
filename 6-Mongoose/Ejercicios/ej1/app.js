const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose')
const {Artista, Disco} = require('./schemas')

mongoose.connect('mongodb://127.0.0.1:27017/prueba')
.then(console.log('MongoDB conectado'))
.catch(e => console.error('MongoDB No conectado: ' + e))



app.use(express.urlencoded({ extended: false }))
app.use(express.json())



// Rutas Disco

app.get('/discos', async (req, res)=>{
    try {
        let results = await Disco.find({stock: {$gt: 0}})
        results
        ? res.send({mensaje: "Petición satisfecha.", results})
        : res.send({mensaje: "La petición no ha devuelto resultados", results})
    } catch (error) {
        res.send({mensaje: "No se ha podido realizar la petición: " + error})
    }
})

app.get('/disco/:idOTitulo', async (req, res) =>{
    console.log(req.params.idOTitulo)
    try {
        let results = await Disco.find({$or: [
            {_id: req.params.idOTitulo},
            {titulo: req.params.idOTitulo}
        ]}).populate('artista')

        results
        ? res.send({mensaje: "Petición satisfecha", results})
        : res.send({mensaje: "La petición no ha devuelto resultados", results})

    } catch (error) {
        res.send({ mensaje: "No se ha podido realizar la petición: " + error })
    }
})

 app.post('/disco', async (req, res)=>{
    try {
        const results = await Disco.create(req.body)
        results
        ? res.send({mensaje: "Disco insertado", results})
        : res.send({mensaje: "No se ha podido insertar el Disco", results})
        
    } catch (error) {
        res.send({ mensaje: "No se ha podido realizar la petición: " + error })
    }
 })

 app.put('/disco/:id', async (req,res)=>{
    try {
        const results = await Disco.findByIdAndUpdate(req.params.id, req.body, {new: true})
        results 
        ? res.send({mensaje: "Disco actualizado", results})
        : res.send({mensaje: "El disco no ha podido encontrarse", results})
    } catch (error) {
        res.send({ mensaje: "No se ha podido realizar la petición: " + error })
    }
 }, )

app.delete('/disco/:id', async (req, res) => {
    try {
        const results = await Disco.findByIdAndDelete(req.params.id)
        results
            ? res.send({ mensaje: "Disco borrado", results })
            : res.send({ mensaje: "El disco no ha podido borrarse", results })
    } catch (error) {
        res.send({ mensaje: "No se ha podido realizar la petición: " + error })
    }
},)

 // Rutas Artista

app.post('/artista', async (req, res) => {
    try {
        let {nombre, genero, fechaDeNacimiento, nacionalidad, nombreArtistico} = req.body
        const results = await Artista.create({ nombre, genero, fechaDeNacimiento, nacionalidad, nombreArtistico })
        results
            ? res.send({ mensaje: "Artista insertado", results })
            : res.send({ mensaje: "No se ha podido insertar el Artista", results })

    } catch (error) {
        res.send({ mensaje: "No se ha podido realizar la petición: " + error })
    }
})

app.put('/artista/:id', async (req, res) => {
    try {
        const results = await Artista.findByIdAndUpdate(req.params.id, req.body, { new: true })
        results
            ? res.send({ mensaje: "Artista actualizado", results })
            : res.send({ mensaje: "El artista no ha podido encontrarse", results })
    } catch (error) {
        res.send({ mensaje: "No se ha podido realizar la petición: " + error })
    }
},)

app.delete('/artista/:id', async (req, res) => {
    try {
        const results = await Artista.findByIdAndDelete(req.params.id)
        results
            ? res.send({ mensaje: "Artista borrado", results })
            : res.send({ mensaje: "El artista no ha podido borrarse", results })
    } catch (error) {
        res.send({ mensaje: "No se ha podido realizar la petición: " + error })
    }
},)





app.listen(PORT, (e) => {
    e
        ? console.error("🔴 Express no conectado")
        : console.log("🟢 Express conectado y a la escucha en el puerto: " + PORT)
})