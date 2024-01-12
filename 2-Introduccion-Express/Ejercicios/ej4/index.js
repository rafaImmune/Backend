let express = require('express')
let funcion = require('./function')

let app = express()

app.get('/saludar/:nombre', function(req,res){
    res.send(funcion(req.params.nombre))
})



app.listen(process.env.PORT || 3000, (e)=>{
    e
    ? console.error("MEEEEEC")
    : console.log("Tutto benee en el puerto: " + (process.env.PORT || 3000))
})