const {Cart, CartItem} = require('../models');
const BadRequestError = require("../common/exceptions/badRequestError");

const cartService = {
    createCart: async ({userId}) => {
        if (!userId) throw new BadRequestError('User id is required');
        return (await Cart.create({userId})).get({plain: true});
    },

    addItem: async ({cartId, serviceName, unitPrice, quantity, scheduleTime}) => {
        const cart = await Cart.findByPk(cartId);
        if (!cart) throw new BadRequestError('Cart not found');

        return (await CartItem.create({
            cartId: cart.id,
            serviceName,
            unitPrice,
            quantity,
            scheduleTime: new Date(scheduleTime),
        })).get({plain: true});
    },

    updateItem: async ({cartId, itemId, quantity}) => {
        const cart = await Cart.findByPk(cartId);
        if (!cart) throw new BadRequestError('Cart not found');

        const item = await CartItem.findOne({
            where: {id: itemId, cartId}
        });

        if (!item) throw new BadRequestError('Item not found in cart');

        item.quantity = quantity;
        await item.save();
        return item.get({plain: true});
    },

    deleteItem: async ({cartId, itemId}) => {
        const cart = await Cart.findByPk(cartId);
        if (!cart) throw new BadRequestError('Cart not found');

        const item = await CartItem.findOne({
            where: {id: itemId, cartId}
        });

        if (!item) throw new BadRequestError('Item not found in cart');

        await item.destroy();
        return item.get({plain: true});
    },
};

module.exports = cartService;