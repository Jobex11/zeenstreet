import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerTitle } from "@/components/ui/drawer"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetTelegramId } from "@/hooks/getTelegramId"
import { useGetChatMemberByIdQuery } from "@/hooks/redux/channels"
import { useGetUserSharesQuery } from "@/hooks/redux/shares"
import { useGetAllStoryQuery, useShareStoryMutation } from "@/hooks/redux/stories"
import { useGetUsersByIdQuery } from "@/hooks/redux/users"
import { useTelegramWebApp } from "@/hooks/useTelegramWebapp"
import { triggerErrorVibration } from "@/lib/utils"
import { Fragment, type PropsWithChildren, useEffect, useState } from "react"
import { toast } from "sonner"

function StoriesLayout({ children }: PropsWithChildren) {
    const chat_id = "-1002465265495"
    const [showSkeleton, setShowSkeleton] = useState(false)
    const { telegramId } = useGetTelegramId()
    const { shareToStory } = useTelegramWebApp()
    const { data: user, isSuccess: userSuccess } = useGetUsersByIdQuery(telegramId ?? "", {
        skip: !telegramId,
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    })
    const { refetch: refetchShares } = useGetUserSharesQuery(telegramId ?? "", {
        skip: !telegramId,
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    })
    const {
        data: story,
        isLoading: loadingStory,
        isSuccess: storySuccess,
        // refetch: refetchStory,
    } = useGetAllStoryQuery(telegramId ?? "", {
        skip: !telegramId,
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    })
    const { data: chat, refetch: refetchChats } = useGetChatMemberByIdQuery([chat_id, telegramId], {
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    })

    const [shareStory, { isLoading: checkingStatus }] = useShareStoryMutation()

    useEffect(() => {
        if (!loadingStory && userSuccess && story && storySuccess) {
            setShowSkeleton(true)
            const timer = setTimeout(() => {
                setShowSkeleton(false)
            }, 3000) // Show skeleton for 3 seconds
            return () => clearTimeout(timer) // Cleanup timer
        }
    }, [loadingStory, story, storySuccess, userSuccess])

    const handleShareStory = async () => {
        if (!story) return
        const mediaUrl = story?.image
        try {
            shareToStory(mediaUrl, {
                text: story?.description,
                widget_link: {
                    url: user?.user?.referralLink,
                    name: "RaveGenie Games",
                },
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error sharing to story:", error)
            toast.error("Something went wrong!..", { className: "text-xs work-sans py-3" })
            triggerErrorVibration()
        }
    }

    const handleConfirmShareToStory = async () => {
        try {
            if (chat.ok && ["member", "administrator", "creator"].includes(chat.result.status)) {
                const share = await shareStory({ telegram_id: telegramId, storyId: story?._id }).unwrap()
                toast.success(share.message, { className: "text-xs work-sans py-3" })
                refetchShares()
                refetchChats()
            } else {
                toast.error("Did you subscribe to our channel? 😀", { className: "text-xs py-3 work-sans" })
                triggerErrorVibration()
                refetchChats()
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error sharing to story:", error)
            toast.error(error?.data?.message || error?.data?.error || "Something went wrong!..", {
                className: "text-xs work-sans py-3",
            })
            triggerErrorVibration()
        }
    }

    const shouldShowDrawer = !loadingStory && userSuccess && story

    return (
        <Fragment>
            {shouldShowDrawer && (
                <Drawer open={true} dismissible={false}>
                    <DrawerContent
                        aria-describedby={undefined}
                        aria-description="show task dialog"
                        className="flex flex-col max-h-full pb-6 bg-gradient-to-b from-[#292734] to-[#000000] border-none rounded-lg px-4 gap-3"
                    >
                        {showSkeleton ? (
                            <StorySkeleton />
                        ) : (
                            <div className="flex flex-col w-full gap-4">
                                <div className="relative h-[13rem] w-full">
                                    <img
                                        src={story?.image || "/placeholder.svg"}
                                        loading="lazy"
                                        alt="Story image"
                                        className="h-full w-full object-cover object-bottom rounded-md"
                                    />
                                    <div className="absolute top-0 bottom-0 h-full w-full bg-transparent z-10" />
                                </div>
                                <DrawerTitle className="text-center work-sans text-lg text-white">Share to Your Story</DrawerTitle>
                                <DrawerDescription className="text-center text-white work-sans">{story?.description}</DrawerDescription>
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
                        )}
                    </DrawerContent>
                </Drawer>
            )}
            {children}
        </Fragment>
    )
}

export default StoriesLayout

export function StorySkeleton() {
    return (
        <Fragment>
            <div className="flex flex-col min-h-[47%] pt-1 bg-gradient-to-b from-[#292734] to-[#000000] px-4 gap-3">
                <div className="relative h-[13rem] w-full">
                    <Skeleton className="h-full w-full object-cover bg-gray-700 object-bottom" />
                </div>
                <Skeleton className="h-6 w-3/4 mx-auto mt-4 rounded-md bg-gray-700" />
                <Skeleton className="h-4 w-5/6 mx-auto mt-2 rounded-md bg-gray-600" />
                <Skeleton className="h-12 w-full mt-6 rounded-lg bg-orange-500" />
            </div>
        </Fragment>
    )
}

