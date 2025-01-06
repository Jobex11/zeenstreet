import SocialsCategory from "@/components/common/main-app/task-categories/socials";
import { CardType } from "@/types/card.types";
import wavybg from "@assets/images/card_bg.svg";
import dotsbg from "@assets/images/dotted-bg.png";
import taskImg from "@assets/images/icons/tasks_img.svg";
import RaveLogo from "@assets/images/icons/zenstreet_logo.png";
import ReferralsCategory from "@components/common/main-app/task-categories/referrals";
import { Button } from '@components/ui/button';
import { Card } from "@components/ui/card";
import { Skeleton } from "@components/ui/skeleton";
import { useGetAllcardsQuery } from "@hooks/redux/cards";
import { useGetReferralTaskQuery } from "@hooks/redux/referrals";
import { useGetSocialTasksQuery } from "@hooks/redux/tasks";
import * as Progress from "@radix-ui/react-progress";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { SlLock } from 'react-icons/sl';

function Tasks() {

    const [telegramId, setTelegramId] = useState<string | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const [tabs, setTabs] = useState<string>("Referral");
    const btnTabs = ["All", "Special", "Daily", "events", "Referral", "Partners", "Social"];

    const { data: cards, isLoading: isLoadingCards, refetch: refetchCards } = useGetAllcardsQuery(telegramId ?? "", {
        skip: !telegramId, refetchOnReconnect: true, refetchOnFocus: true, refetchOnMountOrArgChange: true,
    })

    const { data: refTasks, isLoading: isLoadingRef, refetch: refetchRefTasks, isSuccess } = useGetReferralTaskQuery(telegramId ?? "", {
        skip: !telegramId, refetchOnReconnect: true, refetchOnFocus: true, refetchOnMountOrArgChange: true,
    })
    const { data: socialTasks, isLoading: isLoadingSocial, refetch: refetchSocialTasks } = useGetSocialTasksQuery(telegramId, {
        skip: !telegramId, refetchOnReconnect: true, refetchOnFocus: true, refetchOnMountOrArgChange: true,
    })

    const handleActiveTabs = (name: string) => {
        setTabs(name)
    }

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            const initData = window.Telegram.WebApp.initDataUnsafe;
            const user = initData?.user;
            if (user) {
                setTelegramId(user.id ?? null);
            }
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
                    {isLoadingCards && <Skeleton className={"max-h-32 h-32 w-full bg-slate-700 shadow-2xl"} />}
                    <div className={`relative flex items-center gap-8 pb-5 mb-4 px-4 snap-x snap-mandatory overflow-x-auto`}>
                        {!isLoadingCards && cards?.cards.length > 0 && cards?.cards.slice(0, 2).map((card: CardType) => (
                            <Card
                                key={card._id}
                                className={`group bg-slate-800 relative rounded-lg snap-center max-h-32 w-full overflow-hidden ${card.isCurrent ? "min-w-[87%] shadow-xl shadow-slate-700" : "min-w-[70%] shadow-xl"}`}>
                                <img
                                    src={card.image}
                                    alt={`card img ${card.title}`}
                                    loading="lazy"
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
                    <div ref={scrollContainerRef} className='flex items-center gap-6 overflow-x-auto max-w-full h-auto py-5 '>
                        {btnTabs.map((tab) => (
                            <Button
                                style={{ backgroundImage: `url(${wavybg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}
                                key={tab}
                                onClick={() => handleActiveTabs(tab)}
                                className={`work-sans  object-cover px-10 bg-[#171717] relative hover:bg-transparent capitalize ${tabs === tab ? " border rounded-lg font-semibold text-[#FFFFFF] border-[#F7F7F7] text-sm  w-[117px] h-[39px] " : "w-[88px] h-[31px] rounded-md outline-none ring-0 border-none shadow-none font-normal text-[11px] "}`}>
                                {tab}
                                {tabs !== tab && <div className='bg-black/10 absolute right-0 left-0 h-full w-full z-10' />}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* task cards */}
                <div className='flex flex-col gap-5 pt-6 pb-[7rem]'>
                    <Fragment>
                        {isLoadingRef && isLoadingSocial && <div className="flex flex-col items-center py-5">
                            <FiLoader size={30} color="white" className="animate-spin" />
                            <p className="text-white work-sans pt-4 text-sm">Updating tasks.....</p>
                        </div>}
                    </Fragment>

                    {tabs === "Referral"
                        && <Fragment>
                            <NoDataMessage
                                isLoading={isLoadingRef}
                                data={refTasks}
                                imageSrc={taskImg}
                                message="No Available Tasks"
                            />
                            {isSuccess && refTasks?.tasks.length > 0 && refTasks?.tasks?.map((tasks: { _id: string; title: string; image: string; shares: number; refCount: number; countdown: number; baseReward: number; timeRemaining: number; }) => (
                                <ReferralsCategory
                                    key={tasks?._id}
                                    tasks={tasks}
                                    refetch={() => {
                                        refetchRefTasks();
                                        refetchCards();
                                    }}
                                    telegram_id={telegramId}
                                    type={`${tasks.countdown !== 0 ? "Special" : ""}`}
                                />
                            ))}
                        </Fragment>}


                    {tabs === "Social"
                        && <Fragment>
                            <NoDataMessage
                                isLoading={isLoadingRef || isLoadingSocial}
                                data={socialTasks}
                                imageSrc={taskImg}
                                message="No Available Social Tasks"
                            />
                            {socialTasks?.tasks.length > 0 && socialTasks?.tasks?.map((tasks: { _id: string; chat_id: string; title: string; shares: number; socialUrl: string; countdown: number; baseReward: number; timeRemaining: number; }) => (
                                <SocialsCategory
                                    key={tasks?._id}
                                    tasks={tasks}
                                    refetch={() => {
                                        refetchSocialTasks();
                                        refetchCards();
                                    }}
                                    telegram_id={telegramId}
                                    image={RaveLogo}
                                    type={`${tasks.countdown !== 0 ? "Special" : " "}`}
                                />
                            ))}
                        </Fragment>}
                </div>
            </div>
        </div>
    )
}

export default Tasks




interface NoDataMessageProps {
    isLoading: boolean;
    data?: { tasks?: unknown[] };
    message?: string;
    imageSrc: string;
}

export const NoDataMessage: React.FC<NoDataMessageProps> = ({
    isLoading,
    data,
    message = "No Available Tasks",
    imageSrc,
}) => {
    if (isLoading || (data?.tasks && data.tasks.length > 0)) return null;

    return (
        <div className="flex flex-col items-center gap-2">
            <img
                src={imageSrc}
                loading="lazy"
                alt="no data image"
                className="h-24 w-24 object-contain object-center"
            />
            <p className="text-white work-sans text-base text-center">{message}</p>
        </div>
    );
};
