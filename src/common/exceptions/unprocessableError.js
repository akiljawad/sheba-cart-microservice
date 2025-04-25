const statusCode = require("../constants/statusCode");

class UnprocessableError extends Error {
    constructor(message) {
        super(message);
        this.status = statusCode.HTTP_422_UNPROCESSABLE_ENTITY;
    }
}

module.exports = UnprocessableError;