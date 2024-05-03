const { Schema, model } = require('mongoose')

const COLLECTION_NAME = 'Orders'
const DOCUMENT_NAME = 'Order'

const orderSchema = new Schema({
    order_customer: { types: Schema.Types.ObjectId, ref: 'Customer' },
    order_total: { types: Number, require: true },
    order_products: {
        type: Array,
        default: []
    }
    
}, {
    timestamps: true,
    collection:COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, orderSchema)
//order_detai
// {
//     product_id: Schema.Types.ObjectId,
//     product_name:String,
//     product_price:String,
//     quantity:Number,
//     total:Number,
// }

