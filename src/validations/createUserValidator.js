const Joi = require('joi');
const Role = require("../common/enums/role");

const createUserValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid(...Object.values(Role)).required()
});

module.exports = createUserValidator;
