require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const app = express()


//init middle
app.use(morgan("dev"))//lưu lại thông tin yêu cầu HTTP
app.use(helmet())//tăng cường bảo mật cho ứng dụng web
app.use(compression())// giảm thiểu băng thông khi truyền dữ liệu, nén dữ liệu lại
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
//init db
require('./db/init.mongodb.js')
app.use('',require('../src/routers'))

app.use((req, res, next) => {
    const error = new Error('Not found 1')
    error.status = 404
    next(error)
})

app.use((err, req, res, next) => {
    const statusCode = err.status || 500
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        stack: err.stack,
        message: err.message || 'Interval server error'
    })
})

module.exports = app