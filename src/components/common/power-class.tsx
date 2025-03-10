import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { wealthClass } from "@/constants/wealth-class";
import { useGetAllRanksQuery } from "@/hooks/redux/ranks";
import { useGetAllWealthClasssQuery } from "@/hooks/redux/wealthclass";
import { triggerErrorVibration } from "@/lib/utils";
import wavybg from "@assets/images/card_bg.svg";
import { Card } from "@components/ui/card";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from "@components/ui/drawer";
import { useGetTelegramId } from "@hooks/getTelegramId";
import {
    useGetUserSharesQuery,
    useUpdateUserSharesMutation,
} from "@hooks/redux/shares";
import { useGetUsersByIdQuery } from "@hooks/redux/users";
import { motion } from "framer-motion";
import { lazy, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { SlLock } from "react-icons/sl";
import { toast } from "sonner";
const Button = lazy(() => import("@components/ui/button").then((mod) => ({ default: mod.Button })));

function PowerClass() {
    const [claimedRewards, setClaimedRewards] = useState<Record<string, boolean>>({});
    const { telegramId } = useGetTelegramId();
    const [drawerState, setDrawerState] = useState<{ [key: string]: boolean }>(
        {}
    );
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
    return (
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
                                    className="flex flex-col work-sans max-w-xl mx-auto bg-gradient-to-b from-[#292734] to-[#000000] border-none px-4 pb-5 gap-6 rounded-lg shadow-xl"
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
    )
}

export default PowerClass
