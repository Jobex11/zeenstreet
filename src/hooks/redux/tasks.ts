import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://ravegenie-vgm7.onrender.com/api/tasks" }),
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({
        getAllTasks: builder.query({
            query: () => `/`,
            providesTags: ['Tasks']
        }),
        completeTasks: builder.mutation({
            query: ({ taskId, telegram_id, reward }) => ({
                url: `/${taskId}/complete`,
                method: 'POST',
                body: { telegram_id, reward },
            }),
            invalidatesTags: ['Tasks'],
        }),
        checkTaskStatus: builder.query({
            query: (taskId) => `/${taskId}/status`,
            providesTags: ['Tasks']
        })
    }),
})


export const { useGetAllTasksQuery, useCompleteTasksMutation, useCheckTaskStatusQuery } = tasksApi
