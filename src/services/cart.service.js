const cartModel= require("../models/cart.model")

const { BadRequestError, AuthFailureError } = require('../core/error.responce')
// product = {
//     productId,
//     quantity,
//     name,
//     price,
// }

class CartService {
    static createCart = async ({ customerId, product ={}}) => {
        console.log('product',product);
        const query = {
            cart_customer: customerId,
            // 'cart_Products.product_Id': product.productId,
            cart_state:"active"
        }
        const update = {
            $addToSet: {
                cart_Products:product
            }
        }
        const options = {
            upsert: true,
            new:true
        }

        return await cartModel.findOneAndUpdate(query,update,options)
    }
    static deleteItem = async ({ product, customerId }) => {
        const customerCart = await cartModel.findOne({
            cart_customer: customerId
        })
        if (!customerCart) {
            throw new BadRequestError()
        }
        return await customerCart.updateOne({
            $pull: {
                cart_Products: {
                    productId:product.productId
                }
            }
        }).lean()
    }
    static updateCartQuantity = async ({ customerId, product = {} }) => {

        if (product.quantity === 0) {
            return await this.deleteItem({ product, customerId })
        }
        const {productId,quantity}=product
        const query = {
            cart_customer: customerId,
            "cart_Products.productId": productId,
            cart_state: "active"
        }
        const update = {
            $inc: {
                "cart_Products.$.quantity":quantity
            }
        }
        const options = {
            upsert: true,
        }
        return await cartModel.findOneAndUpdate(query,update,options)
    }
    static addToCart = async ({ customerId, product }) => {
        console.log('add to cart product', product);
        const customerCart =await cartModel.findOne({
            cart_customer:customerId
        })
        if (!customerCart) {
            return await CartService.createCart({customerId:customerId,product:product})
        }
        if (customerCart.cart_Products.length === 0) {
            customerCart.cart_Products = [product]
            return await customerCart.save()
        }
        const existProduct = customerCart.cart_Products.find((e) => e.productId === product.productId)
        if (existProduct) {
            return await CartService.updateCartQuantity({ customerId: customerId, product: product })
        }
        
        customerCart.cart_Products.push(product)
        return await customerCart.save()
        
    }

   
    static incQuantityItem = async ({ product, customerId }) => {
        const customerCart = await cartModel.findOne({
            cart_customer: customerId
        })
        if (!customerCart) {
            return await CartService.createCart({ customerId: customerId, product: product })
        }
        const existProduct = customerCart.cart_Products.find((e) => e.productId === product.productId)
        if (!existProduct) {
            throw new BadRequestError() 
        }
        customerCart.cart_Products.forEach(e => {
            if (e.productId === product.productId) {
                e.quantity = e.quantity+1
            }
        })
        return await customerCart.save()
    }
    // giam quantity di 1 don vi
    static decQuantityItem = async ({ product, customerId }) => {
        const customerCart = await cartModel.findOne({
            cart_customer: customerId
        })
        if (!customerCart) {
            return await CartService.createCart({ customerId: customerId, product: product })
        }
        const existProduct = customerCart.cart_Products.find((e) => e.productId === product.productId)
        if (!existProduct) {
            throw new BadRequestError()
        }
        if (existProduct.quantity === 1) {
           return await this.deleteItem({existProduct,customerId})
        }
        customerCart.cart_Products.forEach(e => {
            if (e.productId === product.productId) {
                e.quantity = e.quantity - 1
            }
        })
        return await customerCart.save()
    }

}
module.exports =  CartService