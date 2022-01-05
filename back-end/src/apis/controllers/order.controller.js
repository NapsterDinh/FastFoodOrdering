const catchAsync = require('../../utils/catch-async')
const { orderService } = require('../services/index')

const addOrder = catchAsync(async (req, res) => {
    try {
        const result = await orderService.createOrder(req.body)
        res.json({
            result: true,
            msg: 'Create order success',
            data: result,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const payment = catchAsync(async (req, res) => {
    try {
        const result = await orderService.payment(req)
        res.json(result)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const paymentReturn = catchAsync(async (req, res) => {
    try {
        const result = await orderService.paymentReturn(req)
        res.redirect(`http://localhost:3000/cart/payment/id=${result._id}/${result.ispay}`)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const getListOrder = catchAsync(async (req, res) => {
    try {
        const { data, msg, result } = await orderService.getListOrder(req)
        res.json({
            result: result,
            msg: msg,
            data: data,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const getList = catchAsync(async (req, res) => {
    try {
        const { data, msg, result } = await orderService.getListOrder(req)
        res.json({
            result: result,
            msg: msg,
            data: data,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const cancelOrder = catchAsync(async (req, res) => {
    try {
        const { data, msg, result } = await orderService.cancelOrder(req)
        res.json({
            result: result,
            msg: msg,
            data: data,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const orderById = catchAsync(async (req, res) => {
    try {
        const { data, msg, result } = await orderService.findOrderById(req)
        res.json({
            result: result,
            msg: msg,
            data: data,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const paymentPaypal = catchAsync(async (req, res) => {
    try {
        const result = await orderService.paymentPaypal(req, res)
        console.log('result')
        // res.json(result)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const payPalReturn = catchAsync(async (req, res) => {
    try {
        const result = await orderService.payPalReturn(req)
        res.redirect(`http://localhost:3000/cart/payment/id=${result._id}/${result.ispay}`)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

module.exports = {
    addOrder,
    payment,
    paymentReturn,
    getList,
    cancelOrder,
    orderById,
    paymentPaypal,
    payPalReturn,
}
