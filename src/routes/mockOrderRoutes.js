const express = require('express');
const successResponse = require("../common/response/successResponse");
const mockRouter = express.Router();

// TODO make it for mock purpose. Change it to external api.
mockRouter.post('/order', (req, res) => {
    const {id, cartId} = req.body;

    // Simulate delay and mock response
    setTimeout(() => {
        return successResponse(res, {
            success: true,
            cartItemId: id,
            cartId: cartId,
            orderId: Math.floor(Math.random() * 100000)
        }, 'Order successfully created');
    }, 500);
});

module.exports = mockRouter;