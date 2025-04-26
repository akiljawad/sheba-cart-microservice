const {createCart, addItem, updateItem, deleteItem, checkoutCart} = require('../../../src/controllers/cartController');
const {fakeCart, fakeCartItem, fakeOrder} = require('../../mocks');

jest.mock("../../../src/common/response/successResponse");
const successResponse = require("../../../src/common/response/successResponse");

jest.mock('../../../src/services/cartService');
const cartService = require('../../../src/services/cartService');

jest.mock('../../../src/services/checkoutService');
const checkoutService = require('../../../src/services/checkoutService');

describe('Cart Controller unit test', () => {
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

    describe('cart creation', () => {
        it('should return a new cart', async () => {
            req.user = {id: 2};
            cartService.createCart.mockResolvedValue({userId: 2, ...fakeCart});
            await createCart(req, res);
            expect(cartService.createCart).toHaveBeenCalledWith({userId: 2});
            expect(successResponse).toHaveBeenCalledWith(res, {userId: 2, ...fakeCart});
            expect(next).not.toHaveBeenCalled();
        });
    });
    describe('cart item add', () => {
        it('should add cart item', async () => {
            req.body = {
                serviceName: fakeCartItem.serviceName,
                quantity: fakeCartItem.quantity,
                unitPrice: fakeCartItem.unitPrice,
                scheduleTime: fakeCartItem.scheduleTime,
            };
            req.params = {cartId: fakeCart.id};

            cartService.addItem.mockResolvedValue({status: true, ...fakeCartItem});
            await addItem(req, res);
            expect(cartService.addItem).toHaveBeenCalledWith({...req.body, ...req.params});
            expect(successResponse).toHaveBeenCalledWith(res, {status: true, ...fakeCartItem}, 'Item Added');
            expect(next).not.toHaveBeenCalled();
        });
    });
    describe('cart item update', () => {
        it('should update cart item', async () => {
            req.body = {
                quantity: 5
            };
            req.params = {cartId: fakeCart.id, itemId: fakeCartItem.id};

            cartService.updateItem.mockResolvedValue({status: true, ...fakeCartItem, quantity: 5});
            await updateItem(req, res);
            expect(cartService.updateItem).toHaveBeenCalledWith({...req.body, ...req.params});
            expect(successResponse).toHaveBeenCalledWith(res, {
                status: true, ...fakeCartItem,
                quantity: 5
            }, 'Item Updated');
            expect(next).not.toHaveBeenCalled();
        });
    });
    describe('cart item delete', () => {
        it('should delete cart item', async () => {
            req.params = {cartId: fakeCart.id, itemId: fakeCartItem.id};

            cartService.deleteItem.mockResolvedValue({status: true, ...fakeCartItem});
            await deleteItem(req, res);
            expect(cartService.deleteItem).toHaveBeenCalledWith({...req.params});
            expect(successResponse).toHaveBeenCalledWith(res, {
                status: true, ...fakeCartItem
            }, 'Item Removed');
            expect(next).not.toHaveBeenCalled();
        });
    });
    describe('cart item delete', () => {
        it('should delete cart item', async () => {
            req.params = {cartId: fakeCart.id};

            checkoutService.checkout.mockResolvedValue({...fakeOrder});
            await checkoutCart(req, res);
            expect(checkoutService.checkout).toHaveBeenCalledWith({...req.params});
            expect(successResponse).toHaveBeenCalledWith(res, {
                ...fakeOrder
            });
            expect(next).not.toHaveBeenCalled();
        });
    });
});
