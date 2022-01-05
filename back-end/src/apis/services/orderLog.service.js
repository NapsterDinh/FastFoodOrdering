const { orderLog } = require('../models')

const createOrderLog = async (data) => {
    const result = await orderLog.create({ orderId: data.body.orderId, status: data.body.status })
    return { data: result, msg: 'Create orderLog success!', result: true }
}

const findByOrder = async (data) => {
    const result = await orderLog.find({ orderId: data.query.orderId }).sort('createdAt')
    return { data: result, msg: ' OrderLog by orderId success!', result: true }
}

module.exports = {
    createOrderLog,
    findByOrder,
}
