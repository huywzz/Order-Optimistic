const { default: puppeteer } = require("puppeteer")

const startBrowser = async () => {
    let browser

    try {
        browser = await puppeteer.launch({
            headless: false, //có hiện UI của chronium hay không, false là hiện 
            args: ['--disable-setuid-sandbox'], //nên sử dụng chứ kh hiểu
            'ignoreDefaultArgs':true //truy cập website bỏ qua lỗi liên quan tới http secure
        })
        
        return browser
    } catch(error) {
        console.log('Khong khoi dong dc trinh duyet:',error);
    }
    return browser
   
}

module.exports = startBrowser