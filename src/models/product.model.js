const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME='Products'

const productSchema = new Schema({
    product_name: { type: String, required: true },
    product_price: { type: Number, required: true },
    product_cate: { type: String, required: true },
    product_quantity:{type:Number,required:true},
},
    {
        collection: COLLECTION_NAME,
        timestamps: true,
    }
)

module.exports = {
    product:model(DOCUMENT_NAME,productSchema)
}
