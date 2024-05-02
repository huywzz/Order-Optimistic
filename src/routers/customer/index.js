const express = require('express')
const { asyncHandler } = require('../../helper/asyncHanlder')
const customerController = require('../../controllers/customer.controller')
const router = express.Router()


router.post('', asyncHandler(customerController.registeCustomer))
router.get('/welcome', asyncHandler(customerController.verifyCustomer))
module.exports = router