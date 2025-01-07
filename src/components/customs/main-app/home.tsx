import bell_icon from "@assets/images/bell_icon.png";
import firstBannerImg from "@assets/images/cards/Banner1.jpg";
import secondBannerImg from "@assets/images/cards/Banner2.jpg";
import thirdBannerImg from "@assets/images/cards/Banner3.jpg";
import dotsbg from "@assets/images/dotted-bg.png";
import filter from "@assets/images/icons/filter.svg";
import CardCarousel from "@components/common/main-app/card-carousel";
import { ShareFormatter } from "@components/common/shareFormatter";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { useGetUserSharesQuery } from "@hooks/redux/shares";
import { useGetAllRanksQuery } from "@hooks/redux/ranks"
import { useEffect, useState, useMemo, Fragment } from "react";
import { IoAdd } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { SlBadge } from "react-icons/sl";
import { getUserRank, getRankIconColor } from "@lib/utils"
import { Skeleton } from "@components/ui/skeleton";
import ReferralsCategory from "@/components/common/main-app/task-categories/referrals";
import { NoDataMessage } from "./tasks";
import SocialsCategory from "@/components/common/main-app/task-categories/socials";
import { useGetReferralTaskQuery } from "@/hooks/redux/referrals";
import { useGetSocialTasksQuery } from "@/hooks/redux/tasks";
import { FiLoader } from "react-icons/fi";
import taskImg from "@assets/images/icons/tasks_img.svg";
import RaveLogo from "@assets/images/icons/zenstreet_logo.png";


const imageUrls = [
  firstBannerImg,
  secondBannerImg,
  thirdBannerImg,
];


function Home() {

  const [telegramId, setTelegramId] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("Social");
  const { data: ranks } = useGetAllRanksQuery(undefined, { refetchOnReconnect: true, refetchOnFocus: true, refetchOnMountOrArgChange: true, });
  const { data: user, isLoading: loadingShares } = useGetUserSharesQuery(telegramId ?? "", { skip: !telegramId, refetchOnReconnect: true, refetchOnFocus: true, refetchOnMountOrArgChange: true })
  const { data: refTasks, isLoading: isLoadingRef, refetch: refetchRefTasks, isSuccess } = useGetReferralTaskQuery(telegramId ?? "", {
    skip: !telegramId, refetchOnReconnect: true, refetchOnFocus: true, refetchOnMountOrArgChange: true,
  })
  const { data: socialTasks, isLoading: isLoadingSocial, refetch: refetchSocialTasks } = useGetSocialTasksQuery(telegramId, {
    skip: !telegramId, refetchOnReconnect: true, refetchOnFocus: true, refetchOnMountOrArgChange: true,
  })

  const userRank = useMemo(
    () =>
      getUserRank(
        user?.shares,
        ranks?.data?.map(
          (rank: { rank: string; rankRange: { min: number; max: number } }) => ({
            rank: rank.rank,
            min: rank.rankRange.min,
            max: rank.rankRange.max,
          })
        ) || []
      ),
    [ranks?.data, user?.shares]
  );

  const rankColor = getRankIconColor(userRank);

  const handleActiveTabs = (name: string) => {
    setSelectedFilter(name)
  }

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const telegramUserId = window.Telegram.WebApp.initDataUnsafe?.user?.id;
      if (telegramUserId) {
        setTelegramId(telegramUserId);
      }
    }
  }, []);

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
        <div className={"flex flex-col items-center gap-2"}>
          <h1 className="uppercase aqum font-bold text-lg text-white text-center pt-2">
            Total shares
          </h1>
          <h1 className="text-3xl font-bold aqum text-white text-center">
            {loadingShares ? <Skeleton className="bg-gray-700 h-9 w-32 animate-pulse rounded-md shadow-lg" /> : <ShareFormatter shares={user?.shares} />}

          </h1>
          <div className={"mb-5 pb-1 flex items-center gap-4 border-b border-gray-500"}>
            <span className={"work-sans text-white"}>{userRank}</span>
            <SlBadge color={rankColor} size={25} />
          </div>
        </div>

        {/* latest cards */}

        <CardCarousel slides={imageUrls} />

        <div className="flex flex-col pt-10 px-4 gap-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 work-sans">
              <h1 className="text-white text-lg font-semibold">Today&apos;s Tasks</h1>
              <h1 className="text-white text-sm">{refTasks?.tasks.length + socialTasks?.tasks.length} Tasks Available</h1>
            </div>
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <span>
                    <LazyLoadImage effect="opacity" src={filter} alt="filter" className="" />
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-orange-600 rounded text-white flex flex-col-reverse border-none tahoma">
                  <DropdownMenuItem className={`${selectedFilter == "Special" && "bg-white text-black"}`} onClick={() => handleActiveTabs("Special")} >Special</DropdownMenuItem>
                  <DropdownMenuItem className={`${selectedFilter === "Events" && "bg-white text-black"}`} onClick={() => handleActiveTabs("Events")} >Events</DropdownMenuItem>
                  <DropdownMenuItem className={`${selectedFilter === "Referral" && "bg-white text-black"}`} onClick={() => handleActiveTabs("Referral")} >Referral</DropdownMenuItem>
                  <DropdownMenuItem className={`${selectedFilter === "Social" && "bg-white text-black"}`} onClick={() => handleActiveTabs("Social")} >Social</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="h-8 w-[1px] border border-[#E4E4E4]" />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <span><IoAdd color="white" size={26} /></span>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="left" className="bg-orange-600 rounded text-white border-none tahoma p-2">
                  <div className="flex items-center gap-4">
                    <h1 className="text-sm poppins">Send a ping notification<br /> to your team</h1>
                    <div className="h-10 w-10">
                      <button>
                        <LazyLoadImage effect="opacity" src={bell_icon} alt="add" />
                      </button>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

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

            {selectedFilter === "Events" &&
              <Fragment>
                <NoDataMessage
                  isLoading={isLoadingRef}
                  data={refTasks}
                  imageSrc={taskImg}
                  message="No Available Tasks"
                />
              </Fragment>
            }

            {selectedFilter === "Special" &&
              <Fragment>
                <NoDataMessage
                  isLoading={isLoadingRef}
                  data={refTasks}
                  imageSrc={taskImg}
                  message="No Available Tasks"
                />
              </Fragment>
            }

            {selectedFilter === "Referral"
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
                      // refetchCards();
                    }}
                    telegram_id={telegramId}
                    type={`${tasks.countdown !== 0 ? "Special" : ""}`}
                  />
                ))}
              </Fragment>}


            {selectedFilter === "Social"
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
                      // refetchCards();
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
    </div>
  );
}

export default Home;
