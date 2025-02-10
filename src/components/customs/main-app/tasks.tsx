import EventsTasksCategory from "@/components/common/main-app/task-categories/events";
import PartnersTasksCategory from "@/components/common/main-app/task-categories/partners";
import SocialsCategory from "@/components/common/main-app/task-categories/socials";
import { CardType } from "@/types/card.types";
import dotsbg from "@assets/images/dotted-bg.png";
import taskImg from "@assets/images/icons/tasks_img.svg";
import ReferralsCategory from "@components/common/main-app/task-categories/referrals";
import { Button } from '@components/ui/button';
import { Card } from "@components/ui/card";
import { Skeleton } from "@components/ui/skeleton";
import { useGetAllcardsQuery } from "@hooks/redux/cards";
import { useGetReferralTaskQuery } from "@hooks/redux/referrals";
import { useGetEventsTasksQuery, useGetPartnersTasksQuery, useGetSocialTasksQuery } from "@hooks/redux/tasks";
import { useGetUserSharesQuery } from "@hooks/redux/shares";
import * as Progress from "@radix-ui/react-progress";
import React, { Fragment, useRef } from "react";
import { FiLoader } from "react-icons/fi";
import { SlLock } from 'react-icons/sl';
import { useGetTelegramId } from "@hooks/getTelegramId"
import { useSearchParams } from "react-router-dom";
import { usePagination } from "@/hooks/usePagination";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Tasks() {

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const { telegramId } = useGetTelegramId()
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") || "Events";
    const btnTabs = ["Events", "Referral", "Partners", "Social"];
    const limit = 10;

    const {
        page: refTasksPage,
        handleNextPage: handleRefNextPage,
        handlePreviousPage: handleRefPreviousPage
    } = usePagination();

    const {
        page: socialTasksPage,
        handleNextPage: handleSocialNextPage,
        handlePreviousPage: handleSocialPreviousPage
    } = usePagination();
    const {
        page: eventsTasksPage,
        handleNextPage: handleEventsNextPage,
        handlePreviousPage: handleEventsPreviousPage
    } = usePagination();

    const {
        page: partnersTasksPage,
        handleNextPage: handlePartnersNextPage,
        handlePreviousPage: handlePartnersPreviousPage
    } = usePagination();

    const { data: cards, isLoading: isLoadingCards, refetch: refetchCards } = useGetAllcardsQuery(telegramId,
        {
            skip: !telegramId,
            refetchOnReconnect: true,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true,
            pollingInterval: 3600
        })

    const { data: refTasks, isLoading: isLoadingRef, refetch: refetchRefTasks, isSuccess } = useGetReferralTaskQuery(
        { telegram_id: telegramId, page: refTasksPage, limit: limit },
        {
            skip: !telegramId,
            refetchOnReconnect: true,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true,
        })
    const { data: socialTasks, isLoading: isLoadingSocial, refetch: refetchSocialTasks } = useGetSocialTasksQuery(
        { telegram_id: telegramId, page: socialTasksPage, limit: limit },
        {
            skip: !telegramId,
            refetchOnReconnect: true,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true,
        })

    const { data: eventsTasks, isLoading: isLoadingEvents, refetch: refetchEventsTasks } = useGetEventsTasksQuery(
        { telegram_id: telegramId, page: eventsTasksPage, limit: limit },
        {
            skip: !telegramId,
            refetchOnReconnect: true,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true,
        })
    const { data: partnersTasks, isLoading: isLoadingPartners, refetch: refetchPartnersTasks } = useGetPartnersTasksQuery(
        { telegram_id: telegramId, page: partnersTasksPage, limit: limit }, {
        skip: !telegramId,
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    })

    const { refetch: refetchShares } = useGetUserSharesQuery(telegramId ?? "", { skip: !telegramId, refetchOnReconnect: true, refetchOnFocus: true, refetchOnMountOrArgChange: true })

    const handleActiveTabs = (name: string) => {
        setSearchParams({ tab: name });
    };


    return (
        <div className='flex flex-col min-h-full w-full'>
            <div style={{
                backgroundImage: `url(${dotsbg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }} className='py-3 h-full px-3 min-w-full '>
                {/* task header */}
                <header className="flex flex-col gap-3 w-full">
                    {isLoadingCards && <div>
                        <Skeleton className={"max-h-32 h-32 w-full bg-slate-700 shadow-2xl"} />
                        <Skeleton className={"h-3 w-full bg-slate-700 rounded-full mt-5"} />
                    </div>}
                    <div className={`relative flex items-center gap-8 pb-5 mb-4 px-2 snap-x snap-mandatory overflow-x-auto`}>
                        {!isLoadingCards && cards?.cards?.length > 0 && cards?.cards?.slice(0, 2).map((card: CardType) => (
                            <Card
                                key={card._id}
                                className={`group bg-slate-800 relative aspect-video rounded-lg snap-center h-[145px] w-full overflow-hidden ${card.isCurrent ? "min-w-[85%] shadow-xl shadow-slate-700" : "min-w-[70%] shadow-xl"
                                    }`}
                            >
                                <div className="relative w-full h-full">
                                    <img
                                        src={card.image[0] || "/src/assets/images/Subheading.png"}
                                        alt={`card img ${card.title}`}
                                        fetchPriority="high"
                                        loading="lazy"
                                        className={`w-full h-full object-cover rounded-lg  ${card.isCurrent ? "duration-200 transition-transform" : ""
                                            }`}
                                    />
                                </div>
                                <div className={"absolute h-full w-full bg-transparent z-10 top-0 bottom-0"} />
                                {card.isCurrent ? null : (
                                    <div className="absolute bg-black/95 z-20 top-0 h-full w-full rounded-md flex flex-col justify-center items-center">
                                        <SlLock size={50} color="white" />
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>

                    {cards?.cards.map(
                        (card: CardType) =>
                            card?.isCurrent && (
                                <div key={card._id} className="flex flex-col items-center w-full">
                                    <div className="flex justify-between w-full text-sm font-medium text-white">
                                        <span className={"text-xs work-sans"}>{card.progress?.progressDisplay || "0/0"}</span>
                                        <span className={"text-xs jakarta"}>{card.progress?.progressInPercentage || 0}% Complete</span>
                                    </div>
                                    {/* Progress Bar */}
                                    <Progress.Root
                                        className="relative h-[10px] w-full overflow-hidden rounded-full bg-white my-1"
                                        style={{
                                            transform: "translateZ(0)",
                                        }}
                                        value={card.progress?.progressInPercentage || 0}
                                    >
                                        <Progress.Indicator
                                            className="ease-[cubic-bezier(0.65, 0, 0.35, 1)] size-full bg-[#D25804] rounded-r-full transition-transform duration-200"
                                            style={{
                                                transform: `translateX(-${100 - (card?.progress?.progressInPercentage || 0)
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
                                key={tab}
                                onClick={() => handleActiveTabs(tab)}
                                className={`work-sans max-w-28 object-cover px-10 bg-[#000000] relative hover:bg-transparent capitalize ${activeTab === tab ? " border rounded-lg font-medium text-[#FFFFFF] border-gray-400 text-sm  w-[117px] h-[35px] " : "w-[88px] h-[31px] rounded-md outline-none ring-0 border-none shadow-none font-normal text-[11px] "}`}>
                                {tab}
                                {activeTab !== tab && <div className='bg-black/10 absolute right-0 left-0 h-full w-full z-10' />}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* task cards */}
                <div className='flex flex-col gap-5 pt-6 pb-[7rem]'>
                    <Fragment>
                        {isLoadingRef && isLoadingSocial && isLoadingEvents && isLoadingPartners && <div className="flex flex-col items-center py-5">
                            <FiLoader size={30} color="white" className="animate-spin" />
                            <p className="text-white work-sans pt-4 text-sm">Updating tasks.....</p>
                        </div>}
                    </Fragment>

                    {activeTab === "Referral"
                        && <Fragment>
                            <NoDataMessage
                                isLoading={isLoadingRef}
                                data={refTasks}
                                imageSrc={taskImg}
                                message="No Available Tasks"
                            />
                            {isSuccess && refTasks?.tasks?.length > 0 && refTasks?.tasks?.map((tasks: { _id: string; title: string; image: string; shares: number; refCount: number; countdown: number; baseReward: number; timeRemaining: number; }) => (
                                <ReferralsCategory
                                    key={tasks?._id}
                                    tasks={tasks}
                                    refetch={async () => {
                                        await refetchRefTasks();
                                        await refetchCards();
                                        await refetchShares()
                                    }}
                                    telegram_id={telegramId}
                                    type={`${tasks?.countdown !== 0 ? "Special" : ""}`}
                                />
                            ))}
                            <div className="flex items-center justify-center gap-5 py-3 h-18">
                                <button
                                    disabled={refTasksPage === 1} onClick={() => handleRefPreviousPage(refTasks?.currentPage)}
                                    className={`bg-white rounded-full active:scale-110 h-6 w-6 shadow-lg flex items-center justify-center ${refTasks?.currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    <IoIosArrowBack />
                                </button>

                                {/* Next Button */}
                                <button
                                    disabled={refTasks?.page >= refTasks?.totalPages} onClick={() => handleRefNextPage(refTasks?.currentPage, refTasks.totalPages)}
                                    className={`bg-white rounded-full active:scale-110 h-6 w-6 shadow-lg flex items-center justify-center ${refTasks?.currentPage >= refTasks?.totalPages ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    <IoIosArrowForward />
                                </button>
                            </div>
                        </Fragment>}


                    {activeTab === "Social"
                        && <Fragment>
                            <NoDataMessage
                                isLoading={isLoadingSocial}
                                data={socialTasks}
                                imageSrc={taskImg}
                                message="No Available Social Tasks"
                            />
                            {socialTasks?.tasks?.length > 0 && socialTasks?.tasks?.map((tasks: { _id: string; chat_id: string; image: string; title: string; shares: number; socialUrl: string; countdown: number; baseReward: number; timeRemaining: number; }) => (
                                <SocialsCategory
                                    key={tasks?._id}
                                    tasks={tasks}
                                    refetch={async () => {
                                        await refetchSocialTasks();
                                        await refetchCards();
                                        await refetchShares()
                                    }}
                                    telegram_id={telegramId}
                                    type={`${tasks?.countdown !== 0 ? "Special" : " "}`}
                                />
                            ))}
                            <div className="flex items-center justify-center gap-5 py-3 h-18">
                                <button
                                    disabled={socialTasks === 1} onClick={() => handleSocialPreviousPage(socialTasks?.currentPage)}
                                    className={`bg-white rounded-full active:scale-110 h-6 w-6 shadow-lg flex items-center justify-center ${socialTasks?.currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    <IoIosArrowBack />
                                </button>

                                {/* Next Button */}
                                <button
                                    disabled={socialTasks?.page >= socialTasks?.totalPages} onClick={() => handleSocialNextPage(socialTasks?.currentPage, socialTasks.totalPages)}
                                    className={`bg-white rounded-full active:scale-110 h-6 w-6 shadow-lg flex items-center justify-center ${socialTasks?.currentPage >= socialTasks?.totalPages ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    <IoIosArrowForward />
                                </button>
                            </div>
                        </Fragment>}

                    {activeTab === "Events"
                        && <Fragment>
                            <NoDataMessage
                                isLoading={isLoadingEvents}
                                data={eventsTasks}
                                imageSrc={taskImg}
                                message="No Available Events Tasks"
                            />
                            {eventsTasks?.tasks?.length > 0 && eventsTasks?.tasks?.map((tasks: { _id: string; url: string; type: string; image: string; title: string; shares: number; countdown: number; baseReward: number; timeRemaining: number; }) => (
                                <EventsTasksCategory
                                    key={tasks?._id}
                                    tasks={tasks}
                                    refetch={async () => {
                                        await refetchEventsTasks();
                                        await refetchCards();
                                        await refetchShares()
                                    }}
                                    telegram_id={telegramId}
                                    special={`${tasks?.countdown !== 0 ? "Special" : " "}`}
                                />
                            ))}

                            <div className="flex items-center justify-center gap-5 py-3 h-18">
                                <button
                                    disabled={eventsTasks === 1} onClick={() => handleEventsPreviousPage(eventsTasks?.currentPage)}
                                    className={`bg-white rounded-full active:scale-110 h-6 w-6 shadow-lg flex items-center justify-center ${eventsTasks?.currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    <IoIosArrowBack />
                                </button>

                                {/* Next Button */}
                                <button
                                    disabled={eventsTasks?.page >= eventsTasks?.totalPages} onClick={() => handleEventsNextPage(eventsTasks?.currentPage, eventsTasks.totalPages)}
                                    className={`bg-white rounded-full active:scale-110 h-6 w-6 shadow-lg flex items-center justify-center ${eventsTasks?.currentPage >= eventsTasks?.totalPages ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    <IoIosArrowForward />
                                </button>
                            </div>
                        </Fragment>}

                    {activeTab === "Partners"
                        && <Fragment>
                            <NoDataMessage
                                isLoading={isLoadingPartners}
                                data={partnersTasks}
                                imageSrc={taskImg}
                                message="No Available Partners Tasks"
                            />
                            {partnersTasks?.tasks?.length > 0 && partnersTasks?.tasks?.map((tasks: { _id: string; url: string; chat_id: string; type: string; image: string; title: string; shares: number; countdown: number; baseReward: number; timeRemaining: number; }) => (
                                <PartnersTasksCategory
                                    key={tasks?._id}
                                    tasks={tasks}
                                    refetch={async () => {
                                        await refetchPartnersTasks();
                                        await refetchCards();
                                        await refetchShares()
                                    }}
                                    telegram_id={telegramId}
                                    special={`${tasks?.countdown !== 0 ? "Special" : " "}`}
                                />
                            ))}

                            <div className="flex items-center justify-center gap-5 py-3 h-18">
                                <button
                                    disabled={partnersTasks === 1} onClick={() => handlePartnersPreviousPage(partnersTasks?.currentPage)}
                                    className={`bg-white rounded-full active:scale-110 h-6 w-6 shadow-lg flex items-center justify-center ${partnersTasks?.currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    <IoIosArrowBack />
                                </button>

                                {/* Next Button */}
                                <button
                                    disabled={partnersTasks?.page >= partnersTasks?.totalPages} onClick={() => handlePartnersNextPage(partnersTasks?.currentPage, partnersTasks.totalPages)}
                                    className={`bg-white rounded-full active:scale-110 h-6 w-6 shadow-lg flex items-center justify-center ${partnersTasks?.currentPage >= partnersTasks?.totalPages ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    <IoIosArrowForward />
                                </button>
                            </div>
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
        <div className="flex flex-col items-center gap-2 relative">
            <img
                src={imageSrc}
                loading="lazy"
                alt="no data image"
                className="h-24 w-24 object-contain object-center"
            />
            <div className={
                "absolute z-20 bg-transparent h-full w-full top-0 bottom-0"
            }
            />
            <p className="text-white work-sans text-base text-center">{message}</p>
        </div>
    );
};
