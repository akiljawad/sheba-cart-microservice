const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const CartItem = sequelize.define('CartItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN(),
        allowNull: false,
        defaultValue: true,
    },
}, {
    timestamps: true
});

module.exports = CartItem;