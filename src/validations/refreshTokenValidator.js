const Joi = require('joi');

const refreshTokenValidator = Joi.object({
    refreshToken: Joi.string().required()
});

module.exports = refreshTokenValidator;
