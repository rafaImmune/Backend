const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const fileUpload = require('express-fileupload')
const fs = require('fs')


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(fileUpload({ createParentPath: true, safeFileNames: true, preserveExtension: true }))
app.use(express.static('public'))
app.use('/foto', express.static('archivos') )



app.post('/subir', (req, res) => {

    if (!req.files) {
        res.send({ mensaje: "No hay archivo en la petición" })
    } else {
        let file = req.files.archivo
        console.log(req.files.archivo.name)

        let date = new Date()
        let now = date.toISOString()
        let md5 = file.md5
        now = now.replaceAll('-', '').replaceAll(':', '').replaceAll('.', '')

        file.mv('./archivos/' + md5 + file.name)

        console.log(file.name)

        res.send({
            mensaje: "Archivo subido",
            name: md5 + file.name,
            size: file.size,
            mimeType: file.mimetype
        })
    }

})

app.get('/descarga', (req,res) => {
    res.download('./archivos/'+ req.body.archivo)
})

app.get('/imagenes', (req, res)=>{
    fs.readdir('./archivos', (err, files)=>{
        if(err){
            res.send({mensaje:"No se ha podido leer el directorio"})
        }else{

            let imgPaths = files.map((archivo)=>'http://localhost:3001/foto/'+archivo)
            res.send({mensaje: "Archivos recuperados: ", results: imgPaths})
        }
    })
})




app.listen(PORT, (e) => {
    e
        ? console.error("🔴 Express no conectado")
        : console.log("🟢 Express conectado y a la escucha en el puerto: " + PORT)
})