const mongoose = require('mongoose')

const userCouponSchema = mongoose.Schema(
    {
        couponId: {
            type: String,
            required: true,
            trim: true,
        },
        userId: {
            type: Number,
            require: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
)

const userCoupon = mongoose.model('userCoupon', userCouponSchema)

module.exports = userCoupon
