const { notifications } = require('../models')

const createNotification = async (data) => {
    const newnotification = new notifications(data)
    const result = await newnotification.save()
    return result
}

const getListByUserId = async (data) => {
    // const { userId } = data
    const result = await notifications.find({ userId: data.user.sub }).sort({ createdAt: -1 })
    return result
}

const getListById = async (data) => {
    const { _id } = data.query
    const result = await notifications.findOneAndUpdate(
        { _id, userId: data.user.sub },
        {
            isRead: true,
        },
        { new: true }
    )
    return result
}

const getList = async (data) => {
    await notifications.updateMany(
        {
            userId: data.user.sub,
        },
        {
            isRead: true,
        }
    )
    const result = getListByUserId(data)
    return result
}

const deleteById = async (data) => {
    const { _id } = data.query

    const result = await notifications.findOneAndDelete(
        { _id, userId: data.user.sub },

        { new: true }
    )
    console.log(result)
    return result
}

const markAsReadAll = async () => {
    const result = await notifications.updateMany(
        {},
        {
            $set: {
                isRead: true,
            },
        }
    )

    return result
}

const markAsRead = async (data) => {
    const { _id } = data.body

    const result = await notifications.findOneAndUpdate(
        { _id, userId: data.user.sub },

        { isRead: true }
    )
    return result
}

module.exports = {
    createNotification,
    getListByUserId,
    getListById,
    getList,
    deleteById,
    markAsReadAll,
    markAsRead,
}
