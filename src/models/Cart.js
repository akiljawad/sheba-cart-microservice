const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const CartStatus = require("../common/enums/cartStatus");

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM(
            CartStatus.PENDING,
            CartStatus.ORDERED
        ),
        allowNull: false,
        defaultValue: CartStatus.PENDING,
    },
}, {
    timestamps: true
});

module.exports = Cart;