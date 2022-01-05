const jwt = require('jsonwebtoken')
const moment = require('moment')

const { tokens } = require('../models')

const env = require('../../configs/env')
const { tokenTypes } = require('../../configs/tokens')

const generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(env.passport.jwtAccessExpired / 60, 'minutes')
    const accessToken = generateToken(user._id.toString(), accessTokenExpires, tokenTypes.ACCESS)

    const refreshTokenExpires = moment().add(env.passport.jwtRefreshExpired / 60, 'minutes')
    const refreshToken = generateToken(user._id.toString(), refreshTokenExpires, tokenTypes.REFRESH)
    await saveToken(refreshToken, user._id.toString(), refreshTokenExpires, tokenTypes.REFRESH)

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    }
}

const generateToken = (userId, expires, type, secret = env.passport.jwtToken) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
    }
    return jwt.sign(payload, secret)
}

const getTokenByRefresh = async (refreshToken) => {
    const refreshTokenDoc = await Token.findOne({
        token: refreshToken,
        type: tokenTypes.REFRESH,
    })
    return refreshTokenDoc
}

const logout = async (refreshToken) => {
    const refreshTokenDoc = await getTokenByRefresh(refreshToken)
    if (!refreshTokenDoc) {
        throw new ApiError(404, 'Not found')
    }
    return await refreshTokenDoc.remove()
}

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
    const tokenDoc = await tokens.create({
        token,
        user: userId,
        expires: expires.toDate(),
        type,
        blacklisted,
    })
    return tokenDoc
}

module.exports = {
    generateAuthTokens,
    generateToken,
    getTokenByRefresh,
    logout,
}
