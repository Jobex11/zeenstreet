import { useCompleteTasksMutation } from "@hooks/redux/tasks";
import { formatTime } from "@/lib/utils";
import { TaskcardType } from "@/types/task.type";
import { Button } from "@components/ui/button";
import { CardContent, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import * as Progress from "@radix-ui/react-progress";
import { Fragment, useEffect, useState } from "react";
import { CiClock2 } from "react-icons/ci";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import CardWrapper from "./Tasxcard";

export function RavegenieCard({ task }: TaskcardType) {
    const [telegramId, setTelegramId] = useState("");
    const [remainingTime, setRemainingTime] = useState(0);
    const [currentReward, setCurrentReward] = useState(0);
    const [progressValue, setProgressValue] = useState(0);
    const [taskPerformed, setTaskPerformed] = useState<boolean>(false);
    const [disbleTaskBtn, setDisableTaskBtn] = useState<boolean>(false)
    const [completeTasks, { isLoading: isCompleting }] = useCompleteTasksMutation();

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
                setDisableTaskBtn(completedTask?.completedTasks?.includes(task?._id))
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error completing task:", error?.data?.error);
            toast.info(error?.data?.error || "Task performed already", { className: "text-xs work-sans" });
        }
    };

    const handleTaskPerformance = () => {
        setTimeout(() => {
            setTaskPerformed(true);
        }, 5000);
    };
    return (
        <CardWrapper className={``}>
            <CardHeader className="flex flex-row justify-between items-center px-3">
                <CardTitle className="text-[#FFFFFF] text-xs font-medium work-sans capitalize p-0">{task?.taskType}</CardTitle>
                <div className="flex flex-col">
                    <LazyLoadImage
                        effect="blur"
                        src={task?.image}
                        alt="Task Logo"
                        className="max-h-[50px] max-w-[75.78px] w-fit h-fit object-contain object-center" />
                    <h1 className="text-[11px] work-sans text-[#FFFFFF] text-center font-medium">{task?.category}</h1>
                </div>
            </CardHeader>
            <CardContent className="px-3">
                <CardTitle className="text-xl font-bold work-sans text-white">{task?.title}</CardTitle>
                {task?.countdown && (
                    <Fragment>
                        {!isExpired ? (
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
                        ) : (
                            <Progress.Root
                                className="relative h-[9px] w-full overflow-hidden rounded-full bg-white my-1"
                                style={{
                                    transform: "translateZ(0)",
                                }}
                                value={100}
                            />
                        )}

                        <div className='flex items-center justify-between text-xs work-sans font-medium text-white py-2'>
                            {isExpired ? <span className="work-sans text-sm">{task.baseReward} shares lost</span> : <span>{currentReward}/{task?.baseReward} shares left</span>}
                            {isExpired ? <span className="work-sans text-sm">Time Elapsed</span> : <span className='flex items-center gap-1 work-sans'>
                                <CiClock2 size={22} />  {formatTime(remainingTime)} left
                            </span>}
                        </div>
                    </Fragment>
                )}
            </CardContent>
            <hr className="mx-3" />
            <CardFooter className="py-2 px-3 flex items-center justify-between">
                {!task.taskUrl ? <Link to={""}><Button
                    disabled={disbleTaskBtn}
                    onClick={handleTaskPerformance} className="rounded-[5px] h-5 text-[10px] font-medium">Continue</Button></Link> :
                    <Button
                        disabled={disbleTaskBtn}
                        onClick={handleTaskPerformance} className="rounded-[5px] h-5 text-[10px] font-medium">Continue</Button>}
                {!isExpired ? (
                    <Button
                        disabled={isCompleting || !taskPerformed || disbleTaskBtn}
                        onClick={handleCompleteTask} className="rounded-[5px] h-5 text-[10px] font-medium bg-[#D25804]">Confirm</Button>
                ) : <p className={"text-red-500 work-sans"}>Task Expired</p>}
            </CardFooter>
        </CardWrapper>
    );
}
