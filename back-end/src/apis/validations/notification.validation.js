const Joi = require('joi')

const notificationSchema = {
    body: Joi.object().keys({
        type: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
    }),
}

module.exports = {
    notificationSchema,
}
