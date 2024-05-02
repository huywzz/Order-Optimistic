const nodemailer = require('nodemailer')
const { google } = require('googleapis');
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = require('../config/config.oauth')

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

// const accesstoken = await oAuth2Client.getAccessToken()

// const transport = nodemailer.createTransport({
//     service:'gmail',
//     secure: true,
//     auth: {
//         user: 'dqh1005@gmail.com',
//         clientId: CLIENT_ID,
//         clientSecret: CLIENT_SECRET,
//         refreshToken: REFRESH_TOKEN,
//         accessToken: accesstoken,
        
        
//     }
// })

const initNodeMail =async () => {
    const accesstoken = await oAuth2Client.getAccessToken()
    const transport = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            type:"OAuth2",
            user: 'dqh1005@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accesstoken,


        }
    })
    return transport
}

module.exports = {
    initNodeMail
}