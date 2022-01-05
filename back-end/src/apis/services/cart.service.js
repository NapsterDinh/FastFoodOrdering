const { carts } = require('../models/index')
const { cartItems } = require('../models/index')
const { findOneAndUpdate } = require('../models/user.model')
const { getDatabase, ref, set, child, push, query, orderByChild, equalTo, get } = require('firebase/database')
const { truncate } = require('fs/promises')

const createCart = async (userId) => {
    const result = await carts.create({ userId: userId })
    return { data: result, result: true }
}

const editCartItem = async (data) => {
    const { _id, quantity, note, sizeChoose, toppingChoose } = data
    let result = await cartItems.findOneAndUpdate(
        { _id },
        {
            quantity,
            note,
            sizeChoose,
            toppingChoose,
        },
        { new: true }
    )
    if (!result) {
        return {
            result: false,
            msg: 'Product not found',
            data: [],
        }
    }

    return { data: result, result: true }
}

const getCartByUser = async (userId, isPrimary = true) => {
    const result = await carts.find({ userId: userId, isPrimary }).populate('cartItemId')

    let totalPrice = 0
    let totalMount = 0
    result.map((c) => {
        c.cartItemId.map((i) => {
            totalPrice += i.total
            totalMount += i.quantity
        })
    })

    const data = await carts
        .findOneAndUpdate({ _id: result[0]._id, isPrimary }, { totalPrice: totalPrice, mount: totalMount }, { new: true })
        .populate('cartItemId')
        .populate({ path: 'cartItemId', populate: { path: 'toppingChoose' } })
        .populate({ path: 'cartItemId', populate: { path: 'sizeChoose' } })
        .populate({ path: 'cartItemId', populate: { path: 'productId' } })
        .populate({
            path: 'cartItemId',
            populate: [
                { path: 'productId' },
                {
                    path: 'productId',
                    populate: {
                        path: 'size',
                    },
                },
                {
                    path: 'productId',
                    populate: {
                        path: 'topping',
                    },
                },
            ],
        })
        .populate('userId', null, 'users')

    if (!result) {
        return {
            data: [],
        }
    } else {
        return { data: data }
    }
}

const createShare = async (req) => {
    const { sub } = req.user
    const { roomId } = req.body
    const database = getDatabase()

    const oldCart = await checkShareCart(req)

    if (oldCart) {
        return oldCart
    }

    const result = await carts.create({ userId: sub, isPrimary: false })
    const id = push(child(ref(database), 'cartShares')).key

    const newCart = {
        roomId: roomId,
        cartId: result._id.toString(),
        ownerId: sub,
        status: 'process',
    }
    await set(ref(database, `/cartShares/${id}`), newCart)

    return newCart
}

const checkShareCart = async (req) => {
    const { sub } = req.user
    const database = getDatabase()

    const oldCartQuery = query(ref(database, 'cartShares'), orderByChild('ownerId'), equalTo(sub))
    const oldCart = await get(oldCartQuery)

    if (oldCart.val()) {
        const result = Object.keys(oldCart.val()).map((key) => oldCart.val()[key])
        return result.find((item) => item.status === 'process')
    }

    return null
}

const removeShareCart = async (req) => {
    const { sub } = req.user
    const database = getDatabase()

    const oldCartQuery = query(ref(database, 'cartShares'), orderByChild('ownerId'), equalTo(sub))
    const oldCart = await get(oldCartQuery)

    const result = Object.keys(oldCart.val()).map((key) => {
        return {
            ...oldCart.val()[key],
            key,
        }
    })
    const data = result.find((item) => item.status === 'process')

    if (data) {
        await set(ref(database, `/cartShares/${data?.key}`), {
            ...data,
            status: 'done',
        })
    }

    return await carts.findOneAndDelete({ userId: sub, isPrimary: false }, { new: true })
}

const doneOrder = async (req) => {
    const { roomId } = req.body
    const { sub } = req.user
    const database = getDatabase()

    const oldCartQuery = query(ref(database, 'cartShares'), orderByChild('roomId'), equalTo(roomId))
    const oldCart = await get(oldCartQuery)

    const result = Object.keys(oldCart.val()).map((key) => {
        return {
            ...oldCart.val()[key],
            key,
        }
    })

    result[0].member = result[0]?.member?.map((item) => {
        if (item?.userId === sub) {
            item.isDone = true
        }

        return item
    })

    await set(ref(database, `/cartShares/${result[0]?.key}`), {
        ...result[0],
    })

    return result[0]
}

const joinOrder = async (req) => {
    const { roomId } = req.body
    const { sub } = req.user
    const database = getDatabase()

    const oldCartQuery = query(ref(database, 'cartShares'), orderByChild('roomId'), equalTo(roomId))
    const oldCart = await get(oldCartQuery)

    let result = Object.keys(oldCart.val()).map((key) => {
        return {
            ...oldCart.val()[key],
            key,
        }
    })

    if (!!result[0]?.member && result[0].member.some((item) => item.userId === sub)) {
        return result[0]
    }

    result[0].member = [
        ...(result[0]?.member || []),
        {
            userId: sub,
            isDone: sub == result[0]?.ownerId,
        },
    ]

    await set(ref(database, `/cartShares/${result[0]?.key}`), {
        ...result[0],
    })

    return result[0]
}

const checkoutAvailable = async (req) => {
    const { roomId } = req.body
    const database = getDatabase()

    const oldCartQuery = query(ref(database, 'cartShares'), orderByChild('roomId'), equalTo(roomId))
    const oldCart = await get(oldCartQuery)

    const result = Object.keys(oldCart.val()).map((key) => {
        return {
            ...oldCart.val()[key],
            key,
        }
    })

    return result[0]?.member?.every((item) => item?.isDone === true)
}

module.exports = {
    createCart,
    editCartItem,
    getCartByUser,
    createShare,
    checkShareCart,
    removeShareCart,
    doneOrder,
    joinOrder,
    checkoutAvailable,
}
