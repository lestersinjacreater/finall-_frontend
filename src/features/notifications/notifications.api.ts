import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Notification
{
    notificationId: number;
    userId: number;
    message: string;
    readStatus: boolean;
    updatedAt: string;
}

//define the response type for creating a notification
export interface CreateNotificationResponse {
    notificationId: number;
    message: string;
}
 export const notificationsAPI = createApi({
    reducerPath: 'notificationsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://drill-wheel-rental-system-backend.onrender.com/api' }),
    tagTypes: ['Notification'],
    endpoints: (builder) => ({
        // Define the endpoint for fetching a notification by ID
        getNotificationById: builder.query<Notification, number>({
            query: (notificationId) => `notifications/${notificationId}`,
            providesTags: ['Notification'],
        }),
        // Define the endpoint for creating a notification
        createNotification: builder.mutation<CreateNotificationResponse, {
            userId: number;
            message: string;
        }>({
            query: (newNotification) => ({
                url: `notifications`,
                method: 'POST',
                body: newNotification,
            }),
            invalidatesTags: ['Notification'],
        }),
        // Define the endpoint for updating a notification
        updateNotification: builder.mutation<Notification, Notification>({
            query: (updatedNotification) => ({
                url: `notifications/${updatedNotification.notificationId}`,
                method: 'PUT',
                body: updatedNotification,
            }),
            invalidatesTags: ['Notification'],
        }),
        //define the endpoint for fetching  notifications by user id
        getNotificationsByUserId: builder.query<Notification[], number>({
            query: (userId) => `notifications/user/${userId}`,
            providesTags: ['Notification'],
        }),
    }),
});