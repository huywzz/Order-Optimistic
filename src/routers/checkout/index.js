const express = require('express')
const { asyncHandler } = require('../../helper/asyncHanlder')
const checkoutController = require('../../controllers/checkout.controller')
const { authentication } = require('../../auth/guard.auth')
const router = express.Router()

router.use(authentication)
router.get('/checkout-review', asyncHandler(checkoutController.checkoutReview))


module.exports = router