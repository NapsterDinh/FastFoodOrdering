const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const { toJSON, paginate } = require('./plugins')

const userSchema = mongoose.Schema(
    {
        roleId: {
            type: String,
            require: true,
            trim: true,
            default: 0,
        },
        userDetail: {
            type: Array,
            ref: 'userDetail',
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email')
                }
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6,
            validate(value) {
                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                    throw new Error('Password must contain at least one letter and one number')
                }
            },
            private: true,
        },
        avatar: {
            type: String,
            default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
        },
        sex: {
            type: String,
            default: 'Male',
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

userSchema.plugin(toJSON)
userSchema.plugin(paginate)

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } })
    return !!user
}

userSchema.methods.isPasswordMatch = async function (password) {
    const user = this
    return bcrypt.compare(password, user.password)
}

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})

const User = mongoose.model('users', userSchema)

module.exports = User
