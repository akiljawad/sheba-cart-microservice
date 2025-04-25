const {Cart} = require('../models');
const config = require('../config');
const jwt = require('jsonwebtoken');
const NotFoundError = require("../common/exceptions/notFoundError");
const BadRequestError = require("../common/exceptions/badRequestError");
const ForbiddenError = require("../common/exceptions/forbiddenError");
const bcrypt = require("bcrypt");

const cartService = {
    createCart: async ({userId}) => {
        try {
            if (!userId) return BadRequestError('User id is required');

            return (await Cart.create({userId})).get({plain: true});
        } catch (error) {
            throw error;
        }
    },
    addItem: async ({cartId, productName, quantity}) => {
        try {

        } catch (error) {
            throw error;
        }
    },
    updateItem: async ({cartId, itemId, quantity}) => {
        try {

        } catch (error) {
            throw error;
        }
    },
    deleteItem: async ({cartId, itemId}) => {
        try {

        } catch (error) {
            throw error;
        }
    },
};

module.exports = cartService;