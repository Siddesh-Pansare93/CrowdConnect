const express = require('express');
const { createOrder } = require('./razorpay');

const router = express.Router();

router.post('/create-order', createOrder);

module.exports = router;
