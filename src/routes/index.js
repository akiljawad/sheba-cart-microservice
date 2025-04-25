const express = require('express');
const router = express.Router();

router.use('/cart', require('./cart'));
router.use('/auth', require('./auth'));

module.exports = router;