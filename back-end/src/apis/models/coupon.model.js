const mongoose = require('mongoose')

const couponSchema = mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
        },
        dateOfIssue: {
            type: Date,
        },
        dateOfExpire: {
            type: Date,
        },
        quantity: {
            type: Number,
            trim: true,
        },
        discount: {
            type: Number,
            trim: true,
        },
        status: {
            type: String,
        },
        productId: {
            type: Array,
        },
        image: {
            type: String,
        },
        title: {
            type: String,
        },
        type: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const coupon = mongoose.model('coupon', couponSchema)

module.exports = coupon
