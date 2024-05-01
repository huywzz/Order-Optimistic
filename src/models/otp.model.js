const { Schema, model } = require('mongoose')

const COLLECTION_NAME = "Otps"
const DOCUMENT_NAME = "Otp"

const otpSchema = new Schema({
    otp_email: { type: String },
    otp_token: { type: String },
    otp_status:{type:String, default:'pending',enum:['pending','active','block']},
    expireAt: { type: Date, default: Date.now(), index: { expires: 20 } },
}, {
    collection:COLLECTION_NAME
})
module.exports=model(DOCUMENT_NAME,otpSchema)