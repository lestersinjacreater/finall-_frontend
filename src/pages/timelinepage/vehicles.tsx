import { VehicleAPI } from '../../features/vehicles/vehiclesandspecifications.api';
import { Link } from 'react-router-dom';

const VehiclesList = () => {
    const { data: vehiclesData, error, isLoading } = VehicleAPI.useGetVehiclesQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading vehicles</div>;

    // Function to format rental rate as currency
    function formatCurrency(rentalRate: number): React.ReactNode {
        return rentalRate.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    }

    return (
        <div>
            {vehiclesData?.map(({ vehicles, vehicle_specs }) => (
                <div key={vehicles.vehicleId} className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-teal-600">{`${vehicle_specs.manufacturer} ${vehicle_specs.model}`}</h3>
                        <Link
                            to={`/bookings?vehicleId=${vehicles.vehicleId}&rentalRate=${vehicles.rentalRate}&vehicleSpecId=${vehicles.vehicleSpecId}`}
                            className="bg-teal-500 text-white px-4 py-2 rounded-md inline-block font-bold hover:bg-teal-600"
                        >
                            Book Now
                        </Link>
                    </div>
                    <div className="mb-4">
                        <p className="text-lg font-semibold text-green-600">
                            <span className="text-gray-800">Rental Rate:</span> {formatCurrency(vehicles.rentalRate)}
                        </p>
                        <p className={`text-lg font-semibold ${vehicles.availability ? 'text-green-600' : 'text-red-600'}`}>
                            <span className="text-gray-800">Availability:</span> {vehicles.availability ? 'Available' : 'Unavailable'}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VehiclesList;