const User = require('../../../src/models/User');
const {
    createUser, login, refreshToken
} = require('../../../src/services/authService');
const BadRequestError = require("../../../src/common/exceptions/badRequestError");
const NotFoundError = require("../../../src/common/exceptions/notFoundError");
const {fakeAdminUser, fakeCustomerUser, fakeCustomerLogin} = require('../../mocks');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../../src/models/User', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    hasMany: jest.fn(),
    belongsTo: jest.fn(),
}));

jest.mock('../../../src/models/Cart', () => ({
    hasMany: jest.fn(),
    belongsTo: jest.fn(),
}));

jest.mock('../../../src/models/CartItem', () => ({
    hasMany: jest.fn(),
    belongsTo: jest.fn(),
}));

jest.mock('../../../src/models/Order', () => ({
    hasOne: jest.fn(),
}));

describe('User Service unit test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createUser', () => {
        it('should create new user', async () => {
            User.findOne = jest.fn().mockResolvedValue(null);
            User.create = jest.fn().mockResolvedValue({
                get: jest.fn().mockReturnValue({id: 1, ...fakeCustomerUser, status: true})
            });

            const res = await createUser(fakeCustomerUser);
            expect(User.create).toHaveBeenCalledWith({...fakeCustomerUser, status: true});
            expect(res).toEqual({id: 1, ...fakeCustomerUser, status: true});
        });
    });

    describe('login', () => {
        it('should login user', async () => {
            User.findOne = jest.fn().mockResolvedValue({id: 1, ...fakeCustomerUser, status: true});
            bcrypt.compare = jest.fn().mockResolvedValue(true);
            jwt.sign = jest.fn().mockReturnValueOnce('mockedAccessToken').mockReturnValueOnce('mockedRefreshToken');

            const res = await login(fakeCustomerLogin);
            expect(User.findOne).toHaveBeenCalledWith({where: {email: fakeCustomerLogin.email, status: true}});
            expect(bcrypt.compare).toHaveBeenCalledWith({
                id: 1, ...fakeCustomerUser,
                status: true
            }.password, fakeCustomerUser.password);
            expect(jwt.sign).toHaveBeenCalledTimes(2);

            expect(res).toEqual({
                accessToken: 'mockedAccessToken',
                refreshToken: 'mockedRefreshToken',
            });
        });
    });

    describe('refreshToken', () => {
        it('should refresh token', async () => {
            jwt.verify = jest.fn().mockResolvedValue(fakeCustomerUser);
            User.findOne = jest.fn().mockResolvedValue({id: 1, ...fakeCustomerUser, status: true});
            jwt.sign = jest.fn().mockReturnValueOnce('newAccessToken');

            const result = await refreshToken({refreshToken: 'mockedRefreshToken'});

            expect(jwt.verify).toHaveBeenCalledWith('mockedRefreshToken', expect.any(String));
            expect(User.findOne).toHaveBeenCalledWith({where: {email: fakeCustomerUser.email, status: true}});
            expect(jwt.sign).toHaveBeenCalled();
            expect(result).toEqual({accessToken: 'newAccessToken'});
        });
    });
});