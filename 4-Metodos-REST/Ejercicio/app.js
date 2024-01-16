let express = require('express')
let app = express()

let personas = require('./personas')
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(express.static('public'))

app.get('/personas', function(req,res){
    res.send(personas)
})

app.post('/sumar', function(req, res){
    let {nombre, apellido, edad} = req.body
    personas.push({nombre, apellido, edad})
    res.send(personas)
})

app.put('/modificar', function(req,res){
    let index = personas.findIndex((persona) => persona.nombre === req.body.nombre)

    if(index <0 ){
         res.send("El nombre" + req.body.nombre + " no existe en nuestra BBDD")
    }else{
        personas[index].apellido = req.body.apellido
        personas[index].edad = req.body.edad

        res.send(`${req.body.nombre} ha sido modificado correctamente.`)
    }

})

app.delete('/borrar', function (req, res) {
    let index = personas.findIndex((persona) => persona.nombre === req.body.nombre)

    if (index < 0) {
        res.send("El nombre" + req.body.nombre + " no existe en nuestra BBDD")
    } else {
        personas.splice(index, 1)

        res.send(`${req.body.nombre} ha sido borrado correctamente.`)
    }

})


app.listen(  process.env.PORT || 3000, (e)=>{
    e
    ? console.error('Imposible poner el servidor a la escucha.')
    : console.log('Servidor a la escucha en el puerto: ' + (process.env.PORT || 3000))
})