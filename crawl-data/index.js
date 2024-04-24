const puppeteer = require('puppeteer');
const startBrowser = require('./browser')
const scapeController = require('./scapeController')
const scaper = require('./scaper')

let browser = startBrowser()

// const productDetail = await scaper.spacerProductDetail(browser, 'https://fptshop.com.vn/dien-thoai/xiaomi-redmi-a3')
// console.log('>>product detail',productDetail);
scapeController(browser)
