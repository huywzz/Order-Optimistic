const { randomInt } = require('crypto')
const optModel = require('../models/otp.model')

const generateTokenRandom = () => {
    const token = randomInt(0, Math.pow(2, 32))
    return token
}
const findOtpByToken = async (token) => {
    return await optModel.findOne({
        otp_token:token
    }).lean()
}

const newOtp = async (email) => {
    const token = generateTokenRandom()
    const newToken = await optModel.create({
        otp_token: token,
        otp_email: email,
        
    })
    return newToken
}

module.exports = {
    newOtp,
    findOtpByToken
}