const successResponse = require("../common/response/successResponse");
const authService = require("../services/authService");

const authController = {
    createUser: async (req, res) => {
        const {name, email, role, password} = req.body;

        return successResponse(res, {
            ...await authService.createUser({
                name, email, role, password
            }),
        });
    },
    login: async (req, res) => {
        const {email, password} = req.body;

        return successResponse(res, {
            ...await authService.login({email, password}),
        });
    },
    refreshToken: async (req, res) => {
        const {refreshToken} = req.body;

        return successResponse(res, {
            ...await authService.refreshToken({refreshToken})
        });
    },
};

module.exports = authController;