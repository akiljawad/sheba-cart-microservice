const Cart = require('../../../src/models/Cart');
const CartItem = require('../../../src/models/CartItem');
const {
    checkout
} = require('../../../src/services/checkoutService');
const {
    createOrder
} = require('../../../src/services/orderService');
jest.mock('../../../src/services/orderService', () => ({
    createOrder: jest.fn(),
}));
const {
    fakeCart,
    fakeOrders, fakeCartItems
} = require('../../mocks');
const CartStatus = require("../../../src/common/enums/cartStatus");

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

describe('Checkout Service unit test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('checkout', () => {
        it('should checkout all cart items', async () => {
            Cart.findByPk = jest.fn().mockResolvedValue({
                ...fakeCart,
                CartItems: fakeCartItems,
                save: jest.fn()
            });
            createOrder
                .mockResolvedValueOnce(fakeOrders[0])
                .mockResolvedValueOnce(fakeOrders[1]);

            const res = await checkout({cartId: fakeCart.id});
            expect(Cart.findByPk).toHaveBeenCalledWith(1, {
                include: [{model: CartItem}],
            });

            expect(createOrder).toHaveBeenCalledTimes(2);
            expect(createOrder).toHaveBeenCalledWith(fakeCartItems[0]);
            expect(createOrder).toHaveBeenCalledWith(fakeCartItems[1]);
            expect(fakeCart.status).toBe(CartStatus.PENDING);
            expect(res).toEqual(fakeOrders);
        });
    });
});