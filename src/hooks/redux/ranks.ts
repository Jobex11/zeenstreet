import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const ranksApi = createApi({
    reducerPath: 'ranksApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://ravegenie-vgm7.onrender.com/api" }),
    tagTypes: ['Ranks'],
    endpoints: (builder) => ({
        getAllRanks: builder.query({
            query: () => `/ranks`,
            providesTags: ['Ranks']
        }),
    }),
})


export const { useGetAllRanksQuery } = ranksApi
