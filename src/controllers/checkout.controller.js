const checkoutService = require('../services/checkout.service')
const { SuccessResponse } = require('../core/success.responce');
const { BadRequestError } = require('../core/error.responce');
class CheckoutController {
    checkoutReview = async (req, res, next) => {
        console.log('::req body cart::', req.body);
        return new SuccessResponse({
            metadata: await checkoutService.checkoutReview({
                cusId: req.customerId,
                listProduct: req.body.listProduct,
                cartId: req.body.cartId
            }),
            message: "get checkout ss",
        }).send(res)
    }
    orderByUser = async (req, res, next) => {
        console.log('::req body cart::', req.body);
        return new SuccessResponse({
            metadata: await checkoutService.orderByUser({
                cusId: req.customerId,
                listProduct: req.body.listProduct,
                cartId: req.body.cartId,
                address: req.body.address
            }),
            message: "get checkout ss",
        }).send(res)
    }
}
module.exports = new CheckoutController()