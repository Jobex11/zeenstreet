import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerDescription,DrawerClose, DrawerFooter, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetTelegramId } from "@/hooks/getTelegramId"
import { useGetChatMemberByIdQuery } from "@/hooks/redux/channels"
import { useGetUserSharesQuery } from "@/hooks/redux/shares"
import { useGetAllStoryQuery, useShareStoryMutation } from "@/hooks/redux/stories"
import { useGetUsersByIdQuery } from "@/hooks/redux/users"
import { useTelegramWebApp } from "@/hooks/useTelegramWebapp"
import { triggerErrorVibration } from "@/lib/utils"
import { Fragment, type PropsWithChildren } from "react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom";
import { BsClockHistory } from "react-icons/bs";
// import { LuShare2 } from "react-icons/lu";
import { IoIosClose } from "react-icons/io";
import { GoShareAndroid } from "react-icons/go";

function ShareToStory({ children }: PropsWithChildren) {

    const chat_id = "-1002465265495"
    // const [showSkeleton, setShowSkeleton] = useState(false)
    const { telegramId } = useGetTelegramId()
    const { shareToStory } = useTelegramWebApp()
    const navigate = useNavigate();
    const { data: user } = useGetUsersByIdQuery(telegramId ?? "", {
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
        refetch: refetchStory,
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

    // useEffect(() => {
    //     if (!loadingStory  && story && storySuccess) {
    //         setShowSkeleton(true)
    //         const timer = setTimeout(() => {
    //             setShowSkeleton(false)
    //         }, 3000)
    //         return () => clearTimeout(timer)
    //     }
    // }, [loadingStory, story, storySuccess])


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
        refetchStory()
        try {
            if (chat.ok && ["member", "administrator", "creator"].includes(chat.result.status)) {
                const share = await shareStory({ telegram_id: telegramId, storyId: story?._id }).unwrap()
                toast.success(share.message, { className: "text-xs work-sans py-3" })
                refetchShares()
                refetchChats()
                navigate("/home", { replace: true });
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
                icon: <BsClockHistory />
            })
            triggerErrorVibration()
        }
    }

    // const shouldShowDrawer = !loadingStory && storySuccess && story
    return (
        <Fragment>
            {/* {shouldShowDrawer && ( */}
            <Drawer
            >
                <DrawerTrigger className={"relative"}>
                    <Fragment>
                        <GoShareAndroid size={23} color={"#d1d5db"} />
                        {story && <div className={"h-2 w-2 z-20 bg-orange-600 animate-pulse rounded-full absolute top-0 left-0"} />}
                    </Fragment>
                </DrawerTrigger>
                <DrawerContent
                    aria-describedby={undefined}
                    aria-description="show task dialog"
                    className="flex flex-col max-h-full pb-6 bg-gradient-to-b from-[#292734] to-[#000000] border-none rounded-lg px-4 gap-3"
                >
                     <div className="relative flex flex-col items-center justify-center w-full gap-4">
                        <DrawerClose className="absolute -top-5 right-2 z-40 p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition">
                            <IoIosClose size={24} />
                        </DrawerClose>
                    </div>
                    
                    {story ? (
                        <div className="flex flex-col w-full gap-4">
                            <div className="relative h-[13rem] w-full">
                                <img
                                    src={story?.image}
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
                    ) : (
                        <div className={"py-5 my-3 flex flex-col items-center"}>
                            <h1 className="text-lg font-bold text-orange-500 text-center mt-2 tahoma">
                                Story Sharer
                            </h1>
                            <h1 className={"font-semibold text-white text-lg pt-2 work-sans"}>No story at the moment</h1>
                            <p className={"text-gray-300 work-sans"}>Check in two days</p>
                        </div>

                    )}
                </DrawerContent>
            </Drawer>
            {/* )} */}
            {children}
        </Fragment>
    )
}

export default ShareToStory

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

