const {Order} = require('../models');
const axios = require('axios');

const orderService = {
    createOrder: async (item) => {
        const response = await axios.post('http://localhost:3001/mock-api/order', item);

        return (await Order.create({
            orderId: response.data.data.orderId,
            cartId: response.data.data.cartId,
            cartItemId: response.data.data.cartItemId
        })).get({plain: true});

    }
};

module.exports = orderService;