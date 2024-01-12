let express = require('express')
let app = express()

let nombres = ["Antonio","Esther","Maria","Gloria","Marina"]

app.get('/persona', function(req,res){
    res.send(nombres.join())
})

app.get('/persona/:nombre', function(req,res){
    let {nombre} = req.params
    let index = nombres.findIndex((e) => e === nombre)

    res.send({
        result: nombres[index]
    })
})


app.listen(process.env.PORT || 3000, (e)=>{
    e
    ? console.error('No se ha podido iniciar el servidor')
    : console.log('Servidor a la escucha en el puerto:' + (process.env.PORT || 3000))

} )