import SendPingNotification from "@/components/common/main-app/send-ping-notification";
import EventsTasksCategory from "@/components/common/main-app/task-categories/events";
import PartnersTasksCategory from "@/components/common/main-app/task-categories/partners";
import ReferralsCategory from "@/components/common/main-app/task-categories/referrals";
import SocialsCategory from "@/components/common/main-app/task-categories/socials";
import { useGetReferralTaskQuery } from "@/hooks/redux/referrals";
import { useGetEventsTasksQuery, useGetPartnersTasksQuery, useGetSocialTasksQuery } from "@/hooks/redux/tasks";
import { RootState } from "@/lib/store";
import firstBannerImg from "@assets/images/cards/Banner1.jpg";
import secondBannerImg from "@assets/images/cards/Banner2.jpg";
import thirdBannerImg from "@assets/images/cards/Banner3.jpg";
import dotsbg from "@assets/images/dotted-bg.png";
import filter from "@assets/images/icons/filter.svg";
import taskImg from "@assets/images/icons/tasks_img.svg";
import CardCarousel from "@components/common/main-app/card-carousel";
import { RewardForStoryViews } from "@components/common/main-app/reward-story-view";
import { ShareFormatter } from "@components/common/shareFormatter";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { useGetTelegramId } from "@hooks/getTelegramId";
import { useGetAllRanksQuery } from "@hooks/redux/ranks";
import { useGetUserSharesQuery } from "@hooks/redux/shares";
import { getRankIconColor, getUserRank } from "@lib/utils";
import { Fragment, useMemo } from "react";
import { FaAward } from "react-icons/fa6";
import { FiLoader } from "react-icons/fi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { NoDataMessage } from "./tasks";

const imageUrls = [
  firstBannerImg,
  secondBannerImg,
  thirdBannerImg,
];

function Home() {

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "Events";
  const btnTabs = ["Events", "Referral", "Partners", "Social"];
  const { telegramId } = useGetTelegramId();
  const users = useSelector((state: RootState) => state.userData)
  const { data: ranks } = useGetAllRanksQuery(undefined, { refetchOnReconnect: true, refetchOnFocus: true, refetchOnMountOrArgChange: true, });
  const { refetch: refetchShares } = useGetUserSharesQuery(telegramId ?? "", { skip: !telegramId, refetchOnReconnect: true, refetchOnFocus: true, refetchOnMountOrArgChange: true })
  const { data: refTasks, isLoading: isLoadingRef, refetch: refetchRefTasks, isSuccess } = useGetReferralTaskQuery(telegramId ?? "", {
    skip: !telegramId,
    refetchOnReconnect: true,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  const { data: socialTasks, isLoading: isLoadingSocial, refetch: refetchSocialTasks } = useGetSocialTasksQuery(telegramId, {
    skip: !telegramId,
    refetchOnReconnect: true,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  const { data: eventsTasks, isLoading: isLoadingEvents, refetch: refetchEventsTasks } = useGetEventsTasksQuery(telegramId, {
    skip: !telegramId,
    refetchOnReconnect: true,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })
  const { data: partnersTasks, isLoading: isLoadingPartners, refetch: refetchPartnersTasks } = useGetPartnersTasksQuery(telegramId, {
    skip: !telegramId,
    refetchOnReconnect: true,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })


  const userRank = useMemo(
    () =>
      getUserRank(
        users?.shares,
        ranks?.data?.map(
          (rank: { rank: string; rankRange: { min: number; max: number } }) => ({
            rank: rank.rank,
            min: rank.rankRange.min,
            max: rank.rankRange.max,
          })
        ) || []
      ),
    [ranks?.data, users?.shares]
  );

  const rankColor = getRankIconColor(userRank);

  const handleActiveTabs = (name: string) => {
    setSearchParams({ tab: name });
  };

  return (
    <div className="flex flex-col min-h-full">
      <div
        style={{
          backgroundImage: `url(${dotsbg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="flex flex-col py-3 w-full"
      >
        {/* user rewards */}
        <div className={"flex flex-col items-center gap-1"}>
          <h1 className="uppercase aqum font-bold text-lg text-white text-center pt-2">
            Total shares
          </h1>
          <h1 className="text-[28px] font-bold aqum text-white text-center">
            <ShareFormatter shares={users?.shares} />
          </h1>
          <div className={"mb-5 pb-1 flex items-center gap-4 border-b border-gray-500"}>
            <span className={"work-sans text-sm text-white"}>{userRank}</span>
            <FaAward color={rankColor} size={25} />
          </div>
        </div>

        {/* latest cards */}

        <CardCarousel slides={imageUrls} />

        <div className="flex flex-col pt-10 px-4 gap-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 work-sans">
              <h1 className="text-white text-lg font-semibold">Today&apos;s Tasks</h1>
              <h1 className="text-white text-sm">
                {refTasks?.tasks?.length >= 0 &&
                  socialTasks?.tasks?.length >= 0 &&
                  eventsTasks?.tasks?.length >= 0 &&
                  partnersTasks?.tasks?.length >= 0 ?
                  (
                    (refTasks?.tasks?.length || 0) +
                    (socialTasks?.tasks?.length || 0) +
                    (eventsTasks?.tasks?.length || 0) +
                    (partnersTasks?.tasks?.length || 0)
                  ) :
                  "No"
                } Available Tasks
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger className={"outline-none border-none relative"}>
                  <Fragment>
                    <LazyLoadImage effect="opacity" src={filter} alt="filter" className="" />
                    <div className={"h-2 w-2 z-20 bg-orange-600 animate-pulse rounded-full absolute top-0 left-0"} />
                  </Fragment>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-orange-600 rounded text-white flex flex-col-reverse border-none tahoma">
                  {btnTabs.map((tabs) => (
                    <DropdownMenuItem key={tabs} className={`${activeTab === tabs && "bg-white text-black"}`} onClick={() => handleActiveTabs(tabs)} >{tabs}</DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="h-8 w-[1px] border border-[#E4E4E4]" />
              <SendPingNotification />
              <div className="h-8 w-[1px] border border-[#E4E4E4]" />
              <RewardForStoryViews />
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
                  message="No Available Referral Tasks"
                />
                {isSuccess && refTasks?.tasks.length > 0 && refTasks?.tasks?.map((tasks: { _id: string; title: string; image: string; shares: number; refCount: number; countdown: number; baseReward: number; timeRemaining: number; }) => (
                  <ReferralsCategory
                    key={tasks?._id}
                    tasks={tasks}
                    refetch={() => {
                      refetchRefTasks();
                      refetchShares()
                    }}
                    telegram_id={telegramId}
                    type={`${tasks?.countdown !== 0 ? "Special" : "Normal"}`}
                  />
                ))}
              </Fragment>}


            {activeTab === "Social"
              && <Fragment>
                <NoDataMessage
                  isLoading={isLoadingSocial}
                  data={socialTasks}
                  imageSrc={taskImg}
                  message="No Available Social Tasks"
                />
                {socialTasks?.tasks.length > 0 && socialTasks?.tasks?.map((tasks: { _id: string; chat_id: string; image: string; title: string; shares: number; socialUrl: string; countdown: number; baseReward: number; timeRemaining: number; }) => (
                  <SocialsCategory
                    key={tasks?._id}
                    tasks={tasks}
                    refetch={() => {
                      refetchSocialTasks();
                      refetchShares()
                    }}
                    telegram_id={telegramId}
                    type={`${tasks?.countdown !== 0 ? "Special" : "Normal"}`}
                  />
                ))}
              </Fragment>}


            {activeTab === "Events"
              && <Fragment>
                <NoDataMessage
                  isLoading={isLoadingEvents}
                  data={eventsTasks}
                  imageSrc={taskImg}
                  message="No Available Events Tasks"
                />
                {eventsTasks?.tasks.length > 0 && eventsTasks?.tasks?.map((tasks: { _id: string; url: string; type: string; image: string; title: string; shares: number; countdown: number; baseReward: number; timeRemaining: number; }) => (
                  <EventsTasksCategory
                    key={tasks?._id}
                    tasks={tasks}
                    refetch={() => {
                      refetchEventsTasks();
                      refetchShares()
                    }}
                    telegram_id={telegramId}
                    special={`${tasks?.countdown !== 0 ? "Special" : "Normal"}`}
                  />
                ))}
              </Fragment>}

            {activeTab === "Partners"
              && <Fragment>
                <NoDataMessage
                  isLoading={isLoadingPartners}
                  data={partnersTasks}
                  imageSrc={taskImg}
                  message="No Available Partners Tasks"
                />
                {partnersTasks?.tasks.length > 0 && partnersTasks?.tasks?.map((tasks: { _id: string; url: string; type: string; chat_id: string; image: string; title: string; shares: number; countdown: number; baseReward: number; timeRemaining: number; }) => (
                  <PartnersTasksCategory
                    key={tasks?._id}
                    tasks={tasks}
                    refetch={() => {
                      refetchPartnersTasks();
                      refetchShares()
                    }}
                    telegram_id={telegramId}
                    special={`${tasks?.countdown !== 0 ? "Special" : "Normal"}`}
                  />
                ))}
              </Fragment>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
