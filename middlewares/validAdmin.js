const validAdmin = admin => (req, res, next) => {
    const { method, originalUrl }  = req

    const auth = admin ? true : false

    if (auth){
        next()
    } else {
        res.status(401).json({
            error : 'Error en autenticacion',
            description : `Ruta ${originalUrl} y metodo ${method} no autorizados`,
            user : req.user
        })
    }
}

module.exports = validAdmin