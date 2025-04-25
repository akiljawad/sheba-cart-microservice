const {Cart, CartItem} = require('../models');
const BadRequestError = require("../common/exceptions/badRequestError");
const orderService = require("./orderService");

const checkoutService = {
    checkout: async (cartId) => {
        try {
            const cart = await Cart.findByPk(cartId, {
                include: [{model: CartItem}]
            });
            if (!cart) throw new BadRequestError('Cart not found');

            const results = [];

            for (const item of cart.CartItems) {
                const response = await orderService.createOrder(item);
                results.push({
                    orderId: response.orderId,
                    item: response.item
                });
            }

            return results;
        } catch (err) {
            throw err;
        }
    }
};

module.exports = checkoutService;