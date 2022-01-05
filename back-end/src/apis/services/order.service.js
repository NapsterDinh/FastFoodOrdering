var paypal = require('paypal-node-sdk')
const { notificationMessage } = require('../../utils/api-message')
const { orderLogService } = require('../services')
const { cartItems, orderLog, orderItems, orders, notifications, products } = require('../models')
const { Http } = require('winston/lib/winston/transports')
require('dotenv').config()

paypal.configure({
    mode: 'sandbox', //sandbox or live
    client_id: process.env.yourclientid,
    client_secret: process.env.clientsecret,
})

const createOrder = async (data) => {
    let orderItemIdList = []
    await Promise.all(
        data.orderItemId.map(async (c) => {
            await cartItems.deleteOne({ _id: c._id })
            let temp = await orderItems.create({
                productId: c.productId,
                userId: c.userId,
                quantity: c.quantity,
                description: c.description,
                price: c.price,
                total: c.total,
                sizeChoose: c.sizeChoose._id,
                toppingChoose: c.toppingChoose.map((t) => t._id),
                note: c.note,
            })
            orderItemIdList.push(temp._id)
        })
    )

    const dataBody = {
        userId: data.userId,
        userDetailId: data.idUserDetail[0]._id,
        branchId: data.branchId._id,
        orderItemId: orderItemIdList,
        couponId: data.couponId,
        status: data.status,
        note: data.note,
        cartOverview: data.cartOverview,
        rating: data.rating,
        totalPrice: data.totalPrice,
        deliveryFee: data.deliveryFee,
        realPrice: data.realPrice,
        amount: data.amount,
        typePayment: data.typePayment,
        type: data.type,
        ispay: data.typePayment != 'COD'
    }

    const newOrder = new orders(dataBody)
    const result = await newOrder.save()

    await orderLog.create({ orderId: result._id, status: 'await for purchanse' })
    const prod = await products.findById(data.orderItemId[0].productId)
    await notifications.create({ userId: data.userId, description: notificationMessage.createOrder, image: prod.image })
    return result
}

let bodyPayment = null

const payment = async (req) => {
    var ipAddr =
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress

    var moment = require('moment')
    var tmnCode = process.env.vnp_TmnCode

    var secretKey = process.env.vnp_HashSecre
    var vnpUrl = process.env.vnp_Url
    var returnUrl = process.env.vnp_ReturnUrl

    const format1 = 'YYYYMMDDHHmmss'
    const format2 = 'HHmmss'
    var date2 = new Date()

    var createDate = moment(date2).format(format1)
    var orderId = moment(date2).format(format2)

    bodyPayment = req.body

    var amount = req.body.realPrice
    var bankCode = req.body.bankCode

    var orderInfo = req.body.orderDescription
    var orderType = req.body.orderType
    var locale = req.body.language
    if (locale === null || locale === '') {
        locale = 'vn'
    }
    var currCode = 'VND'
    var vnp_Params = {}
    vnp_Params['vnp_Version'] = '2.1.0'
    vnp_Params['vnp_Command'] = 'pay'
    vnp_Params['vnp_TmnCode'] = tmnCode
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale
    vnp_Params['vnp_CurrCode'] = currCode
    vnp_Params['vnp_TxnRef'] = orderId
    vnp_Params['vnp_OrderInfo'] = orderInfo
    vnp_Params['vnp_OrderType'] = orderType
    vnp_Params['vnp_Amount'] = amount * 100
    vnp_Params['vnp_ReturnUrl'] = returnUrl
    vnp_Params['vnp_IpAddr'] = ipAddr
    vnp_Params['vnp_CreateDate'] = createDate

    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode
    }

    vnp_Params = sortObject(vnp_Params)

    var querystring = require('qs')
    var signData = querystring.stringify(vnp_Params, { encode: false })
    var crypto = require('crypto')
    var hmac = crypto.createHmac('sha512', secretKey)
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex')
    vnp_Params['vnp_SecureHash'] = signed
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false })

    return { data: vnpUrl }
}

const paymentReturn = async (req) => {
    var vnp_Params = req.query

    var secureHash = vnp_Params['vnp_SecureHash']

    delete vnp_Params['vnp_SecureHash']
    delete vnp_Params['vnp_SecureHashType']

    vnp_Params = sortObject(vnp_Params)

    var config = require('config')
    // var tmnCode = config.get('vnp_TmnCode')
    // var secretKey = config.get('vnp_HashSecret')

    var secretKey = process.env.vnp_HashSecre
    var querystring = require('qs')
    var signData = querystring.stringify(vnp_Params, { encode: false })
    //console.log('signData', signData)
    var crypto = require('crypto')
    var hmac = crypto.createHmac('sha512', secretKey)
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex')

    //console.log('========', secureHash === signed, secureHash, signed)
    // if (secureHash === signed) {
    //     await createOrder({
    //         userId: bodyPayment.userId,
    //         branchId: bodyPayment.branchId._id,
    //         orderItemId: bodyPayment.orderItemId.map(t),
    //         couponId: bodyPayment.couponId,
    //         status: bodyPayment.status,
    //         note: vnp_Params.vnp_OrderInfo,
    //         cartOverview: bodyPayment.cartOverview,
    //         rating: bodyPayment.rating,
    //         totalPrice: vnp_Params.vnp_Amount,
    //         deliveryFee: bodyPayment.deliveryFee,
    //         realPrice: bodyPayment.realPrice,
    //         amount: bodyPayment.amount,
    //         ispay: true,
    //         typePayment: 'vnpay',
    //     })
    // } else {
    //     return Error
    // }
    return await createOrder({
        userId: bodyPayment.userId,
        idUserDetail: bodyPayment.idUserDetail,
        branchId: bodyPayment.branchId._id,
        orderItemId: bodyPayment.orderItemId,
        feedbackId: '',
        couponId: bodyPayment.couponId,
        status: bodyPayment.status,
        note: vnp_Params.vnp_OrderInfo,
        cartOverview: bodyPayment.cartOverview,
        rating: bodyPayment.rating,
        totalPrice: vnp_Params.vnp_Amount,
        deliveryFee: bodyPayment.deliveryFee,
        realPrice: bodyPayment.realPrice,
        amount: bodyPayment.amount,
        ispay: true,
        typePayment: bodyPayment.typePayment,
        type: bodyPayment.type,
    })
}

function sortObject(obj) {
    var sorted = {}
    var str = []
    var key
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key))
        }
    }
    str.sort()
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+')
    }
    return sorted
}

const getListOrder = async (data) => {
    let result
    if (data?.query?.type) {
        if (data?.query?.status) {
            result = await orders
                .find({ userId: data.user.sub, status: data.query.status, type: data.query.type })
                .populate('orderItemId')
                .populate('feedbackId')
                .populate('userDetailId')
                .populate({ path: 'orderItemId', populate: { path: 'productId' } })
            console.log('result', result)
            return {
                data: result,

                msg: `List order with status ${data.query.status}! and type ${data.query.type}`,
                result: true,
            }
        } else {
            result = await orders
                .find({
                    userId: data.user.sub,
                    type: data.query.type,
                })
                .populate('orderItemId')
                .populate('feedbackId')
                .populate('userDetailId')
                .populate({ path: 'orderItemId', populate: { path: 'productId' } })
            return { data: result, msg: `List order with type ${data.query.type} !`, result: true }
        }
    } else {
        result = await orders
            .find({ userId: data.user.sub })
            .populate('orderItemId')
            .populate({ path: 'orderItemId', populate: { path: 'productId' } })
        return { data: result, msg: 'List order all order of user !', result: true }
    }
}

const cancelOrder = async (data) => {
    const checkStatus = await orders.findOne({ userId: data.user.sub, _id: data.body.orderId })
    if (checkStatus.status === 'delivering') {
        return { data: [], msg: 'Can not cancel order', result: false }
    } else {
        const result = await orders
            .findOneAndUpdate({ userId: data.user.sub, _id: data.body.orderId }, { status: 'canceled' }, { new: true })
            .populate('orderItemId')
            .populate({ path: 'orderItemId', populate: { path: 'productId' } })

        if (result) {
            return { data: result, msg: 'Cancel order success!', result: true }
        } else {
            return { data: [], msg: 'Cancel order fail!', result: false }
        }
    }
}

const findOrderById = async (data) => {
    let result = await orders
        .findOne({ userId: data.user.sub, _id: data.query.orderId })
        .populate('orderItemId')
        .populate({ path: 'orderItemId', populate: { path: 'productId' } })
        .populate('feedbackId')
        .populate('userDetailId')
        .populate('branchId')
    const resultorderLog = await orderLogService.findByOrder(data)
    result = { ...result, orderLog: resultorderLog.data }

    delete result.$__
    delete result.$isNew

    if (result) {
        return { data: result, msg: 'Get order success!', result: true }
    } else {
        return { data: [], msg: 'Get order fail!', result: false }
    }
}

const paymentPaypal = async (data, res) => {
    bodyPayment = data.body
    console.log(bodyPayment)

    var newPayment = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal',
        },
        redirect_urls: {
            return_url: 'http://localhost:5000/api/v1/order/payPalReturn',
            cancel_url: 'http://cancel.url',
        },
        transactions: [
            {
                amount: {
                    currency: 'USD',
                    total: (bodyPayment.realPrice /23000).toFixed(2),
                },
                description: 'This is the payment description.',
            },
        ],
    }
    console.log('newPayment', newPayment.transactions[0].amount)

    await paypal.payment.create(newPayment, function (error, payment) {
        if (error) {
            throw error
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.status(200).send(payment.links[i].href)
                }
            }
        }
    })
}

const payPalReturn = async (req) => {
    return await createOrder({
        userId: bodyPayment.userId,
        idUserDetail: bodyPayment.idUserDetail,
        branchId: bodyPayment.branchId._id,
        orderItemId: bodyPayment.orderItemId,
        feedbackId: '',
        couponId: bodyPayment.couponId,
        status: bodyPayment.status,
        note: bodyPayment.note,
        cartOverview: bodyPayment.cartOverview,
        rating: bodyPayment.rating,
        totalPrice: bodyPayment.totalPrice,
        deliveryFee: bodyPayment.deliveryFee,
        realPrice: bodyPayment.realPrice,
        amount: bodyPayment.amount,
        ispay: true,
        typePayment: bodyPayment.typePayment,
        type: bodyPayment.type,
    })
}

module.exports = {
    createOrder,
    payment,
    paymentReturn,
    getListOrder,
    cancelOrder,
    findOrderById,
    paymentPaypal,
    payPalReturn,
}
