const successResponse = require("../common/response/successResponse");

const authController = {
    createCart: async (req, res, next) => {
        try {
            const {} = req.body;

            return successResponse(res, {});
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

module.exports = authController;