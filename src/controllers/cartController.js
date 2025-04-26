const successResponse = require("../common/response/successResponse");
const cartService = require("../services/cartService");
const checkoutService = require("../services/checkoutService");

const cartController = {
    createCart: async (req, res) => {
        const {id} = req.user;

        return successResponse(res, {
            ...await cartService.createCart({userId: id})
        });
    },
    addItem: async (req, res) => {
        const {cartId} = req.params;
        const {serviceName, quantity, unitPrice, scheduleTime} = req.body;

        return successResponse(res, {
            ...await cartService.addItem({cartId, serviceName, unitPrice, quantity, scheduleTime})
        }, 'Item Added');
    },
    updateItem: async (req, res) => {
        const {cartId, itemId} = req.params;
        const {quantity} = req.body;

        return successResponse(res, {
            ...await cartService.updateItem({cartId, itemId, quantity})
        }, 'Item Updated');
    },
    deleteItem: async (req, res) => {
        const {cartId, itemId} = req.params;

        return successResponse(res, {
            ...await cartService.deleteItem({cartId, itemId})
        }, 'Item Removed');
    },
    checkoutCart: async (req, res) => {
        const {cartId} = req.params;

        return successResponse(res,
            await checkoutService.checkout({cartId})
        );
    },
};

module.exports = cartController;