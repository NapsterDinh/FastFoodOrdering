const { categories } = require('../models/index')

const addCategory = async (data) => {
    const newCategory = new categories(data)
    const result = await newCategory.save()
    return result
}

const getListCategory = async () => {
    const result = await categories.find()
    if (result) {
        return { data: result, msg: 'Get category success', result: true }
    } else {
        return { data: [], msg: 'Get category false', result: false }
    }
}

module.exports = {
    addCategory,
    getListCategory,
}
