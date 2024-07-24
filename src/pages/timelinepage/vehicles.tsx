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

  if (isLoading) return <div className="text-center text-gray-500">Loading vehicles...</div>;
  if (isError || !vehicles) return <div className="text-center text-red-500">Failed to load vehicles</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Available Vehicles</h2>
      {vehicles.length > 0 ? (
        <ul className="space-y-4">
          {vehicles.map((vehicle) => {
            const { vehicleId, rentalRate, availability } = vehicle;
            const formattedRate = rentalRate ? rentalRate.toFixed(2) : 'N/A'; // Safeguard against undefined rentalRate

            return (
              <li key={vehicleId} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-semibold text-gray-700">ID: {vehicleId}</p>
                  <p className="text-lg text-gray-600">Rate: ${formattedRate}</p>
                  <p className={`text-lg ${availability ? 'text-green-500' : 'text-red-500'}`}>
                    {availability ? 'Available' : 'Not Available'}
                  </p>
                  <button
                    onClick={() => handleSelectVehicle(vehicleId, rentalRate)}
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center text-gray-600 mt-6">No vehicles found</p>
      )}
    </div>
  );
};

export default Vehicles;
