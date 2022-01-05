const express = require('express')

const { feedbackController } = require('../../controllers')
const authenticateMiddleware = require('../../../middlewares/auth')

const router = express.Router()

router.post('/create', authenticateMiddleware, feedbackController.createFeedback)

module.exports = router
