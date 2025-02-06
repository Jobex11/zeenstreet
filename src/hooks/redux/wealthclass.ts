import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '@/lib/baseUrl'


export const wealthClassApi = createApi({
    reducerPath: 'wealthClassApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['WealthClasss'],
    endpoints: (builder) => ({
        getAllWealthClasss: builder.query({
            query: () => `/wealth-class`,
            providesTags: ['WealthClasss']
        }),
    }),
})


export const { useGetAllWealthClasssQuery } = wealthClassApi
