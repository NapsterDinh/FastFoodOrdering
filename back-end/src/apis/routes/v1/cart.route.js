const express = require('express')

const { cartController } = require('../../controllers')
const { authValidation } = require('../../validations')
const authenticateMiddleware = require('../../../middlewares/auth')

const validate = require('../../../middlewares/validate')
const { categoryValidation } = require('../../validations')

const router = express.Router()

router.put('/editCartItem', cartController.editCartItem)
router.post('/getByUserId', cartController.getCartByUserId)
router.post('/createShare', authenticateMiddleware, cartController.createShare)
router.post('/checkShareCart', authenticateMiddleware, cartController.checkShareCart)
router.post('/removeShareCart', authenticateMiddleware, cartController.removeShareCart)
router.post('/doneOrder', authenticateMiddleware, cartController.doneOrder)
router.post('/joinOrder', authenticateMiddleware, cartController.joinOrder)
router.post('/checkoutAvailable', authenticateMiddleware, cartController.checkoutAvailable)

module.exports = router
