const express = require('express')
const { asyncHandler } = require('../../helper/asyncHanlder')
const productController = require('../../controllers/product.controller')
const { uploadDisk } = require('../../config/config.multer')
const router = express.Router()

router.post('', asyncHandler(productController.createProduct))
router.post('/import-product', uploadDisk.single('file'), asyncHandler(productController.importProductUsingExcel))

module.exports=router