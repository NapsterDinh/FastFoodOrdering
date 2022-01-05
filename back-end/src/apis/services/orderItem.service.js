const { orderItems } = require('../models')
const { orderService } = require('../services')

const ProductItem = async (data) => {
    let result = await orderItems.create(data)
    result = await result.populate('productId')
    const ItemId = result._id.toString()
    await orders.updateOne(
        { userId: result.userId },
        {
            $push: { orderItemId: ItemId },
        }
    )
    return result
}

module.exports = {
    ProductItem,
}
