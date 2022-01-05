const { cartItems } = require('../models')
const { carts } = require('../models')
const { orderItems } = require('../models')
const { getCartByUser } = require('../services/cart.service')

const addToCart = async (data) => {
    const ownerId = data.body?.ownerId
    let cardItem = { ...data.body, userId: ownerId ?? data.user.sub }

    cardItem = {
        ...cardItem,
        toppingChoose: cardItem.toppingChoose.map((item) => item._id),
    }

    let result = await cartItems.create(cardItem)

    result = await cartItems
        .findOne({ _id: result._id })
        .populate('productId')
        .populate('sizeChoose')
        .populate('toppingChoose')
        .populate({ path: 'productId', populate: { path: 'topping' } })
        .populate({ path: 'productId', populate: { path: 'size' } })
    // result = await result

    const ItemId = result._id.toString()
    const cart = await carts.findOne({ userId: ownerId ?? data.user.sub, isPrimary: !!data.body?.isPrimary })
    await carts.updateOne(
        { userId: result.userId, isPrimary: !!data.body?.isPrimary },
        {
            $push: { cartItemId: ItemId },
        },
        {
            $set: {
                mount: cart.mount + result.quantity,
                totalPrice: cart.totalPrice + result.total,
            },
        }
    )

    await getCartByUser(ownerId ?? data.user.sub, !!data.body?.isPrimary)

    return { data: result, msg: 'Add new cart Item success', result: true }
}

const updateCardItem = async (data) => {
    const { _id, toppingChoose, sizeChoose, quantity, description, price, total, note, ownerId } = data.body

    const oldCartItem = await cartItems.findOne({ _id: _id })
    const cart = await carts.findOne({ userId: ownerId ?? data.user.sub, isPrimary: !!data.body?.isPrimary })

    await carts.updateOne(
        { _id: cart._id, isPrimary: !!data.body?.isPrimary },
        {
            $set: {
                mount: cart.mount - oldCartItem.quantity + quantity,
                totalPrice: cart.totalPrice - oldCartItem.total + total,
            },
        }
    )

    const result = await cartItems.findOneAndUpdate(
        { _id: _id },
        {
            $set: {
                toppingChoose: toppingChoose.map((item) => item._id),
                sizeChoose: sizeChoose._id,
                quantity: quantity,
                description: description,
                price: price,
                total: total,
                note: note,
            },
        },
        { new: true }
    )
    await getCartByUser(ownerId ?? data.user.sub, !!data.body?.isPrimary)

    return { data: result, msg: 'Update success', result: true }
}

const deleteCardItem = async (data) => {
    const { id, ownerId, isPrimary } = data.query
    const result = await cartItems.findOneAndDelete({ _id: id }, { new: true })
    if (result) {
        const cart = await carts.findOne({ userId: ownerId ?? data.user.sub, isPrimary })
        await carts.updateOne(
            { _id: cart._id, isPrimary },
            { $pull: { cartItemId: id } },
            {
                $set: {
                    mount: cart.mount - result.quantity,
                    totalPrice: cart.totalPrice - result.total,
                },
            }
        )
        await getCartByUser(ownerId ?? data.user.sub, !!isPrimary)

        return { data: result, msg: 'Delete success', result: true }
    } else {
        return { data: result, msg: 'Delete false', result: false }
    }
}

const addCartItemToOrder = async (data) => {
    const cartItem = await cartItems.findOne({ cartItemId: data })
    console.log('abcqewq', cartItem)
    const { productId, quantity, description, price, userId } = cartItem
    const createOrderItem = await orderItems.create({ productId, quantity, description, price, userId })
    await cartItems.deleteOne({ cartItemId: data })
    await carts.updateOne(
        { userId: result.userId },
        {
            $pop: { cartItemId: data },
        }
    )
    console.log('a312', createOrderItem)
    return cartItem
}

module.exports = {
    addToCart,
    updateCardItem,
    deleteCardItem,
    addCartItemToOrder,
}
