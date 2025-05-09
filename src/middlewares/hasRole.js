const ForbiddenError = require("../common/exceptions/forbiddenError");

const hasRole = (type) => async (req, res, next) => {
    try {
        let role = req.user.role;
        if (role !== type) {
            next(new ForbiddenError('Forbidden: Permitted role: ' + type));
        }
        next();
    } catch (err) {
        next(err);
    }
};
module.exports = hasRole;