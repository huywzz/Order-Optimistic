const express = require('express')
const { asyncHandler } = require('../../helper/asyncHanlder')
const orderController = require('../../controllers/order.controller')
const { authentication } = require('../../auth/guard.auth')
const router = express.Router()

router.use(authentication)
router.get('/', asyncHandler(orderController.getOdersByUser))
router.get('/:orderId', asyncHandler(orderController.getOderByUser))


module.exports = router