import { baseUrl } from '@/lib/baseUrl'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const ranksApi = createApi({
    reducerPath: 'ranksApi',
    baseQuery: fetchBaseQuery({ baseUrl}),
    tagTypes: ['Ranks'],
    endpoints: (builder) => ({
        getAllRanks: builder.query({
            query: () => `/ranks`,
            providesTags: ['Ranks']
        }),
    }),
})


export const { useGetAllRanksQuery } = ranksApi
