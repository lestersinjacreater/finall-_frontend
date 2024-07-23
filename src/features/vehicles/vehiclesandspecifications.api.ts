import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export interface Vehicle {
//     vehicle_specs: any;
//     vehicleId: number;
//     vehicleSpecId: number;
//     rentalRate: string;
//     availability: boolean;
//     address: string;
// }
// export interface VehicleSpec {
//     vehicleSpecId:number;
//     nmanufactureYear: number;
//     model: string;
//     year: number;
//     engineCapacity: number;
//     transmission: string;
//     seatingCapacity: number;
//     color: string;
//     features: string;
//     fuelType: string;
//     image_url: string;
// }
export interface VehicleResponse {
    vehicles: {
      vehicleId: number;
      vehicleSpecId: number;
      rentalRate: number;
      availability: boolean;
      createdAt: string;
      updatedAt: string;
      address: string;
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
      image_url: string;
    };
  }




export const VehicleAPI = createApi({
    reducerPath: 'VehicleAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://drill-wheel-rental-system-backend.onrender.com/api' }),
    endpoints: (builder) => ({
        getVehicles: builder.query<VehicleResponse[], void>({
            query: () => 'vehiclesspecs', // Make sure this matches your API endpoint
            //providesTags: ['Vehicle']
            transformResponse: (Response: VehicleResponse[]) => {
                return Response.map((item) => ({
                    vehicles: {
                        vehicleId: item.vehicles.vehicleId,
                        vehicleSpecId: item.vehicles.vehicleSpecId,
                        rentalRate: item.vehicles.rentalRate,
                        availability: item.vehicles.availability,
                        createdAt: item.vehicles.createdAt,
                        updatedAt: item.vehicles.updatedAt,
                        address: item.vehicles.address,
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
                        image_url: item.vehicle_specs.image_url,
                    },
                    
                }));
            },
        

}),
        
        createVehicles: builder.mutation<VehicleResponse, Partial<VehicleResponse>>({
            query: (newVehicle) => ({
                url: 'Vehicles',
                method: 'POST',
                body: newVehicle
            }),
           // invalidatesTags: ['Vehicle']
        }),
        updateVehicles: builder.mutation<VehicleResponse, Partial<VehicleResponse> & { id: number }>({
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