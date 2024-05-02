const customerModel = require('../../models/customer.model')

const foundCusByEmail = async (email) => {
    return await customerModel.findOne({ email_customer: email })
    
}
module.exports = {
    foundCusByEmail
}