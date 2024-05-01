const { Schema, model } = require('mongoose')

const COLLECTION_NAME = 'Carts'
const DOCUMENT_NAME = 'Cart'

const cartSchema = new Schema({
    cart_customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    cart_state: {
        type: String,
        require: true,
        enum: ["active", "completed", "falsed", "pending"],
        default: "active",
    },

    cart_Products: {
        type: Array,
        default: [],

    },
    cart_count_product: {
        type: Number,
        default: 0
    },
}, {
    timeseries: true,
    collection: COLLECTION_NAME,
}
)
module.exports = {
    customerModel: model(DOCUMENT_NAME, cartSchema)
}

