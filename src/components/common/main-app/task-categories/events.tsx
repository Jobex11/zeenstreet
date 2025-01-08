import { Fragment, useEffect, useState } from "react";
import CardWrapper from "@components/common/cards/card-wrapper"
import { useGetUsersByIdQuery } from "@hooks/redux/users"
import { toast } from "sonner"
import { CountdownTimer } from "../countdown-timer";
import { triggerErrorVibration } from "@/lib/utils";
import { Badge } from "@components/ui/badge";
import RaveLogo from "@assets/images/icons/zenstreet_logo.png";
import { useCompleteEventsTasksMutation } from "@hooks/redux/tasks";
import { useTelegramWebApp } from "@/hooks/useTelegramWebapp";

export interface EventsProps {
    tasks: {
        title: string;
        shares: number;
        image: string;
        _id: string;
        url: string;
        countdown: number;
        baseReward: number;
        timeRemaining: number;
    }
    refetch?: () => void;
    telegram_id?: string | null;
    type: string;
}


export default function EventsTasksCategory({ tasks, telegram_id, refetch, type }: EventsProps) {

    const [taskCompleted, setTaskCompleted] = useState(false)
    const [hasClickedLink, setHasClickedLink] = useState(false);
    const { openTelegramLink } = useTelegramWebApp()
    const { data: user } = useGetUsersByIdQuery(telegram_id, {
        refetchOnReconnect: true, refetchOnFocus: true
    })
    const [complete, { isLoading: completing }] = useCompleteEventsTasksMutation();


    const handleClickLink = () => {
        openTelegramLink(tasks?.url);
        setHasClickedLink(true);
    };


    const handleCompleteEventsTasks = async () => {
        if (taskCompleted) {
            toast.error("You have performed this task already!", { className: "text-xs work-sans py-3" });
            triggerErrorVibration();
            return;
        }

        try {
            const completeEventsTasks = await complete({
                taskId: tasks._id,
                telegram_id,
            }).unwrap();
            toast.success(completeEventsTasks.message, { className: "text-xs work-sans py-3" });
            refetch?.();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.data.message, { className: "text-xs work-sans py-3" });
            triggerErrorVibration()
        }
    };


    useEffect(() => {
        if (user?.user) {
            // Check if the task is already in completedTasks
            const taskCompleted = user?.user.completedTasks.some(
                (task: { taskId: { toString: () => string; }; }) => task.taskId.toString() === tasks._id.toString()
            );
            setTaskCompleted(taskCompleted);
        }
    }, [user?.user, tasks._id, refetch]);


    const handleButtonClick = () => {
        if (!hasClickedLink) {
            handleClickLink();
        } else {
            handleCompleteEventsTasks();
        }
    };

    return (
        <Fragment>
            <CardWrapper className={`flex flex-col px-2 min-h-fit border-[3px] border-[#c781ff]`}>
                <div className={`flex items-center justify-between pb-2`}>
                    <div className={"flex items-center flex-row gap-3 py-3"}>
                        <img
                            src={tasks.image || RaveLogo}
                            alt={"referrals logo"}
                            loading={"lazy"}
                            className={"h-12 w-12 rounded-full object-cover object-center"} />
                        <div className={"gap-1 flex flex-col"}>
                            <h1 className={"text-sm work-sans font-semibold text-white line-clamp-2"}>{tasks.title}</h1>
                            <Badge variant="outline" className="text-[8px] w-fit poppins text-orange-500">{type}</Badge>
                        </div>
                    </div>
                </div>
                <div>
                    <CountdownTimer
                        _id={tasks._id}
                        timeRemaining={tasks.timeRemaining}
                        disabled={completing || taskCompleted}
                        btnTitle={completing ? "Check.." : `Check`}
                        onClick={handleButtonClick}
                        countdown={tasks.countdown}
                        shares={tasks.shares}
                        baseReward={tasks.baseReward}
                    />
                </div>
            </CardWrapper>
        </Fragment>
    )
}
