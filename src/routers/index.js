const epxress = require('express');
const router = epxress.Router()


router.use('/api/product', require('./product'))

module.exports = router