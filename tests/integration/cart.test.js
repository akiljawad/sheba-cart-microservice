const request = require('supertest');
const app = require('../../src/app');
const {sequelize} = require('../../src/models');
const {fakeCustomerUser, fakeCustomerLogin, fakeCartItems} = require('../mocks');

let accessToken;
let cartId;
let itemId;

beforeAll(async () => {
    await sequelize.sync({force: true});
});

afterAll(async () => {
    await sequelize.close();
});

describe('API integration test - Cart', () => {
    beforeAll(async () => {
        await request(app)
            .post(`/api/auth/create-user`)
            .send(fakeCustomerUser);

        await request(app)
            .post(`/api/auth/login`)
            .send(fakeCustomerLogin)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                accessToken = response.body.data.accessToken;
            });
    });
    it('should create new cart', async () => {
        return request(app)
            .post(`/api/cart`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({})
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                cartId = response.body.data.id;
                expect(response.body).toEqual(
                    expect.objectContaining({
                        code: expect.any(Number),
                        message: expect.any(String),
                        data: expect.objectContaining({
                            id: expect.any(Number),
                            status: 'pending',
                        })
                    })
                );
            });
    });
    it('should add item in cart', async () => {
        return request(app)
            .post(`/api/cart/${cartId}/items`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                serviceName: fakeCartItems[0].serviceName,
                quantity: fakeCartItems[0].quantity,
                unitPrice: fakeCartItems[0].unitPrice,
                scheduleTime: fakeCartItems[0].scheduleTime,
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                itemId = response.body.data.id;
                expect(response.body).toEqual(
                    expect.objectContaining({
                        code: expect.any(Number),
                        message: expect.any(String),
                        data: expect.objectContaining({
                            id: expect.any(Number),
                            cartId: fakeCartItems[1].cartId,
                            status: true,
                        })
                    })
                );
            });
    });
    it('should add another item in cart', async () => {
        return request(app)
            .post(`/api/cart/${cartId}/items`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                serviceName: fakeCartItems[1].serviceName,
                quantity: fakeCartItems[1].quantity,
                unitPrice: fakeCartItems[1].unitPrice,
                scheduleTime: fakeCartItems[1].scheduleTime,
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                itemId = response.body.data.id;
                expect(response.body).toEqual(
                    expect.objectContaining({
                        code: expect.any(Number),
                        message: expect.any(String),
                        data: expect.objectContaining({
                            id: expect.any(Number),
                            cartId: fakeCartItems[1].cartId,
                            status: true,
                        })
                    })
                );
            });
    });
    it('should update item in cart', async () => {
        return request(app)
            .patch(`/api/cart/${cartId}/items/${itemId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                quantity: 10,
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        code: expect.any(Number),
                        message: expect.any(String),
                        data: expect.objectContaining({
                            id: expect.any(Number),
                            quantity: 10
                        })
                    })
                );
            });
    });
    it('should delete item in cart', async () => {
        return request(app)
            .delete(`/api/cart/${cartId}/items/${itemId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        code: expect.any(Number),
                        message: expect.any(String),
                        data: expect.objectContaining({
                            id: expect.any(Number),
                        })
                    })
                );
            });
    });
    it('should checkout items', async () => {
        return request(app)
            .post(`/api/cart/${cartId}/checkout`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        code: expect.any(Number),
                        message: expect.any(String),
                        data: expect.arrayContaining([
                            expect.objectContaining({
                                id: expect.any(Number),
                                orderId: expect.any(Number),
                            })
                        ])
                    })
                );
            });
    });
});