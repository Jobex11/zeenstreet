import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const storiesApi = createApi({
    reducerPath: 'storiesApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://ravegenie-backend.onrender.com/api/story" }),
    tagTypes: ['Story'],
    endpoints: (builder) => ({
        getAllStory: builder.query({
            query: (telegram_id) => `/${telegram_id}`,
            providesTags: ['Story'],
        }),
        shareStory: builder.mutation({
            query: ({ telegram_id, storyId }) => ({
                url: `/${telegram_id}/share`,
                method: 'PUT',
                body: { storyId }
            }),
            invalidatesTags: ['Story'],
        }),
    }),
});

export const { useGetAllStoryQuery, useShareStoryMutation } = storiesApi;
