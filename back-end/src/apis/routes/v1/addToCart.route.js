const express = require('express')

const { addToCartController } = require('../../controllers')
const authenticateMiddleware = require('../../../middlewares/auth')

const router = express.Router()

router.post('/addToCart', authenticateMiddleware, addToCartController.addProductToCart)
router.put('/updateCartItem', authenticateMiddleware, addToCartController.updateCartIem)
router.delete('/deleteCartItem', authenticateMiddleware, addToCartController.deleteCartItem)

module.exports = router
