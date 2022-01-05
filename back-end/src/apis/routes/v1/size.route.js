const express = require('express')

const { sizeController } = require('../../controllers')
const { authValidation } = require('../../validations')

const validate = require('../../../middlewares/validate')
const authenticateMiddleware = require('../../../middlewares/auth')

const router = express.Router()

router.post('/addSize', sizeController.addSize)
router.put('/editSize', sizeController.editSize)

module.exports = router
