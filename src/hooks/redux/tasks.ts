import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://ravegenie-vgm7.onrender.com/api/tasks" }),
    tagTypes: ['tasks'],
    endpoints: (builder) => ({
        getAllTasks: builder.query({
            query: () => `/`,
            providesTags: ['tasks']
        }),
        completeTasks: builder.mutation({
            query: ({ taskId, telegram_id, reward }) => ({
                url: `/${taskId}/complete`,
                method: 'POST',
                body: { telegram_id, reward },
            }),
            invalidatesTags: ['tasks'],
        }),
        checkTaskStatus: builder.query({
            query: (taskId) => `/${taskId}/status`,
            providesTags: ['tasks']
        })
    }),
})


export const { useGetAllTasksQuery, useCompleteTasksMutation, useCheckTaskStatusQuery } = tasksApi
