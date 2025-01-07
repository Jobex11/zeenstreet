import { useGetUsersByIdQuery } from "@hooks/redux/users";
import { Button } from "@components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerTitle } from "@components/ui/drawer";
import { Skeleton } from "@components/ui/skeleton";
import { useGetAllStoryQuery, useShareStoryMutation } from "@hooks/redux/stories";
import { useTelegramWebApp } from "@hooks/useTelegramWebapp";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "sonner";
import { triggerErrorVibration } from "@lib/utils";
import { useGetChatMemberByIdQuery } from "@hooks/redux/channels";


interface StoriesLayoutProps {
    children: React.ReactNode;
}

function StoriesLayout({ children }: StoriesLayoutProps) {

    const chat_id = "-1002465265495"
    const [telegramId, setTelegramId] = useState<string | null>(null);
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
    const { data: chat } = useGetChatMemberByIdQuery([chat_id, telegram_id:telegramId], {
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });
    console.log("Chat", chat)

    const [shareStory, { isLoading: checkingStatus }] = useShareStoryMutation();

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            const initData = window.Telegram.WebApp.initDataUnsafe;
            const user = initData?.user;

            if (user) {
                setTelegramId(user.id ?? null);
            }
        }
    }, []);

    const handleShareStory = async () => {
        if (!story) return;
        const mediaUrl = story?.image;
        try {

            shareToStory(mediaUrl, {
                text: `Hey guys it's me ${user?.user?.first_name}, join me in RaveGenie Games to earn rewards by performing tasks 🎉 and much more! \n https://t.me/RaveGenie_Bot/game?start=${user?.user?.referralCode}`,
                widget_link: {
                    url: user?.user?.referralLink,
                    name: "RaveGenie Games",
                },
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error sharing to story:", error);
            toast.error("Something went wrong!..", { className: "text-xs work-sans py-3" })
            triggerErrorVibration()
        }
    }

    const handleConfirmShareToStory = async () => {
        try {
            if (chat.ok && ["member", "administrator", "creator"].includes(chat.result.status)) {
                const share = await shareStory(telegramId).unwrap();
                toast.success(share.message, { className: "text-xs work-sans py-3" });
                refetchStory();
            } else {
                toast.error("Did you subscribe to Ravegenie channel? 😀", { className: "text-xs py-3 work-sans" });
                triggerErrorVibration()
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error sharing to story:", error);
            toast.error(error?.data?.message || error?.data?.error || "Something went wrong!..", { className: "text-xs work-sans py-3" })
            triggerErrorVibration()
        }
    };
    return (
        <Fragment>
            {userSuccess && storySuccess && <Drawer open={!story?.hasShared} dismissible={false}>
                <DrawerContent
                    aria-describedby={undefined}
                    aria-description="show task dialog"
                    className="flex flex-col max-h-full pb-10 bg-gradient-to-b from-[#292734] to-[#000000] border-none px-4 gap-3"
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
                                    loading="lazy"
                                    alt="Welcome image"
                                    className="h-full w-full object-cover object-bottom rounded-md"
                                />
                                <div className="absolute top-0 bottom-0 h-full w-full bg-transparent z-10" />
                            </div>
                            <DrawerTitle className="text-center work-sans text-lg text-white">
                                Share to Your Story
                            </DrawerTitle>
                            <DrawerDescription className="text-center text-white work-sans">
                                Hi {user?.user?.username || user?.user?.first_name} 👋,
                                welcome to RaveGenie! We'd love for
                                you to share this to your story, and yes,
                                you'll be rewarded for it!  + {story?.reward} shares 😀
                            </DrawerDescription>
                            <DrawerFooter className="flex flex-row w-full px-0">
                                <Button
                                    disabled={checkingStatus}
                                    onClick={handleShareStory}
                                    className="bg-orange-500 w-full hover:bg-orange-600 text-center work-sans text-white px-4 py-4"
                                >
                                    Share Now
                                </Button>
                                <Button
                                    disabled={checkingStatus}
                                    onClick={handleConfirmShareToStory}
                                    className="bg-orange-500 w-full hover:bg-orange-600 text-center work-sans text-white px-4 py-4"
                                >
                                    {checkingStatus ? "Processing..." : "Confirm"}
                                </Button>
                            </DrawerFooter>
                        </div>
                    }
                </DrawerContent>
            </Drawer>}
            {children}
        </Fragment>
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

