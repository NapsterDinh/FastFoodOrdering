const express = require('express')

const { orderItemController } = require('../../controllers')
const { authValidation } = require('../../validations')

const validate = require('../../../middlewares/validate')
const { categoryValidation } = require('../../validations')

const router = express.Router()

router.post('/orderProduct', orderItemController.orderProduct)

module.exports = router
