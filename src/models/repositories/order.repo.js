const orderModel = require('../order.model')

class OrderRepository{
    getAllOrderByUser = async ({ limit, sort, page, filter}) => {
        const skip = (page - 1) * limit
        const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
        return orderModel.find(filter)
            .sort(sortBy)
            .skip(skip)
            .limit(limit)
            .lean()
            .exec()
    }
}
module.exports=new OrderRepository()