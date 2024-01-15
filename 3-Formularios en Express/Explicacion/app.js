let express = require('express')

let app = express()

app.use(express.static('public'))



app.get('/saludo', function(req, res){
    res.send('Hola ' + req.query.nombre + ' ' + req.query.apellido)
})


app.listen(process.env.PORT || 3000, (e)=>{
    e
    ? console.error("Servidor fallido")
    : console.log('Servidor a la escucha en el puerto: ' + (process.env.PORT || 3000))
})