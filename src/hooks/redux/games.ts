import { baseUrl } from '@/lib/baseUrl'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const gamesApi = createApi({
    reducerPath: 'gamesApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Games'],
    endpoints: (builder) => ({
        getGameInfo: builder.query({
            query: (gameId) => `/game/${gameId}`,
            providesTags: ['Games']
        }),
        joinGame: builder.mutation({
            query: ({ userId, gameId }) => ({
                url: `/game/join/${gameId}`,
                method: "POST",
                body: { userId }
            })
        }),
        leaveGame: builder.mutation({
            query: ({ userId, gameId }) => ({
                url: `/game/leave/${gameId}`,
                method: "POST",
                body: { userId }
            })
        }),
        submitAnswer: builder.mutation({
            query: ({ gameId, userId, answer }) => ({
                url: `/game/answer/${gameId}`,
                method: "POST",
                body: { userId, answer }
            })
        })
    }),
})


export const {
    useGetGameInfoQuery,
    useJoinGameMutation,
    useLeaveGameMutation,
    useSubmitAnswerMutation } = gamesApi
