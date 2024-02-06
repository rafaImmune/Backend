const express = require('express');
const app = express();
const fileupload = require('express-fileupload')
const fs = require('fs')

const PORT = process.env.PORT || 3000;

app.use(fileupload({createParentPath: true, safeFileNames: true, preserveExtension: true}))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static('public'))
app.use('/fotos', express.static('archivos'))

app.post('/subir', (req, res)=>{
    if (!req.files){
        res.send({mensaje: "No hay archivo adjunto"})
    }else{
        let file = req.files.archivo
        let md5 = file.md5
        file.mv('./archivos/'+md5+file.name)
        res.send({
            mensaje: "Archivo subido",
            name: md5+file.name,
            mimeType: file.mimetype,
            size: file.size
        })
    }
})

app.get('/imagenes', (req, res)=>{
    fs.readdir('./archivos/', (err, archivos)=>{
        if(err){
            res.send({mensaje: "No se ha podido leer el directorio"})
        }else{
            const urlFinal = archivos.map((archivo) =>{
                return {
                    url: `http://localhost:3000/fotos/${archivo}`,
                    nombre: archivo
                }
            })
            res.send({mensaje: "Urls encontradas:", results: urlFinal})
        }
    }) 
})

app.get('/descarga/:archivo', (req, res)=>{
    res.download('./archivos/'+req.params.archivo)
})






app.listen(PORT, (e) => {
    e
        ? console.error("🔴 Express no conectado")
        : console.log("🟢 Express conectado y a la escucha en el puerto: " + PORT)
})