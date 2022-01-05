const { sizes } = require('../models')

const createSize = async (data) => {
    const newSize = new sizes(data)
    const result = await newSize.save()
    return result
}

const editSize = async (data) => {
    const { _id, price } = data
    const result = await sizes.findOneAndUpdate(
        { _id },
        {
            price,
        },
        { new: true }
    )
    return result
}

module.exports = {
    createSize,
    editSize,
}
