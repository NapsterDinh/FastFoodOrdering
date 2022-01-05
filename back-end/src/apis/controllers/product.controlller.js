const { productService } = require('../services/index')
const catchAsync = require('../../utils/catch-async')

const addProduct = catchAsync(async (req, res) => {
    try {
        const result = await productService.addProduct(req.body)
        res.json({
            result: true,
            msg: 'Add product success!',
            data: result,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const listProduct = catchAsync(async (req, res) => {
    try {
        const result = await productService.getList()
        res.json({
            result: true,
            msg: 'List product!',
            data: result,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const listProductByCategoryId = catchAsync(async (req, res) => {
    try {
        const { result, data, msg } = await productService.getListByCatelogoryId(req)
        res.json({
            result: result,
            msg: msg,
            data: data,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const editProduct = catchAsync(async (req, res) => {
    try {
        const result = await productService.editProduct(req.body)
        res.json({
            result: true,
            msg: 'Edit product success!',
            data: result,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const deleteProduct = catchAsync(async (req, res) => {
    try {
        const result = await productService.deleteProduct(req.query)
        res.json({
            result: true,
            msg: 'Delete product success!',
            data: result,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

module.exports = {
    addProduct,
    listProduct,
    listProductByCategoryId,
    editProduct,
    deleteProduct,
}
