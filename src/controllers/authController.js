const successResponse = require("../common/response/successResponse");
const authService = require("../services/authService");

const authController = {
    createUser: async (req, res, next) => {
        try {
            const {name, email, role, password} = req.body;

            return successResponse(res, {
                ...await authService.createUser({
                    name, email, role, password
                }),
            });
        } catch (err) {
            next(err);
        }
    },
    login: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            return successResponse(res, {
                ...await authService.login({email, password}),
            });
        } catch (err) {
            next(err);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const {refreshToken} = req.body;

            return successResponse(res, {
                ...await authService.refreshToken({refreshToken})
            });
        } catch (err) {
            next(err);
        }
    },
};

module.exports = authController;