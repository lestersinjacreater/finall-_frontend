import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { VehicleAPI } from '../../features/vehicles/vehiclesandspecifications.api';

// Function to format currency
const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
};

const VehiclesList = () => {
    const { data: vehiclesData, error, isLoading } = VehicleAPI.useGetVehiclesQuery();
    const [expandedVehicleId, setExpandedVehicleId] = useState<number | null>(null);

    console.log(vehiclesData);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading vehicles</div>;

    const toggleExpand = (vehicleId: number | null) => {
        setExpandedVehicleId(prevState => prevState === vehicleId ? null : vehicleId);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {vehiclesData?.map(({ vehicles, vehicle_specs }) => (
                <div
                    key={vehicles.vehicleId}
                    className="bg-gray-800 text-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">{`${vehicle_specs.manufacturer} ${vehicle_specs.model}`}</h3>
                        <Link
                            to={`/bookings?vehicleId=${vehicles.vehicleId}&rentalRate=${vehicles.rentalRate}&vehicleSpecId=${vehicles.vehicleSpecId}`}
                            className="bg-teal-500 text-white px-4 py-2 rounded-md font-bold hover:bg-teal-600"
                        >
                            Book Now
                        </Link>
                    </div>
                    <div className="mb-4">
                        <p className="text-lg font-semibold">
                            <span className="text-gray-400">Rental Rate:</span> {formatCurrency(vehicles.rentalRate)}
                        </p>
                        <p className={`text-lg font-semibold ${vehicles.availability ? 'text-green-500' : 'text-red-500'}`}>
                            <span className="text-gray-400">Availability:</span> {vehicles.availability ? 'Available' : 'Unavailable'}
                        </p>
                    </div>
                    {expandedVehicleId === vehicles.vehicleId && (
                        <div className="mt-4">
                            <p className="text-lg font-semibold">
                                <span className="text-gray-400">Vehicle Spec ID:</span> {vehicles.vehicleSpecId}
                            </p>
                            <p className="text-lg font-semibold">
                                <span className="text-gray-400">Year:</span> {vehicle_specs.year}
                            </p>
                            <p className="text-lg font-semibold">
                                <span className="text-gray-400">Fuel Type:</span> {vehicle_specs.fuelType}
                            </p>
                            <p className="text-lg font-semibold">
                                <span className="text-gray-400">Engine Capacity:</span> {vehicle_specs.engineCapacity}L
                            </p>
                            <p className="text-lg font-semibold">
                                <span className="text-gray-400">Transmission:</span> {vehicle_specs.transmission}
                            </p>
                            <p className="text-lg font-semibold">
                                <span className="text-gray-400">Seating Capacity:</span> {vehicle_specs.seatingCapacity}
                            </p>
                            <p className="text-lg font-semibold">
                                <span className="text-gray-400">Color:</span> {vehicle_specs.color}
                            </p>
                            <p className="text-lg font-semibold">
                                <span className="text-gray-400">Features:</span> {vehicle_specs.features}
                            </p>
                        </div>
                    )}
                    <button
                        onClick={() => toggleExpand(vehicles.vehicleId)}
                        className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-md font-bold hover:bg-gray-600"
                    >
                        {expandedVehicleId === vehicles.vehicleId ? 'See Less' : 'See More'}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default VehiclesList;