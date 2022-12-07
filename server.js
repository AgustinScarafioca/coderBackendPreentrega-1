const express = require('express')
const path = require('path')

const productsRouter = require('./routers/RouterProduct')
const cartRouter = require('./routers/RouterCart')

const app = express()

const PORT = process.env.port || 8080



app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/productos', productsRouter)
app.use('/api/carrito', cartRouter)

app.use((req,res) => {
    res.status(404).json({
        error : 'Error en conexion',
        descripcion: `ruta '${req.originalUrl}' método '${req.method}' no implementada`,
    })
})


app.listen(PORT, ()=>{
    console.log('Servidor escuchando en ' + PORT)
})
