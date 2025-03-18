import ConnectTonWallet from "@/components/shared/ton-connect-btn";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { wealthClass } from "@/constants/wealth-class";
import { useGetAllRanksQuery } from "@/hooks/redux/ranks";
import { useGetAllWealthClasssQuery } from "@/hooks/redux/wealthclass";
import { RootState } from "@/lib/store";
import achievement_1 from "@assets/images/cards/achievement_1.png";
import achievement_2 from "@assets/images/cards/achievement_2.png";
import achievement_3 from "@assets/images/cards/achievement_3.png";
import achievement_4 from "@assets/images/cards/achievement_4.png";
import achievement_5 from "@assets/images/cards/achievement_5.png";
import achievement_6 from "@assets/images/cards/achievement_6.png";
import achievement_7 from "@assets/images/cards/achievement_7.png";
import { CardContent } from "@components/ui/card";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from "@components/ui/drawer";
import { useGetTelegramId } from "@hooks/getTelegramId";
import { useGetUsersByIdQuery } from "@hooks/redux/users";
import { motion } from "framer-motion";
import { lazy, useMemo } from "react";
import { IoIosClose } from "react-icons/io";
import { SlLock } from "react-icons/sl";
import { useSelector } from "react-redux";

const CardWrapper = lazy(() => import("@/components/shared/cards/card-wrapper"));
const CollectedCards = lazy(() => import("@/components/common/collected-cards"))
const PowerClass = lazy(() => import("@/components/common/power-class"))
const ShareFormatter = lazy(() => import("@/components/shared/shareFormatter").then((mod) => ({ default: mod.ShareFormatter })));


function Profile() {

    const { telegramId } = useGetTelegramId();
    const users = useSelector((state: RootState) => state.userData);
    const { data: wealthClasses } = useGetAllWealthClasssQuery(undefined, {
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    const { data: userDataCard } = useGetUsersByIdQuery(telegramId, {
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });
    
    const { data: ranks } = useGetAllRanksQuery(undefined,
        {
            refetchOnReconnect: true,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true,
        });

    const determineWealthClassStatus = (
        userShares: number,
        userUnlockedCards: { _id: string; title: string; image: string; wealthClass: string }[]
    ) => {
        return wealthClass?.map((WealthClass) => {
            // Find matching wealth class data
            const matchingWealthClass = wealthClasses?.data?.find(
                (cls: { name: string }) => cls.name === WealthClass.name
            );
            console.log("Match", matchingWealthClass)
            if (!matchingWealthClass) {
                // Default if wealth class data is missing
                return {
                    ...WealthClass,
                    img: WealthClass.img,
                    description: WealthClass.description,
                    name: WealthClass.name,
                    rewards: WealthClass.rewards,
                    isLocked: true,
                    unlockMessage: `No data available for the ${WealthClass.name} class.`,
                };
            }

            // Find the required rank for this wealth class
            const requiredRank = ranks?.data?.find(
                (rank: { rankRange: { min: number; max: number } }) =>
                    matchingWealthClass.minRank >= rank.rankRange.min &&
                    matchingWealthClass.minRank <= rank.rankRange.max
            );

            // Check if the user meets or exceeds the required rank for this class
            const hasRequiredRank = requiredRank && userShares >= requiredRank.rankRange.min;

            // Count unlocked cards for this wealth class
            const unlockedCardsForClass = userUnlockedCards?.filter(
                (card) => card.wealthClass === WealthClass.name
            ).length;

            const hasRequiredCards = unlockedCardsForClass >= matchingWealthClass.requiredCards;

            // Check if the wealth class is unlocked
            const isUnlocked = hasRequiredRank && hasRequiredCards;

            // Create unlock message
            const unlockMessage = isUnlocked
                ? `You have unlocked the ${matchingWealthClass.name} class!`
                : `You need ${matchingWealthClass.requiredCards - unlockedCardsForClass
                } more cards and rank ${requiredRank?.rank || "a valid rank"
                } to unlock ${matchingWealthClass.name}.`;

            return {
                ...WealthClass,
                img: WealthClass.img,
                description: WealthClass.description,
                name: matchingWealthClass.name || WealthClass.name,
                rewards: matchingWealthClass.sharesReward || WealthClass.rewards,
                isLocked: isUnlocked,
                unlockMessage,
            };
        });
    };

    const wealthClassStatus = determineWealthClassStatus(userDataCard?.user?.shares, userDataCard?.user?.unlockedCards);


    const findIsLocked = useMemo(() => {
        return (name: string): boolean => {
            const status = wealthClassStatus?.find(item => item.name === name);
            return status ? status.isLocked : true;
        };
    }, [wealthClassStatus]);

    const achievement = [
        {
            achievementType: "GROW YOUR TEAM",
            description: "Get the required number of Tier1 referrals to unlock this achievement!",
            data: [
                {
                    isLocked: userDataCard?.user?.tier1?.length >= 1,
                    name: "Get 1 Friend",
                    unLockedText: "You unlocked this achievement by getting your first Tier 1 friend.",
                    shareType: "achievement_1",
                    img: achievement_1,
                },
                {
                    isLocked: userDataCard?.user?.tier1?.length >= 5,
                    name: "Get 5 Friends",
                    unLockedText: "You unlocked this achievement by getting your first Tier 5 friends.",
                    shareType: "achievement_2",
                    img: achievement_2,
                },
                {
                    isLocked: userDataCard?.user?.tier1?.length >= 10,
                    name: "Get 10 Friends",
                    unLockedText: "You unlocked this achievement by getting 10 Tier 1 friends.",
                    shareType: "achievement_3",
                    img: achievement_3,
                },
                {
                    isLocked: userDataCard?.user?.tier1?.length >= 25,
                    name: "Get 25 Friends",
                    unLockedText: "You unlocked this achievement by getting 25 Tier 1 friends.",
                    shareType: "achievement_4",
                    img: achievement_4,
                },
                {
                    isLocked: userDataCard?.user?.tier1?.length >= 50,
                    name: "Get 50 Friends",
                    unLockedText: "You unlocked this achievement by getting 50 Tier 1 friends.",
                    shareType: "achievement_5",
                    img: achievement_5,
                },
                {
                    isLocked: userDataCard?.user?.tier1?.length >= 100,
                    name: "Get 100 Friends",
                    unLockedText: "You unlocked this achievement by getting 100 Tier 1 friends.",
                    shareType: "achievement_6",
                    img: achievement_6,
                },
                {
                    isLocked: userDataCard?.user?.tier1?.length >= 250,
                    name: "Get 250 Friends",
                    unLockedText: "You unlocked this achievement by getting 250 Tier 1 friends.",
                    shareType: "achievement_7",
                    img: achievement_7,
                },
            ],
        },
        {
            achievementType: "TIER 2 FRIENDS",
            description: "Get the required number of Tier2 referrals to unlock this achievement!",
            data: [
                {
                    isLocked: userDataCard?.user?.tier2?.length >= 1,
                    name: "Get 1 Friend",
                    unLockedText: "You unlocked this achievement by getting your first Tier 2 friend.",
                    shareType: "achievement_1",
                    img: achievement_1,
                },
                {
                    isLocked: userDataCard?.user?.tier2?.length >= 10,
                    name: "Get 10 Friends",
                    unLockedText: "You unlocked this achievement by getting 10 Tier 2 friends.",
                    shareType: "achievement_2",
                    img: achievement_2,
                },
                {
                    isLocked: userDataCard?.user?.tier2?.length >= 50,
                    name: "Get 50 Friends",
                    unLockedText: "You unlocked this achievement by getting 50 Tier 2 friends.",
                    shareType: "achievement_3",
                    img: achievement_3,
                },
                {
                    isLocked: userDataCard?.user?.tier2?.length >= 100,
                    name: "Get 100 Friends",
                    unLockedText: "You unlocked this achievement by getting 100 Tier 2 friends.",
                    shareType: "achievement_4",
                    img: achievement_4,
                },
                {
                    isLocked: userDataCard?.user?.tier2?.length >= 500,
                    name: "Get 500 Friends",
                    unLockedText: "You unlocked this achievement by getting 500 Tier 2 friends.",
                    shareType: "achievement_5",
                    img: achievement_5,
                },
                {
                    isLocked: userDataCard?.user?.tier2?.length >= 1000,
                    name: "Get 1000 Friends",
                    unLockedText: "You unlocked this achievement by getting 1000 Tier 2 friends.",
                    shareType: "achievement_6",
                    img: achievement_6,
                },
                {
                    isLocked: userDataCard?.user?.tier2?.length >= 5000,
                    name: "Get 5000 Friends",
                    unLockedText: "You unlocked this achievement by getting 5000 Tier 2 friends.",
                    shareType: "achievement_7",
                    img: achievement_7,
                },
            ],
        },
        {
            achievementType: "UNLOCK CARDS",
            description: "Get the total number of cards to unlock this achievement!",
            data: [
                {
                    isLocked: userDataCard?.user?.unlockedCards?.length >= 1,
                    name: "Unlock 1 Card",
                    unLockedText: "You unlocked this achievement by unlocking your first card.",
                    shareType: "achievement_1",
                    img: achievement_1,
                },
                {
                    isLocked: userDataCard?.user?.unlockedCards?.length >= 5,
                    name: "Unlock 5 Cards",
                    unLockedText: "You unlocked this achievement by unlocking 5 cards.",
                    shareType: "achievement_2",
                    img: achievement_2,
                },
                {
                    isLocked: userDataCard?.user?.unlockedCards?.length >= 10,
                    name: "Unlock 10 Cards",
                    unLockedText: "You unlocked this achievement by unlocking 10 cards.",
                    shareType: "achievement_3",
                    img: achievement_3,
                },
                {
                    isLocked: userDataCard?.user?.unlockedCards?.length >= 25,
                    name: "Unlock 25 Cards",
                    unLockedText: "You unlocked this achievement by unlocking 25 cards.",
                    shareType: "achievement_4",
                    img: achievement_4,
                },
                {
                    isLocked: userDataCard?.user?.unlockedCards?.length >= 50,
                    name: "Unlock 50 Cards",
                    unLockedText: "You unlocked this achievement by unlocking 50 cards.",
                    shareType: "achievement_5",
                    img: achievement_5,
                },
                {
                    isLocked: userDataCard?.user?.unlockedCards?.length >= 100,
                    name: "Unlock 100 Cards",
                    unLockedText: "You unlocked this achievement by unlocking 100 cards.",
                    shareType: "achievement_6",
                    img: achievement_6,
                },
                {
                    isLocked: userDataCard?.user?.unlockedCards?.length >= 200,
                    name: "Unlock 200 Cards",
                    unLockedText: "You unlocked this achievement by unlocking 200 cards.",
                    shareType: "achievement_7",
                    img: achievement_7,
                },
            ],
        },
        {
            achievementType: "TOTAL COMPLETED TASKS",
            description: "Complete the required number of tasks to unlock this achievement!",
            data: [
                {
                    isLocked: userDataCard?.user?.completedTasks?.length >= 30,
                    name: "30 Tasks",
                    unLockedText: "You unlocked this achievement by completing 30 Tasks.",
                    shareType: "achievement_1",
                    img: achievement_1
                },
                {
                    isLocked: userDataCard?.user?.completedTasks?.length >= 100,
                    name: "100 Tasks",
                    unLockedText: "You unlocked this achievement by completing 100 Tasks.",
                    shareType: "achievement_2",
                    img: achievement_2
                },
                {
                    isLocked: userDataCard?.user?.completedTasks?.length >= 250,
                    name: "250 Tasks",
                    unLockedText: "You unlocked this achievement by completing 250 Tasks.",
                    shareType: "achievement_3",
                    img: achievement_3
                },
                {
                    isLocked: userDataCard?.user?.completedTasks?.length >= 500,
                    name: "500 Tasks",
                    unLockedText: "You unlocked this achievement by completing 500 Tasks.",
                    shareType: "achievement_4",
                    img: achievement_4
                },
                {
                    isLocked: userDataCard?.user?.completedTasks?.length >= 1500,
                    name: "1.5k Tasks",
                    unLockedText: "You unlocked this achievement by completing 1500 Tasks.",
                    shareType: "achievement_5",
                    img: achievement_5
                },
                {
                    isLocked: userDataCard?.user?.completedTasks?.length >= 3000,
                    name: "3k Tasks",
                    unLockedText: "You unlocked this achievement by completing 3000 Tasks.",
                    shareType: "achievement_6",
                    img: achievement_6
                },
                {
                    isLocked: userDataCard?.user?.completedTasks?.length >= 5000,
                    name: "5k Tasks",
                    unLockedText: "You unlocked this achievement by completing 5000 Tasks.",
                    shareType: "achievement_7",
                    img: achievement_7
                },
            ]
        },

        {
            achievementType: "SHARES EARNED",
            description: "Reach the required amount of shares to unlock this achievement!",
            data: [
                {
                    isLocked: userDataCard?.user?.shares >= 500000,
                    name: "500k Shares",
                    unLockedText: "You unlocked this achievement by reaching  500k Shares.",
                    shareType: "achievement_1",
                    img: achievement_1
                },
                {
                    isLocked: userDataCard?.user?.shares >= 1000000,
                    name: "1m Shares",
                    unLockedText: "You unlocked this achievement by reaching 1m Shares.",
                    shareType: "achievement_2",
                    img: achievement_2
                },
                {
                    isLocked: userDataCard?.user?.shares >= 5000000,
                    name: "5m Shares",
                    unLockedText: "You unlocked this achievement by reaching 5m Shares.",
                    shareType: "achievement_3",
                    img: achievement_3
                },
                {
                    isLocked: userDataCard?.user?.shares >= 10000000,
                    name: "10m Shares",
                    unLockedText: "You unlocked this achievement by reaching 10m Shares.",
                    shareType: "achievement_4",
                    img: achievement_4
                },
                {
                    isLocked: userDataCard?.user?.shares >= 50000000,
                    name: "50m Shares",
                    unLockedText: "You unlocked this achievement by reaching  50mShares.",
                    shareType: "achievement_5",
                    img: achievement_5
                },
                {
                    isLocked: userDataCard?.user?.shares >= 1000000000,
                    name: "100m Shares",
                    unLockedText: "You unlocked this achievement by reaching 100m Shares.",
                    shareType: "achievement_6",
                    img: achievement_6
                },
                {
                    isLocked: userDataCard?.user?.shares >= 2000000000,
                    name: `200m Shares`,
                    unLockedText: "You unlocked this achievement by reaching 200m Shares.",
                    shareType: "achievement_7",
                    img: achievement_7
                },
            ]
        },
        {
            achievementType: "TOTAL STORY SHARED",
            description: "Share the required stories to unlock this achievement!",
            data: [
                {
                    isLocked: userDataCard?.user?.sharedStories?.length >= 10,
                    name: "10 Stories",
                    unLockedText: "You unlocked this achievement by sharing 10 stories.",
                    shareType: "achievement_1",
                    img: achievement_1
                },
                {
                    isLocked: userDataCard?.user?.sharedStories?.length >= 50,
                    name: "50 Stories",
                    unLockedText: "You unlocked this achievement by sharing 50 stories.",
                    shareType: "achievement_2",
                    img: achievement_2
                },
                {
                    isLocked: userDataCard?.user?.sharedStories?.length >= 100,
                    name: "100 Stories",
                    unLockedText: "You unlocked this achievement by sharing 100 stories.",
                    shareType: "achievement_3",
                    img: achievement_3
                },
                {
                    isLocked: userDataCard?.user?.sharedStories?.length >= 120,
                    name: "120 Stories",
                    unLockedText: "You unlocked this achievement by sharing 120 stories.",
                    shareType: "achievement_4",
                    img: achievement_4
                },
                {
                    isLocked: userDataCard?.user?.sharedStories?.length >= 200,
                    name: "200 Stories",
                    unLockedText: "You unlocked this achievement by sharing 200 stories.",
                    shareType: "achievement_5",
                    img: achievement_5
                },
                {
                    isLocked: userDataCard?.user?.sharedStories?.length >= 500,
                    name: "500 Stories",
                    unLockedText: "You unlocked this achievement by sharing 500 stories.",
                    shareType: "achievement_6",
                    img: achievement_6
                },
                {
                    isLocked: userDataCard?.user?.sharedStories?.length >= 1000,
                    name: "1k Stories",
                    unLockedText: "You unlocked this achievement by sharing 1k stories.",
                    shareType: "achievement_7",
                    img: achievement_7
                },
            ]
        },
        {
            achievementType: "POWER CLASS",
            description: "Unlock the required Power Class to unlock this achievement!",
            data: [
                {
                    isLocked: findIsLocked("Wood Force"),
                    name: "Wood Force",
                    unLockedText: "You unlocked this achievement by unlocking Wood Force",
                    shareType: "achievement_1",
                    img: achievement_1
                },
                {
                    isLocked: findIsLocked("Earth Force"),
                    name: "Earth Force",
                    unLockedText: "You unlocked this achievement by unlocking Earth Force",
                    shareType: "achievement_2",
                    img: achievement_2
                },
                {
                    isLocked: findIsLocked("Metal Force"),
                    name: "Metal Force",
                    unLockedText: "You unlocked this achievement by unlocking Metal Force",
                    shareType: "achievement_3",
                    img: achievement_3
                },
                {
                    isLocked: findIsLocked("Wind Force"),
                    name: "Wind Force",
                    unLockedText: "You unlocked this achievement by unlocking Wind Force",
                    shareType: "achievement_4",
                    img: achievement_4
                },
                {
                    isLocked: findIsLocked("Water Force"),
                    name: "Water Force",
                    unLockedText: "You unlocked this achievement by unlocking Water Force",
                    shareType: "achievement_5",
                    img: achievement_5
                },
                {
                    isLocked: findIsLocked("Ice Force"),
                    name: "Ice Force",
                    unLockedText: "You unlocked this achievement by unlocking Ice Force",
                    shareType: "achievement_6",
                    img: achievement_6
                },
                {
                    isLocked: findIsLocked("Fire Force"),
                    name: "Fire Force",
                    unLockedText: "You unlocked this achievement by unlocking Fire Force",
                    shareType: "achievement_7",
                    img: achievement_7
                },
            ]
        },
        {
            achievementType: "PLAY GAME",
            description: "This feature is coming soon stay tuned!",
            data: [
                {
                    isLocked: false,
                    name: "Play 10x",
                    unLockedText: "You unlocked this achievement by Playing 10x",
                    shareType: "achievement_1",
                    img: achievement_1
                },
                {
                    isLocked: false,
                    name: "Play 25x",
                    unLockedText: "You unlocked this achievement by Playing 25x",
                    shareType: "achievement_2",
                    img: achievement_2
                },
                {
                    isLocked: false,
                    name: "Play 50x",
                    unLockedText: "You unlocked this achievement by Playing 50x",
                    shareType: "achievement_3",
                    img: achievement_3
                },
                {
                    isLocked: false,
                    name: "Play 100x",
                    unLockedText: "You unlocked this achievement by Playing 100x",
                    shareType: "achievement_4",
                    img: achievement_4
                },
                {
                    isLocked: false,
                    name: "Play 250x",
                    unLockedText: "You unlocked this achievement by Playing 250x",
                    shareType: "achievement_5",
                    img: achievement_5
                },
                {
                    isLocked: false,
                    name: "Play 500x",
                    unLockedText: "You unlocked this achievement by Playing 500x",
                    shareType: "achievement_6",
                    img: achievement_6
                },
                {
                    isLocked: false,
                    name: "Play 1000x",
                    unLockedText: "You unlocked this achievement by Playing 1000x",
                    shareType: "achievement_7",
                    img: achievement_7
                },
            ]
        }
    ]

    if (!users) {
        return <div>Loading Profile...</div>; 
      }
      
    return (
        <div className="flex flex-col min-h-full">
            <div
                className={`dots-bg flex flex-col flex-1 py-3`}
            >
                <div className="px-4 flex flex-col gap-3 pb-[5rem]">
                    {/* card */}
                    <div>
                        <CardWrapper className="min-h-32 flex flex-col w-full justify-end p-0">
                            <CardContent className="flex  justify-between px-2 py-0">
                                <div className="flex items-center justify-between w-full gap-2">
                                    <div className="h-28 w-28 relative">
                                        <img
                                            src={users?.photo_url ?? ""}
                                            loading="lazy"
                                            alt="profile image"
                                            className="w-full h-full object-contain object-center rounded-full"
                                        />
                                        <div
                                            className={
                                                "absolute z-20 bg-transparent h-full w-full top-0 bottom-0"
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-col pb-4">
                                        <h1 className="text-white text-base font-bold aqum">
                                            <span className="line-clamp-1">
                                                Hi {users?.username}
                                            </span>
                                        </h1>
                                        <h1 className="work-sans text-[13px] font-medium pb-1 text-[#FEFEFF] line-clamp-1">
                                            {`@${users?.accountName}`}
                                        </h1>
                                        <div className="bg-[#D36519] rounded-md text-white w-full p-2 text-center">
                                            <h1 className="text-xs text-white aqum font-semibold">
                                                <ShareFormatter shares={users?.shares} /> shares
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </CardWrapper>
                        <div className="my-3">
                            <ConnectTonWallet />
                        </div>
                    </div>

                    {/*power class grid  */}
                    <PowerClass />


                    <div className="flex flex-col gap-1.5">
                        <CollectedCards />
                        {/* Achievments */}
                        <div>
                            <h1 className="text-[#FEFEFF] text-lg font-semibold work-sans mb-6">Achievements</h1>
                            <div className="space-y-1">
                                {achievement.map((group, index) => (
                                    <div key={index}>
                                        <h2 className="text-[#FEFEFF] text-xs work-sans mb-0.5">{group.achievementType}</h2>
                                        <ScrollArea className="flex items-center whitespace-nowrap max-w-full ">
                                            <div className="flex w-max space-x-2 gap-1 pb-1">
                                                {group.data.map((a, i) => (
                                                    <motion.div key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={"py-4"}>
                                                        <Drawer>
                                                            <DrawerTrigger asChild className={`w-full border ${a.isLocked ? "border-orange-600" : "border-gray-500"} p-1.5 rounded-md shadow-lg min-w-[6.5rem]  hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#4a4b56]`}>
                                                                <div className="flex flex-col items-center gap-3 work-sans relative">
                                                                    <img
                                                                        src={a.img}
                                                                        loading="lazy"
                                                                        alt={`${a.name} achievement`}
                                                                        className={`h-14 w-14 ${a.isLocked ? "grayscale-0" : "grayscale"} object-contain object-center rounded-md`}
                                                                    />
                                                                    {a.isLocked ? (
                                                                        null
                                                                    ) : <div className="absolute inset-0 bg-black/50 rounded-md flex flex-col items-center justify-around">
                                                                        <SlLock size={28} className="text-white/80" />
                                                                        <div />
                                                                    </div>}
                                                                    <div className="absolute top-0 bottom-0 h-full w-full bg-transparent z-10" />
                                                                    <h3 className="text-white text-[10px] whitespace-nowrap font-medium text-center work-sans">{a.name}</h3>
                                                                </div>
                                                            </DrawerTrigger>
                                                            <DrawerContent aria-describedby={undefined}
                                                                aria-description="dialog" className="max-w-xl mx-auto bg-gradient-to-b from-[#292734] to-[#000000] border-none rounded-t-xl px-6 py-8">
                                                                <DrawerClose className="absolute top-4 right-4 text-[#A4A4A7] hover:text-white transition-colors">
                                                                    <IoIosClose size={29} />
                                                                </DrawerClose>
                                                                <DrawerTitle className="sr-only" />
                                                                <div className="flex flex-col items-center gap-6 max-w-sm mx-auto relative">
                                                                    <motion.img
                                                                        src={a.img}
                                                                        alt={`${a.name} achievement`}
                                                                        className={`${a.isLocked ? "grayscale-0" : "grayscale"} h-28 w-h-28 object-contain rounded-lg`}
                                                                        initial={{ opacity: 0, y: 20 }}
                                                                        loading="lazy"
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        transition={{ duration: 0.5 }}
                                                                    />
                                                                    <div className="absolute top-0 bottom-0 h-full w-full bg-transparent z-10" />
                                                                    <motion.h2
                                                                        className="text-white text-base work-sans font-medium text-center"
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ delay: 0.2, duration: 0.5 }}
                                                                    >
                                                                        {a.isLocked ? a.unLockedText : a.name}
                                                                    </motion.h2>
                                                                    {!a.isLocked ? (
                                                                        <motion.p
                                                                            className="text-[#A4A4A7] text-center"
                                                                            initial={{ opacity: 0 }}
                                                                            animate={{ opacity: 1 }}
                                                                            transition={{ delay: 0.4, duration: 0.5 }}
                                                                        >
                                                                            {group.description}
                                                                        </motion.p>
                                                                    ) : null}
                                                                </div>
                                                            </DrawerContent>
                                                        </Drawer>
                                                    </motion.div>
                                                ))}
                                            </div>
                                            <ScrollBar orientation="horizontal" />
                                        </ScrollArea>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Profile;


