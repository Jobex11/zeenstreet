import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const cardsApi = createApi({
    reducerPath: 'cardsApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://ravegenie-vgm7.onrender.com/api/cards" }),
    tagTypes: ['Cards'],
    endpoints: (builder) => ({
        getAllcards: builder.query({
            query: (telegram_id) => `/users/${telegram_id}`,
            providesTags: ['Cards']
        }),
        getNumberOfUnlockedCards: builder.query({
            query: (telegram_id) => `/unlocked-cards/${telegram_id}`,
            providesTags: ['Cards']
        }),
    }),
})


export const { useGetAllcardsQuery, useGetNumberOfUnlockedCardsQuery } = cardsApi
