const mongoose = require("mongoose");
const { db: { host, port, name } } = require('../config/config.app')
// const connectString = `mongodb://${host}/${name}`
const connectString = `mongodb://${host}/OrderPes`
class Database {
    constructor() {
        this.connect()
    }
    connect(type = 'mongodb') {
        if (1 == 1) {
            mongoose.set('debug', true)
            mongoose.set('debug', {
                color: true
            })
        }
        mongoose.connect(connectString)
            .then(_ => console.log('connected'))
            .catch(err => console.log(err))
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const instanceDatabase = Database.getInstance()
module.exports = instanceDatabase
