const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const { toJSON, paginate } = require('./plugins')

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const Category = mongoose.model('category', categorySchema)

module.exports = Category
