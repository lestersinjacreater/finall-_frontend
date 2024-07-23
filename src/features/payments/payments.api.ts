import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define payment interface
export interface Payment {
    paymentId: number;
    userId: number;
    bookingId: number;
    amount: number;
    paymentStatus: string;
    paymentDate: string;
    paymentMethod: string;
    sessionId: string; // This should be part of the Payment if it's needed
    transactionId: string;
    createdAt: string;
    updatedAt: string;
}

// Define the response type for createPayment mutation
export interface CreatePaymentResponse {
    sessionId: string;
}

export const paymentAPI = createApi({
    reducerPath: 'paymentAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    tagTypes: ['Payment'],
    endpoints: (builder) => ({
        // Define the endpoint for fetching a payment by ID
        getPaymentById: builder.query<Payment, number>({
            query: (paymentId) => `payments/${paymentId}`,
            providesTags: ['Payment'],
        }),
        // Define the endpoint for creating a payment
        createPayment: builder.mutation<CreatePaymentResponse, {
            bookingId: number;
            userId: number;
            amount: number;
            paymentStatus: string;
            paymentMethod: string;
        }>({
            query: (newPayment) => ({
                url: `create-checkout-session`,
                method: 'POST',
                body: newPayment,
            }),
            invalidatesTags: ['Payment'],
        }),
        // Define the endpoint for updating a payment
        updatePayment: builder.mutation<Payment, Payment>({
            query: (updatedPayment) => ({
                url: `payments/${updatedPayment.paymentId}`,
                method: 'PUT',
                body: updatedPayment,
            }),
            invalidatesTags: ['Payment'],
        }),
    }),
});
