const catchAsync = require('../../utils/catch-async')
const { categoryService } = require('../services/index')

const addCategory = catchAsync(async (req, res) => {
    try {
        const result = await categoryService.addCategory(req.body)
        res.json({
            result: true,
            msg: 'Add category success',
            data: result,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const getListCategory = catchAsync(async (req, res) => {
    try {
        const { result, msg, data } = await categoryService.getListCategory()
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
    addCategory,
    getListCategory,
}
