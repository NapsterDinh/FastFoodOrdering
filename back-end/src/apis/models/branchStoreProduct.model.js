const mongoose = require('mongoose')

const branchStoreProductSchema = mongoose.Schema(
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

const branchStoreProduct = mongoose.model('branchStoreProduct', branchStoreProductSchema)

module.exports = branchStoreProduct
