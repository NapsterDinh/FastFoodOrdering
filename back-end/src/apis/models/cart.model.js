const mongoose = require('mongoose')

const cartSchema = mongoose.Schema(
    {
        cartItemId: {
            type: Array,
            required: true,
            trim: true,
            ref: 'cartItem',
            default: [],
        },
        userId: {
            type: String,
            required: true,
            trim: true,
        },
        totalPrice: {
            type: Number,
            trim: true,
            default: 0,
        },
        mount: {
            type: Number,
            trim: true,
            default: 0,
        },
        isPrimary: {
            type: Boolean,
            default: true,
        },
    },

    {
        timestamps: true,
    }
)

const cart = mongoose.model('cart', cartSchema)

module.exports = cart
