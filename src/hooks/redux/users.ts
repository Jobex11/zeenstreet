import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://ravegenie-backend.onrender.com/api" }),
    tagTypes: ['username'],
    endpoints: (builder) => ({
        createUsername: builder.mutation({
            query: (body) => ({
                url: `/username/set`,
                method: "POST",
                body: body
            }),
            async onQueryStarted({ username }, { dispatch, queryFulfilled }) {
                try {
                    const { data: createUsername } = await queryFulfilled
                    dispatch(
                        usersApi.util.upsertQueryData('getUsername', username, createUsername)
                    );
                    dispatch(
                        usersApi.util.invalidateTags(['username'])
                    );
                } catch (error) {
                    console.log(error)
                }
            },
            invalidatesTags: ['username'],
        }),
        getUsername: builder.query({
            query: (telegram_id) => `/username/${telegram_id}`,
        }),
        checkUsername: builder.query({
            query: (telegram_id) => `/username/has/${telegram_id}`
        }),
        getUsersById: builder.query({
            query: (telegram_id) => `/auth/${telegram_id}/user`
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: `/auth/all-users`,
                providesTags: ['username']
            }),
        }),
        updateUserData: builder.mutation({
            query: ({ telegram_id, province }) => ({
                url: `/auth/${telegram_id}/update-user`,
                method: 'PUT',
                body: {province} 
            }),
            invalidatesTags: ['username'],
        }),
    }),
})

export const {
    useCreateUsernameMutation,
    useGetUsernameQuery,
    useCheckUsernameQuery,
    useGetUsersByIdQuery,
    useGetAllUsersQuery,
    useUpdateUserDataMutation
} = usersApi
