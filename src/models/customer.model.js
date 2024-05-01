const { Schema, model } = require('mongoose')

const COLLECTION_NAME = 'Customers'
const DOCUMENT_NAME = 'Customer'

const customerSchema = new Schema({
    phone_customer:{types:String,require:true},
    email_customer:{types:String, require:true},
    name_customer: { types: String, require: true },
}, {
    timeseries: true,
    collection: COLLECTION_NAME,
}
)
module.exports = model(DOCUMENT_NAME,customerSchema)

