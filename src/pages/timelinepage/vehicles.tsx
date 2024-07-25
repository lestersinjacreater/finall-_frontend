import React, { useState } from 'react';
import { VehicleAPI } from '../../features/vehicles/vehiclesandspecifications.api'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';

const Vehicles = () => {
  const { data: vehicles, isLoading, isError } = VehicleAPI.useGetVehiclesQuery();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState<null | string>(null);

  const handleSelectVehicle = (vehicleId: number, rentalRate: number) => {
    localStorage.setItem('selectedVehicleId', vehicleId.toString());
    localStorage.setItem('selectedVehicleRentalRate', rentalRate.toString());
    navigate('/bookings'); // Adjust the path as necessary
  };

  const handleSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = (criteria: string | null) => {
    setSortCriteria(criteria);
  };

  const filterVehicles = () => {
    if (!vehicles) return [];
    let filteredVehicles = vehicles.filter(({ vehicle_specs }) =>
      vehicle_specs.model.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortCriteria) {
      filteredVehicles = filteredVehicles.sort((a, b) => {
        if (sortCriteria === 'year') {
          return b.vehicle_specs.year - a.vehicle_specs.year;
        }
        // Add more sorting logic here based on other criteria
        return 0;
      });
    }

    return filteredVehicles;
  };

  const filteredVehicles = filterVehicles();

  if (isLoading) return <div className="text-center mt-4 text-gray-500">Loading vehicles...</div>;
  if (isError || !vehicles) return <div className="text-center mt-4 text-red-500">Failed to load vehicles</div>;

  return (
    <div className="p-6 bg-black text-gray-300 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-white">Whatever you are looking for, we got it.</h2>
      
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
        <input
          type="text"
          placeholder="Search by model"
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 rounded bg-gray-800 text-gray-200 mb-2 sm:mb-0"
        />
        <div>
          <button
            onClick={() => handleSort('year')}
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition ml-2"
          >
            Sort by Year
          </button>
          {/* Add more sort buttons here */}
        </div>
      </div>

      {filteredVehicles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredVehicles.map(({ vehicleId, rentalRate, vehicle_specs }) => {
            const [showMore, setShowMore] = useState(false);

            return (
              <div key={vehicleId} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                {/* <p className="mb-2 text-lg font-semibold text-white"><strong>ID:</strong> {vehicleId}</p> */}
                <p className="mb-2 text-gray-200"><strong>Rate:</strong> {rentalRate}</p>
                <p className="mb-2 text-gray-200"><strong>Manufacturer:</strong> {vehicle_specs.manufacturer}</p>
                <p className="mb-4 text-gray-200"><strong>Model:</strong> {vehicle_specs.model}</p>
                
                {showMore && (
                  <div className="mb-4 text-gray-400 text-sm">
                    <p><strong>Year:</strong> {vehicle_specs.year}</p>
                    <p><strong>Fuel Type:</strong> {vehicle_specs.fuelType}</p>
                    <p><strong>Engine Capacity:</strong> {vehicle_specs.engineCapacity}L</p>
                    <p><strong>Transmission:</strong> {vehicle_specs.transmission}</p>
                    <p><strong>Seating Capacity:</strong> {vehicle_specs.seatingCapacity}</p>
                    <p><strong>Color:</strong> {vehicle_specs.color}</p>
                    <p><strong>Features:</strong> {vehicle_specs.features}</p>
                  </div>
                )}
                
                <button
                  onClick={() => handleSelectVehicle(vehicleId, rentalRate)}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  Book Now
                </button>
                
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="mt-2 bg-gray-600 text-white py-1 px-2 rounded hover:bg-gray-700 transition"
                >
                  {showMore ? 'Show Less' : 'See More'}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center mt-4 text-gray-400">No vehicles found</p>
      )}
    </div>
  );
};

export default Vehicles;
