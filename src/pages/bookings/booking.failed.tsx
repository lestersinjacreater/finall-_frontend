//import React from 'react';
import { useLocation } from 'react-router-dom';

// PaymentFailure component to display the failure message and booking details
const PaymentFailure = () => {
    // Use useLocation to get the query parameters from the URL
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const vehicleId = queryParams.get('vehicleId');
    const rentalRate = queryParams.get('rentalRate');
    const vehicleSpecId = queryParams.get('vehicleSpecId');

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-red-600">Payment Failed!</h1>
            <p className="mt-4 text-lg">Unfortunately, your booking was not successful. Please try again or contact support.</p>
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Booking Details:</h2>
                <p>Vehicle ID: {vehicleId}</p>
                <p>Rental Rate: {rentalRate}</p>
                <p>Vehicle Spec ID: {vehicleSpecId}</p>
            </div>
        </div>
    );
};

export default PaymentFailure;