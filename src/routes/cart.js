const express = require('express');
const cartController = require('../controllers/cartController');
const isAuthenticatedUser = require("../middlewares/isAuthenticatedUser");
const hasRole = require("../middlewares/hasRole");
const router = express.Router();

router.post('/', isAuthenticatedUser, hasRole('customer'), cartController.createCart)
    .post('/:cartId/items', isAuthenticatedUser, hasRole('customer'), cartController.addItem)
    .put('/:cartId/items/:itemId', isAuthenticatedUser, hasRole('customer'), cartController.updateItem)
    .delete('/:cartId/items/:itemId', isAuthenticatedUser, hasRole('customer'), cartController.deleteItem)
    .post('/:cartId/checkout', isAuthenticatedUser, hasRole('customer'), cartController.checkoutCart);

module.exports = router;