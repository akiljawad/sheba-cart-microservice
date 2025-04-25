const successResponse = require("../common/response/successResponse");
const cartService = require("../services/cartService");

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
            const {} = req.body;

            return successResponse(res, {});
        } catch (err) {
            next(err);
        }
    },
    updateItem: async (req, res, next) => {
        try {
            const {} = req.body;

            return successResponse(res, {});
        } catch (err) {
            next(err);
        }
    },
    deleteItem: async (req, res, next) => {
        try {
            const {} = req.body;

            return successResponse(res, {});
        } catch (err) {
            next(err);
        }
    },
    checkoutCart: async (req, res, next) => {
        try {
            const {} = req.body;

            return successResponse(res, {});
        } catch (err) {
            next(err);
        }
    },
};

module.exports = cartController;