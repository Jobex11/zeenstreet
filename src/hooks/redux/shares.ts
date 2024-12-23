import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const sharesApi = createApi({
    reducerPath: 'sharesApi',
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost:4000/api" }),
    tagTypes: ['shares'],
    endpoints: (builder) => ({
        getUserShares: builder.query({
            query: (telegramId: string) => `/shares/${telegramId}`,
            providesTags: ['shares']
        }),
        getTotalShares: builder.query({
            query: () => `/shares/total`,
            providesTags: ['shares']
        }),
        updateUserShares: builder.mutation({
            query: ({ telegram_id, shares, shareType }) => ({
                url: `/shares/update/${telegram_id}`,
                method: 'POST',
                body: { shares, shareType },
            }),
            invalidatesTags: ['shares'],
            // async onQueryStarted({ telegram_id }, { dispatch, queryFulfilled }) {
            //     try {
            //         const { data: updatedUserShares } = await queryFulfilled;

            //         dispatch(
            //             sharesApi.util.updateQueryData('getUserShares', telegram_id, (draft) => {
            //                 Object.assign(draft, updatedUserShares);
            //             })
            //         );
            //     } catch (error) {
            //         console.log("Error updating shares:", error);
            //     }
            // },
        }),
    }),
})


export const { useGetUserSharesQuery, useUpdateUserSharesMutation, useGetTotalSharesQuery } = sharesApi
