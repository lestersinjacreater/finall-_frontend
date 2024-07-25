// Importing necessary functions and types from Redux Toolkit Query and a utility for API domains
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// Defining a TypeScript interface for the Profile data structure
export interface Profile {
    fullName: string; // User's full name
    email: string; // User's email address
    contactPhone: string; // User's contact phone number
    address: string; // User's physical address
}

// Creating an API slice for profile-related operations using Redux Toolkit Query
export const profileAPI = createApi({
    reducerPath: 'profileAPI', // Unique key for the reducer
    baseQuery: fetchBaseQuery({ baseUrl: '' }), // Base query function with the API domain
    tagTypes: ['Profile'], // Tag types for invalidating cache
    endpoints: (builder) => ({
        getProfile: builder.query<Profile, string>({ // Endpoint to fetch a user profile
            query: (id) => `users/${id}`, // API endpoint, expecting an ID to be replaced
            providesTags: ['Profile'], // Tags for cache invalidation
        }),
        updateProfile: builder.mutation<Profile, { id: string, newProfile: Partial<Profile> }>({ // Endpoint to update a user profile
            query: ({ id, newProfile }) => ({ // Function to construct the query
                url: `users/${id}`, // API endpoint, expecting an ID to be replaced
                method: 'PUT', // HTTP method for updating data
                body: newProfile, // Data to be updated
            }),
            invalidatesTags: ['Profile'], // Invalidate cache tags after update
        }),
    }),
});

// Export hooks for usage in functional components
//export const { useGetProfileQuery, useUpdateProfileMutation } = profileAPI;
