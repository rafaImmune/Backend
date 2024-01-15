let express = require('express')
let app = express()

app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.get('/hola', function(req, res){
    res.send('Hola!')
})

app.post('/hola', function(req, res){
    res.send(`Hola ${req.body.nombre} desde el POST!`)
})

app.put('/hola', function (req, res) {
    console.log(req.body)
    res.send(`Hola ${req.body.nombre} desde el PUT!`)
})



app.delete('/hola', function (req, res) {
    res.send(`Hola ${req.body.nombre} desde el DELETE!`)
})

app.listen(process.env.PORT || 3000, (e) => {
    e
        ? console.error("Nos se ha podido conectar el servidor")
        : console.log("Servidor conectado y a la escucha en el puerto: " + (process.env.PORT || 3000))
})