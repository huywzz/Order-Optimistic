const { BadRequestError } = require('../../core/error.responce')
const customerModel = require('../../models/customer.model')

const foundCusByEmail = async (email) => {
    return await customerModel.findOne({ email_customer: email })
    
}
class CustomerRepo{
    foundCusByEmailOrError = async (email) => {
        const foundCus = await customerModel.findOne({ email_customer: email }).lean()
        if (!foundCus) {
            throw new BadRequestError('not found email')
        }
        return foundCus
    }
}
module.exports = {
    foundCusByEmail,
    customerRepo:new CustomerRepo()
}