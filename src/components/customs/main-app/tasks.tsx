import { tasksApi, useGetAllTasksQuery } from "@/hooks/redux/tasks";
import { socket } from "@/lib/socket.io";
import wavybg from "@assets/images/card_bg.svg";
import carousel_img from "@assets/images/cards/carousel_img.png";
import dotsbg from "@assets/images/dotted-bg.png";
import { RavegenieCard } from "@components/common/cards/TaskCard";
import { Button } from '@components/ui/button';
import { Card } from "@components/ui/card";
import * as Progress from "@radix-ui/react-progress";
import { Fragment, useEffect, useRef, useState } from 'react';
import { BsCardText } from "react-icons/bs";
import { FiLoader } from "react-icons/fi";
import { SlLock } from 'react-icons/sl';


function Tasks() {
    const middleCardRef = useRef<HTMLDivElement>(null);
    const [tabs, setTabs] = useState<string>("All");
    const btnTabs = ["All", "Special", "Daily", "events", "Referral", "Partners", "Social"];
    const { data: tasks, isLoading } = useGetAllTasksQuery(null, { refetchOnReconnect: true, refetchOnFocus: true });

    const handleActiveTabs = (name: string) => {
        setTabs(name)
    }
    const images = [
        // will add new object in the array by unshifting
        // { carousel_img, isLocked: false,},
        { carousel_img, isLocked: false, ref: middleCardRef },
        { carousel_img, isLocked: true, },

    ]

    useEffect(() => {
        if (middleCardRef.current) {
            middleCardRef.current.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            });
        }
    }, []);

    useEffect(() => {
        socket.on('taskCreated', (newTask) => {
            // Update the RTK Query cache with the new task
            tasksApi.util.updateQueryData('getAllTasks', undefined, (draft) => {
                draft.push(newTask);
            });
        });

        return () => {
            socket.disconnect();
        };
    }, []);


    // const unlockedCount = images.filter((image) => !image.isLocked).length;
    // const lockedCount = images.filter((image) => image.isLocked).length;
    return (
        <div className='flex flex-col min-h-full w-full'>
            <div style={{
                backgroundImage: `url(${dotsbg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }} className=' py-3 h-full px-3 min-w-full '>
                {/* task header */}
                <header className="flex flex-col gap-3 w-full">
                    <div className={`relative flex items-center gap-16 pb-5 mb-4 ${images.filter((image) => !image.isLocked).length >= 1 ? "overflow-x-auto " : "overflow-x-hidden"} px-4 snap-x snap-mandatory`}>
                        {images.map((img, id) => {
                            // Determine if it's the first unlocked card
                            const firstUnlockedIndex = images.findIndex((image) => !image.isLocked);
                            const isFirstUnlocked = id === firstUnlockedIndex;

                            return (
                                <Card
                                    key={id}
                                    ref={img.ref}
                                    className={`group bg-slate-800 relative rounded-lg snap-center ${!img.isLocked
                                        ? isFirstUnlocked
                                            ? "min-w-[85%] shadow-xl shadow-slate-700"
                                            : "min-w-[70%] shadow-xl shadow-slate-700"
                                        : "rounded-lg min-w-[70%]"
                                        } max-h-32 w-full overflow-hidden`} // Added overflow-hidden
                                >
                                    {/* LazyLoadImage
                                    effect="blur" */}
                                    <img
                                        src={img.carousel_img}
                                        alt={`card img ${id}`}
                                        className={`h-32 !w-full object-cover rounded-lg ${!img.isLocked
                                            ? "duration-200 transition-transform"
                                            : "scale-90"
                                            }`}
                                    />
                                    {img.isLocked && (
                                        <div className="absolute bg-black/95 z-20 top-0 h-full w-full rounded-md flex flex-col justify-center items-center">
                                            <SlLock size={50} color="white" />
                                        </div>
                                    )}
                                </Card>
                            );
                        })}
                    </div>


                    <Progress.Root
                        className="relative h-[9px] w-full overflow-hidden rounded-full bg-white my-1"
                        style={{
                            transform: "translateZ(0)",
                        }}
                        value={100}
                    >
                        <Progress.Indicator
                            className="ease-[cubic-bezier(0.65, 0, 0.35, 1)] size-full bg-[#D25804] rounded-r-full transition-transform duration-200"
                            style={{
                                transform: `translateX(-${100 - 50}%)`,
                                background:
                                    "linear-gradient(#D25804, #fff0), repeating-linear-gradient(135deg, rgb(232,6,6) 0 7px, #0000 0 20px), #D25804",
                            }}
                        />
                    </Progress.Root>
                </header>


                <div className='h-auto w-full'>
                    {/* task tabs */}
                    <div className='flex items-center gap-6 overflow-x-auto max-w-full h-auto py-5 '>
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

                    {tasks?.tasks.filter((task: { category: string }) => tabs === "All" || task.category === tabs).length === 0 ? (
                        <div className="flex flex-col items-center gap-2">
                            <BsCardText size={40} color="white" />
                            <p className="text-white work-sans text-base text-center">No Available Tasks on <span className="capitalize">{tabs}</span> </p>
                        </div>

                    ) : (
                        tasks?.tasks
                            .filter((task: { category: string }) => tabs === "All" || task.category === tabs)
                            .map((task: { _id: string; title: string; taskUrl: string; image: string; taskType: "one-time" | "recurring"; category: "Special" | "Daily" | "Referral" | "Partners" | "Social" | "Events"; diminishingRewards: "Yes" | "No"; countdown: number; baseReward: number; isExpired: boolean; remainingTime: number; reward: number; }) => (
                                <RavegenieCard key={task._id} task={task} />
                            ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Tasks

