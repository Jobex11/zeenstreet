import wavybg from "@assets/images/card_bg.svg";
import milestone_1 from "@assets/images/milestone_1.png";
import milestone_2 from "@assets/images/milestone_2.png";
import milestone_3 from "@assets/images/milestone_3.png";
import milestone_4 from "@assets/images/milestone_4.png";
import milestone_5 from "@assets/images/milestone_5.png";
import milestone_6 from "@assets/images/milestone_6.png";
import milestone_7 from "@assets/images/milestone_7.png";
import cosmic_force from "@assets/images/cards/cosmic.png";
import earth_force from "@assets/images/cards/earth.png";
import {
    default as fire_force,
    default as metal_force,
} from "@assets/images/cards/fire.png";
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
import { DialogClose, DialogTitle } from "@components/ui/dialog";
import card_empty from "@assets/images/icons/empty_card.svg"
import { Drawer, DrawerContent, DrawerTrigger } from "@components/ui/drawer";
import {
    useGetUserSharesQuery,
    useUpdateUserSharesMutation,
} from "@hooks/redux/shares";
import { useGetUsernameQuery, useGetUsersByIdQuery } from "@hooks/redux/users";
import { Key, useEffect, useMemo, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { SlLock } from "react-icons/sl";
import { toast } from "sonner";
import { Fragment } from "react";
import { Skeleton } from "@components/ui/skeleton"
import { useGetAllWealthClasssQuery } from "@/hooks/redux/wealthclass";
import { getUserRank } from "@/lib/utils";
import avatarImg from "@assets/images/icons/users_avatar.svg"
import { useGetAllRanksQuery } from "@/hooks/redux/ranks";


const wealthClass = [
    {
        shareType: "bottom_feeders",
        name: "Bottom Feeders",
        rewards: 50,
        img: wood_force,
        description:
            "For those who rise from the deep, a humble start that they keep.",
    },
    {
        shareType: "the_aspirers",
        name: "The Aspirers",
        rewards: 70,
        img: earth_force,
        description:
            "Dreams take flight and reach the sky, as these souls soar high.",
    },
    {
        shareType: "stable_money",
        name: "Stable Money",
        rewards: 85,
        img: metal_force,
        description:
            "Built on strength, steadfast and sure, wealth that will always endure.",
    },
    {
        shareType: "high_achievers",
        name: "High Achievers",
        rewards: 100,
        img: wave_force,
        description:
            "With goals in sight, they climb and strive, their success comes alive.",
    },
    {
        shareType: "elite_circle",
        name: "Elite Circle",
        rewards: 110,
        img: water_force,
        description: "A select few who stand apart, their wisdom flowing like art.",
    },
    {
        shareType: "legacy_wealth",
        name: "Legacy Wealth",
        rewards: 120,
        img: ice_force,
        description: "Built to last, a timeless blend, wealth that will never end.",
    },
    {
        shareType: "titans",
        name: "Titans",
        rewards: 200,
        img: fire_force,
        description:
            "Mighty and strong, they rise above, their power known far and wide, like a burning love.",
    },
    {
        shareType: "planet_shakers",
        name: "Planet Shakers",
        rewards: 130,
        img: light_force,
        description:
            "With force and flair, they change the game, their impact is never the same.",
    },
    {
        shareType: "sovereign_wealth",
        name: "Sovereign Wealth",
        rewards: 140,
        img: cosmic_force,
        description:
            "Their wealth is vast, beyond the skies, a legacy that never dies.",
    },
];


function Profile() {

    const [telegramId, setTelegramId] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<string>(avatarImg);
    const [telegramUsername, setTelegramUsername] = useState<string>("");
    const [claimedRewards, setClaimedRewards] = useState<Record<string, boolean>>({});
    const [drawerState, setDrawerState] = useState<{ [key: string]: boolean }>(
        {}
    );
    const { data: wealthClasses } = useGetAllWealthClasssQuery(undefined);
    const [updateUserShares, { isLoading: updatingShares }] =
        useUpdateUserSharesMutation();
    const { data: userData, refetch: refetchShares } = useGetUserSharesQuery(
        telegramId ?? "",
        {
            skip: !telegramId,
            refetchOnReconnect: true,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true,
        }
    );
    const { data: data, isLoading } = useGetUsernameQuery(telegramId, {
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });
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

    // Initialize Telegram WebApp and set user data
    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            const initData = window.Telegram.WebApp.initDataUnsafe;
            const user = initData?.user;

            // Set Telegram user data
            if (user) {
                setTelegramId(user.id ?? null);
                setTelegramUsername(user.username ?? "User");
                setProfileImage(user.photo_url || avatarImg);
            }
        }
    }, []);

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
            console.log("Shares updated successfully:", response);
            toast.success(response?.message, { className: "text-xs work-sans" });
            navigator.vibrate([50, 50]);
            setDrawerState((prevState) => ({
                ...prevState,
                [itemName]: false,
            }));
            setClaimedRewards((prev) => ({ ...prev, [shareType]: true }));
            refetchShares();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Error updating shares:", err);
            toast.error(err?.data?.error || "Error updating shares", {
                className: "text-xs work-sans",
            });
            navigator.vibrate([50, 50]);
        }
    };

    const checkIfClaimed = (shareType: string) => claimedRewards[shareType] || false;

    const userRank = useMemo(
        () =>
            getUserRank(
                userDataCard?.user?.shares,
                ranks?.data?.map(
                    (rank: { rank: string; rankRange: { min: number; max: number; }; }) => ({
                        rank: rank.rank,
                        min: rank.rankRange.min,
                        max: rank.rankRange.max,
                    })
                ) || []
            ),
        [ranks?.data, userDataCard?.user?.shares]
    );

    const determineWealthClassStatus = (
        userRank: string,
        userUnlockedCards: { _id: string; title: string; image: string; wealthClass: string }[]
    ) => {
        return wealthClass?.map((WealthClass) => {
            // Find the matching wealth class for additional properties
            const matchingWealthClass = wealthClasses?.data?.find(
                (cls: { name: string; }) => cls.name === WealthClass.name
            );

            if (!matchingWealthClass) {
                // If no matching wealth class is found, return a default structure
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

            // Find the rank range that the user's rank fits into
            const matchingRank = ranks?.data?.find(
                (rank: { rankRange: { min: number; max: number; }; rank: string; }) =>
                    matchingWealthClass.minRank >= rank.rankRange.min &&
                    matchingWealthClass.maxRank <= rank.rankRange.max &&
                    userRank === rank.rank
            );

            // Check if the user's rank falls within the wealth class rank range
            const hasRequiredRank = !!matchingRank;

            // Count the number of cards unlocked for this wealth class
            const unlockedCardsForClass = userUnlockedCards?.filter(
                (card) => card.wealthClass === WealthClass.name
            ).length;

            const hasRequiredCards = unlockedCardsForClass >= matchingWealthClass.requiredCards;

            const isUnlocked = hasRequiredRank && hasRequiredCards;

            // Determine the required rank if the current rank does not match
            const requiredRank = ranks?.data?.find(
                (rank: { rankRange: { min: number; max: number; }; }) =>
                    matchingWealthClass.minRank >= rank.rankRange.min &&
                    matchingWealthClass.maxRank <= rank.rankRange.max
            )?.rank;

            // Construct the unlock message
            const unlockMessage = isUnlocked
                ? `You have unlocked the ${matchingWealthClass.name} class!`
                : `You need ${matchingWealthClass.requiredCards - unlockedCardsForClass
                } more cards and rank ${hasRequiredRank ? matchingRank.rank : requiredRank || "a valid rank"
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
    const wealthClassStatus = determineWealthClassStatus(userRank, userDataCard?.user?.unlockedCards);

    const achievement = [
        {
            isLocked: userDataCard?.user?.referrals?.length !== 10,
            name: "Refer 10 Friends",
            unLockedText: "You unlocked this Achievments by Referring 10 Friends",
            shareType: "milestone_1",
            reward: 30,
            img: milestone_1
        },
        {
            isLocked: true,
            name: "Refer 20 Friends",
            unLockedText: "You unlocked this Achievments by Referring 20 Friends",
            shareType: "milestone_2",
            reward: 50,
            img: milestone_2
        },
        {
            isLocked: true,
            name: "Refer 30 Friends",
            unLockedText: "You unlocked this Achievments by Referring 30 Friends",
            shareType: "milestone_3",
            reward: 80,
            img: milestone_3
        },
        {
            isLocked: true,
            name: "Refer 40 Friends",
            unLockedText: "You unlocked this Achievments by Referring 40 Friends",
            shareType: "milestone_4",
            reward: 100
            , img: milestone_4
        },
        {
            isLocked: true,
            name: "Refer 50 Friends",
            unLockedText: "You unlocked this Achievments by Referring 50 Friends",
            shareType: "milestone_5",
            reward: 200
            , img: milestone_5
        },
        {
            isLocked: true,
            name: "Refer 60 Friends",
            unLockedText: "You unlocked this Achievments by Referring 60 Friends",
            shareType: "milestone_6",
            reward: 300
            , img: milestone_6
        },
        {
            isLocked: true,
            name: "Refer 70 Friends",
            unLockedText: "You unlocked this Achievments by Referring 70 Friends",
            shareType: "milestone_7",
            reward: 400
            , img: milestone_7
        },
    ];
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
                <div className="px-4 flex flex-col gap-8 pb-[8rem]">
                    {/* card */}
                    <div>
                        <CardWrapper className="min-h-32 flex flex-col w-full justify-end p-0">
                            <CardContent className="flex  justify-between px-2 py-0">
                                <div className="flex items-center justify-between w-full gap-2">
                                    <div className="h-28 w-28">
                                        <img
                                            src={profileImage}
                                            loading="lazy"
                                            alt="profile image"
                                            className="w-full h-full object-contain object-center rounded-full"
                                        />
                                    </div>
                                    <div className="flex flex-col pb-4">
                                        <h1 className="text-white text-base font-bold aqum">
                                            {isLoading ? (
                                              telegramUsername
                                            ) : (
                                                <span className="line-clamp-1">
                                                    Hi {data?.preferred_username.slice(0, 10)}
                                                </span>
                                            )}
                                        </h1>
                                        <h1 className="work-sans text-[13px] font-medium pb-1 text-[#FEFEFF] line-clamp-1">
                                            {telegramUsername && `@${telegramUsername}`}
                                        </h1>
                                        <div className="bg-[#D36519] rounded-md text-white w-full p-2 text-center">
                                        <h1 className="text-xs text-white aqum font-semibold">
                                            <ShareFormatter shares={userData?.shares} /> shares
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
                            Wealth classes
                        </h1>
                        <div className="min-w-full flex items-center pb-4 gap-4 overflow-x-auto">
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
                                                        alt={`wealth class ${item.name}`}
                                                        className="h-full w-full object-cover object-center rounded-md"
                                                    />
                                                    {!item.isLocked && (
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
                                            className="flex flex-col  min-h-fit bg-gradient-to-b from-[#292734] to-[#000000] border-none px-3 gap-3"
                                        >
                                            <DialogTitle className="sr-only" />
                                            <div className="h-full relative flex flex-col items-center justify-around w-full pb-10  gap-3">
                                                <DialogClose className=" shadow-none bg-transparent absolute top-2 right-2 z-40 rounded-full text-4xl">
                                                    <IoIosClose size={30} color="#A4A4A7" />
                                                </DialogClose>
                                                <img
                                                    src={item.img}
                                                    loading="lazy"
                                                    alt="Wealth class images"
                                                    className="h-24 w-24 object-contain object-center"
                                                />
                                                <h1 className="text-white work-sans font-semibold text-base capitalize">
                                                    {item.name}
                                                </h1>
                                                <p className="text-white work-sans text-sm text-center max-w-sm">
                                                    {item.description}
                                                </p>
                                                <div className={"h-[2px] w-16 bg-gray-400"} />
                                                <p className="text-white work-sans text-sm text-center max-w-sm">
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
                                                    className={`bg-[#D36519] hover:bg-orange-500 rounded-lg text-center py-4 h-[50px] w-full text-white work-sans ${(updatingShares || checkIfClaimed(item.shareType) || item.isLocked) &&
                                                        "opacity-50 cursor-not-allowed"
                                                        }`}
                                                >
                                                    {updatingShares
                                                        ? "Processing..."
                                                        : checkIfClaimed(item.shareType)
                                                            ? "Shares already Claimed"
                                                            : !item.isLocked
                                                                ? `+ ${item.rewards} Meet the Requirements first`
                                                                : `Claim Shares ${item.rewards}`}
                                                </Button>
                                            </div>
                                        </DrawerContent>
                                    </Drawer>
                                )
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col gap-7">
                        <div>
                            <h1 className="text-[#FEFEFF] work-sans text-[15px] font-semibold">Cards collected</h1>
                            <div className="min-w-full h-full flex-shrink-0 flex items-center pb-4 gap-4 overflow-x-auto">
                                <Fragment>
                                    {loadingCollectedCards && <div className={"flex items-center gap-4"}>
                                        {[0, 1, 2, 3, 4, 5].map((ske) => (
                                            <Skeleton key={ske} className={"h-24 min-w-40 bg-gray-600 shadow-xl"} />
                                        ))}
                                    </div>}
                                    {userDataCard?.user?.unlockedCards?.length === 0 ? (
                                        <div
                                            className={
                                                "flex items-center justify-center flex-col gap-2  min-w-full"
                                            }
                                        >
                                            <img src={card_empty} loading="lazy" alt="No card image" className="h-20 w-20 object-contain object-center" />

                                            <p className={"text-sm text-white work-sans text-center"}>
                                                You don't have any card yet
                                            </p>
                                        </div>
                                    ) : (
                                        userDataCard?.user?.unlockedCards.map(
                                            (card: {
                                                _id: Key | string | undefined;
                                                image: string | undefined;
                                                title: string | undefined;
                                            }) => (
                                                <Drawer key={card._id}>
                                                    <DrawerTrigger asChild>
                                                        <div>
                                                            <Card
                                                                style={{
                                                                    backgroundImage: `url(${wavybg})`,
                                                                    backgroundRepeat: "no-repeat",
                                                                    backgroundSize: "cover",
                                                                }}
                                                                className="h-24 min-w-40 relative rounded-md border border-gray-300 flex flex-col items-center justify-center text-white text-center uppercase aqum font-bold"
                                                            >
                                                                <img
                                                                    src={card.image}
                                                                    loading="lazy"
                                                                    alt="Card image"
                                                                    className="h-full w-full object-cover rounded-md"
                                                                />
                                                                <div
                                                                    className={
                                                                        "absolute z-20 bg-transparent h-full w-full top-0 bottom-0"
                                                                    }
                                                                />
                                                            </Card>
                                                        </div>
                                                    </DrawerTrigger>
                                                    <DrawerContent
                                                        aria-describedby={undefined}
                                                        aria-description="dialog"
                                                        className="flex flex-col max-h-[50%] bg-gradient-to-b from-[#292734] to-[#000000] border-none px-3 gap-3"
                                                    >
                                                        <DialogTitle className="sr-only" />
                                                        <div className="h-full flex flex-col items-center justify-around w-full pb-10 pt-3 gap-5">
                                                            <DialogClose className=" shadow-none bg-transparent absolute top-2 right-2 z-40 rounded-full text-4xl">
                                                                <IoIosClose size={30} color="#A4A4A7" />
                                                            </DialogClose>
                                                            <h1 className="text-white jarkata font-semibold text-lg capitalize">
                                                                {card.title ? card.title : "Card title"}
                                                            </h1>
                                                            <img
                                                                src={card.image}
                                                                loading="lazy"
                                                                alt="Refferal Images"
                                                                className="h-full min-w-full object-cover object-center rounded-sm"
                                                            />
                                                        </div>
                                                    </DrawerContent>
                                                </Drawer>
                                            )
                                        )
                                    )}
                                </Fragment>
                            </div>
                        </div>

                        {/* Achievments */}
                        <div>
                            <h1 className="text-[#FEFEFF] text-[15px] font-semibold work-sans py-2">
                                Achievments
                            </h1>
                            <div className=" min-h-[171px] border-none min-w-[326px] w-full p-2">
                                <div className="flex items-center overflow-x-auto max-w-full gap-7 pb-5">
                                    {achievement.map((a, i) => (
                                        <Drawer key={i}>
                                            <DrawerTrigger asChild>
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="flex flex-col relative gap-1 min-w-fit">
                                                        <img
                                                            src={a.img}
                                                            loading="lazy"
                                                            alt="Refferal Images"
                                                            className="max-h-[58px] max-w-[46px] object-cover object-center"
                                                        />

                                                        {a.isLocked &&
                                                            <div className="absolute h-full w-full rounded-md  bg-black/40 z-20 flex flex-col items-center justify-center">
                                                                <SlLock size={25} color="white" />
                                                            </div>
                                                        }
                                                    </div>
                                                    <h1 className="work-sans text-[6px] text-[#FEFEFF] font-medium whitespace-nowrap">
                                                        {a.name}
                                                    </h1>
                                                </div>
                                            </DrawerTrigger>
                                            <DrawerContent
                                                aria-describedby={undefined}
                                                aria-description="dialog"
                                                className="flex flex-col min-h-fit bg-gradient-to-b from-[#292734] to-[#000000] border-none px-3 gap-3"
                                            >
                                                <DialogTitle className="sr-only" />
                                                <div className="h-full flex flex-col items-center justify-around w-full pb-10 pt-5 gap-5">
                                                    <DialogClose className=" shadow-none bg-transparent absolute top-2 right-2 z-40 rounded-full text-4xl">
                                                        <IoIosClose size={30} color="#A4A4A7" />
                                                    </DialogClose>
                                                    <img
                                                        src={a.img}
                                                        loading="lazy"
                                                        alt="Refferal Images"
                                                        className="h-auto w-auto object-contain object-center"
                                                    />
                                                    <h1 className="text-white work-sans font-semibold text-[15px]">
                                                        {a.isLocked ? a.name : a.unLockedText}
                                                    </h1>
                                                </div>
                                            </DrawerContent>
                                        </Drawer>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;



