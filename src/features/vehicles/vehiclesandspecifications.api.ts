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
    };
}

export const VehicleAPI = createApi({
    reducerPath: 'VehicleAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://drill-wheel-rental-system-backend.onrender.com/api' }),
    endpoints: (builder) => ({
        getVehicles: builder.query<VehicleResponse[], void>({
            query: () => 'vehiclesspecs',
            transformResponse: (response: VehicleResponse[]) => {
                return response.map((item) => ({
                    vehicles: {
                        vehicleId: item.vehicles.vehicleId,
                        vehicleSpecId: item.vehicles.vehicleSpecId,
                        rentalRate: item.vehicles.rentalRate,
                        availability: item.vehicles.availability,
                        createdAt: item.vehicles.createdAt,
                        updatedAt: item.vehicles.updatedAt,
                    },
                    vehicle_specs: {
                        vehicleSpecId: item.vehicle_specs.vehicleSpecId,
                        manufacturer: item.vehicle_specs.manufacturer,
                        model: item.vehicle_specs.model,
                        year: item.vehicle_specs.year,
                        fuelType: item.vehicle_specs.fuelType,
                        engineCapacity: item.vehicle_specs.engineCapacity,
                        transmission: item.vehicle_specs.transmission,
                        seatingCapacity: item.vehicle_specs.seatingCapacity,
                        color: item.vehicle_specs.color,
                        features: item.vehicle_specs.features,
                    },
                }));
            },
        }),
        createVehicles: builder.mutation<VehicleResponse, Partial<VehicleResponse>>({
            query: (newVehicle) => ({
                url: 'Vehicles',
                method: 'POST',
                body: newVehicle,
            }),
        }),
        updateVehicles: builder.mutation<VehicleResponse, Partial<VehicleResponse> & { id: number }>({
            query: ({ id, ...updatedVehicles }) => ({
                url: `Vehicles/${id}`,
                method: 'PUT',
                body: updatedVehicles,
            }),
        }),
        deleteVehicles: builder.mutation<void, number>({
            query: (id) => ({
                url: `Vehicles/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

// export const {
//     useGetVehiclesQuery,
//     useCreateVehiclesMutation,
//     useUpdateVehiclesMutation,
//     useDeleteVehiclesMutation,
// } = VehicleAPI;