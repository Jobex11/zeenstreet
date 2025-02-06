import { baseUrl } from '@/lib/baseUrl'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const cardsApi = createApi({
    reducerPath: 'cardsApi',
    baseQuery: fetchBaseQuery({ baseUrl}),
    tagTypes: ['Cards'],
    endpoints: (builder) => ({
        getAllcards: builder.query({
            query: (telegram_id) => `/cards/users/${telegram_id}`,
            providesTags: ['Cards']
        }),
        getNumberOfUnlockedCards: builder.query({
            query: (telegram_id) => `/cards/unlocked-cards/${telegram_id}`,
            providesTags: ['Cards']
        }),
    }),
})


export const { useGetAllcardsQuery, useGetNumberOfUnlockedCardsQuery } = cardsApi
