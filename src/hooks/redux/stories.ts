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
            async onQueryStarted(storyId, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    storiesApi.util.updateQueryData('getAllStory', undefined, (draft) => {
                        const story = draft.find((s: { id: string; }) => s.id === storyId);
                        if (story) {
                            story.shared = true;
                        }
                    })
                );

                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
        rewardForStoryViews: builder.mutation({
            query: ({telegram_id}) => ({
                url: `/reward-views/${telegram_id}`,
                method: "POST",
            }),
            invalidatesTags: ['Story'],
        }),
        getStoryViewDetails: builder.query({
            query: (telegram_id) => `/views/${telegram_id}`
        })
    }),
});

export const { useGetAllStoryQuery,
    useShareStoryMutation,
    useRewardForStoryViewsMutation,
    useGetStoryViewDetailsQuery,
} = storiesApi;
