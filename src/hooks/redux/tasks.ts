import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// baseQuery: fetchBaseQuery({ baseUrl: "https://ravegenie-backend.onrender.com/api/tasks" }),

// Define a service using a base URL and expected endpoints
export const tasksApi = createApi({
    reducerPath: 'tasksApi',
baseQuery: fetchBaseQuery({ baseUrl: "https://ravegenie-backend.onrender.com/api/tasks" }),
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
        })
    }),
})


export const {
    useGetSocialTasksQuery,
    useCompleteSocialTasksMutation
} = tasksApi
