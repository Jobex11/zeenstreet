import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const wealthClassApi = createApi({
    reducerPath: 'wealthClassApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://ravegenie-vgm7.onrender.com/api" }),
    tagTypes: ['WealthClasss'],
    endpoints: (builder) => ({
        getAllWealthClasss: builder.query({
            query: () => `/wealth-class`,
            providesTags: ['WealthClasss']
        }),
    }),
})


export const { useGetAllWealthClasssQuery } = wealthClassApi
