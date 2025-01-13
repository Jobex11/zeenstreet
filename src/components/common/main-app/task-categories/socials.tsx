import { Fragment, useState } from "react";
import CardWrapper from "@components/common/cards/card-wrapper";
import { toast } from "sonner";
import { CountdownTimer } from "../countdown-timer";
import { useCompleteSocialTasksMutation } from "@hooks/redux/tasks";
import { useTelegramWebApp } from "@hooks/useTelegramWebapp";
import { triggerErrorVibration } from "@lib/utils";
import { useGetChatMemberByIdQuery } from "@hooks/redux/channels";
import { Badge } from "@components/ui/badge"
import RaveLogo from "@assets/images/icons/zenstreet_logo.png";

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
        image: string;
    };
    refetch?: () => void;
    telegram_id?: string | null;
    type?: string;
}

export default function SocialsCategory({
    tasks,
    telegram_id,
    refetch,
    type,
}: SocialTasksProps) {

    const { openLink } = useTelegramWebApp();
    const [isMember, setIsMember] = useState(false);
    const [complete, { isLoading: completing }] = useCompleteSocialTasksMutation();
    const { data: chat } = useGetChatMemberByIdQuery([tasks.chat_id, telegram_id], {
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        skipPollingIfUnfocused: true
    });

    const handleJoinChannel = () => {
        openLink(tasks?.socialUrl, { try_instant_view: false });
        setIsMember(true);
    };

    const handleConfirmMembership = async () => {
        try {
            if (chat.ok && ["member", "administrator", "creator"].includes(chat.result.status)) {
                // If user is a member, complete the task
                const completeTask = await complete({
                    taskId: tasks?._id,
                    telegram_id,
                }).unwrap();
                toast.success(completeTask.message, { className: "text-xs py-3 work-sans" });
                refetch?.();
                localStorage.removeItem(`countdown-timer${tasks._id}`);
            } else {
                toast.error("You must join the channel to complete this task!", { className: "text-xs py-3 work-sans" });
                triggerErrorVibration()
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error confirming membership:", error);
            toast.error(error?.data?.error || error?.data?.message || "You must join the channel to complete this task!", { className: "text-xs py-3 work-sans" });
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
            <CardWrapper className="flex flex-col px-2 min-h-fit border-[3px] border-[#c781ff]">
                <div
                    className={`flex items-center justify-between`}
                >
                    <div className="flex items-center flex-row gap-3 py-3 relative">
                        <img
                            src={tasks.image || RaveLogo}
                            alt="referrals logo"
                            loading="lazy"
                            className={"h-12 w-12 rounded-full object-cover object-center"} />
                        <div
                            className={
                                "absolute z-20 bg-transparent h-12 w-12 rounded-full top-0 bottom-0"
                            }
                        />
                        <div className="gap-1 flex flex-col">
                            <h1 className={"text-sm work-sans font-medium text-white line-clamp-2"}>{tasks.title}</h1>
                            {type ? <Badge variant="outline" className="text-[8px] w-fit poppins text-orange-500">{type}</Badge> : null}
                        </div>
                    </div>
                </div>
                <div>
                    <CountdownTimer
                        _id={tasks._id}
                        timeRemaining={tasks.timeRemaining}
                        onClick={handleButtonClick}
                        btnTitle={completing
                            ? "Check..."
                            : isMember
                                ? "Check"
                                : "Start"}
                        disabled={completing}
                        countdown={tasks.countdown}
                        shares={tasks.shares}
                        baseReward={tasks.baseReward}
                    />
                </div>
            </CardWrapper>
        </Fragment>
    );
}
