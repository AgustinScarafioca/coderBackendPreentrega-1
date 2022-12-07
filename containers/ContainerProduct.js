const fs = require('fs')

class Producto {
    constructor(fileName){
        this.fileName = fileName
        this.id = 0
    }

    createFile(){
        fs.writeFileSync(this.fileName, '')
    }

    fileExists(){
        if(!fs.existsSync(this.fileName)){
            this.createFile
        }
    }

    getProducts(){
        let allProds = fs.readFileSync(this.fileName, 'utf-8')
        console.log(typeof allProds)
        if(allProds.length === 0){
            return []
        } 
        return JSON.parse(allProds)
    }

    getLastId(){
        let allProds = this.getProducts()
        if (allProds.length === 0){
            return 0
        }
        let lastId = allProds[allProds.length -1].id
        return lastId
    }

    getProductById(id){
        let allProds = this.getProducts()
        let obj = allProds.find(obj => obj.id === parseInt(id))

        if (obj === undefined){
            return { error: 'Producto no encontrado'}
        }

        return obj
    }

    postProduct(obj){
        let allProds = this.getProducts()
        this.id = this.getLastId() + 1
        obj.id = this.id
        obj.timestamp = Date.now()
        allProds.push(obj)
        fs.writeFileSync(this.fileName, JSON.stringify(allProds, null, 2))

        return obj
    }

    putProduct(id, obj){
        let allProds = this.getProducts()

        try{
            let objActualized = allProds.find(obj => obj.id === parseInt(id))

            if(objActualized === undefined){
                return { error: 'Producto no encontrado'}
            }

            let indice = allProds.indexOf(objActualized)
            obj.id = parseInt(id)
            obj.timestamp = Date.now()
            allProds[indice] = obj
            fs.writeFileSync(this.fileName, JSON.stringify(allProds, null, 2))
            return obj
        }
        catch (error){
            return { error: 'No se pudo actualizar'}
        }
    }

    deleteProduct(id){
        let allProds = this.getProducts()
        let obj = allProds.find(obj => obj.id === parseInt(id))

        if(obj === undefined){
            return { error: 'No se pudo borrar el objeto por ID' }
        }
        let indice = allProds.indexOf(obj)
        allProds.splice(indice, 1)
        fs.writeFileSync(this.fileName, JSON.stringify(allProds, null, 2))
        return obj
    }

    deleteAll(){
        fs.writeFileSync(this.fileName, '')
    }

}

module.exports = Producto