import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface CheckoutSessionResponse {
  checkoutUrl: string;
}

export const stripeAPI = createApi({
  reducerPath: 'stripeAPI',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3000/api/',
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation<CheckoutSessionResponse, { bookingId: number; amount: number }>({
      query: ({ bookingId, amount }) => ({
        url: 'create-checkout-session',
        method: 'POST',
        body: {
          bookingId,
          amount,
        },
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation
}: any = stripeAPI;
