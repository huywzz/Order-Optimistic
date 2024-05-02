const { randomInt } = require('crypto')
const otpService = require('./otp.service')
const { initNodeMail } = require('../db/init.nodemailer')
const { templateMail } = require('../template/email.template')
const sendEmailLinkVerify = async({
    html, toEmail,subject='Xac nhan Email dang ky',text='Xac nhan'
}) => {
    try {
        const option = {
            from: '"BanHang" <dqh1005@gmail.com>',
            to: toEmail,
            subject,
            text,
            html,
        }
        const transport =await initNodeMail()
        transport.sendMail(option, (err,info) => {
            if (err) {
                return console.log('err:',err);
            }
            console.log('mess send',info.messageId);
        })
    } catch (error) {
        console.log('sendEmailLinkVerify ',error);
        return error
    }
}
const sendEmailToken = async ({email=null, capcha=null}) => {
    try {
        
        const token = await otpService.newOtp(email)
        const link = `http://localhost:3001/api/customer/welcome?token=${token.otp_token}`
        const template = templateMail(link)

        sendEmailLinkVerify({ html: template, toEmail: email }).catch
        return token.otp_token

    } catch (error) {
        console.log('sendEmailToken error',error);
    }
}
module.exports = {
    sendEmailToken
}