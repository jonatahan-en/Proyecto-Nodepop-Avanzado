import { Product } from '../models/index.js'

export async function index(req, res, next) {
  try {
    const userId = req.session.userId
    //const filterPrice = req.query.price

    if (userId) {
      const pageSize = 3
      const skip = parseInt(req.query.skip) || 0
      const limit = parseInt(req.query.limit) || pageSize
      const sort = req.query.sort || '_id'
      const filterPrice = req.query.price
      const filterName = req.query.name
      const filterTag = req.query.tag
  

      const filters = { owner: userId }

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

      const totalCount = await Product.find(filters).countDocuments()
      res.locals.products = await Product.list(filters, skip, limit, sort)

      // pagination
      res.locals.pageSize = pageSize
      res.locals.skipPrev = skip - pageSize
      res.locals.skipNext = skip + pageSize
      res.locals.totalCount = totalCount

    }

    res.render('home', { variable: 'Express'})
  } catch (error) {
    next(error)
  }
}
