import { baseUrl } from '@/lib/baseUrl'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const reviewsApi = createApi({
    reducerPath: 'reviewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Review'],
    endpoints: (builder) => ({
        getAllReviews: builder.query({
            query: () => `/review`,
            providesTags: ['Review']
        }),
        addReview: builder.mutation({
            query: ({ userId, comment, rating }) => ({
                url: `/review`,
                method: "POST",
                body: { userId, comment, rating }
            })
        })
    }),
})


export const { useGetAllReviewsQuery, useAddReviewMutation } = reviewsApi
