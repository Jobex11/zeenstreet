import wavybg from "@assets/images/card_bg.svg";
import achievement_1 from "@assets/images/cards/achievement_1.png";
import achievement_2 from "@assets/images/cards/achievement_2.png";
import achievement_3 from "@assets/images/cards/achievement_3.png";
import achievement_4 from "@assets/images/cards/achievement_4.png";
import achievement_5 from "@assets/images/cards/achievement_5.png";
import achievement_6 from "@assets/images/cards/achievement_6.png";
import achievement_7 from "@assets/images/cards/achievement_7.png";
import cosmic_force from "@assets/images/cards/cosmic.png";
import earth_force from "@assets/images/cards/earth.png";
import fire_force from "@assets/images/cards/fire.png";
import metal_force from "@assets/images/cards/metal.png";
import ice_force from "@assets/images/cards/ice.png";
import light_force from "@assets/images/cards/Light.png";
import water_force from "@assets/images/cards/water.png";
import wave_force from "@assets/images/cards/wave.png";
import wood_force from "@assets/images/cards/wood.png";
import dotsbg from "@assets/images/dotted-bg.png";
import CardWrapper from "@/components/common/cards/card-wrapper";
import { ShareFormatter } from "@components/common/shareFormatter";
import ConnectTonWallet from "@components/common/ton-connect-btn";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import card_empty from "@assets/images/icons/empty_card.svg"
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from "@components/ui/drawer";
import {
    useGetUserSharesQuery,
    useUpdateUserSharesMutation,
} from "@hooks/redux/shares";
import { useGetUsersByIdQuery } from "@hooks/redux/users";
import { Key, useState, useMemo } from "react";
import { IoIosClose } from "react-icons/io";
import { SlLock } from "react-icons/sl";
import { toast } from "sonner";
import { Fragment } from "react";
import { Skeleton } from "@components/ui/skeleton"
import { useGetAllWealthClasssQuery } from "@/hooks/redux/wealthclass";
import { triggerErrorVibration } from "@/lib/utils";
import { useGetAllRanksQuery } from "@/hooks/redux/ranks";
import { useGetTelegramId } from "@hooks/getTelegramId"
import { RootState } from "@/lib/store";
import { motion } from "framer-motion"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useSelector } from "react-redux";


const wealthClass = [
    {
        shareType: "wood_force",
        name: "Wood Force",
        rewards: 500,
        img: wood_force,
        description:
            "For those who rise from the deep, a humble start that they keep.",
    },
    {
        shareType: "earth_force",
        name: "Earth Force",
        rewards: 700,
        img: earth_force,
        description:
            "Dreams take flight and reach the sky, as these souls soar high.",
    },
    {
        shareType: "metal_force",
        name: "Metal Force",
        rewards: 800,
        img: metal_force,
        description:
            "Built on strength, steadfast and sure, power that will always endure.",
    },
    {
        shareType: "wind_force",
        name: "Wind Force",
        rewards: 1000,
        img: wave_force,
        description:
            "With goals in sight, they climb and strive, their success comes alive.",
    },
    {
        shareType: "water_force",
        name: "Water Force",
        rewards: 1900,
        img: water_force,
        description: "Mighty and strong, they rise above, their power known far and wide, like a burning love.",
    },
    {
        shareType: "ice_force",
        name: "Ice Force",
        rewards: 1500,
        img: ice_force,
        description: "A select few who stand apart, their wisdom flowing like art.",
    },
    {
        shareType: "fire_force",
        name: "Fire Force",
        rewards: 1700,
        img: fire_force,
        description: "Built to last, a timeless blend, force that will never end.",
    },

    {
        shareType: "light_force",
        name: "Light Force",
        rewards: 1900,
        img: light_force,
        description:
            "With force and flair, they change the game, their impact is never the same.",
    },
    {
        shareType: "cosmic_force",
        name: "Cosmic Force",
        rewards: 2000,
        img: cosmic_force,
        description:
            "Their power is vast, beyond the skies, a legacy that never dies.",
    },
];


function Profile() {

    const [claimedRewards, setClaimedRewards] = useState<Record<string, boolean>>({});
    const { telegramId } = useGetTelegramId();
    const [drawerState, setDrawerState] = useState<{ [key: string]: boolean }>(
        {}
    );
    const users = useSelector((state: RootState) => state.userData);
    const { data: wealthClasses, isLoading: loadingClasses } = useGetAllWealthClasssQuery(undefined, {
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });
    const [updateUserShares, { isLoading: updatingShares }] =
        useUpdateUserSharesMutation();
    const { refetch: refetchShares } = useGetUserSharesQuery(
        telegramId ?? "",
        {
            skip: !telegramId,
            refetchOnReconnect: true,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true,
        }
    );

    const { data: userDataCard, isLoading: loadingCollectedCards } = useGetUsersByIdQuery(telegramId, {
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

    const handleUpdateShares = async (
        shares: number,
        shareType: string,
        itemName: string
    ) => {
        try {
            const response = await updateUserShares({
                telegram_id: telegramId,
                shares,
                shareType,
            }).unwrap();
            // console.log({ telegramId:6880808269, shares, shareType });
            toast.success(response?.message, { className: "text-xs work-sans" });
            setDrawerState((prevState) => ({
                ...prevState,
                [itemName]: false,
            }));
            setClaimedRewards((prev) => ({ ...prev, [shareType]: true }));
            refetchShares();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error updating shares:", error);
            toast.error(error?.data?.error || error?.data?.message || "Error updating shares", {
                className: "text-xs work-sans",
            });
            triggerErrorVibration()
        }
    };

    const checkIfClaimed = (shareType: string) => claimedRewards[shareType] || false;


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
            description: "Get the required number of Tier1 referrals to unlock this achievement!",
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
            description: "Complete the required number of  tasks to unlock this achievement!",
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



    return (
        <div className="flex flex-col min-h-full">
            <div
                style={{
                    backgroundImage: `url(${dotsbg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
                className={`flex flex-col flex-1 py-3`}
            >
                <div className="px-4 flex flex-col gap-3 pb-[5rem]">
                    {/* card */}
                    <div>
                        <CardWrapper className="min-h-32 flex flex-col w-full justify-end p-0">
                            <CardContent className="flex  justify-between px-2 py-0">
                                <div className="flex items-center justify-between w-full gap-2">
                                    <div className="h-28 w-28 relative">
                                        <img
                                            src={users.photo_url ?? ""}
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
                                                Hi {users.username}
                                            </span>
                                        </h1>
                                        <h1 className="work-sans text-[13px] font-medium pb-1 text-[#FEFEFF] line-clamp-1">
                                            {`@${users.accountName}`}
                                        </h1>
                                        <div className="bg-[#D36519] rounded-md text-white w-full p-2 text-center">
                                            <h1 className="text-xs text-white aqum font-semibold">
                                                <ShareFormatter shares={users.shares} /> shares
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

                    {/*wealth class grid  */}
                    <div className="min-w-full">
                        <h1 className="work-sans text-[15px] font-semibold text-[#FEFEFF] pb-2">
                            Power Classes
                        </h1>
                        <ScrollArea className="flex items-center whitespace-nowrap max-w-full ">
                            <div className="flex w-max space-x-2 gap-1 pb-4">
                                {wealthClassStatus?.map((item) => {
                                    return (
                                        <Drawer
                                            key={item.name}
                                            open={drawerState[item.name] || false}
                                            onOpenChange={() =>
                                                setDrawerState((prevState) => ({
                                                    ...prevState,
                                                    [item.name]: !prevState[item.name],
                                                }))
                                            }
                                        >
                                            <DrawerTrigger asChild>
                                                <div>
                                                    <Card
                                                        style={{
                                                            backgroundImage: `url(${wavybg})`,
                                                            backgroundRepeat: "no-repeat",
                                                            backgroundSize: "cover",
                                                        }}
                                                        className="h-12 min-w-[70px] w-full relative rounded-md border border-gray-300 flex flex-col items-center justify-center text-white text-center uppercase aqum font-bold overflow-hidden"
                                                    >
                                                        <img
                                                            src={item.img}
                                                            loading="lazy"
                                                            alt={`wealth class $ {item.name}`}
                                                            className="h-full w-full object-cover object-center rounded-md"
                                                        />
                                                        {loadingClasses ?
                                                            <div className="absolute inset-0 rounded-md bg-black/55 z-20 flex flex-col items-center justify-center">
                                                                <SlLock size={25} color="white" />
                                                            </div>
                                                            :
                                                            !item.isLocked && (
                                                                <div className="absolute inset-0 rounded-md bg-black/55 z-20 flex flex-col items-center justify-center">
                                                                    <SlLock size={25} color="white" />
                                                                </div>
                                                            )}
                                                    </Card>
                                                    <h1 className="work-sans text-[#FEFEFF] text-[10px] font-normal capitalize text-center pt-1 whitespace-nowrap">
                                                        {item.name}
                                                    </h1>
                                                </div>
                                            </DrawerTrigger>
                                            <DrawerContent
                                                aria-describedby={undefined}
                                                aria-description="dialog"
                                                className="flex flex-col work-sans bg-gradient-to-b from-[#292734] to-[#000000] border-none px-4 pb-5 gap-6 rounded-lg shadow-xl"
                                            >
                                                <DrawerTitle className="sr-only" />
                                                <div className="relative flex flex-col items-center justify-center w-full gap-4">
                                                    <DrawerClose className="absolute -top-5 right-2 z-40 p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition">
                                                        <IoIosClose size={24} />
                                                    </DrawerClose>
                                                    <div className="relative h-28 w-28">
                                                        <motion.img
                                                            src={item.img}
                                                            loading="lazy"
                                                            fetchPriority="high"
                                                            alt="Wealth class image"
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.5 }}
                                                            className={`h-full w-full object-cover object-center rounded-full border-4 ${item.isLocked ? "border-orange-500" : "border-gray-600"}  shadow-md`}
                                                        />
                                                        <div
                                                            className={
                                                                "absolute z-20 bg-transparent h-full w-full top-0 bottom-0"
                                                            }
                                                        />
                                                    </div>
                                                    <h1 className="text-white font-semibold text-lg capitalize">
                                                        {item.name}
                                                    </h1>
                                                    <p className="text-gray-300 text-sm text-center max-w-md leading-6">
                                                        {item.description}
                                                    </p>
                                                    <div className="h-[2px] w-20 bg-gradient-to-r from-gray-500 to-gray-800 animate-pulse" />
                                                    <p className="text-gray-400 text-xs text-center max-w-md">
                                                        {item.unlockMessage}
                                                    </p>
                                                    <Button
                                                        onClick={() => {
                                                            handleUpdateShares(item.rewards, item.shareType, item.name);
                                                            setDrawerState((prevState) => ({
                                                                ...prevState,
                                                                [item.name]: false,
                                                            }));
                                                        }}
                                                        disabled={
                                                            updatingShares ||
                                                            checkIfClaimed(item.shareType) ||
                                                            !item.isLocked
                                                        }
                                                        className={`bg-orange-600 hover:orange-700 rounded-lg py-4 px-6 text-white w-full text-xs h-11 font-medium shadow-lg transform transition-transform hover:scale-105 ${(updatingShares ||
                                                            checkIfClaimed(item.shareType) ||
                                                            !item.isLocked) &&
                                                            "opacity-50 cursor-not-allowed"
                                                            } `}
                                                    >
                                                        {updatingShares
                                                            ? "Processing..."
                                                            : checkIfClaimed(item.shareType)
                                                                ? "Shares already Claimed"
                                                                : !item.isLocked
                                                                    ? `+ ${item.rewards} Meet the Requirements First`
                                                                    : `Claim ${item.rewards} Shares`}
                                                    </Button>
                                                </div>
                                            </DrawerContent>
                                        </Drawer>
                                    )
                                })}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>


                    <div className="flex flex-col gap-1.5">
                        <div>
                            <div className={"flex items-center justify-between"}>
                                <h1 className="text-[#FEFEFF] work-sans text-[15px] font-semibold flex items-center gap-2">
                                    Cards Collected
                                    <span>
                                        {userDataCard?.user?.unlockedCards?.length === 0 ? "" : `(${userDataCard?.user?.unlockedCards?.length || 0})`}
                                    </span>
                                </h1>
                                {/* <button type={"button"} className={`${userDataCard?.user?.unlockedCards?.length >= 3 ? "visible" : "invisible"} text - white work - sans text - sm underline hover: text - gray - 400`}>View all</button> */}
                            </div>
                            <div className="min-w-full h-full flex-shrink-0 flex items-center pb-4 gap-4 overflow-x-auto">
                                <Fragment>
                                    {loadingCollectedCards && <div className={"flex items-center gap-4"}>
                                        {[0, 1, 2, 3, 4, 5].map((ske) => (
                                            <Skeleton key={ske} className={"h-48 min-w-[130px] bg-gray-600 shadow-xl"} />
                                        ))}
                                    </div>}
                                    {userDataCard?.user?.unlockedCards?.length === 0 ? (
                                        <div
                                            className={
                                                "flex items-center justify-center relative flex-col gap-2  min-w-full"
                                            }
                                        >
                                            <img src={card_empty} loading="lazy" alt="No card image" className="h-20 w-20 object-contain object-center" />

                                            <p className={"text-sm text-white work-sans text-center"}>
                                                You don't have any card yet
                                            </p>
                                            <div
                                                className={
                                                    "absolute z-20 bg-transparent h-full w-full top-0 bottom-0"
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <ScrollArea className="flex items-center whitespace-nowrap max-w-full ">
                                            <div className="flex w-max space-x-3 gap-3 pb-5">
                                                {
                                                    userDataCard?.user?.unlockedCards &&
                                                    [...userDataCard.user.unlockedCards]?.reverse()?.map(
                                                        (card: {
                                                            _id: Key | string | undefined;
                                                            image: string | undefined;
                                                            title: string | undefined;
                                                        }) => (

                                                            <Drawer key={card._id}>
                                                                <DrawerTrigger asChild className="rounded-md border-none">
                                                                    <Card
                                                                        style={{
                                                                            backgroundImage: `url(${wavybg})`,
                                                                            backgroundRepeat: "no-repeat",
                                                                            backgroundSize: "cover",
                                                                        }}
                                                                        className="h-48 min-w-[130px] relative border-none rounded-md flex flex-col items-center justify-center text-white text-center uppercase aqum font-bold"
                                                                    >
                                                                        <img
                                                                            src={card.image}
                                                                            loading="lazy"
                                                                            fetchPriority="high"
                                                                            height={160}
                                                                            width={100}
                                                                            alt="Card image"
                                                                            className="h-full min-w-full object-cover object-center rounded-md"
                                                                        />
                                                                        <div
                                                                            className={
                                                                                "absolute z-20 bg-transparent h-full w-full top-0 rounded-md bottom-0"
                                                                            }
                                                                        />
                                                                    </Card>
                                                                </DrawerTrigger>
                                                                <DrawerContent
                                                                    aria-describedby={undefined}
                                                                    aria-description="dialog"
                                                                    className="flex flex-col max-h-fit bg-gradient-to-b from-[#292734] to-[#000000] border-none px-3 rounded-lg gap-3"
                                                                >
                                                                    <DrawerTitle className="sr-only" />
                                                                    <div className="h-full flex flex-col items-center justify-around w-full pb-10 pt-3 gap-5">
                                                                        <DrawerClose className=" shadow-none bg-transparent absolute top-2 right-2 z-40 rounded-full text-4xl">
                                                                            <IoIosClose size={30} color="#A4A4A7" />
                                                                        </DrawerClose>
                                                                        <h1 className="text-white jarkata font-semibold text-lg capitalize">
                                                                            {card.title ? card.title : "Card title"}
                                                                        </h1>
                                                                        <div className={"relative"}>
                                                                            <motion.img
                                                                                src={card.image}
                                                                                loading="lazy"
                                                                                alt="Refferal Images"
                                                                                className="h-96 min-w-full object-contain object-center rounded-sm"
                                                                                initial={{ opacity: 0, y: 20 }}
                                                                                animate={{ opacity: 1, y: 0 }}
                                                                                transition={{ duration: 0.5 }}
                                                                            />
                                                                            <div
                                                                                className={
                                                                                    "absolute z-20 bg-transparent h-full w-full top-0 bottom-0"
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </DrawerContent>
                                                            </Drawer>
                                                        )
                                                    )}
                                            </div>
                                            <ScrollBar orientation="horizontal" />
                                        </ScrollArea>
                                    )}

                                </Fragment>
                            </div>
                        </div>

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
                                                                aria-description="dialog" className="bg-gradient-to-b from-[#292734] to-[#000000] border-none rounded-t-xl px-6 py-8">
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


