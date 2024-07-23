import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Interfaces for request and response types
export interface LogInUser {
    email: string;
    password: string;
}

export interface LoggedInUser {
    id: number;
    full_name: string | null;
    email: string | null;
    contact_phone: string | null;
    address: string | null;
    role: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    token: string; // Add token to the response type
}

// Create an API slice for login operations
export const loginAPI = createApi({
    reducerPath: 'loginAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    endpoints: (builder) => ({
        loginUser: builder.mutation<LoggedInUser, LogInUser>({
            query: (user) => ({
                url: '/login',
                method: 'POST',
                body: user,
            }),
            // Handle successful login by storing token in local storage
            transformResponse: (response: LoggedInUser) => {
                localStorage.setItem('jwtToken', response.token);
                return response;
            }
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
                // Optionally include token in headers if needed
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                }
            }),
            // Clear the token from local storage on logout
            transformResponse: () => {
                localStorage.removeItem('jwtToken');
            }
        }),
        getAllLoggedInUsers: builder.query<LoggedInUser[], void>({
            query: () => '/login',
        }),
    }),
});

// Export hooks for the API endpoints
//export const { useLoginUserMutation, useLogoutMutation, useGetAllLoggedInUsersQuery } = loginAPI;
