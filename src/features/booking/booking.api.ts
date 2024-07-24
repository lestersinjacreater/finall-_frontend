import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

 export interface Booking {
  locationId: number;
    createdAt: any;
    updatedAt: any;
    vehicleId: number;
    userId: number; // Corrected typo from useId to userId
    bookingId: number;
    bookingDate: string;
    returnDate: string;
    totalAmount: number;
    bookingStatus: string;
    locationName: string; // New field
    address: string; // New field
    contactPhone: string; // New field
    
    
}

export const BookingAPI = createApi({
    reducerPath: 'bookingAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://final-project-hono.onrender.com/' }),
    endpoints: (builder) => ({
        getBooking: builder.query<Booking[], void>({
            query: () => 'Bookings',
            //  providesTags: ['getUsersTag'],
        }),
        createBookings: builder.mutation<Booking, Partial<Booking>>({
            query: (newBooking) => ({
                url: 'Bookings',
                method: 'POST',
                body: newBooking,
                providesTags: ['createBookingTags'],
            }),
           // invalidatesTags: ['getUsersTag'],
        }),
        deleteBooking: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `Bookings/${id}`,
                method: 'DELETE',
                providesTags: ['deleteBookingTags'],
            }),
           // invalidatesTags: ['getUsersTag'],
        }),
        updateBooking: builder.mutation<Booking, Partial<Booking>>({
            query: ({ bookingId, ...rest }) => ({
                url: `Bookings/${bookingId}`,
                method: 'PUT',
                body: rest,
                providesTags: ['updateBookingTags'],
            }),
           // invalidatesTags: ['getUsersTag'],
        }),
        //get bookings by user id
        getBookingByUserId: builder.query<Booking[], number>({
            query: (userId) => `Bookings/user/${userId}`,
            //  providesTags: ['getUsersTag'],
        }), 
    }),
});
export const useGetBookingsByUserIdQuery = (userId: number) => {
return useQuery({
    queryKey: ['getBookingByUserId', userId],
    queryFn: () => BookingAPI.endpoints.getBookingByUserId.initiate(userId),
  });
};

function useQuery(_arg0: { queryKey: (string | number)[]; queryFn: () => import("@reduxjs/toolkit").ThunkAction<import("@reduxjs/toolkit/query/react").QueryActionCreatorResult<import("@reduxjs/toolkit/query/react").QueryDefinition<number, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, Booking[], "bookingAPI">>, any, any, import("@reduxjs/toolkit").UnknownAction>; }) {
  throw new Error("Function not implemented.");
}
