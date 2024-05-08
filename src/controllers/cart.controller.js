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
    updateCart = async (req, res, next) => {
        console.log('::req body cart::', req.body);
        return new SuccessResponse({
            metadata: await cartService.updateCartQuantity({ customerId: req.customerId, product: req.body }),
            message: "update cart ss",
        }).send(res)
    }
    deleteProduct = async (req, res, next) => {
        console.log('::req body cart::', req.body);
        return new SuccessResponse({
            metadata: await cartService.deleteItem({ customerId: req.customerId, product: req.body }),
            message: "delete item ss",
        }).send(res)
    }
    incQuantityItem = async (req, res, next) => {
        console.log('::req body cart::', req.body);
        return new SuccessResponse({
            metadata: await cartService.incQuantityItem({ customerId: req.customerId, product: req.body }),
            message: "update cart ss",
        }).send(res)
    }
    decQuantityItem = async (req, res, next) => {
        console.log('::req body cart::', req.body);
        return new SuccessResponse({
            metadata: await cartService.decQuantityItem({ customerId: req.customerId, product: req.body }),
            message: "update cart ss",
        }).send(res)
    }
}
module.exports = new CartController()