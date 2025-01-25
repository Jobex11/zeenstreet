import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerDescription, DrawerTrigger } from "@components/ui/drawer";
import { HiOutlineGift } from "react-icons/hi";
import { useGetTelegramId } from "@hooks/getTelegramId";
import { useRewardForStoryViewsMutation, useGetStoryViewDetailsQuery, storiesApi } from "@hooks/redux/stories";
import { Fragment, useEffect } from "react";
import { Button } from "@components/ui/button";
import { toast } from "sonner";
import { triggerErrorVibration } from "@/lib/utils";
import { IoIosClose } from "react-icons/io";
import storyViewImg from "@assets/images/views.svg";
import { useSelector, useDispatch } from "react-redux";
import { updateClaimedRewards } from "@hooks/redux/slices/rewardsSlice";
import { RootState } from "@lib/store";
import { FaMehRollingEyes } from "react-icons/fa";

interface RewardMapping {
    views: number;
    rewardShares: number;
}

export function RewardForStoryViews() {

    const dispatch = useDispatch();
    const { telegramId } = useGetTelegramId();
    const claimedRewards = useSelector((state: RootState) => state.rewards.claimedRewards);
    const [rewardStory, { isLoading: isCheckingStatus }] = useRewardForStoryViewsMutation();

    const { data: storyDetails, refetch: refetchStoryDetails } = useGetStoryViewDetailsQuery(telegramId ?? "", {
        skip: !telegramId,
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        pollingInterval: 20,
    });

    const rewardMapping: RewardMapping[] = [
        { views: 10, rewardShares: 55 },
        { views: 40, rewardShares: 350 },
        { views: 150, rewardShares: 2000 },
        { views: 500, rewardShares: 75000 },
        { views: 1000, rewardShares: 10000 },
    ];

    const nextReward = rewardMapping.find(
        (reward) =>
            storyDetails?.views >= reward.views &&
            !claimedRewards.some((rewardItem) => rewardItem.views === reward.views)
    );

    const handleRewardStoryViews = async () => {
        try {
            const reward = await rewardStory({ telegram_id: telegramId }).unwrap();
            toast.success(reward.message, { className: "text-xs work-sans py-3" });
            if (nextReward) {
                dispatch(updateClaimedRewards(nextReward));
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error sharing to story:", error);
            toast.error(error?.data?.error || error?.data?.message || "Something went wrong!..", {
                className: "text-xs work-sans py-3",
            });
            triggerErrorVibration();
        }
    };


    useEffect(() => {
        dispatch(storiesApi.util.invalidateTags(["Story"]));
    }, [dispatch]);


    const rewardDetails = [
        { views: "10", rewardShares: "55" },
        { views: "40", rewardShares: "350" },
        { views: "150", rewardShares: "2k" },
        { views: "500", rewardShares: "7.5k" },
        { views: "1k", rewardShares: "10k" },
    ];

    return (
        <Fragment>
            <Drawer>
                <DrawerTrigger className={"relative"} onClick={async () => { await refetchStoryDetails() }}>
                    <Fragment>
                        <HiOutlineGift size={25} color={"#d1d5db"} />
                        <div className={"h-2 w-2 z-20 bg-orange-600 animate-pulse rounded-full absolute top-0 left-0"} />
                    </Fragment>
                </DrawerTrigger>
                <DrawerContent
                    aria-describedby={undefined}
                    aria-description="Show reward details"
                    className="flex flex-col items-center max-h-fit mx-auto text-gray-300 pb-6 bg-gradient-to-b from-[#292734] to-[#000000] border-none rounded-lg px-4 gap-3 sm:w-80"
                >
                    <div className="relative flex flex-col items-center justify-center w-full gap-4">
                        <DrawerClose className="absolute -top-5 right-2 z-40 p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition">
                            <IoIosClose size={24} />
                        </DrawerClose>
                    </div>
                    <Fragment>
                        <div>
                            <img src={storyViewImg} alt="story view image" className="h-24 w-24 object-contain" />
                        </div>
                        <DrawerTitle className="text-lg font-bold text-white text-center mt-2 tahoma">
                            View Rewarder
                        </DrawerTitle>
                        <DrawerDescription className="text-center text-gray-400 text-sm work-sans px-10">
                            Earn rewards based on the number of views your story gets!
                        </DrawerDescription>
                        <ul className="list-decimal list-inside text-gray-300 work-sans text-sm">
                            {rewardDetails.map((rwd) => (
                                <li key={rwd.rewardShares}>{rwd.views} views will be rewarded with <span className="font-semibold text-orange-500">{rwd.rewardShares} shares</span>.</li>
                            ))}
                        </ul>
                        <DrawerDescription className="text-center text-gray-400 text-xs work-sans px-10">
                            Note: You need to enable privacy settings for this feature to work.!!
                        </DrawerDescription>
                        {storyDetails ?
                            <div className="flex flex-col items-center justify-center text-white w-full work-sans mt-6">
                                <span className="text-xl font-semibold flex items-center gap-3">
                                    You have {storyDetails?.views ?? <FaMehRollingEyes />} view{storyDetails?.views === 1 ? "" : "s"}
                                </span>
                                <p className="mt-2 text-gray-400 text-center">
                                    {storyDetails?.rewardShares && storyDetails?.rewardShares > 0 ? (
                                        <Fragment>
                                            You earned {storyDetails?.rewardShares} share
                                            {storyDetails?.rewardShares === 1 ? "" : "s"} 🎉
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            {storyDetails?.views > 1 && "You haven't earned any shares yet. Keep engaging your friends! 😊"}
                                        </Fragment>
                                    )}
                                </p>
                                <div className="mt-4 w-full flex flex-col">
                                    <Button
                                        disabled={isCheckingStatus || !nextReward}
                                        onClick={handleRewardStoryViews}
                                        className={`w-full text-white work-sans ${isCheckingStatus || !nextReward
                                            ? "bg-gray-500 cursor-not-allowed"
                                            : "bg-orange-500 hover:bg-orange-600"
                                            }`}
                                    >
                                        {isCheckingStatus
                                            ? "Processing..."
                                            : nextReward
                                                ? `Claim Reward for ${nextReward?.views} Views`
                                                : "No Reward Available"}
                                    </Button>
                                </div>
                            </div>
                            : <div className={"border-t my-3 flex flex-col items-center"}>
                                <h1 className={"font-semibold text-lg pt-2 work-sans"}>No story at the moment</h1>
                                <p className={"text-gray-300 work-sans"}>Check in two days</p>
                            </div>}
                    </Fragment>
                </DrawerContent>

            </Drawer>
        </Fragment>
    );
}
