import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/tasks" }),
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
            // async onQueryStarted({ reward }, { dispatch, queryFulfilled }) {
            //     try {
            //         const { data: getAllTasks } = await queryFulfilled;

            //         dispatch(
            //             tasksApi.util.updateQueryData('getAllTasks', reward, (draft) => {
            //                 Object.assign(draft, getAllTasks);
            //             })
            //         );
            //     } catch (error) {
            //         console.log("Error invalidating tasks", error);
            //     }
            // },
            invalidatesTags: ['Tasks'],
        }),
        checkTaskStatus: builder.query({
            query: (taskId) => `/${taskId}/complete`,
            providesTags: ['Tasks']
        })
    }),
})


export const { useGetAllTasksQuery, useCompleteTasksMutation, useCheckTaskStatusQuery } = tasksApi
