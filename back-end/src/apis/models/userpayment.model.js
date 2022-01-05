const mongoose = require('mongoose')

const userPaymentSchema = mongoose.Schema(
    {
        numberCard: {
            type: String,
        },

        dateExpireOfCard: {
            type: String,
        },
        nameOwner: {
            type: String,
        },
        phone: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
)

const userPayment = mongoose.model('userPayment', userPaymentSchema)

module.exports = userPayment
