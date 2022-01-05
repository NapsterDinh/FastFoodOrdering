const mongoose = require('mongoose')

const orderLogSchema = mongoose.Schema(
    {
        orderId: {
            type: String,
        },
        status: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const orderItem = mongoose.model('orderLog', orderLogSchema)

module.exports = orderItem
