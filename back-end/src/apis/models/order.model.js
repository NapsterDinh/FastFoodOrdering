const mongoose = require('mongoose')
let Schema = mongoose.Schema

const orderSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            require: true,
            trim: true,
        },
        userDetailId: {
            type: String,
            ref: 'userDetail',
        },
        branchId: {
            type: String,
            ref: 'store',
        },
        orderItemId: {
            type: Array,
            trim: true,
            ref: 'orderItem',
        },
        feedbackId: {
            type: Schema.Types.ObjectId,
            default: '111111111111111111111111',
            ref: 'feedback',
        },

        couponId: {
            type: Array,
            trim: true,
        },
        status: {
            type: String,
        },
        note: {
            type: String,
        },
        cartOverview: {
            type: String,
        },
        totalPrice: {
            type: Number,
        },
        deliveryFee: {
            type: Number,
        },
        realPrice: {
            type: Number,
        },
        amount: {
            type: Number,
        },
        ispay: {
            type: Boolean,
            default: false,
        },
        typePayment: {
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

const order = mongoose.model('order', orderSchema)

module.exports = order
