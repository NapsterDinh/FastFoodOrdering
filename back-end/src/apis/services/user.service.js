const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { google } = require('googleapis')
const { OAuth2 } = google.auth
const fetch = require('node-fetch')
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const { Users, userDetails } = require('../models')
const mailService = require('../../_shared/sendMail')

const { cartService, tokenService } = require('../services')
const { APP_SCHEMA, APP_HOST, APP_PORT, APP_ROUTE_PREFIX, CLIENT_PORT, PASSPORT_JWT } = process.env

const createUser = async (userBody) => {
    if (await Users.isEmailTaken(userBody?.email)) {
        // throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already taken')
        return {
            result: false,
            msg: 'Email is already taken',
            data: userBody,
        }
    }

    if (await userDetails.findOne({ phone: userBody.phone })) {
        return {
            result: false,
            msg: 'Phone is already taken',
            data: userBody,
        }
    }

    const { name, email, password } = userBody
    const newUser = new Users({
        name,
        email,
        password,
    })

    const user = await newUser.save()
    const userDetail = await userDetails.create({ userId: user?._id.toString(), name: user?.name, phone: userBody?.phone })
    const result = await Users.findOneAndUpdate(
        { _id: user._id },
        { $push: { userDetail: userDetail._id.toString() } },
        { new: true }
    ).populate('userDetail')

    const token = await tokenService.generateAuthTokens(user)
    const url = `${APP_SCHEMA}://${APP_HOST}:${APP_PORT}${APP_ROUTE_PREFIX}/v1/user/verify-email?token=${token.access.token}`
    console.log('userBody.email', userBody.email)
    mailService(userBody.email, url, 'Verify your email address')
    return {
        result: true,
        msg: 'Verify your email address',
        data: result,
    }
}

const activateEmail = async (data) => {
    const userId = jwt.verify(data, process.env.PASSPORT_JWT)
    const { sub } = userId

    await Users.findOneAndUpdate(
        {
            _id: sub,
        },
        {
            isEmailVerified: true,
        }
    )
    await cartService.createCart(sub)
}

const login = async (data) => {
    const { email, password } = data

    const user = await Users.findOne({ email })
    if (!user) {
        return {
            result: false,
            msg: 'Email not found ',
            data: '',
        }
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch || !user.email) {
        return {
            result: false,
            msg: 'Email or password incorrect ',
            data: '',
        }
    } else if (!user.isEmailVerified) {
        return {
            result: false,
            msg: 'Email is not verify ',
            data: '',
        }
    }
    const token = await tokenService.generateAuthTokens(user)
    const cart = await cartService.getCartByUser(user._id.toString())
    return {
        result: true,
        msg: 'Login success',
        data: { user, token, cart },
    }
}

const forgotPassword = async (data) => {
    const { email } = data

    const user = await Users.findOne({ email })

    if (!user) {
        return {
            result: false,
            msg: 'Email is not found ',
        }
    }
    const token = await tokenService.generateAuthTokens(user)
    console.log('=====', token)
    const url = `${APP_SCHEMA}://${APP_HOST}:${CLIENT_PORT}/reset/${token.access.token}`

    mailService(email, url, 'Verify your email address')
    return {
        result: true,
    }
}

const refreshToken = async (data) => {
    const { refreshToken } = data

    const oldRefresh = await tokenService.getTokenByRefresh(refreshToken)
    const oldRefreshToken = jwt.verify(oldRefresh?.token, PASSPORT_JWT)

    if (!oldRefreshToken || oldRefreshToken.exp < moment().unix()) {
        return { result: false }
    }

    const user = await getUserById(oldRefreshToken.sub)
    const token = await tokenService.generateAuthTokens(user)

    return { result: true, user, token }
}

const getUserById = async (id) => {
    return await Users.findById(id)
}

const resetPassword = async (data) => {
    const { password } = data.body

    const hashPassword = await bcrypt.hash(password, 10)

    await Users.findOneAndUpdate(
        { _id: data.user.sub },
        {
            password: hashPassword,
        }
    )
}

const updateUser = async (data) => {
    const { name, avatar, email, phone, sex, address, dateOfBirth } = data.body
    const checkPhone = await userDetails.findOne({ phone })
    const checkEmail = await Users.findOne({ email })
    const checkuser = await Users.findOne({ _id: data.user.sub })
    const checkuserDetail = await Users.findOne({ userId: data.user.sub })
    if (email === checkuser.email) {
        console.log('a')
        var user = await Users.findOneAndUpdate(
            { _id: data.user.sub },
            {
                avatar,
            },
            { new: true }
        )
    } else if (email !== checkuser.email && !checkEmail) {
        console.log('b')
        var user = await Users.findOneAndUpdate(
            { _id: data.user.sub },
            {
                email,
                avatar,
            },
            { new: true }
        )
    } else {
        return {
            result: false,
            msg: 'Email is already taken',
            data: [],
        }
    }

    if (phone === checkuserDetail.phone) {
        console.log('a')
        var userDetail = await userDetails.findOneAndUpdate(
            { _id: data.user.sub },
            {
                name,
                dateOfBirth,
                address,
                sex,
            },
            { new: true }
        )
    } else if (phone !== checkuserDetail.phone && !checkPhone) {
        console.log('b')
        var userDetail = await userDetails.findOneAndUpdate(
            { userId: data.user.sub },
            {
                name,
                phone,
                dateOfBirth,
                sex,
            },
            { new: true }
        )
    } else if (checkPhone) {
        return {
            result: false,
            msg: 'Phone is already taken',
            data: [],
        }
    }

    return { data: { user, userDetail }, msg: 'update user success', result: true }
}

const getAllAddress = async (data) => {
    const result = await userDetails.find({ userId: data.user.sub })
    if (result) {
        return { data: result, msg: 'Get all address success', result: true }
    } else {
        return { data: [], msg: 'Get all address fail', result: false }
    }
}

const updateDefault = async (data) => {
    const userDetailt = await userDetails.findOne({ userId: data.user.sub, isDefault: true })
    if (userDetailt?._id !== undefined) {
        await userDetails.updateOne({ _id: userDetailt._id }, { isDefault: false })
    }
    const result = await userDetails.findOneAndUpdate({ _id: data.body.id }, { isDefault: true }, { new: true })
    if (result) {
        const result1 = await userDetails.find({ userId: data.user.sub })
        return { data: result1, msg: 'Update address success', result: true }
    } else {
        return { data: [], msg: 'Update address fail', result: false }
    }
}

const newAddress = async (data) => {
    const { name, phone, type, fullAddress, city, province, town, street, latitude, longitude } = data.body

    const result = await userDetails.create({
        userId: data.user.sub,
        name: name,
        phone: phone,
        type: type,
        fullAddress: fullAddress,
        city: city,
        province: province,
        town: town,
        street: street,
        latitude: latitude,
        longitude: longitude,
    })
    const user = await Users.findOneAndUpdate(
        { _id: data.user.sub },
        { $push: { userDetail: result._id.toString() } },
        { new: true }
    ).populate('userDetail')

    const result2 = await userDetails.find({ userId: data.user.sub })

    return { data: result2, msg: 'Create address success', result: true }
}

const updateAddress = async (data) => {
    console.log(data.body)
    const { _id, name, phone, type, fullAddress, city, province, town, street, latitude, longitude } = data.body

    const result = await userDetails.findOneAndUpdate(
        { _id: _id },
        {
            name: name,
            phone: phone,
            type: type,
            fullAddress: fullAddress,
            city: city,
            province: province,
            town: town,
            street: street,
            latitude: latitude,
            longitude: longitude,
        },
        { new: true }
    )

    const result2 = await userDetails.find({ userId: data.user.sub })
    return { data: result2, msg: 'update address success', result: true }
}

const deleteAddress = async (data) => {
    const { _id } = data.query

    await userDetails.findOneAndDelete({ _id: _id }, { new: true })
    await Users.findOneAndUpdate({ _id: _id }, { $pull: { userDetail: _id } }, { new: true })

    const result1 = await userDetails.find({ userId: data.user.sub })
    await userDetails.findOneAndUpdate({ _id: result1[0]._id }, { isDefault: true }, { new: true })

    const result2 = [...result1]
    result2[0].isDefault = true
    result2[0].new = true
    return { data: result2, msg: 'Delete address success', result: true }
}

const googleLogin = async (data) => {
    const { tokenId } = data

    const verify = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.MAILING_SERVICE_CLIENT_ID,
    })
    const { email_verified, email, name, picture } = verify.payload

    const password = email + process.env.GOOGLE_SECRET
    let user = await Users.findOne({ email })
    if (!email_verified) {
        return {
            result: false,
            msg: 'Email verification failed. ',
        }
    }

    if (user) {
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return {
                result: false,
                msg: 'Email is using ',
                data: [],
            }
        }

        const token = await tokenService.generateAuthTokens(user)
        const cart = await cartService.getCartByUser(user._id)

        return {
            result: true,
            data: { user, cart, token },
            msg: 'Login Google success',
        }
    } else {
        const newUser = new Users({
            name,
            email,
            password: password,
            avatar: picture,
            isEmailVerified: email_verified,
            phone: 0,
        })

        console.log(name, email, password, picture)

        user = await newUser.save()
        cart = await cartService.createCart(user._id)

        const token = await tokenService.generateAuthTokens(user)

        return {
            result: true,
            data: { user, token, cart },
            msg: 'Login Google success',
        }
    }
}

const facebookLogin = async (body) => {
    const { accessToken, userID } = body

    const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`
    console.log('URL', URL)
    const resFb = await fetch(URL)
        .then((res) => res.json())
        .then((res) => {
            return res
        })

    const { email, name, picture } = resFb
    const password = email + process.env.FACEBOOK_SECRET
    let user = await Users.findOne({ email })

    if (user) {
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return {
                result: false,
                msg: 'Email is using ',
                data: [],
            }
        }

        const token = await tokenService.generateAuthTokens(user)
        const cart = await cartService.getCartByUser(user._id.toString())
        console.log('Login', user)
        return {
            result: true,
            data: { user, cart, token },
            msg: 'Login Facebook success',
        }
    } else {
        const newUser = new Users({
            name,
            email,
            password: password,
            avatar: picture.data.url,
            isEmailVerified: true,
        })

        user = await newUser.save()
        await cartService.createCart(user._id)

        const token = await tokenService.generateAuthTokens(user)
        const cart = await cartService.createCart(user._id)

        return {
            result: true,
            data: { user, cart, token },
            msg: 'Login Facebook success',
        }
    }
}

module.exports = {
    createUser,
    activateEmail,
    login,
    resetPassword,
    forgotPassword,
    updateUser,
    googleLogin,
    facebookLogin,
    newAddress,
    updateAddress,
    deleteAddress,
    getAllAddress,
    updateDefault,
    getUserById,
    refreshToken,
}
