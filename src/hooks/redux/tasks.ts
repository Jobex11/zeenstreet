import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '@/lib/baseUrl'


export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({
        getSocialTasks: builder.query({
            query: (telegram_id) => `/social-tasks/tasks/${telegram_id}`,
            providesTags: ['Tasks']
        }),
        completeSocialTasks: builder.mutation({
            query: ({ telegram_id, taskId }) => ({
                url: `/social-tasks/${telegram_id}/complete`,
                method: "POST",
                body: { taskId }
            })
        }),
        getPartnersTasks: builder.query({
            query: (telegram_id) => `/partners/tasks/${telegram_id}`,
            providesTags: ['Tasks']
        }),
        completePartnersTasks: builder.mutation({
            query: ({ telegram_id, taskId }) => ({
                url: `/partners/${telegram_id}/complete`,
                method: "POST",
                body: { taskId },
            })
        }),
        getEventsTasks: builder.query({
            query: (telegram_id) => `/events/tasks/${telegram_id}`,
            providesTags: ['Tasks']
        }),
        completeEventsTasks: builder.mutation({
            query: ({ telegram_id, taskId }) => ({
                url: `/events/${telegram_id}/complete`,
                method: "POST",
                body: { taskId },
            })
        })
    }),
})


export const {
    useGetSocialTasksQuery,
    useCompleteSocialTasksMutation,
    useGetPartnersTasksQuery,
    useCompletePartnersTasksMutation,
    useGetEventsTasksQuery,
    useCompleteEventsTasksMutation,
} = tasksApi
