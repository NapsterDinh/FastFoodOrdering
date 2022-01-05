const { feedbacks, orders } = require('../models')

const createFeedback = async (data) => {
    const check = await feedbacks.findOne({ userId: data.user.sub, idOrder: data.body.idOrder })

    if (check) {
        return { data: [], msg: 'You are one Feedback order !', result: false }
    } else {
        const newOrder = new feedbacks({
            userId: data.user.sub,
            idOrder: data.body.idOrder,
            rating: data.body.rating,
            feedback: data.body.feedback,
        })
        const result = await newOrder.save()

        if (result) {
            await orders.updateOne({ userId: data.user.sub, _id: data.body.idOrder }, { feedbackId: result._id.toString() })
            return { data: result, msg: 'Feedback order success!', result: true }
        } else {
            return { data: [], msg: 'Feedback order fail!', result: false }
        }
    }
}

module.exports = {
    createFeedback,
}
