const { toppings } = require('../models')

const createTopping = async (data) => {
    const newSize = new toppings(data)
    const result = await newSize.save()
    return result
}

const editTopping = async (data) => {
    const { _id, price } = data
    const result = await toppings.findOneAndUpdate(
        { _id },
        {
            price,
        },
        { new: true }
    )
    return result
}

module.exports = {
    createTopping,
    editTopping,
}
