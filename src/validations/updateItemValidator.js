const Joi = require('joi');
const Role = require("../common/enums/role");

const addItemValidator = Joi.object({
    quantity: Joi.number().required()
});

module.exports = addItemValidator;
