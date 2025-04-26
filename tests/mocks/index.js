module.exports.fakeCustomerUser = {
    "name": "test",
    "email": "testCustomer@gmail.com", // unique
    "password": "asdf1234",
    "role": "customer" // Enum -> admin/customer
};

module.exports.fakeAdminUser = {
    "name": "test",
    "email": "testAdmin@gmail.com", // unique
    "password": "asdf1234",
    "role": "admin" // Enum -> admin/customer
};

module.exports.fakeAdminLogin = {
    "email": "testAdmin@gmail.com",
    "password": "asdf1234",
};

module.exports.fakeCustomerLogin = {
    "email": "testCustomer@gmail.com",
    "password": "asdf1234",
};

module.exports.fakeCart = {
    "id": 1,
    "status": "pending",
};

module.exports.fakeCartItem = {
    "id": 1,
    "cartId": 1,
    "serviceName": "test",
    "unitPrice": 10,
    "quantity": 2,
    "scheduleTime": "2025-04-28 15:30:00"
};

module.exports.fakeOrder = {
    "id": 1,
    "cartItemId": 1,
    "orderId": 1124123,
    "cartId": 1,
};

module.exports.fakeCartItems = [
    {
        "id": 1,
        "cartId": 1,
        "serviceName": "test1",
        "unitPrice": 10,
        "quantity": 2,
        "scheduleTime": "2025-04-28 15:30:00"
    },
    {
        "id": 2,
        "cartId": 1,
        "serviceName": "test2",
        "unitPrice": 20,
        "quantity": 4,
        "scheduleTime": "2025-04-28 15:30:00"
    }
];

module.exports.fakeOrders = [{
    "id": 1,
    "cartItemId": 1,
    "orderId": 1124123,
    "cartId": 1,
}, {
    "id": 2,
    "cartItemId": 2,
    "orderId": 1124165,
    "cartId": 1,
}];
