import React from 'react';

const Payment = () => {
    const handlePayment = async () => {
        const options = {
            key: "rzp_test_PSawHylUJK5KZi", // Your Test Key ID
            amount: 50000, // Amount in smallest currency unit (50000 paise = ₹500) because of the precision , consistency  and ease for payment process..

            currency: "INR",
            name: "Sample Product",
            description: "Purchase of Sample Product",
            image: "https://your-logo-url.com",
            handler: function (response) {

                // Handle successful payment
                alert(`Payment ID: ${response.razorpay_payment_id}`);
                alert(`Order ID: ${response.razorpay_order_id}`);
                alert(`Signature: ${response.razorpay_signature}`);
            },
            prefill: {
                name: "Your Name",
                email: "your.email@example.com",
                contact: "+91 12345 98745",
            },
            notes: {
                address: "Your Address",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzp = new window.Razorpay(options); // to open in the new window using Razorpay SDK 
        rzp.open();
    };

    return (
        <div>
            <h1>Buy Sample Product</h1>
            <p>Price: ₹500</p>
            <button onClick={handlePayment} className="bg-white text-blue-600 font-bold py-2 px-4 rounded hover:bg-blue-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
                Pay Now</button>
        </div>
    );
};

export default Payment;
