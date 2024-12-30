import { useGetAllcardsQuery } from "@/hooks/redux/cards";
import { useGetAllTasksQuery } from "@/hooks/redux/tasks";
import { CardType } from "@/types/card.types";
import wavybg from "@assets/images/card_bg.svg";
import dotsbg from "@assets/images/dotted-bg.png";
import { RavegenieCard } from "@components/common/cards/TaskCard";
import { Button } from '@components/ui/button';
import { Skeleton } from "@components/ui/skeleton"
import { Card } from "@components/ui/card";
import * as Progress from "@radix-ui/react-progress";
import { Fragment, useEffect, useState, useRef } from 'react';
import { BsCardText } from "react-icons/bs";
import { FiLoader } from "react-icons/fi";
import { SlLock } from 'react-icons/sl';

// import { useTelegramWebApp } from "@hooks/useTelegramWebapp"
// import { Drawer, DrawerContent, DrawerTitle, DrawerDescription } from "@components/ui/drawer";
// import { useUpdateUserSharesMutation } from "@/hooks/redux/shares";
// import { toast } from "sonner";
// import { useGetUsersByIdQuery } from "@/hooks/redux/users";
// import { RxShare1 } from "react-icons/rx";

function Tasks() {
    // const [isPremium, setIsPremium] = useState<boolean | undefined>(false)
    // const [shareStep, setShareStep] = useState<"share" | "confirm">("share");
    const [telegramId, setTelegramId] = useState<string | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const [tabs, setTabs] = useState<string>("All");
    // const [storyDrawerOpen, setStoryDrawerOpen] = useState(false);
    // const [hasSharedToStory, setHasSharedToStory] = useState(false);
    // const { shareToStory } = useTelegramWebApp();
    const btnTabs = ["All", "Special", "Daily", "events", "Referral", "Partners", "Social"];
    // const [updateShare, { isLoading: updating }] = useUpdateUserSharesMutation()

    const { data: cards, isLoading: isLoadingCards, refetch: refetchCards } = useGetAllcardsQuery(telegramId ?? "", {
        skip: !telegramId, refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    })
    // const { data: userById } = useGetUsersByIdQuery(telegramId ?? "", {
    // skip: !telegramId, refetchOnReconnect: true, refetchOnFocus: true
    // })

    const { data: tasks, isLoading } = useGetAllTasksQuery(undefined, {
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });
    const handleActiveTabs = (name: string) => {
        setTabs(name)
    }


    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            const initData = window.Telegram.WebApp.initDataUnsafe;
            const user = initData?.user;

            // Set Telegram user data
            if (user) {
                setTelegramId(user.id ?? null);
                // setIsPremium(user.is_premium)
            }
        }

        // const storedstoryDrawerOpen = localStorage.getItem("storydrawerOpen");
        // const storedHasSharedToStory = localStorage.getItem("hasSharedToStory");

        // if (storedstoryDrawerOpen === "true") setStoryDrawerOpen(true);
        // if (storedHasSharedToStory === "true") setHasSharedToStory(true);
    }, []);

    // useEffect(() => {
    //     localStorage.setItem("storyDrawerOpen", String(storyDrawerOpen));
    //     localStorage.setItem("hasSharedToStory", String(hasSharedToStory));
    // }, [storyDrawerOpen, hasSharedToStory]);

    // const handleShareToStory = async () => {


    //     const mediaUrl = "https://zeenstreet-ten.vercel.app/assets/Banner1-CFK7gMq_.jpg";
    //     const params = {
    //         text: `Join mein RaveGenie Games! Complete tasks and earn rewards for your efforts.`,
    //         ...(isPremium && {
    //             widget_link: {
    //                 url: userById?.user?.referralLink,
    //                 name: "RaveGenie Games"
    //             }
    //         }),
    //     };

    //     try {
    //         await shareToStory(mediaUrl, [params]);
    //         setHasSharedToStory(true);  // Update state
    //         localStorage.setItem("hasSharedToStory", "true"); 
    //     } catch (error) {
    //         console.error("Error sharing to story:", error);
    //     }
    // };


    // const handleConfirmation = async (confirmed: boolean) => {
    //     const shares = 100
    //     if (confirmed) {
    //         try {
    //             const update = await updateShare({telegram_id: telegramId, shares: shares, shareType: "shares" }).unwrap(); // Call the mutation to reward the user.
    //             if (update) {
    //                 toast.success(`Share confirmed! ${shares} Rewards have been added`, { className: "text-xs work-sans" });
    //                 setStoryDrawerOpen(false);
    //                 localStorage.removeItem("storyDrawerOpen");
    //                 localStorage.removeItem("hasSharedToStory");
    //             }
    //         } catch (err) {
    //             console.error("Error updating share:", err);
    //             toast.error("Something went wrong. Please try again.", { className: "text-xs work-sans" });
    //         }
    //     } else {
    //         toast.info("You lost the reward for not sharing!", { className: "text-xs work-sans" });
    //         setStoryDrawerOpen(false);
    //     }
    // };


    useEffect(() => {
        const container = scrollContainerRef.current;

        if (container) {
            const scrollAmount = 400;
            const scrollSpeed = 300;

            const animateScroll = async () => {
                container.scrollTo({ left: scrollAmount, behavior: "smooth" });
                await new Promise((resolve) => setTimeout(resolve, scrollSpeed));
                container.scrollTo({ left: 0, behavior: "smooth" });
            };

            animateScroll();
        }
    }, []);
    return (
        <div className='flex flex-col min-h-full w-full'>
            <div style={{
                backgroundImage: `url(${dotsbg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }} className=' py-3 h-full px-3 min-w-full '>
                {/* task header */}
                <header className="flex flex-col gap-3 w-full">
                    {isLoadingCards && <Skeleton className={"max-h-32 h-32 w-full bg-slate-700 shadow-xl"} />}
                    <div className={`relative flex items-center gap-10 pb-5 mb-4 px-4 snap-x snap-mandatory overflow-x-auto`}>
                        {!isLoadingCards && cards?.cards.length > 0 && cards?.cards.slice(0, 2).map((card: CardType) => (
                            <Card
                                key={card._id}
                                // ref={card.isCurrent && middleCardRef}
                                className={`group bg-slate-800 relative rounded-lg snap-center max-h-32 w-full overflow-hidden ${card.isCurrent ? "min-w-[80%] shadow-xl shadow-slate-700" : "min-w-[70%] shadow-xl"}`}>
                                <img
                                    src={card.image}
                                    alt={`card img ${card.title}`}
                                    className={`h-32 !w-full object-cover rounded-lg ${card.isCurrent
                                        ? "duration-200 transition-transform"
                                        : ""
                                        }`}
                                />
                                <div className={"absolute h-full w-full bg-transparent z-10 top-0 bottom-0"} />
                                {card.isCurrent ? (
                                    null
                                ) :
                                    (
                                        <div className="absolute bg-black/95 z-20 top-0 h-full w-full rounded-md flex flex-col justify-center items-center">
                                            <SlLock size={50} color="white" />
                                        </div>
                                    )
                                }
                            </Card>
                        ))}
                    </div>

                    {cards?.cards.map(
                        (card: CardType) =>
                            card.isCurrent && (
                                <div key={card._id} className="flex flex-col items-center w-full">
                                    {/* Progress Text */}
                                    <div className="flex justify-between w-full text-sm font-medium text-white">
                                        <span className={"text-xs work-sans"}>{card.progress?.progressDisplay || "0/0"}</span>
                                        <span className={"text-xs jakarta"}>{card.progress?.progressInPercentage || 0}% Complete</span>
                                    </div>
                                    {/* Progress Bar */}
                                    <Progress.Root
                                        className="relative h-[9px] w-full overflow-hidden rounded-full bg-white my-1"
                                        style={{
                                            transform: "translateZ(0)",
                                        }}
                                        value={card.progress?.progressInPercentage || 0}
                                    >
                                        <Progress.Indicator
                                            className="ease-[cubic-bezier(0.65, 0, 0.35, 1)] size-full bg-[#D25804] rounded-r-full transition-transform duration-200"
                                            style={{
                                                transform: `translateX(-${100 - (card.progress?.progressInPercentage || 0)
                                                    }%)`,
                                                background:
                                                    "linear-gradient(#D25804, #fff0), repeating-linear-gradient(135deg, rgb(232,6,6) 0 7px, #0000 0 20px), #D25804",
                                            }}
                                        />
                                    </Progress.Root>
                                </div>
                            )
                    )}
                </header>


                <div className='h-auto w-full'>
                    {/* task tabs */}
                    <div ref={scrollContainerRef} className='flex items-center gap-6 overflow-x-auto max-w-full h-auto py-5 '>
                        {btnTabs.map((tab) => (
                            <Button
                                style={{ backgroundImage: `url(${wavybg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}
                                key={tab}
                                // disabled={tabs !== tab.name}
                                onClick={() => handleActiveTabs(tab)}
                                className={`poppins object-cover px-10 bg-[#171717] relative hover:bg-transparent capitalize ${tabs === tab ? " border rounded-lg font-semibold text-[#FFFFFF] border-[#F7F7F7] text-sm  w-[117px] h-[39px] " : "w-[88px] h-[31px] rounded-none outline-none ring-0 border-none shadow-none font-normal text-[11px] "}`}>
                                {tab}
                                {tabs !== tab && <div className='bg-black/10 absolute right-0 left-0 h-full w-full z-10' />}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* task cards */}
                <div className='flex flex-col gap-5 pt-6 pb-[7rem]'>
                    <Fragment>
                        {isLoading && <div className="flex flex-col items-center py-5">
                            <FiLoader size={30} color="white" className="animate-spin" />
                            <p className="text-white work-sans pt-4 text-sm">Updating tasks.....</p>
                        </div>}
                    </Fragment>

                    {tasks?.tasks?.filter((task: { category: string }) => tabs === "All" || task.category === tabs).length === 0 ? (
                        <div className="flex flex-col items-center gap-2">
                            <BsCardText size={40} color="white" />
                            <p className="text-white work-sans text-base text-center">No Available Tasks on <span className="capitalize">{tabs}</span> </p>
                        </div>

                    ) : (
                        tasks?.tasks?.filter((task: { category: string }) => tabs === "All" || task.category === tabs)
                            .map((task: { _id: string; title: string; taskUrl: string; diminishingPercentage: number; diminishingPoints: number[]; image: string; taskType: "one-time" | "recurring"; category: "Special" | "Daily" | "Referral" | "Partners" | "Social" | "Events"; diminishingRewards: "Yes" | "No"; countdown: number; baseReward: number; isExpired: boolean; remainingTime: number; reward: number; }) => (
                                <RavegenieCard
                                    key={task._id}
                                    task={task}
                                    refetch={async () => await refetchCards()} />
                            ))
                    )}
                </div>
            </div>
            {/* <Drawer open={!hasSharedToStory} dismissible={false}>
                <DrawerContent
                    aria-describedby={undefined}
                    aria-description="show task dialog"
                    className="flex flex-col min-h-[47%] pt-1 bg-gradient-to-b from-[#292734] to-[#000000] border-none px-4 gap-3">
                    {!hasSharedToStory ? (
                        <div className="flex flex-col w-full gap-4">
                            <div className="relative h-[13rem] w-full">
                                <img src={"https://zeenstreet-ten.vercel.app/assets/Banner1-CFK7gMq_.jpg"}
                                    alt="Welcome image"
                                    className="h-full w-full object-cover object-bottom" />
                                <div className="absolute top-0 bottom-0 h-full w-full bg-transparent z-10" />
                            </div>
                            <DrawerTitle className={"text-center work-sans text-lg text-white"}>Share to Your Story</DrawerTitle>
                            <DrawerDescription className="text-center text-white work-sans">Share this story to your Telegram to earn rewards!</DrawerDescription>
                            <Button
                                onClick={handleShareToStory}
                                className="bg-orange-500 hover:bg-orange-600 text-center work-sans text-white px-4 py-3"
                            >
                                Share Now
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col w-full items-center gap-4">
                            <RxShare1 size={60} color="white" />
                            <DrawerTitle className={"text-center work-sans text-lg text-white"}>Did You Share It?</DrawerTitle>
                            <DrawerDescription className="text-center text-white work-sans">Confirm if you successfully shared the story.</DrawerDescription>
                            <div className={"flex items-center w-full gap-5 pt-5 "}>
                                <Button
                                    onClick={() => handleConfirmation(true)}
                                    className="bg-green-500 hover:bg-green-600 w-full work-sans text-white text-center px-4 py-2"
                                    disabled={updating}
                                >
                                    {updating ? "Checking status..." : "Yes, I Shared"}
                                </Button>
                                <Button
                                    onClick={() => handleConfirmation(false)}
                                    className="bg-red-500 hover:bg-red-600 w-full work-sans text-white text-center px-4 py-2"
                                >
                                    No, I Didn't
                                </Button>
                            </div>
                        </div>
                    )}
                </DrawerContent>

            </Drawer> */}
        </div>
    )
}

export default Tasks

