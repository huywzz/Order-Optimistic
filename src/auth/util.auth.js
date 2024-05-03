
const jwt = require('jsonwebtoken');


const generateToken = ({ payload, privateKey, publicKey }) => {
    try {
        const accessToken = jwt.sign(payload, publicKey, {
            expiresIn: '2 days'
        })

        const refreshToken = jwt.sign(payload, privateKey, {
            expiresIn: '2 days'
        })

        return {
            accessToken,
            refreshToken
        }
    } catch (error) {
        console.log('generate token error:',error)
    }
    
}

module.exports = {
    generateToken
}