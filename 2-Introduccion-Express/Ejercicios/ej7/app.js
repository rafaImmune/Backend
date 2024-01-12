let express = require('express')
let aleatorio = require('./function')
let array = require('./array')

let app = express()

app.get('/jaja', function(req,res){
    let random = aleatorio()
    array[random] ++
    
    res.send(array)
})

// Ej 8

app.get('/borrar/:indice', function(req,res){
    if (req.params.indice < array.length){
    array[req.params.indice] = 0
    res.send(array)
    }else{
    res.send("El indice indicado no está en el array")
    }
})



app.listen(process.env.PORT || 3000, (e) => {
    e
        ? console.error("MEEEEEC")
        : console.log("Tutto benee en el puerto: " + (process.env.PORT || 3000))
})