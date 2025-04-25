const {User} = require('../models');
const config = require('../config');
const jwt = require('jsonwebtoken');
const NotFoundError = require("../common/exceptions/notFoundError");
const BadRequestError = require("../common/exceptions/badRequestError");
const ForbiddenError = require("../common/exceptions/forbiddenError");
const bcrypt = require("bcrypt");

const authService = {
    createUser: async ({name, email, role, password}) => {
        const userExist = await User.findOne({
            where: {email: email},
        });
        if (userExist) {
            throw new BadRequestError('User email already exists!');
        }
        return (await (User.create({name, email, password, role, status: true}))).get({plain: true});
    },

    login: async ({email, password}) => {
        const user = await User.findOne({
            where: {email: email, status: true},
        });
        if (!user) {
            throw new NotFoundError('Invalid email or password!');
        }
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) throw new BadRequestError('Invalid email or password!');

        const accessToken = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }, config.jwtToken, {expiresIn: config.jwtExpires});

        const refreshToken = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }, config.jwtRefreshToken, {expiresIn: config.jwtRefreshExpires});

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    },

    refreshToken: async ({refreshToken}) => {
        const refreshTokenPayload = await jwt.verify(refreshToken, config.jwtRefreshToken);
        if (!refreshTokenPayload) throw new ForbiddenError('Invalid token!');

        const user = await User.findOne({
            where: {email: refreshTokenPayload.email, status: true},
        });
        if (!user) {
            throw new NotFoundError('Invalid email or password!');
        }
        const accessToken = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }, config.jwtToken, {expiresIn: config.jwtExpires});
        return {
            accessToken: accessToken
        };
    }
};

module.exports = authService;