const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema(
    {
        idUser: {
            type: String,
        },
        idOrder: {
            type: String,
        },
        rating: {
            type: Number,
        },

        feedback: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const feedback = mongoose.model('feedback', feedbackSchema)

module.exports = feedback
