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
    serviceName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    scheduleTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    unitPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 1,
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