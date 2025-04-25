const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateRequestBody = require("../middlewares/validateRequestBody");
const createUserValidator = require("../validations/createUserValidator");
const loginValidator = require("../validations/loginValidator");
const refreshTokenValidator = require("../validations/refreshTokenValidator");
const asyncHandler = require("../common/utils/asyncHandler");

router.post('/create-user', validateRequestBody(createUserValidator), asyncHandler(authController.createUser))
    .post('/login', validateRequestBody(loginValidator), asyncHandler(authController.login))
    .post('/refresh-token', validateRequestBody(refreshTokenValidator), asyncHandler(authController.refreshToken));

module.exports = router;