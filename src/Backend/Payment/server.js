import express from 'express';
import Razorpay from 'razorpay';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Initialize Razorpay instance with your credentials
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Payment route
app.post('/api/payment', async (req, res) => {
    console.log('Payment request received:', req.body); // Log the request

    const { amount, currency } = req.body; // Get amount and currency from request body

    const options = {
        amount: amount * 100, // Convert to paise
        currency: currency,
        receipt: "receipt#1", // Unique receipt ID
    };

    try {
        const response = await razorpay.orders.create(options);
        console.log('Razorpay response:', response); // Log the response
        res.json(response);
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
