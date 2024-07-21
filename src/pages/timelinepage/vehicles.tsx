import React from 'react';
import { Link } from 'react-router-dom';
import { VehicleAPI } from '../../features/vehicles/vehiclesandspecifications.api';

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

    const handleBookNow = (vehicleId: number) => {
        localStorage.setItem("vehicleId", vehicleId.toString());
    };

    if (isLoading) {
        return <p className="text-center text-gray-400">Loading...</p>;
    }

    if (isError) {
        return <p className="text-center text-red-500">Error loading vehicles. Please try again later.</p>;
    }

    return (
        <div className="p-6 bg-gray-900 min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {vehicles && vehicles.map((item: APIResponses) => (
                    <div
                        key={item.vehicles.vehicleId} // Unique key prop
                        className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out"
                    >
                        {item.vehicle_specs ? (
                            <>
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-teal-400">
                                        {item.vehicle_specs.manufacturer} {item.vehicle_specs.model}
                                    </h3>
                                    <img
                                        src={item.vehicle_specs.color ? 'placeholder-image-url' : 'default-image-url'} // Adjust according to your data
                                        alt={`${item.vehicle_specs.manufacturer} ${item.vehicle_specs.model}`}
                                        className="w-full h-48 object-cover mb-4"
                                    />
                                    <div className="mb-4">
                                        <p className="text-lg font-semibold text-green-400">
                                            <span className="text-gray-300">Rental Rate:</span> {item.vehicles.rentalRate}
                                        </p>
                                        <p className={`text-lg font-semibold ${item.vehicles.availability ? 'text-green-400' : 'text-red-400'}`}>
                                            <span className="text-gray-300">Availability:</span> {item.vehicles.availability ? 'Available' : 'Unavailable'}
                                        </p>
                                    </div>
                                    <div className="space-y-2 text-gray-400">
                                        <p><strong>Year:</strong> {item.vehicle_specs.year}</p>
                                        <p><strong>Fuel Type:</strong> {item.vehicle_specs.fuelType || 'N/A'}</p>
                                        <p><strong>Engine Capacity:</strong> {item.vehicle_specs.engineCapacity}</p>
                                        <p><strong>Transmission:</strong> {item.vehicle_specs.transmission}</p>
                                        <p><strong>Seating Capacity:</strong> {item.vehicle_specs.seatingCapacity}</p>
                                        <p><strong>Color:</strong> {item.vehicle_specs.color || 'N/A'}</p>
                                        <p><strong>Features:</strong> {item.vehicle_specs.features || 'N/A'}</p>
                                    </div>
                                    <Link
                                        to="/CreateLocationForm"
                                        className="bg-teal-600 text-white px-4 py-2 rounded-md inline-block font-bold hover:bg-teal-700"
                                        onClick={() => handleBookNow(item.vehicles.vehicleId)}
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
