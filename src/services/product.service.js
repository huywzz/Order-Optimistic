const { product } = require("../models/product.model")
const ExcelJS = require('exceljs');
const xlsx = require('xlsx');

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
                    product_price: parseInt(obj['Gia san pham']),
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
}
module.exports=ProductService