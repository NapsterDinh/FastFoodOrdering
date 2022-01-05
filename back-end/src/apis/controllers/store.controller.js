const catchAsync = require('../../utils/catch-async')
const { storeService } = require('../services')

const createStore = catchAsync(async (req, res) => {
    try {
        const { result, data, msg } = await storeService.createStore(req)
        res.json({
            result: result,
            msg: msg,
            data: data,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const getAllStore = catchAsync(async (req, res) => {
    try {
        const { result, data, msg } = await storeService.getAllStore()
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
    createStore,
    getAllStore,
}
