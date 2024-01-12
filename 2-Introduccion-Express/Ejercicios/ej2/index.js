let express = require('express')
let app = express()


app.get('/numero/:numero', function(req, res){
    
    res.send(aleatorio(req.params.numero).toString())
})


function aleatorio(num){
    return Math.floor(Math.random() * num ) + 1
}


app.listen(process.env.PORT || 3000, (e)=>{
    e
    ? console.error('No se ha podido iniciar el servidor')
    : console.log('Servidor a la escucha en el puerto:' + (process.env.PORT || 3000))

} )