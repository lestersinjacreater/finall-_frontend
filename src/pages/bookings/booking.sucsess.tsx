import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const PaymentSuccess = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
            <p className="mt-4 text-lg">Your booking was successful. The vehicle will be delivered to you within a short time.</p>
            <div className="mt-6">
                <Link to="/" className="text-blue-500 hover:underline">
                    Return to Home
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
