const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcrypt');
const Role = require('../common/enums/role');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM(
            Role.ADMIN,
            Role.CUSTOMER
        ),
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN(),
        allowNull: false,
        defaultValue: true,
    },
}, {
    timestamps: true, hooks: {
        beforeCreate: async (user, options) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        beforeUpdate: async (user, options) => {
            if (user.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
});

module.exports = User;