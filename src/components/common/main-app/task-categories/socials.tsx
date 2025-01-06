import { Fragment, useState } from "react";
import CardWrapper from "@components/common/cards/card-wrapper";
import { Button } from "@components/ui/button";
import { toast } from "sonner";
import { CountdownTimer } from "../countdown-timer";
import { useCompleteSocialTasksMutation } from "@/hooks/redux/tasks";
import { useTelegramWebApp } from "@/hooks/useTelegramWebapp";
import { triggerErrorVibration } from "@/lib/utils";

export interface SocialTasksProps {
    tasks: {
        title: string;
        shares: number;
        _id: string;
        socialUrl: string;
        chat_id: string;
        countdown: number;
        baseReward: number;
        timeRemaining: number;
    };
    refetch?: () => void;
    telegram_id?: string | null;
    image: string;
    type?: string;
}

export default function SocialsCategory({
    tasks,
    image,
    telegram_id,
    refetch,
    type,
}: SocialTasksProps) {
    const { openLink } = useTelegramWebApp();
    const [complete, { isLoading: completing }] = useCompleteSocialTasksMutation();
    const [isMember, setIsMember] = useState(false);

    const handleJoinChannel = () => {
        openLink(tasks.socialUrl, { try_instant_view: false });
        setIsMember(true);
    };

    const handleConfirmMembership = async () => {
        try {
            // Check if the user is a member using Telegram API
            const response = await fetch(
                `https://api.telegram.org/bot7876229498:AAEvj3K6fNEOOtr9vb1FeJY7Epp8bPh0VcU/getChatMember?chat_id=${tasks.chat_id}&user_id=${telegram_id}`
            );
            const data = await response.json();

            if (data.ok && ["member", "administrator", "creator"].includes(data.result.status)) {
                // If user is a member, complete the task
                const completeTask = await complete({
                    taskId: tasks?._id,
                    telegram_id,
                }).unwrap();
                toast.success(completeTask.message);
                refetch?.();
            } else {
                toast.error("You must join the channel to complete this task.");
                triggerErrorVibration()
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error confirming membership:", error);
            toast.error(error.data.error);
            triggerErrorVibration()
        }
    };

    const handleButtonClick = () => {
        if (!isMember) {
            handleJoinChannel();
        } else {
            handleConfirmMembership();
        }
    };

    return (
        <Fragment>
            <CardWrapper className="flex flex-col p-2 min-h-fit border-[3px] border-[#c781ff]">
                <div
                    className={`flex items-center justify-between ${tasks.timeRemaining === 0 && "border-b border-gray-300"
                        }`}
                >
                    <div className="flex items-center flex-row gap-3 py-2">
                        <img
                            src={image}
                            alt="referrals logo"
                            loading="lazy"
                            className="h-16 w-16 rounded-lg object-cover object-center"
                        />
                        <div className="gap-1 flex flex-col">
                           <h1 className={"text-base work-sans font-semibold text-white"}>{tasks.title}</h1>
                            <h1 className="text-xs poppins text-orange-500">{type}</h1>
                        </div>
                    </div>
                    <div>
                        <Button
                            onClick={handleButtonClick}
                            disabled={completing}
                            className="bg-orange-500 text-white tex-xs rounded-full hover:bg-orange-600 work-sans"
                        >
                            {completing
                                ? "Check..."
                                : isMember
                                    ? "Check"
                                    : "Join"}
                        </Button>
                    </div>
                </div>
                <div>
                    <CountdownTimer
                        _id={tasks._id}
                        timeRemaining={tasks.timeRemaining}
                        countdown={tasks.countdown}
                        shares={tasks.shares}
                        baseReward={tasks.baseReward}
                    />
                </div>
            </CardWrapper>
        </Fragment>
    );
}
