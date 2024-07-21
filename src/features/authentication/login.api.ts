import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface logInUser {
    [x: string]: any;
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
}

export const loginAPI = createApi({
    reducerPath: 'loginAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    endpoints: (builder) => ({
        loginUser: builder.mutation<logInUser, Partial<logInUser>>({
            query: (user) => ({
                url: '/login',
                method: 'POST',
                body: user,
            }),
        }),
        logout: builder.mutation<void, Partial<logInUser>>({
            query: (user) => ({
                url: '/logout',
                method: 'POST',
                body: user,
            }),
        }),
        getAllLoggedInUsers: builder.query<LoggedInUser[], void>({
            query: () => '/login',
        }),
    }),
});

//export const { useLoginUserMutation, useLogoutMutation, useGetAllLoggedInUsersQuery } = loginAPI;