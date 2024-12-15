import dotsbg from "@assets/images/dotted-bg.png";
import logo from "@assets/images/icons/zenstreet_logo.png";
import bell_icon from "@assets/images/bell_icon.png"
import TaskCard from "@components/common/cards/Tasxcard";
import { IoAdd } from "react-icons/io5";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Button } from "@components/ui/button";
import filter from "@assets/images/icons/filter.svg";
import { ShareFormatter } from "@components/common/shareFormatter";
import { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { useGetUserSharesQuery } from "@hooks/redux/shares";

const todayTask = [
  {
    title: "Ongoing Project",
    name: "Refer Friends",
    shares: 10202000,
    type: "Referral",
  },
  {
    title: "Ongoing Project",
    name: "Refer Friends",
    shares: 10000400,
    type: "Special",
  },
  {
    title: "Ongoing Project",
    name: "Refer Friends",
    shares: 10030000,
    type: "Events",
  },
];

function Home() {

  const [telegramId, setTelegramId] = useState<string | null>(null);
  const middleCardRef = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>("Events");

  const { data: user } = useGetUserSharesQuery(telegramId ?? "", {
    skip: !telegramId
  })
  const filteredTasks = selectedFilter
    ? todayTask.filter((task) => task.type === selectedFilter)
    : todayTask;


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
        className="flex flex-col flex-1 py-3 "
      >
        {/* user rewards */}
        <div>
          <h1 className="uppercase aqum font-bold text-lg text-white text-center">
            Total $shares
          </h1>
          <h1 className="text-4xl font-bold aqum text-white pb-6 text-center">
            {ShareFormatter(user?.shares || 0)}
          </h1>
        </div>
        {/* latest cards */}
        <div className="flex items-center overflow-x-auto flex-nowrap w-full h-auto gap-3 px-4">
          <TaskCard>
            <h1 className="py-10 text-center text-white work-sans text-2xl font-semibold">
              Card 1
            </h1>
          </TaskCard>
          <div ref={middleCardRef}>
            <TaskCard>
              <h1 className="py-10 text-center text-white work-sans text-2xl font-semibold">
                Card 2
              </h1>
            </TaskCard>
          </div>
          <TaskCard>
            <h1 className="py-10 text-center text-white work-sans text-2xl font-semibold">
              Card 3
            </h1>
          </TaskCard>
        </div>

        <div className="flex flex-col pt-10 px-4 gap-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 work-sans">
              <h1 className="text-white text-lg font-semibold">Today&apos;s Tasks</h1>
              <h1 className="text-white text-sm">18 Tasks Pending</h1>
            </div>
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <span>
                    <LazyLoadImage effect="blur" src={filter} alt="filter" className="" />
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-orange-500 rounded text-white border-none tahoma">
                  <DropdownMenuItem className={`${selectedFilter === "All" && "bg-white text-black"}`} onClick={() => setSelectedFilter(null)} >All</DropdownMenuItem>
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
                        <LazyLoadImage effect="blur" src={bell_icon} />
                      </button>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

            </div>
          </div>



          <div className="flex flex-col mx-auto gap-5 pb-32 min-w-full">
            {filteredTasks.map((task) => (
              <TaskCard key={task.shares}>
                <CardHeader className="flex flex-row justify-between items-center py-0 px-3">
                  <CardTitle className="text-[#FFFFFF] text-xs font-medium">{task.title}</CardTitle>
                  <div className="flex flex-col">
                    <LazyLoadImage effect="blur" src={logo} alt="logo" className="h-w-14 w-14" />
                    <h1 className="text-xs poppins text-white font-medium">{task.type}</h1>
                  </div>
                </CardHeader>
                <CardContent className="px-3">
                  <CardTitle className="text-xl font-bold text-white">{task.name}</CardTitle>
                  <CardDescription className="text-xs font-bold text-white">
                    {task.shares}
                    $Shares</CardDescription>
                </CardContent>
                <hr className="mx-3" />
                <CardFooter className="pt-3 px-3 flex items-center justify-between">
                  <CardTitle className="text-xs font-bold text-white">Continue</CardTitle>
                  <Button disabled className="rounded h-5 text-[10px] font-medium bg-[#D25804]">Confirm</Button>
                </CardFooter>
              </TaskCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
