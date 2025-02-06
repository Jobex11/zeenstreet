import { baseUrl } from '@/lib/baseUrl'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const notificationApi = createApi({
    reducerPath: 'notificationApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Notifications'],
    endpoints: (builder) => ({
        getNotifications: builder.query({
            query: ([page = 1, limit = 10]) => ({
                url: `/notifications/notifications?page=${page}&limit=${limit}`,
                providesTags: ['Notifications']
            }),
        }),
        sendPingNotification: builder.mutation({
            query: ({ telegram_id, message }) => ({
                url: '/notifications/send-ping',
                method: 'POST',
                body: { telegram_id, message },
            }),
        }),
        checkThrottle: builder.query({
            query: (telegram_id) => `/notifications/throttle/${telegram_id}`,
        }),
        getPingedNotifications: builder.query({
            query: (telegram_id) => `/notifications/pinged/${telegram_id}`,
        }),
    }),
})


export const { useGetNotificationsQuery,
    useSendPingNotificationMutation,
    useCheckThrottleQuery,
    useGetPingedNotificationsQuery } = notificationApi
