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


interface RewardMapping {
    views: number;
    rewardShares: number;
}

export function RewardForStoryViews() {
    const dispatch = useDispatch();
    const { telegramId } = useGetTelegramId();
    const claimedRewards = useSelector((state: RootState) => state.rewards.claimedRewards);
    const [rewardStory, { isLoading: isCheckingStatus }] = useRewardForStoryViewsMutation();

    const { data: storyDetails } = useGetStoryViewDetailsQuery(telegramId ?? "", {
        skip: !telegramId,
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    const rewardMapping: RewardMapping[] = [
        { views: 10, rewardShares: 100 },
        { views: 20, rewardShares: 1000 },
        { views: 30, rewardShares: 2000 },
        { views: 50, rewardShares: 5000 },
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
        dispatch(storiesApi.util.invalidateTags(["Story"]))
    }, [dispatch]);

    return (
        <Fragment>
            <Drawer>
                <DrawerTrigger>
                    <HiOutlineGift size={25} color={"#d1d5db"} />
                </DrawerTrigger>
                <DrawerContent
                    aria-describedby={undefined}
                    aria-description="Show reward details"
                    className="flex flex-col items-center max-h-full mx-auto text-gray-300 pb-6 bg-gradient-to-b from-[#292734] to-[#000000] border-none rounded-lg px-4 gap-3 sm:w-80"
                >
                    <div className="relative flex flex-col items-center justify-center w-full gap-4">
                        <DrawerClose className="absolute -top-5 right-2 z-40 p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition">
                            <IoIosClose size={24} />
                        </DrawerClose>
                    </div>
                    {storyDetails ? (
                        <Fragment>
                            <div>
                                <img src={storyViewImg} alt="story view image" className="h-24 w-24 object-contain" />
                            </div>
                            <DrawerTitle />
                            <DrawerDescription className="text-center text-gray-400 text-sm work-sans">
                                Earn rewards based on views of your story!
                            </DrawerDescription>
                            <div className="flex flex-col items-center justify-center text-white w-full work-sans">
                                <span className="text-xl font-semibold">
                                    You have {storyDetails.views ?? 0} view{storyDetails.views === 1 ? "" : "s"}
                                </span>
                                <p className="mt-2 text-gray-400 text-center">
                                    {storyDetails.rewardShares && storyDetails.rewardShares > 0 ? (
                                        <Fragment>
                                            You earned {storyDetails.rewardShares} share
                                            {storyDetails.rewardShares === 1 ? "" : "s"} 🎉
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            You haven't earned any shares yet. Keep engaging your friends! 😊
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
                                                ? `Claim Reward for ${nextReward.views} Views`
                                                : "No Reward Available"}
                                    </Button>
                                </div>
                            </div>
                        </Fragment>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-white w-full work-sans text-center">
                             <div>
                                <img src={storyViewImg} alt="story view image" className="h-24 w-24 object-contain" />
                            </div>
                            <p className="text-xl font-semibold">No Stories Available</p>
                            <p className="mt-2 text-gray-400">
                                The administrators have not created any stories for gamers yet. Please check back in two days!
                            </p>
                        </div>
                    )}
                </DrawerContent>
            </Drawer>
        </Fragment>
    );
}
