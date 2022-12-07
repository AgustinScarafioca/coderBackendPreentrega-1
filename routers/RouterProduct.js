const { getProducts, postProduct, putProduct, deleteProduct } = require('../controllers/ControlerProduct')

const { Router } = require('express')
const validAdmin = require('../middlewares/validAdmin')

const admin = true

const productsRouter = Router()

productsRouter.get('/:id?', getProducts);
productsRouter.post('/', validAdmin(admin), postProduct);
productsRouter.put('/:id', validAdmin(admin), putProduct);
productsRouter.delete('/:id', validAdmin(admin), deleteProduct);

module.exports = productsRouter;