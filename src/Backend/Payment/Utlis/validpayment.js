const crypto = require('crypto');

const validatePayment = (req, res) => {
    const { orderId, paymentId, signature } = req.body;

    const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(orderId + "|" + paymentId)
        .digest('hex');

    if (generatedSignature === signature) {
        // Payment is valid
        res.status(200).json({ success: true });
    } else {
        // Payment is invalid
        res.status(400).json({ success: false });
    }
};

module.exports = { validatePayment };
