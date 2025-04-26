const {Cart, CartItem} = require('../models');
const BadRequestError = require("../common/exceptions/badRequestError");
const orderService = require("./orderService");
const CartStatus = require("../common/enums/cartStatus");

const checkoutService = {
    checkout: async ({cartId}) => {
        const cart = await Cart.findByPk(cartId, {
            include: [{model: CartItem}],
        });
        if (!cart) throw new BadRequestError('Cart not found');

        const results = [];

        for (const item of cart.CartItems) {
            const order = await orderService.createOrder(item);

            results.push(order);
        }

        cart.status = CartStatus.ORDERED;
        await cart.save();

        return results;
    }
};

module.exports = checkoutService;