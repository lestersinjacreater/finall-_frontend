import { VehicleAPI } from '../../features/vehicles/vehiclesandspecifications.api'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';

const Vehicles = () => {
  const { data: vehicles, isLoading, isError } = VehicleAPI.useGetVehiclesQuery();
  const navigate = useNavigate();

  const handleSelectVehicle = (vehicleId: number, rentalRate: number) => {
    localStorage.setItem('selectedVehicleId', vehicleId.toString());
    localStorage.setItem('selectedVehicleRentalRate', rentalRate.toString());
    navigate('/bookings'); // Adjust the path as necessary
  };

  if (isLoading) return <div className="text-center mt-4">Loading vehicles...</div>;
  if (isError || !vehicles) return <div className="text-center mt-4">Failed to load vehicles</div>;

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Vehicles</h2>
      {vehicles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {vehicles.map(({ vehicles }) => (
            <div key={vehicles.vehicleId} className="bg-white p-4 rounded-lg shadow-md">
              {/* <p className="mb-2"><strong>ID:</strong> {vehicles.vehicleId}</p> */}
              <p className="mb-2"><strong>Rate:</strong>400</p>
              <p className="mb-4"><strong>Availability:</strong> {vehicles.availability ? 'Available' : 'Not Available'}</p>
              <button
                onClick={() => handleSelectVehicle(vehicles.vehicleId, vehicles.rentalRate)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No vehicles found</p>
      )}
    </div>
  );
};

export default Vehicles;