import { VehicleAPI } from '../../features/vehicles/vehiclesandspecifications.api'; // Adjust the import path as necessary

const Vehicles = () => {
  const { data: vehicles, error, isLoading } = VehicleAPI.useGetVehiclesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred</div>;

  return (
    <div>
      <h2>Vehicles List</h2>
      <div>
        {vehicles?.map(({ vehicles, vehicle_specs }) => (
          <div key={vehicles.vehicleId}>
            <h3>{vehicle_specs.manufacturer} {vehicle_specs.model} ({vehicle_specs.year})</h3>
            <p>Rental Rate: ${vehicles.rentalRate}</p>
            <p>Availability: {vehicles.availability ? 'Available' : 'Not Available'}</p>
            <p>Engine Capacity: {vehicle_specs.engineCapacity}cc</p>
            <p>Transmission: {vehicle_specs.transmission}</p>
            <p>Seating Capacity: {vehicle_specs.seatingCapacity}</p>
            <p>Color: {vehicle_specs.color}</p>
            <p>Features: {vehicle_specs.features}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vehicles;