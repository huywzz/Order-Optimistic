const customerModel=require('../models/customer.model')
const { BadRequestError }=require('../core/error.responce')
const { sendEmailToken } = require('./email.service')
const { findOtpByToken } = require('./otp.service')
const { foundCusByEmail } = require('../models/repositories/customer.repo')
const OTP=require('../models/otp.model')
class CustomerService{
    static async newCus({ phone, email, name,password }) {
        // 1. check email
        const passwordHash = await bcrypt.hash(password, 10);
        const cus = await customerModel.findOne({
            email_customer:email
        }).lean()

        if (cus) throw new BadRequestError('Email exist')

        await customerModel.create({
            email_customer: email,
            phone_customer: phone,
            name_customer: name,
            password_customer:passwordHash
        })
        // 2. send token
        const result = await sendEmailToken({
            email:email
        })
        return {
            result
        }

    }
    static async verifyCustomer( token ) {
        console.log('token otp 1', token);
        const foundToken = await OTP.findOne({ otp_token: token }).lean();
        console.log('token otp', foundToken);
        if (!foundToken) {
            throw new BadRequestError('Token not found');
        }

        
        const foundCustomer = await foundCusByEmail(foundToken.otp_email);
        if (!foundCustomer) {
            throw new BadRequestError('Email exists');
        }

        foundCustomer.status_customer = 'active';
        const updateCustomer=  foundCustomer.save();

        return {
            updateCustomer // hoặc bạn có thể trả về thông tin cần thiết ở đây
        };
    }
}
module.exports=CustomerService