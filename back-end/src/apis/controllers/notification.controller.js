// const app = require('express')()
// const http = require('http').createServer(app)
// const io = require('socket.io')(http)

// const add = io.on('connection', (socket) => {
//     socket.on('message', ({ name, message }) => {
//         io.emit('message', { name, message })
//     })
// })

// module.exports = {
//     add,
// }
const { apiMessage } = require('../../utils/api-message')
const catchAsync = require('../../utils/catch-async')
const { notificationService } = require('../services')

const addNotification = catchAsync(async (req, res) => {
    try {
        const result = await notificationService.createNotification(req.body)
        res.json({
            result: true,
            msg: 'Create Notification success',
            data: result,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const listNotification = catchAsync(async (req, res) => {
    // console.log('params', req.query)
    try {
        const result = await notificationService.getListByUserId(req)
        res.json({
            result: true,
            msg: 'List Notification by userId',
            data: result,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const notificationById = catchAsync(async (req, res) => {
    try {
        const result = await notificationService.getListById(req)
        res.json({
            result: true,
            msg: ' Notification by Id',
            data: result,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const listNotificationIsRead = catchAsync(async (req, res) => {
    try {
        const result = await notificationService.getList(req)
        res.json({
            result: true,
            msg: 'List all notification user seen',
            data: result,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const deleteNotificationById = catchAsync(async (req, res) => {
    try {
        const result = await notificationService.deleteById(req)
        res.json({
            result: true,
            msg: 'Delete notification success',
            data: result,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const markAsReadAll = catchAsync(async (req, res) => {
    try {
        const result = await notificationService.markAsReadAll()
        res.json({
            result: true,
            msg: 'Read All',
            data: result,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const markAsRead = catchAsync(async (req, res) => {
    try {
        const result = await notificationService.markAsRead(req)
        res.json({
            result: true,
            msg: 'Read Successfully',
            data: result,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

module.exports = {
    addNotification,
    listNotification,
    notificationById,
    listNotificationIsRead,
    deleteNotificationById,
    markAsReadAll,
    markAsRead,
}
