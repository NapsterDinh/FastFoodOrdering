const { apiMessage } = require('../../utils/api-message')
const catchAsync = require('../../utils/catch-async')
const { sizeService } = require('../services')

const addSize = catchAsync(async (req, res) => {
    try {
        const result = await sizeService.createSize(req.body)
        res.json({
            result: true,
            msg: 'Create Size success',
            data: result,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const editSize = catchAsync(async (req, res) => {
    // console.log('params', req.query)
    try {
        const result = await sizeService.editSize(req.body)
        res.json({
            result: true,
            msg: 'Edit Size success',
            data: result,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

module.exports = {
    addSize,
    editSize,
}
