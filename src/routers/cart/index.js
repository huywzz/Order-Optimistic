const express = require('express')
const { asyncHandler } = require('../../helper/asyncHanlder')
const cartController = require('../../controllers/cart.controller')
const { authentication } = require('../../auth/guard.auth')
const router = express.Router()

router.use(authentication)
router.post('/add-to-cart', asyncHandler(cartController.addToCart))
module.exports = router