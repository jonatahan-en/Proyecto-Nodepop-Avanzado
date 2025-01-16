import Product from '../../models/Product.js'
import createError from 'http-errors'

export  async function apiProductsList(req, res, next) {
    try {
            const userId = req.apiUserId

            const pageSize = 10
            const skip = parseInt(req.query.skip) || 0
            const limit = parseInt(req.query.limit) || pageSize
            const sort = req.query.sort || '_id'
            const filterPrice = req.query.price
            const filterName = req.query.name
            const filterTag = req.query.tag
            const fields = req.query.fields

        //ejemplos de uso de la api
        //http://localhost:3000/api/products/?name=watches&price350
        //http://localhost:3000/api/products/?limit=2&skip=2
        //http://localhost:3000/api/products/?sort=-price
        //http://localhost:3000/api/products/?fields=name -_id 

        const filters = {owner: userId}
    
        if ( typeof filterTag !== 'undefined' ) 
            filters.tags = filterTag
    
        if (typeof filterPrice !== 'undefined' && filterPrice !== '-') {
            if (filterPrice.indexOf('-') === -1) filters.price = filterPrice
            else {
            filters.filterPrice = {}
            const range = filterName.split('-')
            if (range[0] !== '') filters.price.$gte = range[0]
            if (range[1] !== '') filters.price.$lte = range[1]
            }
        }
    
        if (typeof filterName !== 'undefined') {
            filters.name = new RegExp('^' + filterName, 'i')
        }

        //lista de productos
    const [products, productCount] = await Promise.all([
    Product.list(filters, skip, limit, sort, fields),
    Product.countDocuments(filters)
    ])

        res.json({ 
            results: products ,
            count: productCount
        })
        
    } catch (error) {
        next(error)
    }
}
// Busca un producto
export async function apiProductGetOne(req, res, next) {
    try {
        const userId = req.apiUserId
        const productId = req.params.productId
        const product = await Product.findOne({ _id: productId, owner: userId})
        res.json({ result: product })
    } catch (error) {
        next(error)
    }
    
}
// Nuevo producto
export async function apiProductNew(req, res, next) {
    try {
        const userId = req.apiUserId
        const productData = req.body
        // create product instance in memory
        const product = new Product(productData)
        product.owner = userId
        product.image = req.file?.filename// añadimos la imagen
        // guardar product
        const savedProduct = await product.save()

        res.status(201).json({result: savedProduct})
    } catch (error) {
        next(error)
    }
    
}
// Modifica un producto
export async function apiProductUpdate (req,res,next){
    try {
        const userId = req.apiUserId
        const productId = req.params.productId
        const productData = req.body
        productData.image = req.file?.filename

        const updateProduct = await Product.findOneAndUpdate({ _id: productId, owner: userId},productData, {
            new: true// para obtener el documento actualizado
        })
        res.json({ result: updateProduct })
    } catch (error) {
        next(error)
    }
}
// Borra el producto
export async function apiProductDelete(req, res, next) {
    try {
        const userId = req.apiUserId
        const productId = req.params.productId

        // validar el documento que queremos borrar pertenece al usuario
        const product = await Product.findOne({ _id: productId})

        //verificar si existe
        if (!product) {
            console.warn(`WARNING - el usuario ${userId} intentó eliminar un producto inexistente (${productId})`)
            return next(createError(404))
        }   
        // comprobamos la propiedad antes de eliminar
        //producto.owner es un ObjecId , y para compararlo con un strig necesitamos convertirlo a texto
        if (product.owner.toString() !== userId){
            console.warn(`WARNING - el usuario ${userId} intentó eliminar un producto que es propiedad de otro usuario`)
            return next(createError(401))
        }

        await Product.deleteOne({ _id: productId})
        res.json()
    } catch (error) {
        next(error)
    }

    
}