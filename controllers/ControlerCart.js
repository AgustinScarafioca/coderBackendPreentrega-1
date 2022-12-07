const Carrito = require('../containers/ContainerCart')
const Producto = require('../containers/ContainerProduct')

const cartContainer = new Carrito('carritos.txt')
cartContainer.fileExists()

const productContainer = new Producto('producto.txt')
productContainer.fileExists()

const postCart = (req, res) =>{
    const cart = cartContainer.postCart()
    res.json(cart.id)
}

const deleteCart = (req, res) =>{
    res.json(cartContainer.deleteCart(req.params.id))
}

const getCartProducts = (req, res) =>{
    res.json(cartContainer.getCartProducts(req.params.id))
}

const postCartProduct = (req, res) => {
    const idProduct = req.body.id
    const idCart = req.params.id

    const product = productContainer.getProductById(idProduct)

    if(product.error != undefined){
        res.json(product)
    } else {
        let id = cartContainer.postCartProduct(idCart, product)
        res.json ({ id:id })
    }
}

const deleteCartProduct = (req, res) => { 
    const idProduct = req.params.id_prod
    const idCart = req.params.id
    res.json(cartContainer.deleteCartProduct(idCart, idProduct))
}

module.exports = {
    postCart,
    deleteCart,
    getCartProducts,
    postCartProduct,
    deleteCartProduct
}