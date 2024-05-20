const orderModel = require('../models/order.model')
const orderRepo=require('../models/repositories/order.repo')
class OrderService{
    static createNewOrder = async({ customerId, order_total, order_products, order_addresss })=>{
        return await orderModel.create({
            order_address: order_addresss,
            order_customer: customerId,
            order_total: order_total,
            oder_products: order_products,
        })
    }
    static getOneOrder = async (orderId,cusId)=>{
        return await orderModel.findOne({
            _id: orderId,
            order_customer:cusId
        })
    }
    static getOdersByUser = async (cusId, { sort = 'ctime', limit = 10, page = 1 }) => {
        return await orderRepo.getAllOrderByUser({
            filter: {
                order_customer:cusId,
            },
            limit: limit,
            page: page
        })
    }
}

module.exports=OrderService