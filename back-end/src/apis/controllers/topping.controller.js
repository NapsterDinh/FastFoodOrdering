const { apiMessage } = require('../../utils/api-message')
const catchAsync = require('../../utils/catch-async')
const { toppingService } = require('../services')

const addTopping = catchAsync(async (req, res) => {
    try {
        const result = await toppingService.createTopping(req.body)
        res.json({
            result: true,
            msg: 'Create Topping success',
            data: result,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const editTopping = catchAsync(async (req, res) => {
    // console.log('params', req.query)
    try {
        const result = await toppingService.editTopping(req.body)
        res.json({
            result: true,
            msg: 'Edit Topping success',
            data: result,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

module.exports = {
    addTopping,
    editTopping,
}
