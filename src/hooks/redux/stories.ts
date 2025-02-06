import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@/lib/baseUrl'

 
export const storiesApi = createApi({
    reducerPath: 'storiesApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Story'],
    endpoints: (builder) => ({
        getAllStory: builder.query({
            query: (telegram_id) => `/story/${telegram_id}`,
            providesTags: ['Story'],
        }),
        shareStory: builder.mutation({
            query: ({ telegram_id, storyId }) => ({
                url: `/story/${telegram_id}/share`,
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
            query: ({ telegram_id }) => ({
                url: `/story/reward-views/${telegram_id}`,
                method: "POST",
            }),
            invalidatesTags: ['Story'],
        }),
        getStoryViewDetails: builder.query({
            query: (telegram_id) => `/story/views/${telegram_id}`
        })
    }),
});

export const { useGetAllStoryQuery,
    useShareStoryMutation,
    useRewardForStoryViewsMutation,
    useGetStoryViewDetailsQuery,
} = storiesApi;
