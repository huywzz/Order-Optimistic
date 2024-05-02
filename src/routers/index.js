const epxress = require('express');
const router = epxress.Router()


router.use('/api/product', require('./product'))
router.use('/api/customer', require('./customer'))
module.exports = router