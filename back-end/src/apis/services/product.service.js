const { products } = require('../models/index')
const { findOneAndDelete } = require('../models/user.model')
const { uploadFile, getFileStream } = require('../../_shared/s3')

const addProduct = async (data) => {
    const { categoryId, name, price, description, image, size, topping, fileName } = data

    const s3Image = await uploadFile(image, fileName)
    const newProduct = new products({
        categoryId,
        price,
        name,
        description,
        image: s3Image.Location,
        size,
        topping,
    })
    const result = await newProduct.save()

    return result
}

const getList = async () => {
    const result = await products.find().populate('categoryId').populate('size').populate('topping')
    return result
}

const getListByCatelogoryId = async (data) => {
    if (data?.query?.categoryId) {
        const result = await products
            .find({ categoryId: data?.query?.categoryId })
            .populate('categoryId')
            .populate('size')
            .populate('topping')
        return { data: result, msg: 'List product by CategoryID success!', result: true }
    } else {
        const result = await products.find().populate('categoryId').populate('size').populate('topping')
        return { data: result, msg: 'Get Product success', result: true }
    }
}

const editProduct = async (data) => {
    const { _id, name, price, description, image } = data
    const result = products.findOneAndUpdate(
        { _id },
        {
            price,
            name,
            description,
            image,
        },
        { new: true }
    )

    return result
}

const deleteProduct = async (data) => {
    const { _id } = data
    const result = products.findOneAndDelete({ _id }, { new: true })

    return result
}

module.exports = {
    addProduct,
    getList,
    getListByCatelogoryId,
    editProduct,
    deleteProduct,
}
