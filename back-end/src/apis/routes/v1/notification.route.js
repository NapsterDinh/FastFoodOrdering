const express = require('express')

const { notificationController } = require('../../controllers')
const { authValidation } = require('../../validations')

const validate = require('../../../middlewares/validate')
const { notificationValidation } = require('../../validations')
const authenticateMiddleware = require('../../../middlewares/auth')

const router = express.Router()

router.post('/addNotification', notificationController.addNotification)
router.post('/markRead', authenticateMiddleware, notificationController.markAsRead)
router.get('/markReadAll', authenticateMiddleware, notificationController.markAsReadAll)
router.get('/listAllNotification', authenticateMiddleware, notificationController.listNotification)
router.get('/notificationById', authenticateMiddleware, notificationController.notificationById)
router.get('/notificationIsRead', authenticateMiddleware, notificationController.listNotificationIsRead)
router.delete('/deleteNotificationById', authenticateMiddleware, notificationController.deleteNotificationById)

module.exports = router
