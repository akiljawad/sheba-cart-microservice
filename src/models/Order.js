const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    orderId: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cartItemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true
});

module.exports = Order;