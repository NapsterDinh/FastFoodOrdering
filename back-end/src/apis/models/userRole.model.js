const mongoose = require('mongoose')

const userRoleSchema = mongoose.Schema(
    {
        roleName: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const userRole = mongoose.model('userRole', userRoleSchema)

module.exports = userRole
