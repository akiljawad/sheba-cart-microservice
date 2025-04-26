const {createUser, login, refreshToken} = require('../../../src/controllers/authController');
const {fakeAdminUser, fakeAdminLogin} = require('../../mocks');

jest.mock("../../../src/common/response/successResponse");
const successResponse = require("../../../src/common/response/successResponse");

jest.mock('../../../src/services/authService');
const authService = require('../../../src/services/authService');

describe('Auth Controller unit test', () => {
    let req, res, next;
    beforeEach(() => {
        jest.clearAllMocks();
        req = {params: {}};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        successResponse.mockImplementation((res, data) => res.status(200).json(data));
    });

    describe('user creation', () => {
        it('should return a new user', async () => {
            req.body = {...fakeAdminUser};
            authService.createUser.mockResolvedValue({id: 1, ...fakeAdminUser});
            await createUser(req, res);
            expect(authService.createUser).toHaveBeenCalledWith(fakeAdminUser);
            expect(successResponse).toHaveBeenCalledWith(res, {id: 1, ...fakeAdminUser});
            expect(next).not.toHaveBeenCalled();
        });
    });
    describe('login', () => {
        it('should login -> get access token', async () => {
            req.body = {...fakeAdminLogin};
            authService.login.mockResolvedValue({
                accessToken: 'mocked-access-token',
                refreshToken: 'mocked-refresh-token'
            });
            await login(req, res);
            expect(authService.login).toHaveBeenCalledWith(fakeAdminLogin);
            expect(successResponse).toHaveBeenCalledWith(res, {
                accessToken: 'mocked-access-token',
                refreshToken: 'mocked-refresh-token'
            });
            expect(next).not.toHaveBeenCalled();
        });
    });
    describe('refreshToken', () => {
        it('should refreshToken -> get new access token', async () => {
            req.body = {refreshToken: 'mocked-refresh-token'};
            authService.refreshToken.mockResolvedValue({
                accessToken: 'mocked-access-token',
                refreshToken: 'mocked-refresh-token'
            });
            await refreshToken(req, res);
            expect(authService.refreshToken).toHaveBeenCalledWith({refreshToken: 'mocked-refresh-token'});
            expect(successResponse).toHaveBeenCalledWith(res, {
                accessToken: 'mocked-access-token',
                refreshToken: 'mocked-refresh-token'
            });
            expect(next).not.toHaveBeenCalled();
        });
    });
});
