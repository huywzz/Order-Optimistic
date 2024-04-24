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
        resolve(dataCategory)

    } catch (error) {
        console.log('loi o scapeCategory', error);
        reject(error)
    }
})
const scaperEachLink = async (browserIntance,url) => new Promise(async(resolve, reject) => {
    try {
        let newPage = await browserIntance.newPage()
        console.log('>>Mở tab mới ');
        await newPage.goto(url, { timeout: 120000 })
        console.log('>>Truy cập vào ', url);
        await newPage.waitForSelector('#root > main > div > div.row.fspdbox > div.col-9.p-0 > div.card.fplistbox > div > div.cdt-product-wrapper.m-b-20')
        
        console.log('>>Load web đã xong')
        
        const dataProduct=await newPage.$$eval('div > div.cdt-product__info > h3'
            , els => {
                dataProduct = els.map(el => {
                    console.log(el);
                    return {
                        nameProduct: el.querySelector('a').title,
                        link: `https://fptshop.com.vn${el.querySelector('a').getAttribute('href')}`,
                    }
                }) 
                return dataProduct
            })
                                    

        await browserIntance.close()
        resolve(dataProduct)

    } catch (error) {
        console.log('loi o spacer product', error);
        reject(error)
    }
})
const spacerProductDetail = async (browserIntance, url) => new Promise(async (resolve, reject) => {
    try {
        let pageDetail = await browserIntance.newPage()
        console.log('>> Mở tab detail product');
        await pageDetail.goto(url, { timeout: 120000 })
        console.log('>> Truy cập vào detail product');
        await pageDetail.waitForSelector('#root')
        console.log('>> Load product detail ss');

        let detailData = {}
        
        const nameProduct = await pageDetail.$eval('#root > main > div > div.l-pd-header > div:nth-child(2) > div.l-pd-top', el => {
            return el.querySelector('h1').innerText
        })

        const priceProduct = await pageDetail.$eval('#root > main > div > div.l-pd-header > div:nth-child(2) > div.l-pd-row.clearfix > div.l-pd-right > div.st-price > div', el => {
            const priceString= el.querySelector('div.st-price-main').innerText
            return priceString.slice(0,-1)
        })


        const decsProduct = await pageDetail.$eval('#root > main > div > div.l-pd-body > div > div.l-pd-body__wrapper > div.l-pd-body__left > div > div.card-body > div.st-pd-content > p:nth-child(1)', el => {
            return el.querySelector('strong').innerText
        })

        const categoryProduct = await pageDetail.$eval('#root > main > div > div.l-pd-header > div:nth-child(1) > div > ol > li.breadcrumb-item.active', el => {
            return el.querySelector('a').getAttribute('title')
        })

        detailData = {
            productName: nameProduct,
            productCategory: categoryProduct,
            productPrice: priceProduct,
            productDecs: decsProduct?decsProduct:"",

        }
        await browserIntance.close()
        resolve(detailData)

        
    } catch (error) {
        console.log('loi o spacer product detail', error);
        reject(error)
    }
})
module.exports = {
    scapeCategory,
    scaperEachLink,
    spacerProductDetail
}