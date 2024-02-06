const express = require('express')
const router = express.Router()

router.get('/alta', (req, res) => {
    res.send("Hola alta de gestion de libros")
})


module.exports = router