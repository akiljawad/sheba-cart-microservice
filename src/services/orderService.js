const {Order} = require('../models');

const orderService = {
    createOrder: async (item) => {
        try {
            const response = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve({success: true, item, orderId: Math.floor(Math.random() * 100000)}); // Mock Order API
                }, 100);
            });

            return (await Order.create({
                orderId: response.orderId,
                cartId: response.item.cartId,
                cartItemId: response.item.id
            })).get({plain: true});
        } catch (err) {
            throw err;
        }
    }
};

module.exports = orderService;