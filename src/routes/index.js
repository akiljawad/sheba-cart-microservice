const express = require('express');
const router = express.Router();

router.use('/cart', require('./cart'));
router.use('/auth', require('./auth'));

router.use('/cart', require('./cart'));
module.exports = router;