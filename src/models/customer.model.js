const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'Customers';
const DOCUMENT_NAME = 'Customer';

const customerSchema = new Schema({
    phone_customer: { type: String, required: true },
    email_customer: { type: String, required: true, unique: true },
    password_customer: { type: String, required: true },
    name_customer: { type: String, required: true },
    status_customer: { type: String, default: 'pending', enum: ['pending', 'active', 'block'] },
}, {
    collection: COLLECTION_NAME,
    timestamps: true,
});

module.exports = model(DOCUMENT_NAME, customerSchema);
