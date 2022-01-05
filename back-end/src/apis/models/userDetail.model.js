const mongoose = require('mongoose')

const userDetailSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            trim: true,
            ref: 'User',
        },
        name: {
            type: String,
        },

        dateOfBirth: {
            type: Date,
        },
        phone: {
            type: Number,
        },
        type: {
            type: String,
        },
        fullAddress: {
            type: String,
        },
        city: {
            type: String,
        },
        province: {
            type: String,
        },
        town: {
            type: String,
        },
        street: {
            type: String,
        },
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
        isDefault: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

const userDetail = mongoose.model('userDetail', userDetailSchema)

module.exports = userDetail
