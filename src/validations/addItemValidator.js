const Joi = require('joi');

const addItemValidator = Joi.object({
    serviceName: Joi.string().required(),
    quantity: Joi.number().required(),
    unitPrice: Joi.number().required()
});

module.exports = addItemValidator;
