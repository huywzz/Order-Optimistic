const puppeteer = require('puppeteer');
const startBrowser = require('./browser')
const scapeController = require('./scapeController')

let browser = startBrowser()

scapeController(browser)
