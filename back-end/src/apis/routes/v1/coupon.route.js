const express = require('express')

const { couponController } = require('../../controllers')
const { authValidation } = require('../../validations')

const validate = require('../../../middlewares/validate')
const { categoryValidation } = require('../../validations')

const router = express.Router()

router.post('/addCoupon', couponController.addCoupon)
router.get('/usingCoupon', couponController.usingCoupon)
router.get('/CouponByProductId', couponController.CouponByProductId)
router.get('/getCoupon', couponController.getCoupon)

module.exports = router
