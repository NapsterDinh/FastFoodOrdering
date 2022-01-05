const { stores } = require('../models')

const createStore = async (data) => {
    const newStore = new stores(data.body)
    const result = await newStore.save()
    return { data: result, msg: 'Create Store success', result: true }
}

const getAllStore = async () => {
    const result = await stores.find()
    if (result) {
        return { data: result, msg: 'Get all Store success', result: true }
    } else {
        return { data: [], msg: 'Get all Store fail', result: false }
    }
}

module.exports = {
    createStore,
    getAllStore,
}
