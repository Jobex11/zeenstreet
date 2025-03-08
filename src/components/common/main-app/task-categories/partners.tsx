import { Fragment, useEffect, useState } from "react";
import CardWrapper from "@/components/shared/cards/card-wrapper";
import { useGetUsersByIdQuery } from "@hooks/redux/users";
import { toast } from "sonner";
import { CountdownTimer } from "../../../shared/countdown-timer";
import { triggerErrorVibration } from "@/lib/utils";
import { Badge } from "@components/ui/badge";
import RaveLogo from "@assets/images/icons/zenstreet_logo.png";
import { useCompletePartnersTasksMutation } from "@hooks/redux/tasks";
import { useTelegramWebApp } from "@/hooks/useTelegramWebapp";
import { useGetChatMemberByIdQuery } from "@/hooks/redux/channels";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setLinkClicked } from "@/hooks/redux/slices/tasksSlice";
import { PartnersProps } from "@/types/task.type";


export default function PartnersTasksCategory({ tasks, telegram_id, refetch, special }: PartnersProps) {
    const [taskCompleted, setTaskCompleted] = useState(false);
    const { openLink } = useTelegramWebApp();
    const dispatch = useDispatch();
    const { data: user } = useGetUsersByIdQuery(telegram_id, {
        refetchOnReconnect: true,
        refetchOnFocus: true,
    });

    const { data: chat } = useGetChatMemberByIdQuery([tasks.chat_id, telegram_id], {
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        skipPollingIfUnfocused: true,
    });

    const [completePartners, { isLoading: completingPartners }] = useCompletePartnersTasksMutation();
    const clickedLinks = useSelector((state: RootState) => state.tasks.clickedLinks);
    const hasClickedLink = clickedLinks[tasks._id] || false;
    const TIMER_KEY = `timer-${telegram_id + tasks?._id}`;

    const handleJoinSocials = () => {
        openLink(tasks?.url, { try_instant_view: false });
        setTimeout(() => {
            dispatch(setLinkClicked({ taskId: tasks._id + telegram_id }));
        }, 5000);
    };

    const handleCompletePartnersTasks = async () => {
        if (taskCompleted) {
            toast.error("You have performed this task already!", { className: "text-xs work-sans py-3" });
            triggerErrorVibration();
            return;
        }

        try {
            const completePartnersTasks = await completePartners({
                taskId: tasks._id,
                telegram_id,
            }).unwrap();
            toast.success(completePartnersTasks.message, { className: "text-xs work-sans py-3" });
            refetch?.();
            localStorage.removeItem(TIMER_KEY);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.data.message || error?.data?.error, { className: "text-xs work-sans py-3" });
            triggerErrorVibration();
        }
    };

    const handleConfirmMembership = async () => {
        try {
            if (chat.ok && ["member", "administrator", "creator"].includes(chat.result.status)) {
                const completeTask = await completePartners({
                    taskId: tasks?._id,
                    telegram_id,
                }).unwrap();
                toast.success(completeTask.message, { className: "text-xs py-3 work-sans" });
                refetch?.();
                localStorage.removeItem(TIMER_KEY);
            } else {
                toast.error("You must join the channel to complete this task!", { className: "text-xs py-3 work-sans" });
                triggerErrorVibration();
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error confirming membership:", error);
            toast.error(error?.data?.error
                || error?.data?.message
                ||
                "You must join the channel to complete this task!",
                { className: "text-xs py-3 work-sans" });
            triggerErrorVibration();
        }
    };
    const handleConectWalletTypeTasks = async () => {

    }

    useEffect(() => {
        if (user?.user) {
            const taskCompleted = user?.user.completedTasks.some(
                (task: { taskId: { toString: () => string } }) => task.taskId.toString() === tasks._id.toString()
            );
            setTaskCompleted(taskCompleted);
        }
    }, [user?.user, tasks._id, refetch]);

    // Map task types to their corresponding click handlers
    const taskTypeHandlers: Record<string, () => void> = {
        "Join Telegram C/G": handleConfirmMembership,
        Youtube: handleJoinSocials,
        Twitter: handleJoinSocials,
        Instagram: handleJoinSocials,
        Website: handleJoinSocials,
        Facebook: handleJoinSocials,
        Tiktok: handleJoinSocials,
        Linkedin: handleJoinSocials,
        Discord: handleJoinSocials,
        Thread: handleJoinSocials,
        "Connect Wallet Type": handleConectWalletTypeTasks,
    };

    const handleButtonClick = () => {
        const isSocialTask = [
            "Youtube",
            "Twitter",
            "Instagram",
            "Website",
            "Facebook",
            "Tiktok",
            "Linkedin",
            "Discord",
            "Thread",
        ].includes(tasks?.type);

        if (isSocialTask && hasClickedLink) {
            handleCompletePartnersTasks();
        } else {
            const handler = taskTypeHandlers[tasks.type];
            if (handler) {
                handler();
            } else {
                console.error(`No handler defined for task type: ${tasks.type}`);
            }
        }
    };

    const isSocialTask = [
        "Youtube", "Twitter", "Instagram", "Website", "Facebook",
        "Tiktok", "Linkedin", "Discord", "Thread"
    ].includes(tasks?.type);

    const btnTitle = completingPartners
        ? "Hold..."
        : isSocialTask
            ? hasClickedLink
                ? "Claim"
                : "Start"
            : "Confirm";

    return (
        <Fragment>
            <CardWrapper className={`flex flex-col px-2 min-h-fit border-[3px] border-[#c781ff]`}>
                <div className={`flex items-center justify-between pb-2`}>
                    <div className={"flex items-center flex-row gap-3 py-3 relative"}>
                        <img
                            src={tasks.image || RaveLogo}
                            alt={"referrals logo"}
                            loading={"lazy"}
                            className={"h-12 w-12 rounded-full object-cover object-center"}
                        />
                        <div
                            className={
                                "absolute z-20 bg-transparent h-12 w-12 rounded-full top-0 bottom-0"
                            }
                        />
                        <div className={"gap-1 flex flex-col"}>
                            <h1 className={"text-sm work-sans font-semibold text-white line-clamp-2"}>{tasks.title}</h1>
                            {special ? <Badge variant="outline" className="text-[8px] w-fit poppins text-orange-500">{special}</Badge> : null}
                        </div>
                    </div>
                </div>
                <div>
                    <CountdownTimer
                        _id={tasks._id}
                        timeRemaining={tasks.timeRemaining}
                        disabled={completingPartners || taskCompleted}
                        btnTitle={btnTitle}
                        telegram_id={user?.user?.telegram_id}
                        special={special}
                        onClick={handleButtonClick}
                        countdown={tasks.countdown}
                        shares={tasks.shares}
                        baseReward={tasks.baseReward}
                    />
                </div>
            </CardWrapper>
        </Fragment>
    );
}
