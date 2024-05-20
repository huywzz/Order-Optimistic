const { resolve } = require('path');
const productService=require('./product.service')
const redis = require('redis')
const {promisify}=require('util');
const { BadRequestError } = require('../core/error.responce');
const client = redis.createClient({
    host: 'localhost',
    port: 6379,
    legacyMode: true
});
client.connect().catch(console.error)

const pexpire=promisify(client.pExpire).bind(client) // đặt time hết hạn cho key
const setnxAsync = promisify(client.setNX).bind(client) // tạo key
const delAsyncKey = promisify(client.del).bind(client)// xóa key, xóa thủ công, mục đích xóa key những lúc cần thiết


const accquiredLock = async (productId,quantity) => {
    const key = `lock_mutex_${productId}`
    const retryTime = 10;
    const expireTime = 3000;

    for (let index = 0; index < retryTime; index++) {
        const result = await setnxAsync(key, expireTime)
        console.log(`result::`, result);
        if (result == 1) {
            const foundProduct = await productService.findProductById(productId)
            if (quantity > foundProduct.product_quantity) {
                throw new BadRequestError('product had been updated')
            }
            const { modifiedCount } = await productService.updateProductQuantity(quantity, productId)
            if (modifiedCount) {
                await pexpire(result, expireTime)
                return key
            }
            return null;
        } else {
            await new Promise((resolve)=>setTimeout(resolve,50))
        }
    }
}
const releaseLock = async (keyLock) => {
    return await delAsyncKey(keyLock)
}

module.exports = {
    accquiredLock,
    releaseLock,
}