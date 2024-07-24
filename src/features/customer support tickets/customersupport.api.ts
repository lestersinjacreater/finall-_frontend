import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface CustomerSupportTicket {

    ticketId: number;
    userId: number;
    subject: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

//define the response type for creating a ticket
export interface CreateTicketResponse {
    ticketId: number;
    message: string;
}

export const customerSupportAPI = createApi({
    reducerPath: 'customerSupportAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://drill-wheel-rental-system-backend.onrender.com/api' }),
    tagTypes: ['CustomerSupportTicket'],
    endpoints: (builder) => ({
        // Define the endpoint for fetching a ticket by ID
        getTicketById: builder.query<CustomerSupportTicket, number>({
            query: (ticketId) => `customer_support_tickets/${ticketId}`,
            providesTags: ['CustomerSupportTicket'],
        }),
        // Define the endpoint for creating a ticket
        createTicket: builder.mutation<CreateTicketResponse, {
            userId: number;
            subject: string;
            description: string;
        }>({
            query: (newTicket) => ({
                url: `customer_support_tickets`,
                method: 'POST',
                body: newTicket,
            }),
            invalidatesTags: ['CustomerSupportTicket'],
        }),
        // Define the endpoint for updating a ticket
        updateTicket: builder.mutation<CustomerSupportTicket, CustomerSupportTicket>({
            query: (updatedTicket) => ({
                url: `tickets/${updatedTicket.ticketId}`,
                method: 'PUT',
                body: updatedTicket,
            }),
            invalidatesTags: ['CustomerSupportTicket'],
        }),
        //define the endpoint for fetching  tickets by user id
        getTicketsByUserId: builder.query<CustomerSupportTicket[], number>({
            query: (userId) => `customer_support_tickets/user/${userId}`,
            providesTags: ['CustomerSupportTicket'],
        }),
    }),
});

