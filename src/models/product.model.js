const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME='Products'

const productSchema = new Schema({
    product_name: { type: String, required: true },
    product_price: { type: Number, require: true },
    product_cate: { type: String, require: true },
    product_quantity:{type:Number,require:true},
},
    {
        collection: COLLECTION_NAME,
        timestamps: true,
    }
)

module.exports = {
    product:model(DOCUMENT_NAME,productSchema)
}
