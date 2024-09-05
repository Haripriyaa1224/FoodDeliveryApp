const express = require('express');
const authMiddleware = require('../middleware/auth.js')
const orderController = require('../controllers/orderController.js');

const router = express.Router();

router.post('/place', authMiddleware, orderController.placeOrder);

module.exports = router;


