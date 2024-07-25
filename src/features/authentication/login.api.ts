import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {jwtDecode} from 'jwt-decode';

// Interfaces for request and response types
export interface LogInUser {
    email: string;
    password: string;
}

export interface LoggedInUser {
    userId: string;
    full_name: string | null;
    email: string | null;
    contact_phone: string | null;
    address: string | null;
    role: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    token: string; // Add token to the response type
}

// Define an interface for the decoded JWT token
interface DecodedToken {
    userId: string;
    exp: number; // Example of other claims
    // Add other fields if necessary
}

// Create an API slice for login operations
export const loginAPI = createApi({
    reducerPath: 'loginAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://drill-wheel-rental-system-backend.onrender.com/api' }),
    endpoints: (builder) => ({
        loginUser: builder.mutation<LoggedInUser, LogInUser>({
            query: (user) => ({
                url: '/login',
                method: 'POST',
                body: user,
            }),
            // Handle successful login by storing token in local storage
            transformResponse: (response: LoggedInUser) => {
                // Store the token in local storage
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

// Function to decode the JWT token
export const getUserIdFromToken = (): string | null => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        try {
            const decodedToken = jwtDecode<DecodedToken>(token);
            return decodedToken.userId;
        } catch (error) {
            console.error('Invalid token:', error);
            return null;
        }
    }
    return null;
};

// Export hooks for the API endpoints
//export const { useLoginUserMutation, useLogoutMutation, useGetAllLoggedInUsersQuery } = loginAPI;
