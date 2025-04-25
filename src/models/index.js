const sequelize = require('../config/db');
const User = require('../models/User');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Order = require('../models/Order');

const db = {
    sequelize,
    User,
    Cart,
    CartItem,
    Order
};

db.User.hasMany(db.Cart, {foreignKey: 'userId'});
db.Cart.belongsTo(db.User, {foreignKey: 'userId'});

db.Cart.hasMany(db.CartItem, {foreignKey: 'cartId'});
db.CartItem.belongsTo(db.Cart, {foreignKey: 'cartId'});

db.Order.hasOne(db.CartItem, {foreignKey: 'cartItemId'});
db.CartItem.belongsTo(db.Order, {foreignKey: 'cartItemId'});

db.Order.hasOne(db.Cart, {foreignKey: 'cartId'});
db.Cart.belongsTo(db.Order, {foreignKey: 'cartId'});

(async () => {
    try {
        await sequelize.sync({alter: true}); // Sync all models
        console.log('All models synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing models:', error);
    }
})();

module.exports = db;