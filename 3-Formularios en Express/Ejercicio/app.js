let express = require('express')
let app = express()
let animales = require('./animales')

app.use(express.static('public'))

app.get('/lista', function(req,res){
    res.send(animalPrint("Lista de animales",animales))
})

app.get('/sumar-animal', function(req,res){
    let {nombre, tipo, edad} = req.query
    edad = parseInt(edad)

    animales.push({nombre,tipo, edad})

    res.send({mensaje: `${nombre} añadido`, results: animales})
})



app.get('/adoptar', function(req,res){

    animales = animales.filter((animal) => animal.nombre != req.query.nombre)

    res.send(animalPrint(`Animal adoptado`,animales))
})


function animalPrint(msg,animales){
    let salida = ""
    for (let i = 0; i <animales.length; i++) {
        salida += ` 
        <tr>
            <td>${animales[i].nombre}</td>
            <td>${animales[i].tipo}</td>
            <td>${animales[i].edad}</td>
            <td> 
               <form action="/adoptar">
                <input type="text" hidden name="nombre" value="${animales[i].nombre}" id="nombre">
                <button type="submit">Enviar</button>
                </form>
            </td>
        </tr>`    
    }

    return `
            <h3>${msg}</h3>
            <table>
            <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Edad</th>
            </tr>
            ${salida}
        </table>`
}





app.listen(process.env.PORT || 3000 , (e) =>{
    e
    ? console.error("Nos se ha podido conectar el servidor")
    : console.log("Servidor conectado y a la escucha en el puerto: " + (process.env.PORT || 3000))
})