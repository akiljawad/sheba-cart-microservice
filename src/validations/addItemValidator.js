const Joi = require('joi');

const addItemValidator = Joi.object({
    serviceName: Joi.string().required(),
    quantity: Joi.number().required(),
    unitPrice: Joi.number().required(),
    scheduleTime: Joi.date().required(),
});

module.exports = addItemValidator;
