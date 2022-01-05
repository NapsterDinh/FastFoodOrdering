const express = require('express')

const { toppingController } = require('../../controllers')
const { authValidation } = require('../../validations')

const validate = require('../../../middlewares/validate')
const authenticateMiddleware = require('../../../middlewares/auth')

const router = express.Router()

router.post('/addTopping', toppingController.addTopping)
router.put('/editTopping', toppingController.editTopping)

module.exports = router
