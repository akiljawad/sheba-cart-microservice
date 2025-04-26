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