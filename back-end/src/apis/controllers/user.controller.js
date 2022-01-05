const httpStatus = require('http-status')
const catchAsync = require('../../utils/catch-async')
const { userService } = require('../services')
const { token } = require('../../configs')
const { google } = require('googleapis')
const { OAuth2 } = google.auth
const fetch = require('node-fetch')
const { apiMessage } = require('../../utils/api-message')
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const register = catchAsync(async (req, res) => {
    try {
        const { result, msg, data } = await userService.createUser(req.body)

        res.json({
            result: result,
            msg: msg || apiMessage.registerSuccess,
            data: data,
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

const verifyEmail = catchAsync(async (req, res) => {
    try {
        await userService.activateEmail(req.query.token)
        res.json({ msg: apiMessage.activeAcccount })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

const login = catchAsync(async (req, res) => {
    try {
        const { result, msg, data } = await userService.login(req.body)

        res.json({
            result: result,
            msg: msg || apiMessage.loginSuccess,
            data: data,
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

const forgotPassword = catchAsync(async (req, res) => {
    try {
        const { result, msg } = await userService.forgotPassword(req.body)
        res.json({
            result: result,
            msg: msg || apiMessage.sendMail,
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

const refreshToken = catchAsync(async (req, res) => {
    try {
        const { result, user, token } = await userService.refreshToken(req.body)

        if (!result) {
            return res.json({
                result: result,
            })
        }

        return res.json({
            result: true,
            user,
            token,
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

const resetPassword = catchAsync(async (req, res) => {
    try {
        await userService.resetPassword(req)
        res.json({
            result: true,
            msg: apiMessage.resetPasswordSuccess,
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

const updateUser = catchAsync(async (req, res) => {
    try {
        const { data, result, msg } = await userService.updateUser(req)
        res.json({
            result: result,
            msg: msg,
            data: data,
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

const newAddress = catchAsync(async (req, res) => {
    try {
        const { data, result, msg } = await userService.newAddress(req)
        res.json({
            result: result,
            msg: msg,
            data: data,
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})
const getAllAddress = catchAsync(async (req, res) => {
    try {
        const { data, result, msg } = await userService.getAllAddress(req)
        res.json({
            result: result,
            msg: msg,
            data: data,
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

const updateDefault = catchAsync(async (req, res) => {
    try {
        const { data, result, msg } = await userService.updateDefault(req)
        res.json({
            result: result,
            msg: msg,
            data: data,
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

const updateAddress = catchAsync(async (req, res) => {
    try {
        const { data, result, msg } = await userService.updateAddress(req)
        res.json({
            result: result,
            msg: msg,
            data: data,
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

const updateAddressDefault = catchAsync(async (req, res) => {
    try {
        const { data, result, msg } = await userService.updateAddressDefault(req)
        res.json({
            result: result,
            msg: msg,
            data: data,
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

const deleteAddress = catchAsync(async (req, res) => {
    try {
        const { data, result, msg } = await userService.deleteAddress(req)
        res.json({
            result: result,
            msg: msg,
            data: data,
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

const googleLogin = catchAsync(async (req, res) => {
    try {
        const { result, msg, data } = await userService.googleLogin(req.body)

        res.json({
            result: result,
            msg: msg || apiMessage.loginSuccess,
            data: data,
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

const facebookLogin = catchAsync(async (req, res) => {
    try {
        const { result, msg, data } = await userService.facebookLogin(req.body)

        res.json({
            result: result,
            msg: msg || apiMessage.loginSuccess,
            data: data,
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

module.exports = {
    register,
    verifyEmail,
    login,
    forgotPassword,
    resetPassword,
    updateUser,
    googleLogin,
    facebookLogin,
    newAddress,
    updateAddress,
    updateAddressDefault,
    deleteAddress,
    getAllAddress,
    updateDefault,
    refreshToken,
}
