import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the interface for Booking
export interface Booking {
  bookingId: number;
  userId: number;
  vehicleId: number;
  locationId: number;  // Include locationId if needed
  bookingDate: string;
  returnDate: string;
  totalAmount: number;
  bookingStatus: 'Pending' | 'Confirmed' | 'Cancelled';
  createdAt: string;
  updatedAt: string;
}

// Define the response type for creating a booking
export interface CreateBookingResponse {
  bookingId: number; // Ensure bookingId is included in the response
  message: string;   // Optional: Include a message for confirmation
}

// Define the bookingAPI with RTK Query
export const bookingAPI = createApi({
  reducerPath: 'bookingAPI', // Unique key to store the reducer in the Redux store
  baseQuery: fetchBaseQuery({ baseUrl: 'https://drill-wheel-rental-system-backend.onrender.com/api' }), // Base URL for API requests
  endpoints: (builder) => ({
    createBooking: builder.mutation<CreateBookingResponse, Partial<Booking>>({
      query: (newBooking) => ({
        url: '/bookings',
        method: 'POST',
        body: newBooking,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data && data.bookingId) {
            console.log('Booking ID:', data.bookingId);
          } else {
            console.error('Unexpected response format:', data);
          }
        } catch (error) {
          console.error('Error during booking creation:', error);
        }
      },
    }),

    getBookingById: builder.query<Booking, number>({
      query: (id) => `/bookings/${id}`, // API endpoint for fetching a booking by ID
    }),

    updateBooking: builder.mutation<Booking, { id: number; data: Partial<Booking> }>({
      query: ({ id, data }) => ({
        url: `/bookings/${id}`, // API endpoint for updating a booking
        method: 'PUT', // HTTP method
        body: data, // Request body
      }),
    }),

    deleteBooking: builder.mutation<void, number>({
      query: (id) => ({
        url: `/bookings/${id}`, // API endpoint for deleting a booking
        method: 'DELETE', // HTTP method
      }),
    }),

    getAllBookings: builder.query<Booking[], void>({
      query: () => '/bookings', // API endpoint for fetching all bookings
    }),

    getBookingsByUserId: builder.query<Booking[], number>({
      query: (userId) => `/bookings/user/${userId}`, // API endpoint for fetching bookings by user ID
    }),
  }),
});

// // Export hooks for usage in functional components
// export const { 
//   useCreateBookingMutation, 
//   useGetBookingByIdQuery, 
//   useUpdateBookingMutation, 
//   useDeleteBookingMutation, 
//   useGetAllBookingsQuery, 
//   useGetBookingsByUserIdQuery 
// } = bookingAPI;
