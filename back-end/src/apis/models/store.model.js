const mongoose = require('mongoose')

const storeSchema = mongoose.Schema(
    {
        managerId: {
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
        address: {
            type: String,
        },
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
        rating: {
            type: Number,
        },
        image: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const store = mongoose.model('store', storeSchema)

module.exports = store
