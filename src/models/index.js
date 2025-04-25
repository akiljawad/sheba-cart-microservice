const sequelize = require('../config/db');
const User = require('../models/User');
const Cart = require('../models/Cart');

const db = {
    sequelize,
    User,
    Cart
};

db.User.hasMany(db.Cart, {foreignKey: 'userId'});
db.Cart.belongsTo(db.User, {foreignKey: 'userId'});

(async () => {
    try {
        await sequelize.sync({alter: true}); // Sync all models
        console.log('All models synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing models:', error);
    }
})();

module.exports = db;