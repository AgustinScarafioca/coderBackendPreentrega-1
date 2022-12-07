const { request } = require('express')
const Producto = require('../containers/ContainerProduct')

const productContainer = new Producto ('productos.txt')
productContainer.fileExists()

const getProducts = (req, res) => {
    const id = req.params.id
    
    console.log(id)

    if (id === undefined){
        const products = productContainer.getProducts()
        res.json(products)
    } else {
        const product = productContainer.getProductById(id)
        console.log(product)
        res.json(product)
    }
}

const postProduct = (req, res) => {
    const newProduct = {
        id : 0,
        timestamp : Date.now(),
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        thumbnail : req.body.thumbnail,
        stock : req.body.stock
    }
    res.json(productContainer.postProduct(newProduct))
}

const putProduct = (req, res) => {
    const updateProduct = {
        id : 0,
        timestamp : Date.now(),
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        thumbnail : req.body.thumbnail, 
        stock : req.body.stock
    }
    res.json(productContainer.putProduct(req.params.id, updateProduct))
}

const deleteProduct = (req, res) => {
    res.json(productContainer.deleteProduct(req.params.id))
}

module.exports = {
    getProducts,
    postProduct, 
    putProduct,
    deleteProduct
}