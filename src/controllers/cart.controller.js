const cartService = require('../services/cart.service')
const { SuccessResponse } = require('../core/success.responce');
const { BadRequestError } = require('../core/error.responce');
class CartController {
    addToCart = async (req, res, next) => {
        console.log('::req body cart::', req.body);
        return new SuccessResponse({
            metadata: await cartService.addToCart({ customerId: req.customerId, product:req.body}),
            message: "add to cart ss",
        }).send(res)
    }
    
}
module.exports = new CartController()