let express = require('express')
let almacen = require('./almacen')

let app = express()

let cesta = []

app.get('/departamento/:departamento', function (req, res) {
    res.send(printStock(req.params.departamento))
})

app.get('/comprar/departamento/:departamento/producto/:producto/cantidad/:cantidad', function(req, res){
    let {departamento, producto, cantidad} = req.params

    let indiceDepartamento = almacen.findIndex(d => d.nombre === departamento)

    if (indiceDepartamento < 0) {
        res.send('El departamento ' + departamento + ' no existe.')
        return
    }

    let indiceProducto = almacen[indiceDepartamento].productos.findIndex(p => p.nombre === producto)

    if (indiceProducto < 0) {
        res.send('El producto ' + producto + ' no existe.')
        return
    }

    if (almacen[indiceDepartamento].productos[indiceProducto].stock < cantidad){
         res.send('No tenemos stock suficiente de ' + producto + ' disponible')
        return
    }
    
    let importe = cantidad * almacen[indiceDepartamento].productos[indiceProducto].precio
    cesta.push({departamento, producto, cantidad, importe})
    almacen[indiceDepartamento].productos[indiceProducto].stock -= cantidad

    res.send(cesta)
    






})

app.get('/cesta', function(req,res){
    res.send(cesta)
})

app.get('/checkout', function(req, res){
    let total = 0
    cesta.forEach(p => total += p.importe)
    cesta = []
    res.send({total, mensaje: "Compra realizada. Gracias por comprar en supermercados Manoli"})
})



/* app.get('/departamento/carniceria', function (req, res) {
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

}) */



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