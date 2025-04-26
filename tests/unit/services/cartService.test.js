const Cart = require('../../../src/models/Cart');
const CartItem = require('../../../src/models/CartItem');
const {
    createCart, addItem, deleteItem, updateItem
} = require('../../../src/services/cartService');
const {fakeCart, fakeCartItem} = require('../../mocks');

jest.mock('../../../src/models/User', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    hasMany: jest.fn(),
    belongsTo: jest.fn(),
}));

jest.mock('../../../src/models/Cart', () => ({
    findByPk: jest.fn(),
    create: jest.fn(),
    hasMany: jest.fn(),
    belongsTo: jest.fn(),
}));

jest.mock('../../../src/models/CartItem', () => ({
    findOne: jest.fn(),
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

    describe('cart creation', () => {
        it('should create a new cart', async () => {
            Cart.create = jest.fn().mockResolvedValue({
                get: jest.fn().mockReturnValue({...fakeCart, status: "pending", userId: 1}),
            });

            const res = await createCart({userId: 1});
            expect(Cart.create).toHaveBeenCalledWith({userId: 1});
            expect(res).toEqual({...fakeCart, status: "pending", userId: 1});
        });
    });

    describe('add item in cart', () => {
        it('should add a new item in cart', async () => {
            CartItem.create = jest.fn().mockResolvedValue({
                get: jest.fn().mockReturnValue({...fakeCartItem, status: true}),
            });
            Cart.findByPk = jest.fn().mockResolvedValue(fakeCart);

            const res = await addItem({
                cartId: fakeCartItem.cartId,
                serviceName: fakeCartItem.serviceName,
                unitPrice: fakeCartItem.unitPrice,
                quantity: fakeCartItem.quantity,
                scheduleTime: fakeCartItem.scheduleTime,
            });
            expect(CartItem.create).toHaveBeenCalledWith({
                cartId: fakeCartItem.cartId,
                serviceName: fakeCartItem.serviceName,
                unitPrice: fakeCartItem.unitPrice,
                quantity: fakeCartItem.quantity,
                scheduleTime: new Date(fakeCartItem.scheduleTime),
            });
            expect(res).toEqual({...fakeCartItem, status: true});
        });
    });

    describe('update item in cart', () => {
        it('should update a existing item in cart', async () => {
            CartItem.findOne = jest.fn().mockResolvedValue({
                ...fakeCartItem,
                get: jest.fn().mockReturnValue({...fakeCartItem, status: true}),
                save: jest.fn().mockReturnValue({...fakeCartItem, status: true})
            });
            Cart.findByPk = jest.fn().mockResolvedValue(fakeCart);

            const res = await updateItem({
                cartId: fakeCartItem.cartId,
                itemId: fakeCartItem.id,
                quantity: fakeCartItem.quantity,
            });
            expect(CartItem.findOne).toHaveBeenCalledWith({where: {id: fakeCartItem.id, cartId: fakeCartItem.cartId}});
            expect(res).toEqual({...fakeCartItem, status: true});
        });
    });

    describe('delete item in cart', () => {
        it('should delete a existing item in cart', async () => {
            CartItem.findOne = jest.fn().mockResolvedValue({
                ...fakeCartItem,
                get: jest.fn().mockReturnValue({...fakeCartItem, status: true}),
                destroy: jest.fn().mockReturnValue({...fakeCartItem, status: true})
            });
            Cart.findByPk = jest.fn().mockResolvedValue(fakeCart);

            const res = await deleteItem({
                cartId: fakeCartItem.cartId,
                itemId: fakeCartItem.id
            });
            expect(CartItem.findOne).toHaveBeenCalledWith({where: {id: fakeCartItem.id, cartId: fakeCartItem.cartId}});
            expect(res).toEqual({...fakeCartItem, status: true});
        });
    });
});