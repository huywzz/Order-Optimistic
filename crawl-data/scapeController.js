const startBrowser = require("./browser");
const scaper = require("./scaper");

const scapeController = async (browserInstance) => {
    const url = 'https://fptshop.com.vn/'
    const indexs=[0,1,2,4]
    try {
        let browser = await browserInstance

        let categories = await scaper.scapeCategory(url, browser)
        const selectedCate = categories.filter((category,index) =>  indexs.some(i=>i===index) )
        const listProduct = await scaper.scaperEachLink(browser, selectedCate[0].link)
        const productDetail = await scaper.spacerProductDetail(browser, 'https://fptshop.com.vn/dien-thoai/xiaomi-redmi-a3')
        console.log('>>product detail', productDetail);

    } catch (error) {
        console.log('Loi o scapeController ', error);
    }
}

module.exports = scapeController