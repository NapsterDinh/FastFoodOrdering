const mongoose = require('mongoose')

const cartLogSchema = mongoose.Schema({
    descrition: {
        type: String,
    },
    type: {
        type: String,
    },
    curTime: {
        type: Date,
    },
})

const cartLog = mongoose.model('cartLog', cartLogSchema)

module.exports = cartLog
