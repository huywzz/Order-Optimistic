const startBrowser = require("./browser");
const scaper = require("./scaper");
const ExcelJS = require('exceljs');
const fs = require('fs');
const {Cluster}=require('puppeteer-cluster')

const scapeController = async (browserInstance) => {
    const url = 'https://fptshop.com.vn/'
    const indexs = [0, 1]
    const workBook = new ExcelJS.Workbook();
    const workSheet = workBook.addWorksheet('Products');
    workSheet.columns = [
        { header: 'Ten san pham', key: 'productname', width: 20 },
        { header: 'Gia san pham', key: 'productprice', width: 20 },
        { header: 'Loai san pham', key: 'productcate', width: 20 },
        // { header: 'Mo ta san pham', key: 'productdecs', width: 20 },
    ]
    try {
        let browser = await browserInstance

        let categories = await scaper.scapeCategory(url, browser)
        const selectedCate = categories.filter((category, index) => indexs.some(i => i === index))
        
        for (const category of selectedCate) {
            const listProduct = await scaper.scaperEachLink(browser, category.link);
            for (const obj of listProduct) {
                const productDetail = await scaper.spacerProductDetail(browser, obj.link);
                workSheet.addRow({
                    productname: productDetail.productName,
                    productprice: productDetail.productPrice,
                    productcate: productDetail.productCategory 
                });
            }
        }
        
        // const listProduct = await scaper.scaperEachLink(browser, selectedCate[0].link)
        // const productDetail = await scaper.spacerProductDetail(browser, 'https://fptshop.com.vn/dien-thoai/xiaomi-redmi-a3')
        // console.log('>>product detail', productDetail);

        const filePath = './products.xlsx'
        await workBook.xlsx.writeFile(filePath)
    } catch (error) {
        console.log('Loi o scapeController ', error);
    }
}

module.exports = scapeController