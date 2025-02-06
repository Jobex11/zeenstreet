import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '@/lib/baseUrl'


export const referralsApi = createApi({
    reducerPath: 'referralsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Referral'],
    endpoints: (builder) => ({
        getReferralCode: builder.query({
            query: (telegram_id) => `/referral/referral-code/${telegram_id}`,
            providesTags: ['Referral']
        }),
        getReferralLink: builder.query({
            query: (telegram_id) => `/referral/referral-link/${telegram_id}`,
            providesTags: ['Referral']
        }),
        getTier1Referral: builder.query({
            query: ({ telegram_id, page = 1, limit = 10 }) => ({
                url: `/referral/tier1/${telegram_id}?page=${page}&limit=${limit}`,
                providesTags: ['Referral'],
            })
        }),
        getTier2Referral: builder.query({
            query: ({ telegram_id, page = 1, limit = 10 }) => ({
                url: `/referral/tier2/${telegram_id}?page=${page}&limit=${limit}`,
                providesTags: ['Referral'],
            })
        }),
        cliamReferralShares: builder.mutation({
            query: (telegram_id) => ({
                url: `/referral/referralsclaim/${telegram_id}`,
                method: "POST"
            }),
            invalidatesTags: ['Referral'],
        }),
        getReferralTask: builder.query({
            query: (telegram_id) => `/referral/tasks/${telegram_id}`,
            providesTags: ['Referral'],
        }),
        completeRefTasks: builder.mutation({
            query: ({ telegram_id, taskId }) => ({
                url: `/referral/tasks/complete/${telegram_id}`,
                method: "POST",
                body: { taskId }
            })
        })
    }),
})


export const {
    useGetReferralCodeQuery,
    useGetReferralLinkQuery,
    useGetTier1ReferralQuery,
    useGetTier2ReferralQuery,
    useCliamReferralSharesMutation,
    useGetReferralTaskQuery,
    useCompleteRefTasksMutation,
} = referralsApi
