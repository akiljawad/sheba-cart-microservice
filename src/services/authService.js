const {User} = require('../models');
const config = require('../config');
const jwt = require('jsonwebtoken');
const NotFoundError = require("../common/exceptions/notFoundError");
const BadRequestError = require("../common/exceptions/badRequestError");
const ForbiddenError = require("../common/exceptions/forbiddenError");
const bcrypt = require("bcrypt");

const authService = {
    createUser: async ({name, email, role, password}) => {
        try {
            const userExist = await User.findOne({
                where: {email: email},
            });
            if (userExist) {
                throw new BadRequestError('User email already exists!');
            }
            return (await (User.create({name, email, password, role, status: true}))).get({plain: true});
        } catch (error) {
            throw error;
        }
    },

    login: async ({email, password}) => {
        try {
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
            }, config.jwtToken, {expiresIn: '15m'});

            const refreshToken = jwt.sign({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }, config.jwtRefreshToken, {expiresIn: '1d'});

            return {
                accessToken: accessToken,
                refreshToken: refreshToken,
            };
        } catch (error) {
            throw error;
        }
    },

    refreshToken: async ({refreshToken}) => {
        try {
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
            }, config.jwtToken, {expiresIn: '15m'});
            return {
                accessToken: accessToken
            };
        } catch (error) {
            throw error;
        }
    }
};

module.exports = authService;