const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Keys'
const COLLECTION_NAME = 'Key'

const keychema = new Schema({
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
    private_key: { type: String, required: true },
    public_key: { type: String, required: true },
},
    {
        collection: COLLECTION_NAME,
        timestamps: true,
    }
)

module.exports = model(DOCUMENT_NAME, keychema)