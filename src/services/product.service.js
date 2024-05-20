const { product } = require("../models/product.model")
const ExcelJS = require('exceljs');
const xlsx = require('xlsx');
const { convertStringToNumber } = require('../utils/index');
// const productModel = require("../models/product.model");
class ProductService{
    static createProduct = async ({ name, price, quantity, category }) => {
        const newProduct = await product.create({
            product_name: name,
            product_price: price,
            product_cate: category,
            product_quantity:quantity
        })
        return {
            newProduct
        }
    }
    static importProductUsingExcel =async ({ path }) => {
       
        try {
            const workBook = xlsx.readFile(path)
            const workSheet = workBook.Sheets[workBook.SheetNames[0]]
            
            const data = xlsx.utils.sheet_to_json(workSheet)
            let products = []
            data.forEach((obj) => {
                const data = {
                    product_name: obj['Ten san pham'],
                    product_price:  convertStringToNumber(obj['Gia san pham']),
                    product_cate: obj['Loai san pham'],
                    product_quantity: parseInt(obj['So luong']),
                }
                products.push(data)
            })
            return await product.insertMany(products)
        } catch (error) {
            console.error('Error while reading Excel file:', error);
        }
        // res.getWorksheet(1).getSheetValues().forEach(row => {
            
        // })
        
    }
    static getProductByServer = async (products) => {
        return await Promise.all(
            products.map(async (e) => {
                const foundProduct = await product.findById(e.productId).lean()
                if (foundProduct) {
                    return {
                        product_price: foundProduct.product_price,
                        productId: foundProduct._id,
                        product_category: foundProduct.product_cate,
                        product_name:foundProduct.product_name,
                        quantity_in_cart:e.quantity
                    }
                }
                
            })
        )
    }
    static findProductById = async (productId) => {
        return await product.findOne({
            _id:productId
        }).lean()
    }
    static updateProductQuantity = async (quantity,producId) => {
        const query = {
            _id: producId,
        }
        const update = {
            $inc: {
                product_quantity: -quantity
            }
        }
        const options = {
            upsert:true,
        }
        return await product.updateOne(query,update,options)
    }

}
module.exports=ProductService