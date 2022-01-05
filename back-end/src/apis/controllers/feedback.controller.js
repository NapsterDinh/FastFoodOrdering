const catchAsync = require('../../utils/catch-async')
const { feedback } = require('../services')

const createFeedback = catchAsync(async (req, res) => {
    try {
        const { data, msg, result } = await feedback.createFeedback(req)
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
    createFeedback,
}
