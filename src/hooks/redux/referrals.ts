import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const referralsApi = createApi({
    reducerPath: 'referralsApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://ravegenie-backend.onrender.comapi/referral" }),
    tagTypes: ['Referral'],
    endpoints: (builder) => ({
        getReferralCode: builder.query({
            query: (telegram_id) => `/referral-code/${telegram_id}`,
            providesTags: ['Referral']
        }),
        getReferralLink: builder.query({
            query: (telegram_id) => `/referral-link/${telegram_id}`,
            providesTags: ['Referral']
        }),
        getTier1Referral: builder.query({
            query: ({ telegram_id, page = 1, limit = 10 }) => ({
                url: `/tier1/${telegram_id}?page=${page}&limit=${limit}`,
                providesTags: ['Referral'],
            })
        }),
        getTier2Referral: builder.query({
            query: ({ telegram_id, page = 1, limit = 10 }) => ({
                url: `/tier2/${telegram_id}?page=${page}&limit=${limit}`,
                providesTags: ['Referral'],
            })
        }),
        cliamReferralShares: builder.mutation({
            query: (telegram_id) => ({
                url: `/referralsclaim/${telegram_id}`,
                method: "POST"
            }),
            invalidatesTags: ['Referral'],
        })
    }),
})


export const {
    useGetReferralCodeQuery,
    useGetReferralLinkQuery,
    useGetTier1ReferralQuery,
    useGetTier2ReferralQuery,
    useCliamReferralSharesMutation,
} = referralsApi
