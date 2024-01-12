let express = require('express')

let app = express()

let genteDeBien = ['Antonio', 'Ester', 'Maria', 'Nuria', 'Gloria', 'Marina', 'Mildry', 'Victor', 'Santiago', 'Sergialys', 'Alexander', 'Carlos']

app.get('/anyadir/:nombre', function(req,res){

    genteDeBien.push(req.params.nombre)

    res.send(genteDeBien)
})



app.listen(process.env.PORT || 3000, (e)=>{
    e
    ? console.error("MEEEEEC")
    : console.log("Tutto benee en el puerto: " + (process.env.PORT || 3000))
})