const Joi = require('joi')

const productSchema = {
    body: Joi.object().keys({
        categoryId: Joi.string().required(),
        name: Joi.string().required(),
        image: Joi.string().base64(),
        fileName: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().required(),
        size: Joi.array(),
        topping: Joi.array(),
    }),
}

const editProduct = {
    body: Joi.object().keys({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        price: Joi.number().required(),
    }),
}

module.exports = {
    productSchema,
    editProduct,
}
