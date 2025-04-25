const express = require('express');
const cartController = require('../controllers/cartController');
const isAuthenticatedUser = require("../middlewares/isAuthenticatedUser");
const hasRole = require("../middlewares/hasRole");
const asyncHandler = require("../common/utils/asyncHandler");
const validateRequestBody = require("../middlewares/validateRequestBody");
const addItemValidator = require("../validations/addItemValidator");
const updateItemValidator = require("../validations/updateItemValidator");
const router = express.Router();

router.post('/', isAuthenticatedUser, hasRole('customer'), asyncHandler(cartController.createCart))
    .post('/:cartId/items', isAuthenticatedUser, hasRole('customer'), validateRequestBody(addItemValidator), asyncHandler(cartController.addItem))
    .patch('/:cartId/items/:itemId', isAuthenticatedUser, hasRole('customer'), validateRequestBody(updateItemValidator), asyncHandler(cartController.updateItem))
    .delete('/:cartId/items/:itemId', isAuthenticatedUser, hasRole('customer'), asyncHandler(cartController.deleteItem))
    .post('/:cartId/checkout', isAuthenticatedUser, hasRole('customer'), asyncHandler(cartController.checkoutCart));

module.exports = router;