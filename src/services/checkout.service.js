const { BadRequestError } = require('../core/error.responce')
const cartService=require('./cart.service')
const productService = require('./product.service')
const customerService=require('./customer.service')
class CheckoutService{
    // listProduct = [
    //     {
    //         productId,
    //         quantity
    //     }
    // ]
    checkoutReview = async ({ cusId, cartId, listProduct }) => {
        const foundCart = await cartService.findCartById(cartId)
        if (!foundCart) throw new BadRequestError()
        
        let sum = {
            totalPrice: 0,
            totalCheck: 0,
        }
        const infoCus = await customerService.findCustomerById(cusId)
       
        if (cartService.checkProductExistInCart(foundCart.cart_Products, listProduct)) {
            const products = await productService.getProductByServer(listProduct)

            const totalPrice = products.reduce((totalPrice, currentValue) => {
                return totalPrice + currentValue.product_price*currentValue.quantity_in_cart
            },0)
            sum.totalPrice = totalPrice
            return {
                inforCustomer: infoCus.name_customer,
                product_review:products,
                sum,
                
            }
        }
        throw new BadRequestError()
    }
}
module.exports=new CheckoutService()