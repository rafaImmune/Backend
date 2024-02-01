const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const app = express();
const mysql = require('mysql')
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
})


connection.connect((e) => {
    e
        ? console.error("No se ha podido conectar a MySQL")
        : console.log("MySQL conectado")
})




//CRUD


app.get('/carta/:id', (req, res) => {
    connection.query('SELECT * FROM `carta` WHERE id = ? ;', [req.params.id], (err, results) => {
        err
            ? res.send({ mensaje: "No se ha podido realizar la consulta" })
            : results.length > 0
                ? res.send({ mensaje: "Consulta realizada", results })
                : res.send({ mensaje: "Consulta realizada sin resultados", results })
    })
})


app.post('/carta', (req, res) => {
    let { plato, descripcion, precio, disponible } = req.body
    connection.query('INSERT INTO carta (plato, descripcion, precio, disponible) VALUES (?,?,?,?)', [plato, descripcion, precio, disponible], (err, results) => {
        err
            ? res.send({ mensaje: "No se ha podido realizar la consulta" })
            : results.insertId != null
                ? res.send({ mensaje: "Consulta realizada", results })
                : res.send({ mensaje: "No se ha podido insertar en la BBDD", results })
    })
})

app.post('/carta2', (req, res) => {
    connection.query('INSERT INTO carta SET ?', [req.body], (err, results) => {
        err
            ? res.send({ mensaje: "No se ha podido realizar la consulta" })
            : results.insertId != null
                ? res.send({ mensaje: "Consulta realizada", results })
                : res.send({ mensaje: "No se ha podido insertar en la BBDD", results })
    })
})

app.put('/carta/:id', function (req, res) {
    const { plato, descripcion, precio, disponible } = req.body;
    const idRegistro = req.params.id;
    connection.query(
        "UPDATE carta SET plato = ?, descripcion = ?, precio = ?, disponible = ? WHERE id = ?",
        [plato, descripcion, precio, disponible, idRegistro],
     (error, results) => {
            if (error) {
                res.send({ mensaje: 'Error al actualizar datos en la base de datos' });
            } else {
                if(results.changedRows > 0){
                res.send({mensaje: "Documento actualizado", results})
                }else{
                    res.send({mensaje: "No se ha encontrado el documento", results})
                }
            }
        }
    );
});

app.delete('/carta/:id', function (req, res) {
    const idRegistro = req.params.id;
    connection.query(
        "DELETE FROM carta WHERE id = ?",
        [idRegistro],
        (error, results) => {
            if (error) {
                res.send({ mensaje: 'Error al borrar en la base de datos' });
            } else {
                if (results.changedRows > 0) {
                    res.send({ mensaje: "Documento borrado", results })
                } else {
                    res.send({ mensaje: "No se ha encontrado el documento", results })
                }
            }
        }
    );
});



app.listen(PORT, (e) => {
    e
        ? console.error("🔴 Express no conectado")
        : console.log("🟢 Express conectado y a la escucha en el puerto: " + PORT)
})