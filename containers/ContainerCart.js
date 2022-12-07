const fs = require('fs')

class Carrito {
    constructor(fileName){
        this.fileName = fileName
        this.id = 0
    }

    createFile(){
        fs.writeFileSync(this.fileName, '')
    }

    fileExists(){
        if(!fs.existsSync(this.fileName)){
            this.createFile()
        }
    }

    getCart(){
        let cart = fs.readFileSync(this.fileName, 'utf-8')

        if (cart.length === 0){
            return []
        }
        return JSON.parse(cart)
    }


    getLastId(){
        let cartArray = this.getCart()
        if (cartArray,length === 0){
            return 0
        }
        lastId = cartArray[cartArray.lenght - 1].id
        return lastId
    }

    getCartById(id){
        let cartArray = this.getCart()
        let cart = cartArray.find(cart => cart.id ===parseInt(id))
        console.log(cart)
        return cart
    }

    getCartProducts(id){
        let cart = this.getCartById(id)
        console.log(cart)
        if (cart === undefined){
            return { error:'Carrito no encontrado correctamente'}
        }
        return cart.products
    }

    validateCartProducts(cart, product){
        const cartProduct = cart?.product?.find(cartProduct => cartProduct.id === product.id)
        if(cartProduct === undefined){
            return false
        }
        return true
    }

    postCartProduct(cartId, product){
        let cartArray = this.getCart()
        let cart = cartArray.find(cart =>cart.id === parseInt(cartId))
        if(cart === undefined){
            return { error: 'Carrito no encontrado' }
        } else{
            if (this.validateCartProducts(cart, product)){
                cart.products.push
                let indice = cartArray.indexOf(cart)
                cartArray[indice] = cart
                fs.writeFileSync(this.fileName, JSON.stringify(cartArray, null, 2))
                return true
            }
        }
    }

    postCart(){
        const newCart = {
            id: this.getLastId() + 1,
            timestamp: Date.now(),
            products : []
        }
        let cartArray = this.getCart()
        cartArray.push(newCart)
        fs.writeFileSync(this.fileName, JSON.stringify(cartArray, null, 2))
        return newCart
    }

    deleteCartProduct(idCart, idProduct){
        let cartArray = this.getCart()
        let cart = cartArray.find(cart => cart.id === parseInt(idCart))
        if(cart === undefined){
            return { error:'Carrito no encontrado'}
        } else{
            const product = cart.products.find(product => product.id === parseInt(idProduct)) //aca puede fallar el product.id
            if(product === undefined){
                return { error: 'producto no encontrado en carrito'}
            } else{
                const index = cart.product.indexOf(product)
                cart.products.splice(index, 1)
                let indice = cartArray.indexOf(cart)
                cartArray[indice] = cart
                fs.writeFileSync(this.fileName, JSON.stringify(cartArray, null, 2))
                return true
            }
        }
    }

    deleteCart(id){
        let cartArray = this.getCart()
        let cart = cartArray.find(cart => cart.id === parseInt(id))
        if(cart === undefined){
            return { error: 'Carrito no encontrado' }
        }
        else{
            const index = cartArray.indexOf(cart)
            cartArray.splice(index, 1)
            fs.writeFileSync(this.fileName, JSON.stringify(cartArray, null, 2))
            return true
        }
    }

    deleteAll(){
        fs.writeFileSync(this.fileName, '')
    }
}

module.exports = Carrito