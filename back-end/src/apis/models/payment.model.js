const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema({
    idOrder: {
        type: String,
    },
    type: {
        type: String,
    },
    code: {
        type: String,
    },
    value: {
        type: Number,
    },
    discount: {
        type: Number,
    },
})

const payment = mongoose.model('payment', paymentSchema)

module.exports = payment
