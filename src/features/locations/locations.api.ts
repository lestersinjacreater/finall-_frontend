import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Location {
    locationId: number;
    name: string;
    address: string;
    contactPhone: string;
    createdAt: string;
    updatedAt: string;

}

// Define the response type for createLocation mutation
export interface CreateLocationResponse {
    locationId: number;
    name: string;
}

export const locationAPI = createApi({
    reducerPath: 'locationAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://drill-wheel-rental-system-backend.onrender.com/api' }),
    tagTypes: ['Location'],
    endpoints: (builder) => ({
        // Define the endpoint for fetching a location by ID
        getLocationById: builder.query<Location, number>({
            query: (locationId) => `locations/${locationId}`,
            providesTags: ['Location'],
        }),
        // Define the endpoint for creating a location
        createLocation: builder.mutation<CreateLocationResponse, {
            name: string;
            address: string;
            contactPhone: string;
        }>({
            query: (newLocation) => ({
                url: `locations`,
                method: 'POST',
                body: newLocation,
            }),
            invalidatesTags: ['Location'],
        }),
        // Define the endpoint for updating a location
        updateLocation: builder.mutation<Location, Location>({
            query: (updatedLocation) => ({
                url: `locations/${updatedLocation.locationId}`,
                method: 'PUT',
                body: updatedLocation,
            }),
            invalidatesTags: ['Location'],
        }),
    }),
});


