const mongoose = require('mongoose')

const orderItemSchema = mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
            trim: true,
            ref: 'product',
        },
        userId: {
            type: String,
            trim: true,
        },
        quantity: {
            type: Number,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            trim: true,
        },
        total: {
            type: Number,
        },
        sizeChoose: {
            type: String,
            ref: 'size',
        },
        toppingChoose: {
            type: Array,
            ref: 'topping',
        },
        note: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const orderItem = mongoose.model('orderItem', orderItemSchema)

module.exports = orderItem
