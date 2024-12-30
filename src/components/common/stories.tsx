import { useGetAllStoryQuery, useShareStoryMutation } from "@hooks/redux/stories";
import React, { Fragment, useEffect, useState } from "react";
import { Drawer, DrawerContent, DrawerTitle, DrawerDescription } from "@components/ui/drawer";
import { useTelegramWebApp } from "@hooks/useTelegramWebapp";
import { useUpdateUserSharesMutation } from "@hooks/redux/shares";
import { useGetUsersByIdQuery } from "@/hooks/redux/users";
import { Button } from "@components/ui/button";
import { Skeleton } from "@components/ui/skeleton";

interface StoriesLayoutProps {
    children: React.ReactNode;
}

function StoriesLayout({ children }: StoriesLayoutProps) {
    const [telegramId, setTelegramId] = useState<string | null>(null);
    const [isPremium, setIsPremium] = useState<boolean | undefined>(false);
    const { shareToStory } = useTelegramWebApp();
    const { data: user, isSuccess: userSuccess } = useGetUsersByIdQuery(telegramId ?? "", {
        skip: !telegramId,
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    const { data: story, isLoading: loadingStory, isSuccess: storySuccess, refetch: refetchStory } = useGetAllStoryQuery(telegramId ?? "", {
        skip: !telegramId,
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    console.log("Story", story)
    const [shareStory] = useShareStoryMutation();
    const [updateUserShares] = useUpdateUserSharesMutation();

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            const initData = window.Telegram.WebApp.initDataUnsafe;
            const user = initData?.user;

            if (user) {
                setTelegramId(user.id ?? null);
                setIsPremium(user.is_premium);
            }
        }
    }, []);

    const handleShareToStory = async () => {
        if (!story) return;
        const mediaUrl = story?.image;
        const params = {
            text: story?.text,
            ...(isPremium && {
                widget_link: {
                    url: user?.user?.referralLink,
                    name: "RaveGenie Games",
                },
            }),
        };

        try {
            await shareToStory(mediaUrl, [params]);

            setTimeout(async () => {
                await shareStory({ telegram_id: telegramId });
                await updateUserShares({ telegram_id: telegramId, shares: 100, shareType: "story gift" });
                refetchStory()
            }, 5000);
        } catch (error) {
            console.error("Error sharing to story:", error);
        }
    };

    return (
        <section>
            <Drawer open={!story?.hasShared} dismissible={false}>
                <DrawerContent
                    aria-describedby={undefined}
                    aria-description="show task dialog"
                    className="flex flex-col min-h-[49%] pt-1 bg-gradient-to-b from-[#292734] to-[#000000] border-none px-4 gap-3"
                >
                    <Fragment>
                        {loadingStory &&
                            <StorySkeleton loadingStory />}
                    </Fragment>
                    {userSuccess && storySuccess &&
                        <div className="flex flex-col w-full gap-4">
                            <div className="relative h-[13rem] w-full">
                                <img
                                    src={story?.image}
                                    alt="Welcome image"
                                    className="h-full w-full object-cover object-bottom rounded-md"
                                />
                                <div className="absolute top-0 bottom-0 h-full w-full bg-transparent z-10" />
                            </div>
                            <DrawerTitle className="text-center work-sans text-lg text-white">
                                Share to Your Story
                            </DrawerTitle>
                            <DrawerDescription className="text-center text-white work-sans">
                                {story?.text}
                            </DrawerDescription>
                            <Button
                                onClick={handleShareToStory}
                                className="bg-orange-500 hover:bg-orange-600 text-center work-sans text-white px-4 py-3"
                            >
                                Share Now
                            </Button>
                        </div>
                    }
                </DrawerContent>
            </Drawer>
            {children}
        </section>
    );
}

export default StoriesLayout;



export function StorySkeleton({ loadingStory }: { loadingStory: boolean }) {
    return (
        <Fragment>
            {loadingStory && (
                <div className="flex flex-col min-h-[47%] pt-1 bg-gradient-to-b from-[#292734] to-[#000000] px-4 gap-3">
                    <div className="relative h-[13rem] w-full">
                        <Skeleton className="h-full w-full object-cover object-bottom" />
                    </div>
                    <Skeleton className="h-6 w-3/4 mx-auto mt-4 rounded-md bg-gray-700" />
                    <Skeleton className="h-4 w-5/6 mx-auto mt-2 rounded-md bg-gray-600" />
                    <Skeleton className="h-12 w-full mt-6 rounded-lg bg-orange-500" />
                </div>
            )}
        </Fragment>
    );
}

