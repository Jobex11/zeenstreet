import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const sharesApi = createApi({
    reducerPath: 'sharesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ravegenie-vgm7.onrender.com/api' }),
    tagTypes: ['shares'],
    endpoints: (builder) => ({
        getUserShares: builder.query({
            query: (telegramId: string) => `/shares/${telegramId}`,
        }),
        getTotalShares: builder.query({
            query: () => `/shares/total`,
        }),
        updateUserShares: builder.mutation({
            query: ({ telegramId, shares }) => ({
                url: `/shares/update/${telegramId}`,
                method: 'POST',
                body: { shares },
            }),
            async onQueryStarted({ shares }, { dispatch, queryFulfilled }) {
                try {
                    const { data: updateUserShares } = await queryFulfilled
                    dispatch(
                        sharesApi.util.upsertQueryData('getUserShares', shares, updateUserShares)
                    );
                    dispatch(
                        sharesApi.util.invalidateTags(['shares'])
                    );
                } catch (error) {
                    console.log(error)
                }
            },
            invalidatesTags: ['shares'],
        }),
    }),
})


export const { useGetUserSharesQuery, useUpdateUserSharesMutation, useGetTotalSharesQuery } = sharesApi
