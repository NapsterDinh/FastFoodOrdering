const catchAsync = require('../../utils/catch-async')
const { orderLogService } = require('../services')

const create = catchAsync(async (req, res) => {
    try {
        const { data, msg, result } = await orderLogService.createOrderLog(req)

        res.json({
            result: result,
            msg: msg,
            data: data,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const findOrderLog = catchAsync(async (req, res) => {
    try {
        const { data, msg, result } = await orderLogService.findByOrder(req)

        res.json({
            result: result,
            msg: msg,
            data: data,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

module.exports = { create, findOrderLog }
