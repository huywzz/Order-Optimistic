const startBrowser = require("./browser");
const scaper = require("./scaper");

const scapeController = async (browserInstance) => {
    const url = 'https://fptshop.com.vn/'
    try {
        let browser = await browserInstance

        let category = scaper.scapeCategory(url, browser)

    } catch (error) {
        console.log('Loi o scapeController ', error);
    }
}

module.exports = scapeController