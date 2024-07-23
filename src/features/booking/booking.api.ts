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
  message: string;    // Optional: Include a message for confirmation
}

// Define the bookingAPI with RTK Query
export const bookingAPI = createApi({
  reducerPath: 'bookingAPI', // Unique key to store the reducer in the Redux store
  baseQuery: fetchBaseQuery({ baseUrl: 'https://drill-wheel-rental-system-backend.onrender.com/api' }), // Base URL for API requests
  endpoints: (builder) => ({
    // Define the endpoints for the API
    createBooking: builder.mutation<CreateBookingResponse, Partial<Booking>>({
      // Mutation to create a new booking
      query: (newBooking) => ({
        url: '/bookings', // API endpoint for creating a booking
        method: 'POST', // HTTP method
        body: newBooking, // Request body
      }),
      // Side effect to handle the response
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.bookingId) {
            console.log('Booking ID:', data.bookingId); // Debug booking ID
            // You can handle additional logic here if needed
          } else {
            console.error('Booking ID not found in response:', data);
          }
        } catch (error) {
          console.error('Error during booking creation:', error);
        }
      },
    }),
    getBookingById: builder.query<Booking, number>({
      // Query to get a booking by its ID
      query: (id) => `/bookings/${id}`, // API endpoint for fetching a booking by ID
    }),
    updateBooking: builder.mutation<Booking, { id: number; data: Partial<Booking> }>({
      // Mutation to update a booking
      query: ({ id, data }) => ({
        url: `/bookings/${id}`, // API endpoint for updating a booking
        method: 'PUT', // HTTP method
        body: data, // Request body
      }),
    }),
    deleteBooking: builder.mutation<void, number>({
      // Mutation to delete a booking
      query: (id) => ({
        url: `/bookings/${id}`, // API endpoint for deleting a booking
        method: 'DELETE', // HTTP method
      }),
    }),
    getAllBookings: builder.query<Booking[], void>({
      // Query to get all bookings
      query: () => '/bookings', // API endpoint for fetching all bookings
    }),
    getBookingsByUserId: builder.query<Booking[], number>({
      // Query to get bookings by user ID
      query: (userId) => `/bookings/user/${userId}`, // API endpoint for fetching bookings by user ID
    }),
 }),
});