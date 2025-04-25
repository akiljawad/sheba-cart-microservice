const UnprocessableError = require('../common/exceptions/UnprocessableError');
const BadRequestError = require('../common/exceptions/BadRequestError');

const validateRequestBody = (schema) => async (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return next(new BadRequestError('Request body is empty'));
        }
        const {error} = schema.validate(req.body);
        if (error) return next(new UnprocessableError(error.details[0].message));
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = validateRequestBody;