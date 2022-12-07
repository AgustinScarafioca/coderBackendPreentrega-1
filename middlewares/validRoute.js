const validRoute = (req, res, next) =>{
    const { method, originalURL } = req

    const auth = admin ? true : false

    if(auth){
        next()
    } else{
        res.status(401).json({
            error: 'Ha ocurrido un error en la validacion de la ruta',
            description : `Ruta ${originalURL} metodo ${method} no autorizados`,
            user : req.user
        })
    }
}

module.exports = validRoute