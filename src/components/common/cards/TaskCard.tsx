import { useCompleteTasksMutation } from "@hooks/redux/tasks";
import { formatTime } from "@/lib/utils";
import { TaskcardType } from "@/types/task.type";
import { Button } from "@components/ui/button";
import { CardContent, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import * as Progress from "@radix-ui/react-progress";
import { Fragment, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import CardWrapper from "./Tasxcard";
import { GoClockFill } from "react-icons/go";
import { useGetUserByIdQuery } from "@hooks/redux/users";


export function RavegenieCard({ task }: TaskcardType) {
    const [telegramId, setTelegramId] = useState("");
    const [remainingTime, setRemainingTime] = useState(0);
    const [currentReward, setCurrentReward] = useState(0);
    const [progressValue, setProgressValue] = useState(0);
    const [taskPerformed, setTaskPerformed] = useState<boolean>(false);
    const [isTaskCompleted, setIsTaskCompleted] = useState<boolean>(false)
    const [completeTasks, { isLoading: isCompleting }] = useCompleteTasksMutation();
    const { data: userById } = useGetUserByIdQuery(telegramId ?? "", {
        skip: !telegramId, refetchOnReconnect: true, refetchOnFocus: true
    })

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            const initData = window.Telegram.WebApp.initDataUnsafe;
            const user = initData?.user;

            if (user) {
                setTelegramId(user.id ?? null);
            }
        }
    }, []);

    useEffect(() => {
        const storedData = localStorage.getItem(`task-${task._id}`);
        if (storedData) {
            const { remainingTime: storedTime, lastUpdated } = JSON.parse(storedData);
            const elapsedTime = Math.floor((Date.now() - lastUpdated) / 1000);
            const newRemainingTime = Math.max(storedTime - elapsedTime, 0);
            setRemainingTime(newRemainingTime);
        } else {
            setRemainingTime(task.remainingTime);
        }
        setCurrentReward(task.reward);
        setProgressValue((task.remainingTime / task.countdown) * 100);
    }, [task]);

    useEffect(() => {
        if (remainingTime <= 0) {
            return;
        }

        const interval = setInterval(() => {
            setRemainingTime((prev) => {
                const newTime = prev - 1;
                setProgressValue((newTime / task.countdown) * 100);
                const newReward = Math.floor((task.baseReward * newTime) / task.countdown);
                setCurrentReward(newReward);

                // Store updated data in localStorage
                localStorage.setItem(`task-${task._id}`, JSON.stringify({
                    remainingTime: newTime,
                    lastUpdated: Date.now()
                }));

                return newTime > 0 ? newTime : 0;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [remainingTime, task.countdown, task.baseReward, task._id]);

    const isExpired = remainingTime <= 0;

    const handleCompleteTask = async () => {
        if (!taskPerformed) {
            toast.info("Please perform the task first.", { className: "text-xs work-sans" });
            return;
        }

        try {
            const completedTask = await completeTasks({ taskId: task._id, telegram_id: telegramId, reward: task?.baseReward }).unwrap();
            console.log('Shares updated successfully:', completedTask);
            toast.success(completedTask?.message, { className: "text-xs work-sans" });
            if (completedTask) {
                setIsTaskCompleted(completedTask?.completedTasks?.includes(task?._id))
                // sharesApi.util.invalidateTags(["shares"])
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error completing task:", error?.data?.error);
            toast.info(error?.data?.error || "Task performed already", { className: "text-xs work-sans" });
        }
    };

    useEffect(() => {
        if (userById?.user?.completedTasks?.includes(task?._id)) {
            setIsTaskCompleted(true);
        } else {
            setIsTaskCompleted(false);
        }
    }, [userById, task?._id]);
    console.log("Completed Tasks", userById?.user?.completedTasks)

    const handleTaskPerformance = () => {
        setTimeout(() => {
            setTaskPerformed(true);
        }, 5000);
    };
    return (
        <CardWrapper className={`py-1.5 ${isExpired || isTaskCompleted ? " grayscale" : "border-[3px] border-[#c781ff]"}`}>
            <CardHeader className="flex flex-row justify-between  px-2.5 py-0">
                <CardTitle className="text-[#FFFFFF] text-sm font-medium work-sans capitalize p-0">{isTaskCompleted ? "Completed" : "Incomplete"}</CardTitle>
                <div className="flex flex-col">
                    <LazyLoadImage
                        effect="opacity"
                        src={task?.image}
                        alt="Task Logo"
                        className="max-h-[50px] max-w-[75.78px] w-fit h-fit object-contain object-center rounded-full" />
                    <h1 className="text-[11px] work-sans text-white text-center font-medium pt-3">{task?.category}</h1>
                </div>
            </CardHeader>
            <CardContent className="px-2.5 py-0">
                <CardTitle className="text-xl font-bold work-sans text-white">{task?.title}</CardTitle>
                {task?.countdown && (
                    <Fragment>
                        {isExpired || isTaskCompleted ? (
                            <Progress.Root
                                className="relative h-[9px] w-full overflow-hidden rounded-full bg-white my-1"
                                style={{
                                    transform: "translateZ(0)",
                                }}
                                value={100}
                            />
                        ) : (
                            <Progress.Root
                                className="relative h-[9px] w-full overflow-hidden rounded-full bg-white my-1"
                                style={{
                                    transform: "translateZ(0)",
                                }}
                                value={progressValue}
                            >
                                <Progress.Indicator
                                    className="h-full w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 rounded-r-full transition-transform duration-500 ease-out animate-pulse"
                                    style={{ transform: `translateX(-${100 - progressValue}%)` }}
                                />
                            </Progress.Root>
                        )}

                        <div className="flex items-center justify-between text-xs work-sans font-medium text-white py-2">
                            {/* If task is expired but not completed, show shares lost */}
                            {isExpired && !isTaskCompleted ? (
                                <>
                                    <span className="work-sans text-sm">{task.baseReward} shares lost</span>
                                    <span className="work-sans text-sm">Time Elapsed</span>
                                </>
                            ) : isTaskCompleted ? (
                                // If task is completed, show "Task Completed" and "Reward Claimed"
                                <>
                                    <span className="work-sans text-sm">Task Completed</span>
                                    <span className="work-sans text-sm">{task?.reward} Reward Claimed</span>
                                </>
                            ) : (
                                // Default case: Show remaining shares and time left
                                <>
                                    <span>{currentReward}/{task?.baseReward} shares left</span>
                                    <span className="flex items-center gap-1 work-sans">
                                        <GoClockFill size={22} /> {formatTime(remainingTime)} left
                                    </span>
                                </>
                            )}
                        </div>

                    </Fragment>
                )}
            </CardContent>
            <CardFooter className="py-2 px-2.5 flex items-center border-t border-t-gray-500 justify-between">
                {task.taskUrl ? <Link to={task.taskUrl}>
                    <Button
                        variant="secondary"
                        size="sm"
                        disabled={isTaskCompleted}
                        onClick={handleTaskPerformance} className="rounded h-7 text-[10px] font-medium">Continue</Button></Link> :
                    <Button
                        disabled={isTaskCompleted}
                        onClick={handleTaskPerformance} className="rounded h-7 text-[10px] font-medium">Continue</Button>}
                {!isExpired ? (
                    <Button
                        variant="secondary"
                        size="sm"
                        disabled={isCompleting || !taskPerformed || isTaskCompleted}
                        onClick={handleCompleteTask} className="bg-orange-600 hover:bg-orange-700 text-white h-7">Confirm</Button>
                ) : <p className={"text-red-500 work-sans"}>Task Expired</p>}
            </CardFooter>
        </CardWrapper>
    );
}

