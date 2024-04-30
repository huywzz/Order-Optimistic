const { Schema, model } = require('mongoose')

const COLLECTION_NAME = "Otps"
const DOCUMENT_NAME = "otp"

const otpSchema = new Schema({
    email: { type: String },
    otp: { type: String },
    create:{type:Date, default:Date.now(),index:{expires:20}}
}, {
    collection:COLLECTION_NAME
})
module.exports=model(DOCUMENT_NAME,otpSchema)