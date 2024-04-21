const scapeCategory = async (url, browser) => new Promise(async (resolve, reject) => {
    try {
        let page = await browser.newPage()
        console.log('>> mở tab mới');
        await page.goto(url, { timeout: 60000 })
        console.log('>> truy cập vào', url);
        await page.waitForSelector('body > header > nav > div')
        console.log('>> Website đã load xong');

        const dataCategory = await page.$$eval('body > header > nav > div > ul > li', els => {
            let i = 0;
            dataCategory = els.map(el => {
                console.log(el);
                return {
                    category: el.querySelector('a').innerText,
                    link: `https://fptshop.com.vn${el.querySelector('a').getAttribute('href') }`,
                    // category:el.querySelector('a')
                    i:i++
                }
            })
            return dataCategory
        })
        console.log(dataCategory);

        await page.close()
        console.log('>>tab đã đóng');
        resolve()
    } catch (error) {
        console.log('loi o scapeCategory', error);
        reject(error)
    }
})
module.exports = {
    scapeCategory
}