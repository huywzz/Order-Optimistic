const customerModel=require('../models/customer.model')
const { BadRequestError, AuthFailureError }=require('../core/error.responce')
const { sendEmailToken } = require('./email.service')
const { findOtpByToken } = require('./otp.service')
const { foundCusByEmail,customerRepo } = require('../models/repositories/customer.repo')
const OTP = require('../models/otp.model')
const keyService=require('../services/key.service')
const { generateToken } = require('../auth/util.auth')
const bcrypt = require('bcrypt');


class CustomerService{
    static async newCus({ phone, email, name,password }) {
        // 1. check email
        const passwordHash = await bcrypt.hash(password, 10,);
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
    static async login({ email, password }) {
        const foundCustomer = await customerRepo.foundCusByEmailOrError(email)
        const match = bcrypt.compare(password, foundCustomer.password_customer)
        if (!match) {
            throw new AuthFailureError('Authentication error')
        }
        const { privateKey, publicKey } = keyService.generateKey()
        await keyService.findOneAndUpdateByCusId({ cusId: foundCustomer._id, privateKey: privateKey, publicKey: publicKey })
        const payload = {
            customerId: foundCustomer._id,
            email:foundCustomer.email_customer
        }
        const tokens = generateToken({
            payload: payload,
            privateKey: privateKey,
            publicKey:publicKey
        })
        return {
            customerId: foundCustomer._id, // gui len server mỗi khi muốn vào tài nguyên
            customerMail: foundCustomer.email_customer,
            tokens,//gui len server mỗi khi muốn vào tài nguyên
            
        }
        
    }
    static async findCustomerById(id) {
        return await customerModel.findOne({
            _id:id
        }).lean()
    }
    
}
module.exports=CustomerService