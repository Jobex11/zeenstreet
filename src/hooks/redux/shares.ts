import { baseUrl } from '@/lib/baseUrl'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const sharesApi = createApi({
    reducerPath: 'sharesApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['shares'],
    endpoints: (builder) => ({
        getUserShares: builder.query({
            query: (telegramId: string) => `/shares/${telegramId}`,
            providesTags: ['shares']
        }),
        getTotalShares: builder.query({
            query: () => `/shares/total`,
            providesTags: ['shares']
        }),
        updateUserShares: builder.mutation({
            query: ({ telegram_id, shares, shareType }) => ({
                url: `/shares/update/${telegram_id}`,
                method: 'POST',
                body: { shares, shareType },
            }),
            invalidatesTags: ['shares'],
        }),
    }),
})


export const { useGetUserSharesQuery, useUpdateUserSharesMutation, useGetTotalSharesQuery } = sharesApi
