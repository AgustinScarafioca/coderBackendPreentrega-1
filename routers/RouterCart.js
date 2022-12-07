const { postCart, deleteCart, getCartProducts, postCartProduct, deleteCartProduct} = require('../controllers/ControlerCart')

const { Router } = require('express')

const logReqInfo = require('../middlewares/logRequestInfo')

const cartRouter = Router()

cartRouter.use(logReqInfo)

cartRouter.post('/', logReqInfo, postCart)
cartRouter.delete('/:id', logReqInfo, deleteCart)
cartRouter.get('/:id/productos', logReqInfo, getCartProducts);
cartRouter.post('/:id/productos', logReqInfo, postCartProduct);
cartRouter.delete('/:id/productos/:id_prod', logReqInfo, deleteCartProduct);

module.exports = cartRouter;