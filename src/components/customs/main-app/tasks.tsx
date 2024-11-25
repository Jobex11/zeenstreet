import * as Progress from "@radix-ui/react-progress";
import { useEffect, useRef, useState } from 'react';
import { GoClockFill } from "react-icons/go";
import { SlLock } from 'react-icons/sl';
import wavybg from "../../../assets/images/card_bg.svg";
import carousel_img from "../../../assets/images/cards/carousel_img.png";
import dotsbg from "../../../assets/images/dotted-bg.png";
import youtubeLogo from "../../../assets/images/icons/youtube_logo.svg";
import zeenStreetLogo from "../../../assets/images/icons/zenstreet_logo.png";
import TaskCard from "../../common/cards/Tasxcard";
import { Button } from '../../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";


const tasks = [
    {
        cardHeader: "Ongoing Project",
        title: "Watch Video",
        description: "100,000,000 $Shares",
        logo: youtubeLogo,
        task: "Special Task!",
        isTime: true,
        progressValue: 50,
        timeLeft: "23 hours left",
    },
    {
        cardHeader: "Ongoing Project",
        title: "Refer Friends",
        description: "100,000,000 $Shares",
        logo: zeenStreetLogo,
        task: "Daily Task!",
        isTime: false,
        progressValue: 75,
        timeLeft: "5 days left",
    },
    {
        cardHeader: "Ongoing Project",
        title: "Refer Friends",
        description: "100,000,000 $Shares",
        logo: zeenStreetLogo,
        task: "Daily Task!",
        isTime: false,
        progressValue: 75,
        timeLeft: "5 days left",
    },
    {
        cardHeader: "Ongoing Project",
        title: "Refer Friends",
        description: "100,000,000 $Shares",
        logo: zeenStreetLogo,
        task: "Daily Task!",
        isTime: false,
        progressValue: 75,
        timeLeft: "5 days left",
    },

];

function Tasks() {
    const middleCardRef = useRef<HTMLDivElement>(null);
    const [tabs, setTabs] = useState<string>("All");
    const btnTabs = ["All", "Special", "Daily", "events", "Referral", "Partners", "Social"];

    const handleActiveTabs = (name: string) => {
        setTabs(name)
    }
    const images = [
        { carousel_img, isLocked: false, ref: middleCardRef },
        { carousel_img, isLocked: true, },
        { carousel_img, isLocked: true },
        { carousel_img, isLocked: true, },
        { carousel_img, isLocked: true },
        { carousel_img, isLocked: true },
        { carousel_img, isLocked: true },
        { carousel_img, isLocked: true },

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

    return (
        <div className='flex flex-col min-h-full w-full'>
            <div style={{
                backgroundImage: `url(${dotsbg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }} className=' py-3 h-full px-3 min-w-full '>
                {/* task header */}

                <header className="flex flex-col gap-3 w-full">
                    <div className={`relative flex items-center gap-16 pb-5 mb-4 ${images.filter((image) => !image.isLocked).length > 1 ? "overflow-x-auto " : "overflow-x-hidden"} px-4 snap-x snap-mandatory`}>
                        {images.slice(0, 2).map((img, id) => {
                            // Determine if it's the first unlocked card
                            const firstUnlockedIndex = images.findIndex((image) => !image.isLocked);
                            const isFirstUnlocked = id === firstUnlockedIndex;
                            const unlockedCount = images.filter((image) => !image.isLocked).length; // total number of unlocked cards

                            return (
                                <Card
                                    key={id}
                                    ref={img.ref}
                                    className={`group relative snap-center ${!img.isLocked
                                        ? isFirstUnlocked
                                            ? "min-w-[85%] shadow-xl shadow-slate-400 rounded-lg"  // First unlocked card takes 85% of the screen
                                            : "min-w-[70%] shadow-xl shadow-slate-400 rounded-lg" // Subsequent unlocked cards take 70% of the screen
                                        : "scale-90 rounded-lg min-w-[70%]" // Locked cards
                                        } h-[150px] `}
                                >
                                    <img
                                        src={img.carousel_img}
                                        alt={`card img ${id}`}
                                        className={`h-full w-full object-cover object-center ${!img.isLocked
                                            ? "group-hover:scale-105 duration-200 transition-transform scale-110 rounded-lg"
                                            : "scale-90 rounded-lg"
                                            }`}
                                    />
                                    {img.isLocked && (
                                        <div className="absolute bg-black/95 z-20 top-0 h-full w-full rounded-md flex flex-col justify-center items-center">
                                            <SlLock size={50} color="white" />
                                            {unlockedCount}
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
                                className={`poppins object-cover  px-10 bg-[#171717] relative hover:bg-transparent capitalize ${tabs === tab ? " border rounded-lg font-semibold text-[#FFFFFF] border-[#F7F7F7] text-sm  w-[117px] h-[39px] " : "w-[88px] h-[31px] rounded-none outline-none ring-0 border-none shadow-none font-normal text-[11px] "}`}>
                                {tab}
                                {tabs !== tab && <div className='bg-black/10 absolute right-0 left-0 h-full w-full z-10' />}
                            </Button>
                        ))}
                    </div>
                </div>



                {/* task cards */}
                <div className='flex flex-col gap-5 pt-6 pb-[7rem]'>
                    {tasks.map((task, index) => (
                        <TaskCard key={index}>
                            <CardHeader className="flex flex-row justify-between items-center py-2 px-3">
                                <CardTitle className="text-[#FFFFFF] text-[11px] font-medium p-0">{task.cardHeader}</CardTitle>
                                <div className="flex flex-col">
                                    <img src={task.logo} alt="logo" className="max-h-[54px] max-w-[75.78px] w-fit h-fit object-contain object-center" />
                                    <h1 className="text-[11px] poppins text-[#FFFFFF] font-medium">{task.task}</h1>
                                </div>
                            </CardHeader>
                            <CardContent className="px-3">
                                <CardTitle className="text-xl font-bold text-white">{task.title}</CardTitle>
                                <CardDescription className="text-[11px] font-bold text-white">{task.description}</CardDescription>
                                {task.isTime && (
                                    <>
                                        <Progress.Root
                                            className="relative h-[9px] w-full overflow-hidden rounded-full bg-white my-1"
                                            style={{
                                                transform: "translateZ(0)",
                                            }}
                                            value={task.progressValue}
                                        >
                                            <Progress.Indicator
                                                className="ease-[cubic-bezier(0.65, 0, 0.35, 1)] size-full bg-[#D25804] rounded-r-full transition-transform duration-200"
                                                style={{ transform: `translateX(-${100 - task.progressValue}%)` }}
                                            />
                                        </Progress.Root>

                                        <div className='flex items-center justify-between text-[11px] font-medium text-white py-2'>
                                            <span>{task.progressValue} % Complete</span>
                                            <span className='flex items-center gap-2'>
                                                <GoClockFill size={22} /> {task.timeLeft}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                            <hr className="mx-3" />
                            <CardFooter className="py-2 px-3 flex items-center justify-between">
                                <CardTitle className="text-[11px] font-bold text-white">Continue</CardTitle>
                                <Button disabled className="rounded-[5px] h-5 text-[10px] font-[500] bg-[#D25804]">Confirm</Button>
                            </CardFooter>
                        </TaskCard>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Tasks
