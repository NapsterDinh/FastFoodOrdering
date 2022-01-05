const catchAsync = require('../../utils/catch-async')
const { addToCartService } = require('../services/index')

const addProductToCart = catchAsync(async (req, res) => {
    try {
        const { result, data, msg } = await addToCartService.addToCart(req)
        res.json({
            result: result,
            msg: msg,
            data: data,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const updateCartIem = catchAsync(async (req, res) => {
    try {
        const { result, data, msg } = await addToCartService.updateCardItem(req)
        res.json({
            result: result,
            msg: msg,
            data: data,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const deleteCartItem = catchAsync(async (req, res) => {
    try {
        const { result, data, msg } = await addToCartService.deleteCardItem(req)
        res.json({
            result: result,
            msg: msg,
            data: data,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

module.exports = {
    addProductToCart,
    updateCartIem,
    deleteCartItem,
}
