const express = require('express')

const { productController } = require('../../controllers')
const { authValidation } = require('../../validations')

const validate = require('../../../middlewares/validate')
const { productValidation } = require('../../validations')

const router = express.Router()

router.post('/addProduct', validate(productValidation.productSchema), productController.addProduct)
router.get('/listProduct', productController.listProduct)
router.get('/listProductByCategoryId', productController.listProductByCategoryId)
router.put('/editProduct', validate(productValidation.editProduct), productController.editProduct)
router.delete('/deleteProduct', productController.deleteProduct)

module.exports = router
