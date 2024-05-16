const express = require('express')
const { asyncHandler } = require('../../helper/asyncHanlder')
const cartController = require('../../controllers/cart.controller')
const { authentication } = require('../../auth/guard.auth')
const router = express.Router()

router.use(authentication)
router.post('/add-to-cart', asyncHandler(cartController.addToCart))
router.post('/update-cart', asyncHandler(cartController.updateCart))
router.post('/delete-item', asyncHandler(cartController.deleteProduct))
router.post('/inc-item', asyncHandler(cartController.incQuantityItem))
router.post('/dec-item', asyncHandler(cartController.decQuantityItem))
router.get('/show-cart', asyncHandler(cartController.showCart))

module.exports = router