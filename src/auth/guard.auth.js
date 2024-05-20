
const { asyncHandler } = require('../helper/asyncHanlder')

const { AUTHORIZATION, ID_CLIENT } = require('./constant.auth')
const customerService = require('../services/customer.service')
const keyService=require('../services/key.service')
const jwt = require('jsonwebtoken');
const { ForbirdenError } = require('../core/error.responce');

const authentication = asyncHandler(async (req, res, next) => {
    const customerId = req.headers['x-client-id']
    console.log('customer id',customerId);
    const accessToken = req.headers['athorization']

    const foundCustomer = await customerService.findCustomerById(customerId)
    if (!foundCustomer) {
        throw new ForbirdenError()
    }
    const keyOfCustomer = await keyService.findKeyByCusId(customerId)
    if (!foundCustomer) {
        throw new ForbirdenError()
    }

    try {
        const decodeCustomer = jwt.verify(accessToken, keyOfCustomer.public_key)
        console.log('decode customer', decodeCustomer);
        if (decodeCustomer.customerId !== customerId) {
            throw new ForbirdenError()
        }
        req.customerId = customerId
        return next()
    } catch (error) {
        console.log('decode false:', error);
        throw new ForbirdenError()
    }

})
module.exports = {
    authentication
}