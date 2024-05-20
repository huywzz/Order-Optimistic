const orderController = require('../services/order.service')
const { SuccessResponse } = require('../core/success.responce');
const { BadRequestError } = require('../core/error.responce');
class OrderController {
    getOderByUser = async (req, res, next) => {
       
        return new SuccessResponse({
            metadata: await orderController.getOneOrder({
                orderId: req.params,
                cusId:req.customerId
            }),
            message: "get order ss",
        }).send(res)
    }
    getOdersByUser = async (req, res, next) => {
        return new SuccessResponse({
            metadata: await orderController.getOdersByUser(
                req.customerId,
                req.query
            ),
            message: "get checkout ss",
        }).send(res)
    }
}
module.exports = new OrderController()