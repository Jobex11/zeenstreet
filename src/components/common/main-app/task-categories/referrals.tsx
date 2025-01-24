import { Fragment, useEffect, useState } from "react";
import CardWrapper from "@components/common/cards/card-wrapper"
import { useCompleteRefTasksMutation } from "@hooks/redux/referrals"
import { useGetUsersByIdQuery } from "@hooks/redux/users"
import { toast } from "sonner"
import { CountdownTimer } from "../countdown-timer";
import { triggerErrorVibration } from "@/lib/utils";
import { Badge } from "@components/ui/badge";
import RaveLogo from "@assets/images/icons/zenstreet_logo.png";
import { RefProps } from "@/types/task.type";
import { HiMiniUsers } from "react-icons/hi2";

export default function ReferralsCategory({ tasks, telegram_id, refetch, type }: RefProps) {
    
    const [taskCompleted, setTaskCompleted] = useState(false)
    const { data: user } = useGetUsersByIdQuery(telegram_id, {
        refetchOnReconnect: true, refetchOnFocus: true
    })
    const TIMER_KEY = `timer-${telegram_id + tasks?._id}`;
    const [complete, { isLoading: completing }] = useCompleteRefTasksMutation();
    const handleCompleteRefTasks = async () => {
        if (taskCompleted) {
            toast.error("You have performed this task already!", { className: "text-xs work-sans py-3" });
            triggerErrorVibration();
            return;
        }

        try {
            const completeRefTasks = await complete({
                taskId: tasks._id,
                telegram_id,
            }).unwrap();
            toast.success(completeRefTasks.message, { className: "text-xs work-sans py-3" });
            refetch?.();
            localStorage.removeItem(TIMER_KEY);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.data.message || error?.data?.error, { className: "text-xs work-sans py-3", icon:<HiMiniUsers/> });
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

    return (
        <Fragment>
            <CardWrapper className={`flex flex-col px-2 min-h-fit border-[3px] border-[#c781ff]`}>
                <div className={`flex items-center justify-between pb-2`}>
                    <div className={"flex items-center flex-row gap-3 py-3 relative"}>
                        <img
                             src={tasks.image || RaveLogo}
                            alt={"referrals logo"}
                            loading={"lazy"}
                            className={"h-12 w-12 rounded-full object-cover object-center"} />
                             <div
                             className={
                              "absolute z-20 bg-transparent h-12 w-12 rounded-full top-0 bottom-0"
                            }
                           />
                        <div className={"gap-1 flex flex-col"}>
                            <h1 className={"text-sm work-sans font-semibold text-white line-clamp-2"}>{tasks.title}</h1>
                            {type ? <Badge variant="outline" className="text-[8px] w-fit poppins text-orange-500">{type}</Badge> : null}
                        </div>
                    </div>
                </div>
                <div>
                    <CountdownTimer
                        _id={tasks._id}
                        timeRemaining={tasks.timeRemaining}
                        disabled={completing || taskCompleted}
                        btnTitle={completing ? "Check.." : `Check`}
                        onClick={handleCompleteRefTasks}
                        telegram_id={user?.user?.telegram_id}
                        countdown={tasks.countdown}
                        shares={tasks.shares}
                        baseReward={tasks.baseReward}
                    />
                </div>
            </CardWrapper>
        </Fragment>
    )
}
