const express = require('express')
const { asyncHandler } = require('../../helper/asyncHanlder')
const customerController = require('../../controllers/customer.controller')
const { authentication } = require('../../auth/guard.auth')
const router = express.Router()


router.post('', asyncHandler(customerController.registeCustomer))
router.get('/welcome', asyncHandler(customerController.verifyCustomer))
router.post('/login', asyncHandler(customerController.login))
router.use(authentication)
router.get('/get-profile', (req, res, next) => {
    res.send('day la profile')
})
module.exports = router