const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateRequest = require("../middlewares/validateRequest");
const createUserValidator = require("../validations/createUserValidator");
const loginValidator = require("../validations/loginValidator");
const refreshTokenValidator = require("../validations/refreshTokenValidator");

router.post('/create-user', validateRequest(createUserValidator), authController.createUser)
    .post('/login', validateRequest(loginValidator), authController.login)
    .post('/refresh-token', validateRequest(refreshTokenValidator), authController.refreshToken);

module.exports = router;