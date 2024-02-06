const express = require('express')
const router = express.Router()
const gestion = require('./gestion/gestion')

router.use('/gestion', gestion)


router.get('/:titulo', async (req, res)=>{
    try {
        let results = await req.app.locals.db.collection('libros').find({ titulo: req.params.titulo }).toArray()
        results.length > 0
        ? res.send({mensaje: "Libro encontrado", results})
        : res.send({mensaej: "Libro no encontrado"})
    } catch (error) {
        res.send({mensaje: "Petición no resuelta"})
    }
    req.app.locals.db.collection('libros').find({titulo: req.params.titulo}).toArray()
    res.send("Hola desde libros pelados")
})

router.get('/buscar', (req, res)=>{
    res.send("Hola desde buscar")
})

module.exports = router