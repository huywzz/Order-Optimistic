const { BadRequestError } = require('../core/error.responce')
const cartService=require('./cart.service')
const productService = require('./product.service')
const customerService = require('./customer.service')
const { accquiredLock, releaseLock } = require('./redis.service')
const orderService=require('./order.service')
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
    async orderByUser({ cusId, cartId, listProduct,address }) {
        const checkoutInfor = await CheckoutService.orderByUser({ cusId, cartId, listProduct })
        const products = checkoutInfor.product_review
        const accquiredProduct=[]
        console.log('[1] product order:', products);
        for (let index = 0; index < products.length; index++) {
            const { productId, quantity_in_cart } = products[index];
            const key = await accquiredLock(productId, quantity_in_cart)
            accquiredProduct.push(key ? true : false)
            if (key) {
                await releaseLock(key)
            }
        }
        if (accquiredProduct.includes(false)) {
            throw new BadRequestError('products has been update')
        }

        const newOrder = await orderService.createNewOrder({
            customerId: cusId,
            order_total: checkoutInfor.sum.totalPrice,
            order_addresss: address,
            order_products: checkoutInfor.product_review
        })
        if (newOrder) {
            for (const item of checkoutInfor.product_review) {
                await cartService.deleteItem({ item, cusId })
            }
        }
        return newOrder
    }
}
module.exports=new CheckoutService()