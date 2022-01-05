const catchAsync = require('../../utils/catch-async')
const { orderItemService } = require('../services/index')

const orderProduct = catchAsync(async (req, res) => {
    try {
        const result = await orderItemService.ProductItem(req.body)
        res.json({
            result: true,
            msg: 'Order product success',
            data: result,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

module.exports = {
    orderProduct,
}
