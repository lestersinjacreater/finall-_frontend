import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { VehicleAPI } from '../../features/vehicles/vehiclesandspecifications.api';
import Navigationbar from './navigation';

// Define the interface for Vehicle Specifications
interface VehicleSpecifications {
    color: string | null;
    engineCapacity: number;
    features: string | null;
    fuelType: string | null;
    manufacturer: string;
    model: string;
    seatingCapacity: number;
    transmission: string;
    vehicleSpecId: number;
    year: number;
}

// Define the interface for the Vehicle object
interface Vehicle {
    availability: boolean;
    createdAt: string;
    rentalRate: string;
    updatedAt: string;
    vehicleId: number;
    vehicleSpecId: number;
}

// Define the interface for the API response
interface APIResponse {
    vehicle_specs: VehicleSpecifications;
    vehicles: Vehicle;
}

const Vehicles: React.FC = () => {
    const { data: vehicles, isLoading, isError } = VehicleAPI.useGetVehiclesQuery();
    const [expandedCard, setExpandedCard] = useState<number | null>(null);

    // Handle Book Now button click
    const handleBookNow = (vehicleId: number, rentalRate: string) => {
        localStorage.setItem("vehicleId", vehicleId.toString());
        localStorage.setItem("rentalRate", rentalRate);
    };

    // Handle card click to store vehicle ID in local storage
    const handleCardClick = (vehicleId: number) => {
        localStorage.setItem("vehicleId", vehicleId.toString());
    };

    // Toggle expanded card to show/hide additional information
    const toggleExpandCard = (vehicleId: number) => {
        setExpandedCard(expandedCard === vehicleId ? null : vehicleId);
    };

    if (isLoading) {
        return <p className="text-center text-gray-400">Loading...</p>;
    }

    if (isError) {
        return <p className="text-center text-red-500">Error loading vehicles. Please try again later.</p>;
    }

    return (
     
            <div className="p-8 bg-gray-900 min-h-screen">
                <h1 className="text-3xl font-bold text-gray-200 mb-8 text-center">Available Vehicles</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {vehicles && vehicles.map((item: APIResponses) => (
                        <div
                            key={item.vehicles.vehicleId} // Unique key prop
                            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 cursor-pointer"
                            onClick={() => handleCardClick(item.vehicles.vehicleId)} // Handle card click
                        >
                            {item.vehicle_specs ? (
                                <>
                                    <img
                                        src={item.vehicle_specs.color ? 'placeholder-image-url' : 'default-image-url'} // Placeholder or default image
                                        alt={`${item.vehicle_specs.manufacturer} ${item.vehicle_specs.model}`}
                                        className="w-full h-48 object-cover mb-4"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-200 mb-2">
                                            {item.vehicle_specs.manufacturer} {item.vehicle_specs.model}
                                        </h3>
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-lg font-semibold text-gray-400">
                                                <span className="text-gray-300">Rental Rate:</span> ${item.vehicles.rentalRate}
                                            </p>
                                            <p className={`text-lg font-semibold ${item.vehicles.availability ? 'text-gray-400' : 'text-gray-500'}`}>
                                                <span className="text-gray-300">Availability:</span> {item.vehicles.availability ? 'Available' : 'Unavailable'}
                                            </p>
                                        </div>
                                        {expandedCard === item.vehicles.vehicleId && (
                                            <div className="space-y-2 text-gray-400 mb-4">
                                                <p><strong>Year:</strong> {item.vehicle_specs.year}</p>
                                                <p><strong>Fuel Type:</strong> {item.vehicle_specs.fuelType || 'N/A'}</p>
                                                <p><strong>Engine Capacity:</strong> {item.vehicle_specs.engineCapacity} L</p>
                                                <p><strong>Transmission:</strong> {item.vehicle_specs.transmission}</p>
                                                <p><strong>Seating Capacity:</strong> {item.vehicle_specs.seatingCapacity}</p>
                                                <p><strong>Color:</strong> {item.vehicle_specs.color || 'N/A'}</p>
                                            </div>
                                        )}
                                        <button
                                            className="text-gray-400 hover:text-gray-500 transition-colors duration-300 mb-4"
                                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                                e.stopPropagation(); // Prevent click event from bubbling to card
                                                toggleExpandCard(item.vehicles.vehicleId);
                                            }}
                                        >
                                            {expandedCard === item.vehicles.vehicleId ? 'See Less' : 'See More'}
                                        </button>
                                        <Link
                                            to="/bookings"
                                            className="bg-black text-white px-4 py-2 rounded-md inline-block font-bold hover:bg-gray-800 transition-colors duration-300"
                                            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                                e.stopPropagation(); // Prevent click event from bubbling to card
                                                handleBookNow(item.vehicles.vehicleId, item.vehicles.rentalRate); // Store vehicle ID and rental rate
                                            }}
                                        >
                                            Book Now
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <div className="p-4 text-gray-500">Vehicle specifications are not available.</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        
    );
};

export default Vehicles;
