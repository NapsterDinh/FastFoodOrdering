const express = require('express')

const userRoute = require('./v1/user.route')
const categoryRoute = require('./v1/category.route')
const productRoute = require('./v1/product.route')

const notificationRoute = require('./v1/notification.route')
const sizeRoute = require('./v1/size.route')
const toppingRoute = require('./v1/topping.route')
const addToCart = require('./v1/addToCart.route')
const addCart = require('./v1/cart.route')
const orderItem = require('./v1/orderItem.route')
const order = require('./v1/order.route')
const coupon = require('./v1/coupon.route')
const store = require('./v1/store.route')
const feedback = require('./v1/feedback.router')
const orderLog = require('./v1/orderLog.route')

const router = express.Router()

const defaultRoutes = [
    {
        path: '/v1/user',
        route: userRoute,
    },
    {
        path: '/v1/category',
        route: categoryRoute,
    },
    {
        path: '/v1/product',
        route: productRoute,
    },
    {
        path: '/v1/notification',
        route: notificationRoute,
    },
    {
        path: '/v1/size',
        route: sizeRoute,
    },
    {
        path: '/v1/topping',
        route: toppingRoute,
    },
    {
        path: '/v1/cartItem',
        route: addToCart,
    },
    {
        path: '/v1/cart',
        route: addCart,
    },
    {
        path: '/v1/orderItem',
        route: orderItem,
    },
    {
        path: '/v1/order',
        route: order,
    },
    {
        path: '/v1/coupon',
        route: coupon,
    },
    {
        path: '/v1/store',
        route: store,
    },
    {
        path: '/v1/feedback',
        route: feedback,
    },
    {
        path: '/v1/orderLog',
        route: orderLog,
    },
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router
