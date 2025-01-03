import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const notificationApi = createApi({
    reducerPath: 'notificationApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://ravegenie-backend.onrender.com/api/notifications" }),
    tagTypes: ['Notifications'],
    endpoints: (builder) => ({
        getNotifications: builder.query({
            query: ([page =1, limit = 10 ]) => ({
                url: `/notifications?page=${page}&limit=${limit}`,
                providesTags: ['Notifications']
            }),
        }),

    }),
})


export const { useGetNotificationsQuery } = notificationApi
