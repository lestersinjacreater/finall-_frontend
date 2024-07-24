import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface VehicleResponse {
    vehicles: {
        vehicleId: number;
        vehicleSpecId: number;
        rentalRate: number;
        availability: boolean;
        createdAt: string;
        updatedAt: string;
    };
    vehicle_specs: {
        vehicleSpecId: number;
        manufacturer: string;
        model: string;
        year: number;
        fuelType: string;
        engineCapacity: number;
        transmission: string;
        seatingCapacity: number;
        color: string;
        features: string;
    }
}

    //define the response type for fetching vehicles
    export interface VehicleResponse {
        vehicleId: number;
        vehicleSpecId: number;
        rentalRate: number;
        availability: boolean;
        createdAt: string;
        updatedAt: string;
    };
    export interface VehicleSpecs {
        vehicleSpecId: number;
        manufacturer: string;
        model: string;
        year: number;
        fuelType: string;
        engineCapacity: number;
        transmission: string;
        seatingCapacity: number;
        color: string;
        features: string;
    }

export const VehicleAPI = createApi({
    reducerPath: 'VehicleAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://drill-wheel-rental-system-backend.onrender.com/api' }),
    tagTypes: ['Vehicle'],
    endpoints: (builder) => ({
        // Define the endpoint for fetching vehicles
        getVehicles: builder.query<VehicleResponse[], void>({
            query: () => `vehicles`,
            providesTags: ['Vehicle'],
        }),
        // Define the endpoint for fetching a vehicle by ID
        getVehicleById: builder.query<VehicleResponse, number>({
            query: (vehicleId) => `vehicles/${vehicleId}`,
            providesTags: ['Vehicle'],
        }),
        // Define the endpoint for creating a vehicle
        createVehicle: builder.mutation<VehicleResponse, {
            vehicleSpecId: number;
            rentalRate: number;
            availability: boolean;
        }>({
            query: (newVehicle) => ({
                url: `vehicles`,
                method: 'POST',
                body: newVehicle,
            }),
            invalidatesTags: ['Vehicle'],
        }),
        // Define the endpoint for updating a vehicle
        updateVehicle: builder.mutation<VehicleResponse, VehicleResponse>({
            query: (updatedVehicle) => ({
                url: `vehicles/${updatedVehicle.vehicleId}`,
                method: 'PUT',
                body: updatedVehicle,
            }),
            invalidatesTags: ['Vehicle'],
        }),
        // Define the endpoint for deleting a vehicle
        deleteVehicle: builder.mutation<void, number>({
            query: (vehicleId) => ({
                url: `vehicles/${vehicleId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Vehicle'],
        }),
    }),
});
