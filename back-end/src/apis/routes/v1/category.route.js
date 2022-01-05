const express = require('express')

const { categoryController } = require('../../controllers')
const { authValidation } = require('../../validations')

const validate = require('../../../middlewares/validate')
const { categoryValidation } = require('../../validations')

const router = express.Router()

router.post('/addCategory', validate(categoryValidation.categorySchema), categoryController.addCategory)
router.get('/getListCategory', categoryController.getListCategory)

module.exports = router
