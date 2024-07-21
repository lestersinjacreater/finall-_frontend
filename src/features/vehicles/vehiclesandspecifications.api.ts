import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a type for the vehicle
interface VehicleSpecifications {
    vehicleSpecId: number;
    manufacturer: string;
    model: string;
    year: number;
    fuelType: string;
    engineCapacity: string;
    transmission: string;
    seatingCapacity: number;
    color: string;
    features: string;
    imageUrl?: string; // Ensure this matches the API response
}
 
export  interface APIVehicle {
    vehicleId: number;
    vehicleSpecId: number;
    rentalRate: string;
    availability: string; // Ensure this matches the API response
    vehicleSpecifications?: VehicleSpecifications;
}

// Create the API slice
export const VehicleAPI = createApi({
    reducerPath: 'VehicleAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }), // Update baseUrl as needed
    endpoints: (builder) => ({
        getVehicles: builder.query<APIVehicle[], void>({
            query: () => 'vehiclesspecs',
        }),
    }),
});

// export const { useGetVehiclesQuery } = VehicleAPI;