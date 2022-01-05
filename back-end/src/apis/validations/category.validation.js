const Joi = require('joi')

const categorySchema = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
    }),
}

const editCategory = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
    }),
}

module.exports = {
    categorySchema,
    editCategory,
}
