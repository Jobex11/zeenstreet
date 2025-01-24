import { useGetTelegramId } from '@/hooks/getTelegramId'
import { useCheckThrottleQuery, useSendPingNotificationMutation } from '@/hooks/redux/notifications'
import bell_icon from "@assets/images/bell_icon.png"
import { Button } from '@components/ui/button'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerClose, DrawerTitle, DrawerTrigger } from '@components/ui/drawer'
import { Fragment, useEffect, useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { toast } from "sonner"
import { FiLoader } from "react-icons/fi"
import { IoIosClose } from "react-icons/io";

function SendPingNotification() {

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const { telegramId } = useGetTelegramId();
    const TIMER_KEY = `ping-timer-${telegramId}`;
    const [SendPing, { isLoading: isSending }] = useSendPingNotificationMutation();
    const { data, isSuccess, isLoading: checkingThrottle } = useCheckThrottleQuery(telegramId, {
        skip: !telegramId,
        refetchOnFocus: true,
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true
    })
    const [remainingTime, setRemainingTime] = useState(() => {
        const storedEndTime = localStorage.getItem(TIMER_KEY);
        if (storedEndTime) {
            return parseInt(storedEndTime, 10) - new Date().getTime();
        }

        // Calculate new end time and save it in localStorage
        const newEndTime = new Date().getTime() + data?.remainingDays * 24 * 60 * 60 * 1000;
        localStorage.setItem(TIMER_KEY, newEndTime.toString());
        return newEndTime - new Date().getTime();
    });

    const resetTimer = () => {
        const newEndTime = new Date().getTime() + data?.remainingDays * 24 * 60 * 60 * 1000;
        localStorage.setItem(TIMER_KEY, newEndTime.toString());
        setRemainingTime(newEndTime - new Date().getTime());
    };

    useEffect(() => {
        if (isSuccess && data && data?.canSend) {
            setButtonDisabled(false);
        } else if (isSuccess && data && !data?.canSend) {
            setButtonDisabled(true);
        }
    }, [data, isSuccess]);


    const handleSendPing = async () => {
        const message = "Ping notification from RaveGenie";
        try {
            const ping = await SendPing({ telegram_id: telegramId, message: message }).unwrap();
            toast.success(ping.message || "Notification sent to your downlines!", {
                className: "text-xs work-sans py-3",
            });
            resetTimer();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.data?.error || error?.data?.message || "Something went wrong Please try again!", {
                className: "text-xs work-sans py-3",
            })
        }
    }

    return (
        <Fragment>
            <Drawer>
                <DrawerTrigger>
                    <span> <IoAdd size={30} color="white" /></span>
                </DrawerTrigger>
                <DrawerContent
                    aria-describedby={undefined}
                    aria-description="dialog"
                    className="flex flex-col items-center work-sans bg-gradient-to-b from-[#292734] to-[#000000] border-none px-4 pb-5 gap-4 rounded-lg shadow-xl"
                >
                    <div className="relative flex flex-col items-center justify-center w-full gap-4">
                        <DrawerClose className="absolute -top-5 right-2 z-40 p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition">
                            <IoIosClose size={24} />
                        </DrawerClose>
                        <DrawerHeader>
                            <img src={bell_icon} alt={"bell icon"} className={"max-h-20 max-w-20 object-contain object-center"} />
                        </DrawerHeader>
                        <DrawerTitle className="text-2xl font-semibold text-center text-white">Ping Notifier</DrawerTitle>
                        <DrawerDescription className="text-center text-gray-400">
                            Keep your downlines active
                            and engaged in RaveGenie
                            games. Don't let anyone miss out!
                        </DrawerDescription>

                        {checkingThrottle ? (
                            <FiLoader size={30} color="white" className="animate-spin" />
                        ) : (
                            <div className={"flex flex-col w-full gap-3"}>
                                <Button
                                    disabled={buttonDisabled || isSending}
                                    onClick={handleSendPing}
                                    className={"w-full rounded-lg bg-orange-600 hover:bg-orange-500 flex-1 text-white work-sans"}>
                                    {isSending ? "Processing..." : data?.remainingTime > 0 ? <Timer remainingTime={remainingTime} setRemainingTime={setRemainingTime} /> : "Send Ping"}</Button>
                            </div>
                        )}
                    </div>
                </DrawerContent>
            </Drawer>
        </Fragment>
    )
}

export default SendPingNotification


interface TimerProps {
    remainingTime: number,
    setRemainingTime: React.Dispatch<React.SetStateAction<number>>
}
const Timer = ({ remainingTime, setRemainingTime }: TimerProps) => {

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prev) => Math.max(prev - 1000, 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [setRemainingTime]);


    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const days = Math.floor(totalSeconds / (24 * 3600));
        const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <Fragment>
            Wait for {remainingTime > 0 ? formatTime(remainingTime) : "0d 0h 0m 0s"}
        </Fragment>
    );
};

