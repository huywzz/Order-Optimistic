const { BadRequestError } = require('../core/error.responce')
const keyModel = require('../models/key.model')
const crypto=require('crypto')
class KeyService{
    generateKey() {
        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')
        return {
            privateKey,
            publicKey
        }
    }
    async storeKey({cusId, privateKey, publicKey}) {
        const newKeys = await keyModel.create({
            customerId: cusId,
            private_key: privateKey,
            public_key:publicKey
        })
        return newKeys
    }
    async findKeyByCusId(cusId) {
        const foundKey = await keyModel.findOne({
            customerId:cusId
        })
        return foundKey
    }
    async updateKey({ cusId, privateKey, publicKey }) {
        const updateKey = await this.findKeyByCusId(cusId)
        updateKey.private_key = privateKey
        updateKey.public_key = publicKey
        return await updateKey.save()
    }
    async findOneAndUpdateByCusId({ cusId, privateKey, publicKey }) {
        const filter = { customerId: cusId }
        const update = {
            private_key: privateKey,
            public_key: publicKey,
        }
        const option = {
            new: true,
            upsert: true
        }
        const updateKey = await keyModel.findOneAndUpdate(filter, update, option)
        if (!updateKey) {
            throw new BadRequestError('Not update key')
        }
        return updateKey
    }
}
module.exports = new KeyService()