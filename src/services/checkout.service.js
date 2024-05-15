const { BadRequestError } = require('../core/error.responce')
const cartService=require('./cart.service')
const productService = require('./product.service')
const customerService=require('./customer.service')
class CheckoutService{
    // listProduct = [
    //     {
    //         productId,
    //         product price
    //     }
    // ]
    checkoutReview = async ({ cusId, cartId, listProduct }) => {
        const foundCart = await cartService.findCartById(cartId)
        let sum = {
            totalPrice: 0,
            totalCheck: 0,
        }
        const infoCus = await customerService.findCustomerById(cusId)
        if (!foundCart) throw new BadRequestError()
        
        if (cartService.checkProductExistInCart(foundCart.cart_Products, listProduct)) {
            const products = await productService.getProductByServer(listProduct)

            sum.totalPrice = products.reduce((sum, currentValue) => {
                return sum + currentValue.price
            })
            return {
                inforCustomer: infoCus.name_customer,
                listProduct,
                sum,
                
            }
        }
        throw new BadRequestError()
    }
}
module.exports=new CheckoutService()