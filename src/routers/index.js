const epxress = require('express');
const router = epxress.Router()


router.use('/api/product', require('./product'))
router.use('/api/customer', require('./customer'))
router.use('/api/cart', require('./cart'))
router.use('/api/checkout', require('./checkout'))

module.exports = router