const catchAsync = require('../../utils/catch-async')
const { cartService } = require('../services/index')

const editCartItem = catchAsync(async (req, res) => {
    try {
        const { result, msg, data } = await cartService.editCartItem(req.body)
        res.json({
            result: result,
            msg: msg || 'Edit item cart success',
            data: data,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const getCartByUserId = catchAsync(async (req, res) => {
    try {
        const cart = await cartService.getCartByUser(req.body?.id, req.body.isPrimary)
        res.json({
            cart,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const createShare = catchAsync(async (req, res) => {
    try {
        const cart = await cartService.createShare(req)
        res.json({
            cart,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const checkShareCart = catchAsync(async (req, res) => {
    try {
        const cart = await cartService.checkShareCart(req)
        res.json({
            cart,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const removeShareCart = catchAsync(async (req, res) => {
    try {
        const cart = await cartService.removeShareCart(req)
        res.json({
            cart,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const doneOrder = catchAsync(async (req, res) => {
    try {
        const cart = await cartService.doneOrder(req)
        res.json({
            cart,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const joinOrder = catchAsync(async (req, res) => {
    try {
        const cart = await cartService.joinOrder(req)
        res.json({
            cart,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const checkoutAvailable = catchAsync(async (req, res) => {
    try {
        const cart = await cartService.checkoutAvailable(req)
        res.json({
            cart,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

module.exports = {
    editCartItem,
    getCartByUserId,
    createShare,
    checkShareCart,
    removeShareCart,
    joinOrder,
    doneOrder,
    checkoutAvailable,
}
