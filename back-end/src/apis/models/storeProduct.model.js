const mongoose = require('mongoose')

const storeProductSchema = mongoose.Schema(
    {
        storeId: {
            type: String,
            required: true,
            trim: true,
        },
        productId: {
            type: Number,
            require: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
)

const storeProduct = mongoose.model('storeProduct', storeProductSchema)

module.exports = storeProduct
