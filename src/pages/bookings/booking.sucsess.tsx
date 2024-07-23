//import React from 'react';
import { useLocation } from 'react-router-dom';

// PaymentSuccess component to display the success message and booking details
const PaymentSuccess = () => {
    // Use useLocation to get the query parameters from the URL
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const vehicleId = queryParams.get('vehicleId');
    const rentalRate = queryParams.get('rentalRate');
    const vehicleSpecId = queryParams.get('vehicleSpecId');

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
            <p className="mt-4 text-lg">Your booking was successful. The vehicle will be delivered to you within a short time.</p>
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Booking Details:</h2>
                <p>Vehicle ID: {vehicleId}</p>
                <p>Rental Rate: {rentalRate}</p>
                <p>Vehicle Spec ID: {vehicleSpecId}</p>
            </div>
        </div>
    );
};

export default PaymentSuccess;