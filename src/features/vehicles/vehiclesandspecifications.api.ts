import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Vehicle {
    vehicle_specs: any;
    vehicleId: number;
    vehicleSpecId: number;
    rentalRate: string;
    availability: boolean;
    address: string;
}

export const VehicleAPI = createApi({
    reducerPath: 'VehicleAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://drill-wheel-rental-system-backend.onrender.com/api' }),
    endpoints: (builder) => ({
        getVehicles: builder.query<Vehicle[], void>({
            query: () => 'vehiclesspecs', // Make sure this matches your API endpoint
            //providesTags: ['Vehicle']
        }),
        
        createVehicles: builder.mutation<Vehicle, Partial<Vehicle>>({
            query: (newVehicle) => ({
                url: 'Vehicles',
                method: 'POST',
                body: newVehicle
            }),
           // invalidatesTags: ['Vehicle']
        }),
        updateVehicles: builder.mutation<Vehicle, Partial<Vehicle> & { id: number }>({
            query: ({ id, ...updatedVehicles }) => ({
                url: `Vehicles/${id}`,
                method: 'PUT',
                body: updatedVehicles
            }),
            //invalidatesTags: ['Vehicle']
        }),
        deleteVehicles: builder.mutation<void, number>({
            query: (id) => ({
                url: `Vehicles/${id}`,
                method: 'DELETE'
            }),
            //invalidatesTags: ['Vehicle']
        }),
    }),
});

// export const {
//     useGetVehiclesQuery,
//     useCreateVehiclesMutation,
//     useUpdateVehiclesMutation,
//     useDeleteVehiclesMutation,
// } = VehicleAPI;