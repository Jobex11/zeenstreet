import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/api"
    }),
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
            query: (telegramId) => `/username/${telegramId}`,
        }),
        checkUsername: builder.query({
            query: (telegramId) => `/username/has/${telegramId}`
        }),
        getUserById: builder.query({
            query: (telegram_id) => `/auth/${telegram_id}/user`
        }),
    }),
})

export const {
    useCreateUsernameMutation,
    useGetUsernameQuery,
    useCheckUsernameQuery,
    useGetUserByIdQuery } = usersApi
