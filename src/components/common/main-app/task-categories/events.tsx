import { Fragment, useEffect, useState } from "react";
import CardWrapper from "@components/common/cards/card-wrapper";
import { useGetUsersByIdQuery } from "@hooks/redux/users";
import { toast } from "sonner";
import { triggerErrorVibration } from "@/lib/utils";
import { Badge } from "@components/ui/badge";
import RaveLogo from "@assets/images/icons/zenstreet_logo.png";
import { useCompleteEventsTasksMutation } from "@hooks/redux/tasks";
import { useTelegramWebApp } from "@/hooks/useTelegramWebapp";
import { CountdownTimer } from "../countdown-timer";

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
        type: string;
    };
    refetch?: () => void;
    telegram_id?: string | null;
    special: string;
}

export default function EventsTasksCategory({
    tasks,
    telegram_id,
    refetch,
    special,
}: EventsProps) {
    const [taskCompleted, setTaskCompleted] = useState(false);
    const [enableBtn, setEnableBtn] = useState(false);
    const { openLink } = useTelegramWebApp();
    const { data: user } = useGetUsersByIdQuery(telegram_id, {
        refetchOnReconnect: true,
        refetchOnFocus: true,
    });
    const [complete, { isLoading: completing }] = useCompleteEventsTasksMutation();

    useEffect(() => {
        // Load enableBtn state from localStorage on component mount
        const storedEnableBtn = localStorage.getItem(`task-${tasks._id}-enableBtn`);
        if (storedEnableBtn !== null) {
            setEnableBtn(JSON.parse(storedEnableBtn));
        }

        if (user?.user) {
            const completed = user.user.completedTasks.some(
                (task: { taskId: { toString: () => string } }) =>
                    task.taskId.toString() === tasks._id.toString()
            );
            setTaskCompleted(completed);
        }
    }, [user?.user, tasks._id, refetch]);

    const handleCompleteEventsTasks = async () => {
        if (taskCompleted) {
            toast.error("You have performed this task already!", {
                className: "text-xs work-sans py-3",
            });
            triggerErrorVibration();
            return;
        }

        try {
            const completeEventsTasks = await complete({
                taskId: tasks._id,
                telegram_id,
            }).unwrap();
            toast.success(completeEventsTasks.message, {
                className: "text-xs work-sans py-3",
            });
            refetch?.();
            localStorage.removeItem(`task-${tasks._id}-enableBtn`)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.data.message || error?.data?.error, { className: "text-xs work-sans py-3" });
            triggerErrorVibration();
        }
    };

    const handleTaskType = () => {
        openLink(tasks.url, { try_instant_view: false });
        setTimeout(() => {
            setEnableBtn(true);
            // Save the enableBtn state to localStorage after it's updated
            localStorage.setItem(`task-${tasks._id}-enableBtn`, JSON.stringify(true));
        }, 5000);
    };

    const handleButtonClick = () => {
        if (!enableBtn) {
            handleTaskType();
        } else {
            handleCompleteEventsTasks();
        }
    };

    const btnTitle = completing
        ? "Check..."
        : enableBtn
            ? "Check"
            : "Start";

    return (
        <Fragment>
            <CardWrapper className="flex flex-col px-2 min-h-fit border-[3px] border-[#c781ff]">
                <div className="flex items-center justify-between pb-2">
                    <div className="flex items-center flex-row gap-3 py-3 relative">
                        <img
                            src={tasks.image || RaveLogo}
                            alt="referrals logo"
                            loading="lazy"
                            className="h-12 w-12 rounded-full object-cover object-center"
                        />
                        <div className="absolute z-20 bg-transparent h-12 w-12 rounded-full top-0 bottom-0" />
                        <div className="gap-1 flex flex-col">
                            <h1 className="text-sm work-sans font-semibold text-white line-clamp-2">
                                {tasks.title}
                            </h1>
                            {special ? (
                                <Badge variant="outline" className="text-[8px] w-fit poppins text-orange-500">
                                    {special}
                                </Badge>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div>
                    <CountdownTimer
                        _id={tasks._id}
                        timeRemaining={tasks.timeRemaining}
                        disabled={completing || taskCompleted}
                        btnTitle={btnTitle}
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
