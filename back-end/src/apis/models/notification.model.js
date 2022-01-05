const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
        },
        type: {
            type: String,
        },
        title: {
            type: String,
        },
        image: {
            type: String,
            default:
                'https://www.google.com/search?q=image+notification&tbm=isch&source=iu&ictx=1&fir=WgOmcGvL2ZNPKM%252CN97KgPRFtfS97M%252C_%253BURA8c23OHfYcWM%252CqbccSsch7gyd0M%252C_%253BqR-MMwAmWPR8_M%252CN97KgPRFtfS97M%252C_%253BMxU5W4u9ukM6sM%252CnIpxHkHgqc8EuM%252C_%253B935TI371OMvjYM%252C0tPN7iex39bmWM%252C_%253BNSdHOdrp6DxByM%252CS8QAHkt6wkTD5M%252C_%253B0IJh4mjRf42nPM%252CNw-ut2k5tZVEFM%252C_%253BMmfpHcL8kniK_M%252C67n7ZbwQf0nShM%252C_%253BQMzf-WzARXq3jM%252CBz7HhUOaj0UNZM%252C_%253B8SfvkcU7ckSoyM%252CU8KeAdcC2uHBIM%252C_%253BvROODNlkQ8aovM%252CS8QAHkt6wkTD5M%252C_%253BcMNNMOHG4rg_jM%252ChqWhzXeIYD4x3M%252C_%253BFUuhoqD7RpZThM%252CS8QAHkt6wkTD5M%252C_&vet=1&usg=AI4_-kQuaLuZ_BesdzMjrH96Gfrn_LwGLw&sa=X&ved=2ahUKEwjTzfD765H0AhVtyzgGHc6TD0cQ9QF6BAgIEAE#imgrc=URA8c23OHfYcWM',
        },
        status: {
            type: String,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

const notification = mongoose.model('notification', notificationSchema)

module.exports = notification
