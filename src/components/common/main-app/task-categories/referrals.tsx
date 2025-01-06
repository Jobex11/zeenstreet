import { Fragment, useEffect, useState } from "react";
import CardWrapper from "@components/common/cards/card-wrapper"
import { useCompleteRefTasksMutation } from "@hooks/redux/referrals"
import { useGetUsersByIdQuery } from "@hooks/redux/users"
import { toast } from "sonner"
import { CountdownTimer } from "../countdown-timer";
import { triggerErrorVibration } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface RefProps {
    tasks: {
        title: string;
        shares: number;
        image: string;
        _id: string;
        refCount: number;
        countdown: number;
        baseReward: number;
        timeRemaining: number;
    }
    refetch?: () => void;
    telegram_id?: string | null;
    type: string;
}


export default function ReferralsCategory({ tasks, telegram_id, refetch, type }: RefProps) {
    const [taskCompleted, setTaskCompleted] = useState(false)
    const { data: user } = useGetUsersByIdQuery(telegram_id, {
        refetchOnReconnect: true, refetchOnFocus: true
    })

    const [complete, { isLoading: completing }] = useCompleteRefTasksMutation();

    const handleCompleteRefTasks = async () => {
        if (taskCompleted) {
            toast.error("You have performed this task already!", { className: "text-xs work-sans" });
            triggerErrorVibration();
            return;
        }

        try {
            // Send the task completion request to the backend
            const completeRefTasks = await complete({
                taskId: tasks._id,
                telegram_id,
            }).unwrap();
            toast.success(completeRefTasks.message, { className: "text-xs work-sans" });
            refetch?.();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.data.message, { className: "text-xs work-sans" });
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

    return (
        <Fragment>
            <CardWrapper className={`flex flex-col px-2 min-h-fit border-[3px] border-[#c781ff]`}>
                <div className={`flex items-center justify-between pb-2 ${tasks.timeRemaining === 0 && "border-b border-orange-300"}`}>
                    <div className={"flex items-center flex-row gap-3 py-2"}>
                        <img
                            src={tasks.image}
                            alt={"referrals logo"}
                            loading={"lazy"}
                            className={"h-16 w-16  rounded-full object-cover object-center"} />
                        <div className={"gap-1 flex flex-col"}>
                            <h1 className={"text-base work-sans font-semibold text-white"}>{tasks.title}</h1>
                            <h1 className={"text-xs work-sans text-orange-500"}>{type}</h1>

                        </div>
                    </div>

                    <Button onClick={handleCompleteRefTasks}
                        disabled={completing || taskCompleted}
                        className={"bg-orange-500 text-white h-8 tex-[11px] rounded-full hover:bg-orange-600 work-sans"}>
                        {completing ? "Check.." : `Check`}
                    </Button>
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
    )
}
