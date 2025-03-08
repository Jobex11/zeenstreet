import { Button } from "@components/ui/button";
import { useState, useEffect } from "react";
import { GiToken } from "react-icons/gi";
import { Clock } from 'lucide-react'
import { AiOutlineSwap, AiFillFire } from "react-icons/ai";
import { formatTime } from "@lib/utils"
import * as Progress from "@radix-ui/react-progress";

interface Timer {
    timeRemaining: number;
    countdown: number;
    baseReward: number;
    shares: number;
    _id: string
    disabled: boolean;
    onClick: () => void;
    btnTitle: string;
    telegram_id: string;
    special: "Special" | "normal"
}

export const CountdownTimer = ({ timeRemaining, disabled, special, telegram_id, btnTitle, onClick, countdown, _id, shares, baseReward }: Timer) => {
    const TIMER_KEY = `timer-${telegram_id}`;
    const [progress, setProgress] = useState<number>(0);

    const [timeLeft, setTimeLeft] = useState(() => {
        const savedTime = localStorage.getItem(TIMER_KEY + _id);
        const now = Date.now();

        if (savedTime) {
            const { savedTimeLeft, lastUpdated } = JSON.parse(savedTime);
            const elapsed = Math.floor((now - lastUpdated) / 1000);
            const calculatedTimeLeft = Math.max(savedTimeLeft - elapsed, 0);

            return Math.min(timeRemaining, calculatedTimeLeft);
        }

        return timeRemaining;
    });

    useEffect(() => {
        if (countdown <= 0) {
            console.error("Invalid countdown value. Countdown must be greater than 0.");
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                const newTime = Math.max(prevTime - 1, 0);

                // Save the new time to localStorage
                localStorage.setItem(
                    TIMER_KEY + _id,
                    JSON.stringify({
                        savedTimeLeft: newTime,
                        lastUpdated: Date.now(),
                    })
                );

                setProgress((newTime / countdown) * 100);
                return newTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [TIMER_KEY, _id, countdown]);

    useEffect(() => {
        setProgress((timeLeft / countdown) * 100);
    }, [timeLeft, countdown]);

    return (
        <div>
            <div className={`${special !== "Special" && "hidden"}`}>
                <Progress.Root
                    className={`relative h-[10px] w-full overflow-hidden rounded-full bg-white my-1 `}
                    style={{
                        transform: "translateZ(0)",
                    }}
                    value={progress || 0}
                >
                    <Progress.Indicator
                        className="ease-[cubic-bezier(0.65, 0, 0.35, 1)] size-full bg-[#D25804] rounded-r-full transition-transform duration-200"
                        style={{
                            transform: `translateX(-${100 - (progress || 0)}%)`,
                            background:
                                "linear-gradient(#D25804, #fff0), repeating-linear-gradient(135deg, rgb(232,6,6) 0 7px, #0000 0 20px), #D25804",
                        }}
                    />
                </Progress.Root>
                <div className="flex items-center justify-between">
                    <span className={`flex items-center justify-start pb-0.5 mt-1 text-[10px] ${timeLeft === 0 ? "text-gray-400" : "text-white"}`}>
                        <Clock className="mr-2 h-5 w-5" />
                        {timeLeft > 0 ? formatTime(timeLeft) : '00:00'}
                    </span>
                    <span className={`${timeLeft === 0 ? "text-gray-400 line-through" : "text-white"} flex items-center gap-1 pb-0.5 mt-1 text-[10px] `}>
                        <AiFillFire color={`${timeLeft === 0 ? "gray" : "#fca311"}`} size={20} />
                        {baseReward}
                    </span>
                </div>
            </div>
            <div className="flex items-center justify-between py-2">
                <h1 className={`jakarta text-xs ${timeLeft !== 0 ? "line-through text-gray-500 animate-pulse" : " text-white"} flex items-center gap-2 font-medium`}>
                    <GiToken color={"#fca311"} size={20} />
                    {shares}
                    {timeLeft === 0 ? null : <AiOutlineSwap color="white" size={19} />}
                </h1>

                <Button disabled={disabled} onClick={onClick} className="bg-orange-500 text-white h-7 text-[10px] max-w-sm rounded-full hover:bg-orange-600 work-sans">
                    {btnTitle}
                </Button>
            </div>
        </div>
    );
};

