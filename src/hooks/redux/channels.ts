import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
const BOT_TOKEN = "7876229498:AAEvj3K6fNEOOtr9vb1FeJY7Epp8bPh0VcU"
export const channelApi = createApi({
    reducerPath: 'channelApi',
    baseQuery: fetchBaseQuery({ baseUrl: `https://api.telegram.org/bot${BOT_TOKEN}` }),
    tagTypes: ['Channel'],
    endpoints: (builder) => ({
        getAllChannelById: builder.query({
            query: (chat_id) => `/getChat?chat_id=${chat_id}`,
            providesTags: ['Channel']
        }),
        getChatMemberById: builder.query({
            query: ([chat_id, telegram_id]) => `/getChatMember?chat_id=${chat_id}&user_id=${telegram_id}`,
            providesTags: ['Channel']
        }),

    }),
})


export const { useGetAllChannelByIdQuery, useGetChatMemberByIdQuery } = channelApi
