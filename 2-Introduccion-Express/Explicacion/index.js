const express = require('express')

const app = express()

app.get('/', function(req, res){
    res.send('<h1>hola caracola</h1>')
})

app.get('/despedida', function(req,res){
    res.send('<h1>ADIOS CARACOLA</h1>')
})

app.get('/datos', function(req,res){
    res.send({
        results:[
            {nombre: "Macarena"},
            {nombre: "Paco"},
            {nombre: "Lucía"}
        ]
    })
})

app.get('/persona/:nombre/apellido/:apellido', function(req,res){
    let nombre = req.params.nombre
    let apellido = req.params.apellido || "generico"
    res.send('Hola ' + nombre + ' ' + apellido)
})



app.listen(process.env.PORT || 3000, (e)=> {
    e
    ? console.log("Servidor no conectado")
    : console.log("Servidor a la escucha en el puerto: " + (process.env.PORT || 3000))
})