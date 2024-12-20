import { RavegenieCard } from "@/components/common/cards/TaskCard";
import { useGetAllTasksQuery } from "@/hooks/redux/tasks";
import bell_icon from "@assets/images/bell_icon.png";
import dotsbg from "@assets/images/dotted-bg.png";
import filter from "@assets/images/icons/filter.svg";
import CardCarousel from "@components/common/main-app/card-carousel";
import { ShareFormatter } from "@components/common/shareFormatter";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { useGetUserSharesQuery } from "@hooks/redux/shares";
import {  useEffect, useRef, useState } from "react";
import { BsCardText } from "react-icons/bs";
import { FiLoader } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import firstBannerImg from "@assets/images/cards/Banner 1.jpg"
import secondBannerImg from "@assets/images/cards/Banner 2 C.jpg"
import thirdBannerImg from "@assets/images/cards/Banner 3.jpg"


const imageUrls = [
  firstBannerImg,
  secondBannerImg,
  thirdBannerImg,
];


function Home() {

  const [telegramId, setTelegramId] = useState<string | null>(null);
  const middleCardRef = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const { data: user } = useGetUserSharesQuery(telegramId ?? "", { refetchOnReconnect: true, refetchOnFocus: true })
  const { data: tasks, isLoading } = useGetAllTasksQuery(null, { refetchOnReconnect: true, refetchOnFocus: true });

  const filteredTasks = tasks?.tasks.filter((task: { category: string; }) =>
    selectedFilter === null || selectedFilter === "All" || task.category === selectedFilter
  );

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);


  useEffect(() => {
    // Set Telegram user ID
    if (window.Telegram && window.Telegram.WebApp) {
      const telegramUserId = window.Telegram.WebApp.initDataUnsafe?.user?.id;
      if (telegramUserId) {
        setTelegramId(telegramUserId);
      }
    }

    // Scroll to middle card
    if (middleCardRef.current) {
      middleCardRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
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
          <h1 className="text-3xl font-bold aqum text-white pb-6 text-center">
            {ShareFormatter(user?.shares || 0)}
          </h1>
        </div>

        {/* latest cards */}

        <CardCarousel slides={imageUrls} />

        <div className="flex flex-col pt-10 px-4 gap-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 work-sans">
              <h1 className="text-white text-lg font-semibold">Today&apos;s Tasks</h1>
              <h1 className="text-white text-sm">{filteredTasks?.length} Tasks Available</h1>
            </div>
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <span>
                    <LazyLoadImage effect="opacity" src={filter} alt="filter" className="" />
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-orange-600 rounded text-white border-none tahoma">
                  <DropdownMenuItem className={`${selectedFilter === null && "bg-white text-black"}`} onClick={() => setSelectedFilter("All")} >All</DropdownMenuItem>
                  <DropdownMenuItem className={`${selectedFilter == "Special" && "bg-white text-black"}`} onClick={() => setSelectedFilter("Special")} >Special</DropdownMenuItem>
                  <DropdownMenuItem className={`${selectedFilter === "Events" && "bg-white text-black"}`} onClick={() => setSelectedFilter("Events")} >Events</DropdownMenuItem>
                  <DropdownMenuItem className={`${selectedFilter === "Referral" && "bg-white text-black"}`} onClick={() => setSelectedFilter("Referral")} >Referral</DropdownMenuItem>
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
          <div className="flex flex-col gap-5 pt-6 pb-[7rem]">
            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center py-5">
                <FiLoader size={30} color="white" className="animate-spin" />
                <p className="text-white work-sans pt-4 text-sm">Updating tasks.....</p>
              </div>
            )}

            {/* No Tasks Available */}
            {!isLoading && (!filteredTasks || filteredTasks.length === 0) && (
              <div className="flex flex-col items-center gap-2">
                <BsCardText size={40} color="white" />
                <p className="text-white work-sans text-base text-center">No Available Tasks</p>
              </div>
            )}

            {/* Tasks List */}
            {!isLoading && filteredTasks?.length > 0 && (
              filteredTasks.map((task: { _id: string; title: string; taskUrl: string; image: string; taskType: "one-time" | "recurring"; category: "Special" | "Events" | "Referral" | "Daily" | "Partners" | "Social"; diminishingRewards: "Yes" | "No"; countdown: number; baseReward: number; isExpired: boolean; remainingTime: number; reward: number; }) => (
                <RavegenieCard key={task._id} task={task} />
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
