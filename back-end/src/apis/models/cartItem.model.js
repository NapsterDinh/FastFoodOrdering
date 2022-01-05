const { double } = require('cli-boxes')
const { string } = require('joi')
const mongoose = require('mongoose')

const cartItemSchema = mongoose.Schema(
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

const cartItem = mongoose.model('cartItem', cartItemSchema)

module.exports = cartItem
