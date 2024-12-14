import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const sharesApi = createApi({
    reducerPath: 'sharesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ravegenie-vgm7.onrender.com/api' }),
    tagTypes: ['shares'],
    endpoints: (builder) => ({
        getUserShares: builder.query({
            query: (telegramId:string) => `/shares/${telegramId}`,
        }),
    }),
})


export const { useGetUserSharesQuery } = sharesApi
