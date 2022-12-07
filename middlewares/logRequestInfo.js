const logReqInfo = (req, res, next) => {
    console.log(`Metodo: ${req.method} - URL: ${req.url}`)
    next()
}

module.exports = logReqInfo