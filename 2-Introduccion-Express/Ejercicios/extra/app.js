let express = require('express')
let almacen = require('./almacen')

let app = express()

app.get('/departamento/:departamento', function (req, res) {
    res.send(printStock(req.params.departamento))
})

app.get('/departamento/carniceria', function (req, res) {
    let tabla = ""
    almacen[0].productos.forEach((producto) => tabla += `<tr><td>${producto.nombre}</td><td>${producto.precio}</td><td>${producto.stock}</td></tr>`)
    res.send(`
        <h2>${almacen[0].nombre}</h2>
        <table>
            <tr>
                <th>nombre</th>
                <th>precio</th>
                <th>stock</th>
            </tr>
            ${tabla}
        </table>
    `)

})



function printStock(dept) {
    let tabla = ""
    let indice = almacen.findIndex(e => e.nombre === dept)
    console.log(indice)
    if (indice >= 0) {
        almacen[indice].productos.forEach((producto) => tabla += `<tr><td>${producto.nombre}</td><td>${producto.precio}</td><td>${producto.stock}</td></tr>`)
        return `<h2>${almacen[indice].nombre}</h2><table><tr><th>nombre</th><th>precio</th><th>stock</th></tr>${tabla}</table>`
    } else {
        return `El departamento ${dept} no existe en nuestra tienda`
    }
}



app.listen(process.env.PORT || 3000, (e) => {
    e
        ? console.error("MEEEEEC")
        : console.log("Tutto benee en el puerto: " + (process.env.PORT || 3000))
})