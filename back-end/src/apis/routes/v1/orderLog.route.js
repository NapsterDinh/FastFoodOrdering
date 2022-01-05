const express = require('express')

const { orderLogController } = require('../../controllers')
const authenticateMiddleware = require('../../../middlewares/auth')
const router = express.Router()

router.post('/create', orderLogController.create)
router.get('/findByOrder', orderLogController.findOrderLog)

module.exports = router
