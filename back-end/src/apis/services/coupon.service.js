const { coupons } = require('../models')

const createCoupon = async (data) => {
    const newCoupon = new coupons(data)
    const result = await newCoupon.save()
    return {
        result: true,
        msg: 'success',
        data: result,
    }
}

const getCoupon = async () => {
    const coupon = await coupons.find()

    const dateNow = new Date(Date.now()).toISOString().replace(/T/, ' ').replace(/\..+/, '')
    let product, delivery
    await Promise.all(
        (product = coupon.filter((c) => {
            return (
                c.type === 'product' &&
                c.dateOfExpire.toISOString().replace(/T/, ' ').replace(/\..+/, '') > dateNow &&
                c.quantity > 0
            )
        })),
        (delivery = coupon.filter((c) => {
            return (
                c.type === 'delivery' &&
                c.dateOfExpire.toISOString().replace(/T/, ' ').replace(/\..+/, '') > dateNow &&
                c.quantity > 0
            )
        }))
    )

    //(c.type==="product") &&(c.dateOfExpire.toISOString().replace(/T/, ' ').replace(/\..+/, '')>dateNow) &&(c.quantity>0)
    // const dateOfExpire = coupon.dateOfExpire.toISOString().replace(/T/, ' ').replace(/\..+/, '')
    // const dateNow = new Date(Date.now()).toISOString().replace(/T/, ' ').replace(/\..+/, '')

    // if (dateNow > dateOfExpire) {
    //     console.log('now')
    // } else {
    //     console.log('end')
    // }
    return { data: { product, delivery }, msg: 'Get coupon success', result: true }
}

const usingCoupon = async (data) => {
    const { couponId } = data

    const checkCoupon = await coupons.findOne({ code: couponId })
    console.log('checkCoupon', checkCoupon)
    if (checkCoupon) {
        let fDate, lDate, cDate
        fDate = Date.parse(checkCoupon.dateOfIssue)
        lDate = Date.parse(checkCoupon.dateOfExpire)
        cDate = Date.parse(new Date())
        if (cDate <= lDate && cDate >= fDate) {
            const { discount, productId, title } = checkCoupon
            return {
                result: true,
                msg: title,
                data: { discount, productId },
            }
        }
    } else {
        return {
            result: false,
            msg: 'Coupon is not found or Exprire',
            data: [],
        }
    }
}

const CouponByProductId = async (data) => {
    const { productId } = data

    const CouponProductId = await coupons.find({ productId: productId })
    console.log('checkCoupon', CouponProductId)
    if (CouponProductId && CouponProductId.quantity > 0) {
        const { title } = CouponProductId
        return {
            result: true,
            msg: title,
            data: CouponProductId,
        }
    } else {
        return {
            result: false,
            msg: 'Coupon is not found',
            data: [],
        }
    }
}

// const usingCoupon = async (data) => {
//     const { _id } = data
//     const CouponProductId = await coupons.updateOne(
//         { _id: _id },
//         {$inc:{quantity=-1}})
//     console.log('checkCoupon', CouponProductId)
// }

module.exports = {
    createCoupon,
    usingCoupon,
    CouponByProductId,
    getCoupon,
}
