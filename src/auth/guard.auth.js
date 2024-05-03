const { asyncHandler } = require('../../helper/asyncHanlder')
const { AUTHORIZATION, ID_CLIENT } = require('./constant.auth')
const customerService = require('../services/customer.service')
const keyService=require('../services/key.service')
const jwt = require('jsonwebtoken');
const { ForbirdenError } = require('../core/error.responce');

const authentication = asyncHandler(async (req, res, next) => {
    const customerId = req.header[ID_CLIENT]
    const accessToken = req.header[AUTHORIZATION]

    const foundCustomer = await customerService.findCustomerById(customerId)
    if (!foundCustomer) {
        throw new ForbirdenError('guard')
    }
    const keyOfCustomer = await keyService.findKeyByCusId(customerId)
    if (!foundCustomer) {
        throw new ForbirdenError('guard token')
    }

    try {
        const decodeCustomer = jwt.verify(accessToken, keyOfCustomer.public_key)
        if (decodeCustomer.payload.customerId !== customerId) {
            throw new ForbirdenError('')
        }
        req.customerId = customerId
        return next()
    } catch (error) {
        console.log('decode false:', error);
    }

})