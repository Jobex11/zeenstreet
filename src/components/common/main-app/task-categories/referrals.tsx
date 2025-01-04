import { Fragment} from "react";
import CardWrapper from "@components/common/cards/card-wrapper"
import { useCompleteRefTasksMutation } from "@hooks/redux/referrals"
import { useGetUsersByIdQuery } from "@hooks/redux/users"
import { Button } from "@components/ui/button";
import { toast } from "sonner"
import { CountdownTimer } from "../countdown-timer";

export interface RefProps {
    tasks: {
        title: string;
        shares: number;
        _id: string;
        refCount: number;
        countdown: number;
        baseReward: number;
        timeRemaining: number;
    }
    refetch?: () => void;
    telegram_id?: string | null;
    image: string;
    type: string;
}


export default function ReferralsCategory({ tasks, telegram_id, refetch, image, type }: RefProps) {
    const { data: user } = useGetUsersByIdQuery(telegram_id, {
        refetchOnReconnect: true, refetchOnFocus: true
    })

    const [complete, { isLoading: completing }] = useCompleteRefTasksMutation();

    const handleComleteRefTasks = async () => {
        if (user?.user?.referrals?.length >= tasks?.refCount) {
            const completeRefTasks = await complete(
                {
                    taskId: tasks._id,
                    telegram_id
                }
            ).unwrap();
            toast.success(completeRefTasks.message, { className: "text-xs work-sans" });
            refetch?.()
        } else {
            toast.error("You don't have enough friends", { className: "text-xs work-sans" })
            navigator.vibrate([100, 100])
        }
    }

    return (
        <Fragment>
            <CardWrapper className={`flex flex-col p-2 min-h-fit border-[3px] border-[#c781ff]`}>
                <div className={`flex items-center justify-between ${tasks.timeRemaining === 0 && "border-b border-gray-300"}`}>
                    <div className={"flex items-center flex-row gap-3 py-2"}>
                        <img
                            src={image}
                            alt={"referrals logo"}
                            loading={"lazy"}
                            className={"h-16 w-16  rounded-lg object-cover object-center"} />
                        <div className={"gap-1 flex flex-col"}>
                            <h1 className={"text-sm jakarta text-white"}>{tasks.title}</h1>
                            <h1 className={"text-xs poppins text-white"}>{type}</h1>
                        </div>
                    </div>
                    <div>
                        <Button
                            onClick={handleComleteRefTasks}
                            className={"bg-orange-500 text-white tex-xs rounded-full hover:bg-orange-600 work-sans"}>
                            {completing ? "....." : "Check"}
                        </Button>
                    </div>
                </div>
                <div>
                    <CountdownTimer
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
