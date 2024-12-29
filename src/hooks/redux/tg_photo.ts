import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


 const BOT_TOKEN = "7876229498:AAEvj3K6fNEOOtr9vb1FeJY7Epp8bPh0VcU"
console.log("Bot Token:", BOT_TOKEN);

export const tgUserPhotoApi = createApi({
    reducerPath: 'tgUserPhotoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `https://api.telegram.org/bot${BOT_TOKEN}`
    }),
    tagTypes: ['PhotoUrl'],
    endpoints: (builder) => ({
        getTelegramUserPhotoUrl: builder.query({
            query: (telegram_id) => `/getUserProfilePhotos?user_id=${telegram_id}`,
            providesTags: ['PhotoUrl']
        }),
        getFilePath: builder.query({
            query: (fileId) => `/getFile?file_id=${fileId}`,
            providesTags: ['PhotoUrl']
        }),
    }),
})


export const { useGetTelegramUserPhotoUrlQuery, useGetFilePathQuery } = tgUserPhotoApi

