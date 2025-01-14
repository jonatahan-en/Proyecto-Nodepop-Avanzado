import Product from '../../models/Product.js'

export  async function apiProductsList(req, res, next) {
    try {

            const pageSize = 3
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

        const filters = {}
    
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
    
        const products = await Product.list(filters, skip, limit, sort, fields)
        res.json({ result: products })
        
    } catch (error) {
        next(error)
    }
}