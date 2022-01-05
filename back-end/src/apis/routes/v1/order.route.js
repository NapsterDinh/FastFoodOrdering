const express = require('express')

const { orderController } = require('../../controllers')
const authenticateMiddleware = require('../../../middlewares/auth')
const router = express.Router()

router.post('/payment', orderController.payment)
router.post('/paymentCOD', orderController.addOrder)
router.get('/vnpay_return', orderController.paymentReturn)
router.get('/getListOrder', authenticateMiddleware, orderController.getList)
router.put('/cancelOrder', authenticateMiddleware, orderController.cancelOrder)
router.get('/orderById', authenticateMiddleware, orderController.orderById)
router.post('/paymentPaypal', orderController.paymentPaypal)
router.get('/payPalReturn', orderController.payPalReturn)

module.exports = router
