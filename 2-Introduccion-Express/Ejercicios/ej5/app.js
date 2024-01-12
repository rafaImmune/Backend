let express = require('express')

let app = express()

let persona = {
    nombre: "",
    apellidos: "", 
    edad: 0
}

app.get('/nombre/:nombre', function(req, res){
    persona.nombre = req.params.nombre
    res.send(persona)

})

app.get('/apellidos/:apellidos', function(req, res){
    persona.apellidos = req.params.apellidos
    res.send(persona)

})

app.get('/edad/:edad', function(req, res){
    persona.edad = req.params.edad
    res.send(persona)

})




app.listen(process.env.PORT || 3000, (e)=>{
    e
    ? console.error("MEEEEEC")
    : console.log("Tutto benee en el puerto: " + (process.env.PORT || 3000))
})