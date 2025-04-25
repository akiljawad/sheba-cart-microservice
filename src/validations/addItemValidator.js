const Joi = require('joi');

const addItemValidator = Joi.object({
    productName: Joi.string().required(),
    quantity: Joi.number().required()
});

module.exports = addItemValidator;
