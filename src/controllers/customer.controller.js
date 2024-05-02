const customerService = require('../services/customer.service')
const { SuccessResponse } = require('../core/success.responce');
const { BadRequestError } = require('../core/error.responce');
class CustomerController {
    registeCustomer = async (req, res, next) => {
        console.log('::req body product::', req.body);
        return new SuccessResponse({
            metadata: await customerService.newCus(req.body),
            message: "verify customer mail",
        }).send(res)
    }
    verifyCustomer = async (req, res, next) => {
        console.log('::req param verify customer::', req.query.token);
        return new SuccessResponse({
            message: "Active account ss",
            metadata:await customerService.verifyCustomer(req.query.token)
        }).send(res)
    }
   
}
module.exports = new CustomerController()