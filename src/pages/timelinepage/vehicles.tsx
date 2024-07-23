import React from 'react';
import { Link } from 'react-router-dom';
import { VehicleAPI, VehicleResponse } from '../../features/vehicles/vehiclesandspecifications.api';

const Vehicles: React.FC = () => {
    const { data: vehicles, isLoading, isError } = VehicleAPI.useGetVehiclesQuery();

    console.log('Vehicles Data:', JSON.stringify(vehicles, null, 2));

    const formatCurrency = (value: number | undefined) => {
        if (value === undefined) {
            return 'N/A';
        }
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    const handleBookNow = (vehicleId: number, rentalRate: number, vehicleSpecId: number) => {
        localStorage.setItem("vehicleId", vehicleId.toString());
        localStorage.setItem("rentalRate", rentalRate.toString());
        localStorage.setItem("vehicleSpecId", vehicleSpecId.toString());
    };

    if (isLoading) {
        return <p className="text-center text-gray-600">Loading...</p>;
    }

    if (isError) {
        return <p className="text-center text-red-500">Error loading vehicles.</p>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {vehicles && vehicles.map((vehicleResponse: VehicleResponse, index: number) => {
                    const vehicle = vehicleResponse.vehicles;
                    const specs = vehicleResponse.vehicle_specs;

                    return (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
                            <img src={specs.image_url} alt={`${specs.manufacturer} ${specs.model}`} className="w-full h-48 object-cover mb-4" />
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-semibold text-teal-600">{`${specs.manufacturer} ${specs.model}`}</h3>
                                    <Link
                                        to="/bookings"
                                        className="bg-teal-500 text-white px-4 py-2 rounded-md inline-block font-bold hover:bg-teal-600"
                                        onClick={() => handleBookNow(vehicle.vehicleId, vehicle.rentalRate, vehicle.vehicleSpecId)}
                                    >
                                        Book Now
                                    </Link>
                                </div>
                                <div className="mb-4">
                                    <p className="text-lg font-semibold text-green-600">
                                        <span className="text-gray-800">Rental Rate:</span> {formatCurrency(vehicle.rentalRate)}
                                    </p>
                                    <p className={`text-lg font-semibold ${vehicle.availability ? 'text-green-600' : 'text-red-600'}`}>
                                        <span className="text-gray-800">Availability:</span> {vehicle.availability ? 'Available' : 'Unavailable'}
                                    </p>
                                </div>
                                <div className="space-y-2 text-gray-700">
                                    <p><strong>Year:</strong> {specs.year}</p>
                                    <p><strong>Fuel Type:</strong> {specs.fuelType}</p>
                                    <p><strong>Engine Capacity:</strong> {specs.engineCapacity}</p>
                                    <p><strong>Transmission:</strong> {specs.transmission}</p>
                                    <p><strong>Seating Capacity:</strong> {specs.seatingCapacity}</p>
                                    <p><strong>Color:</strong> {specs.color}</p>
                                    <p><strong>Features:</strong> {specs.features}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Vehicles;