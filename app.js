const express = require('express');
const multer  = require('multer');
const sharp = require('sharp');
const fs = require('fs');


const storageStrategy = multer.memoryStorage()
const upload = multer({ storage: storageStrategy })

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
  })
  
app.post('/imagen',upload.single('imagen'), async (req, res) => {
   
    const imagen=req.file

   
    if(imagen.mimetype==='image/jpeg' || imagen.mimetype==='image/png' ){

      const processedImage = sharp(imagen.buffer)
      const resizedImage = processedImage.resize(200, 800,{
        fit: 'contain',
        background: '#FFF'
      })
      const resizedImageBuffer = await resizedImage.toBuffer()
      fs.writeFileSync('thumbnails/prueba.png', resizedImageBuffer)

      console.log(resizedImageBuffer)

        res.send({resizedImage: resizedImageBuffer})
    } else{
        res.send('la imagen no es del tipo jpeg o png')
    }
   
  })
  
  const PORT = process.env.PORT || 3000

  console.log({PORT})

  app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto', PORT)
  } )
