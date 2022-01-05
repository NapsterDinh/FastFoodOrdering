const mongoose = require('mongoose')

const sizeSchema = mongoose.Schema(
    {
        type: {
            type: String,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
)

const size = mongoose.model('size', sizeSchema)

module.exports = size
