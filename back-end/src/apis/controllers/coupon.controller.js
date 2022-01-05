const catchAsync = require('../../utils/catch-async')
const { couponService } = require('../services/index')

const addCoupon = catchAsync(async (req, res) => {
    try {
        const { result, msg, data } = await couponService.createCoupon(req.body)
        res.json({
            result: result,
            msg: msg || 'Add to coupon success',
            data: data,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const getCoupon = catchAsync(async (req, res) => {
    try {
        const { result, msg, data } = await couponService.getCoupon()
        res.json({
            result: result,
            msg: msg || 'Add to coupon success',
            data: data,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const usingCoupon = catchAsync(async (req, res) => {
    try {
        const { result, msg, data } = await couponService.usingCoupon(req.query)
        res.json({
            result: result,
            msg: msg,
            data: data,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const CouponByProductId = catchAsync(async (req, res) => {
    try {
        const { result, msg, data } = await couponService.CouponByProductId(req.query)
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
    addCoupon,
    usingCoupon,
    CouponByProductId,
    getCoupon,
}
