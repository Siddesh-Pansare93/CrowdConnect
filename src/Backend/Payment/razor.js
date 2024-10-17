const Razorpay = require('razorpay');
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Function to create a new order
const createOrder = async (req, res) => {
    const options = {
        amount: req.body.amount, // Amount in paise
        currency: 'INR',
        receipt: 'receipt#1',
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json({ orderId: order.id, amount: order.amount });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { createOrder };
