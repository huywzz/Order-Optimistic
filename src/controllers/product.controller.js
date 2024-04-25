const productService=require('../services/product.service')
const { SuccessResponse } = require('../core/success.responce');
const { BadRequestError } = require('../core/error.responce');
class ProductController{
    createProduct = async (req, res, next) => {
        console.log('::req body product::',req.body);
        return new SuccessResponse({
            metadata: await productService.createProduct(req.body),
            message: "create product ss",
        }).send(res)
    }
    importProductUsingExcel = async (req, res, next) => {
        console.log('::req body product::', req.body);
        const { file } = req
        if (!file) {
            throw new BadRequestError('File missing')
        }
        console.log('::req body file::', file);

        return new SuccessResponse({
            metadata: await productService.importProductUsingExcel({ path:file.path }),
            message: "create product ss",
        }).send(res)
    }
}
module.exports= new ProductController()