const successResponse = require("../common/response/successResponse");
const cartService = require("../services/cartService");
const checkoutService = require("../services/checkoutService");

const cartController = {
    createCart: async (req, res, next) => {
        try {
            const {id} = req.user;

            return successResponse(res, {
                ...await cartService.createCart({userId: id})
            });
        } catch (err) {
            next(err);
        }
    },
    addItem: async (req, res, next) => {
        try {
            const {cartId} = req.params;
            const {productName, quantity} = req.body;

            return successResponse(res, {
                ...await cartService.addItem({cartId, productName, quantity})
            }, 'Item Added');
        } catch (err) {
            next(err);
        }
    },
    updateItem: async (req, res, next) => {
        try {
            const {cartId, itemId} = req.params;
            const {quantity} = req.body;

            return successResponse(res, {
                ...await cartService.updateItem({cartId, itemId, quantity})
            }, 'Item Updated');
        } catch (err) {
            next(err);
        }
    },
    deleteItem: async (req, res, next) => {
        try {
            const {cartId, itemId} = req.params;

            return successResponse(res, {
                ...await cartService.deleteItem({cartId, itemId})
            }, 'Item Removed');
        } catch (err) {
            next(err);
        }
    },
    checkoutCart: async (req, res, next) => {
        try {
            const {cartId} = req.params;

            return successResponse(res, {
                ...await checkoutService.checkout(cartId)
            });
        } catch (err) {
            next(err);
        }
    },
};

module.exports = cartController;