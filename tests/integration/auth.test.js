const request = require('supertest');
const app = require('../../src/app');
const {sequelize, Text} = require('../../src/models');
const {fakeCustomerUser, fakeCustomerLogin} = require('../mocks');

let refreshToken;

beforeAll(async () => {
    await sequelize.sync({force: true});
});

afterAll(async () => {
    await sequelize.close();
});

describe('API integration test - Auth', () => {
    it('should create user', async () => {
        return request(app)
            .post(`/api/auth/create-user`)
            .send(fakeCustomerUser)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        code: expect.any(Number),
                        message: expect.any(String),
                        data: expect.objectContaining({
                            id: expect.any(Number),
                            role: 'customer',
                        })
                    })
                );
            });
    });
    it('should throw error -> email already exist', async () => {
        return request(app)
            .post(`/api/auth/create-user`)
            .send(fakeCustomerUser)
            .expect('Content-Type', /json/)
            .expect(400)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        error: expect.objectContaining({
                            code: 400,
                            message: "User email already exists!",
                        })
                    })
                );
            });
    });
    it('should login user', async () => {
        return request(app)
            .post(`/api/auth/login`)
            .send(fakeCustomerLogin)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                refreshToken = response.body.data.refreshToken;
                expect(response.body).toEqual(
                    expect.objectContaining({
                        code: expect.any(Number),
                        message: expect.any(String),
                        data: expect.objectContaining({
                            accessToken: expect.any(String),
                            refreshToken: expect.any(String),
                        })
                    })
                );
            });
    });
    it('should throw error: login -> invalid email/password', async () => {
        return request(app)
            .post(`/api/auth/login`)
            .send({email: fakeCustomerLogin.email, password: 'wrongPassword'})
            .expect('Content-Type', /json/)
            .expect(400)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        error: expect.objectContaining({
                            code: 400,
                            message: "Invalid email or password!",
                        })
                    })
                );
            });
    });
    it('should throw error: login -> invalid value', async () => {
        return request(app)
            .post(`/api/auth/login`)
            .send({password: 'wrongPassword'})
            .expect('Content-Type', /json/)
            .expect(422)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        error: expect.objectContaining({
                            code: 422,
                        })
                    })
                );
            });
    });
    it('should refresh token', async () => {
        return request(app)
            .post(`/api/auth/refresh-token`)
            .send({refreshToken: refreshToken})
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        code: expect.any(Number),
                        message: expect.any(String),
                        data: expect.objectContaining({
                            accessToken: expect.any(String),
                        })
                    })
                );
            });
    });
    it('should throw error: refresh token -> invalid value', async () => {
        return request(app)
            .post(`/api/auth/login`)
            .send({refreshToken: ''})
            .expect('Content-Type', /json/)
            .expect(422)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        error: expect.objectContaining({
                            code: 422,
                        })
                    })
                );
            });
    });
});