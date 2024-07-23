import React from 'react';
import { VehicleAPI,VehicleResponse } from '../../features/vehicles/vehiclesandspecifications.api';


const Vehicle: React.FC = () => {
    const { data: vehiclesData, error, isLoading } = VehicleAPI.useGetVehiclesQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    return (
        <div>
            <h1>Vehicles</h1>
            <ul>
                {vehiclesData && vehiclesData.map((item: VehicleResponse, index: number) => (
                    <li key={index}>
                        <h2>{item.vehicle_specs.manufacturer} {item.vehicle_specs.model}</h2>
                        <p>Year: {item.vehicle_specs.year}</p>
                        <p>Fuel Type: {item.vehicle_specs.fuelType}</p>
                        <p>Engine Capacity: {item.vehicle_specs.engineCapacity}L</p>
                        <p>Transmission: {item.vehicle_specs.transmission}</p>
                        <p>Seating Capacity: {item.vehicle_specs.seatingCapacity}</p>
                        <p>Color: {item.vehicle_specs.color}</p>
                        <p>Features: {item.vehicle_specs.features}</p>
                        <p>Rental Rate: ${item.vehicles.rentalRate}/day</p>
                        <p>Availability: {item.vehicles.availability ? 'Available' : 'Not Available'}</p>
                        <p>Created At: {new Date(item.vehicles.createdAt).toLocaleString()}</p>
                        <p>Updated At: {new Date(item.vehicles.updatedAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Vehicle;
