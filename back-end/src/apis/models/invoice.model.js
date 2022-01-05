const mongoose = require('mongoose')
var Float = require('mongoose-float').loadType(mongoose)

const invoicetSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            trim: true,
        },
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        total: {
            type: Float,
        },
    },
    {
        timestamps: true,
    }
)

const invoice = mongoose.model('invoice', invoicetSchema)

module.exports = invoice
