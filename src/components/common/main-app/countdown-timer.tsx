import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { GiToken } from "react-icons/gi";
import { Clock } from 'lucide-react'
import { AiOutlineSwap, AiFillFire } from "react-icons/ai";
import { formatTime } from "@lib/utils"

interface Timer {
    timeRemaining: number;
    countdown: number;
    baseReward: number;
    shares: number;
    _id: string
    disabled: boolean;
    onClick: () => void;
    btnTitle: string
}

export const CountdownTimer = ({ timeRemaining, disabled, btnTitle, onClick, countdown, _id, shares, baseReward }: Timer) => {
    const TIMER_KEY = "countdown-timer";
    const [progress, setProgress] = useState<number>(0);

    const [timeLeft, setTimeLeft] = useState(() => {
        const savedTime = localStorage.getItem(TIMER_KEY + _id);
        const now = Date.now();

        if (savedTime) {
            const { savedTimeLeft, lastUpdated } = JSON.parse(savedTime);
            const elapsed = Math.floor((now - lastUpdated) / 1000); // Time elapsed in seconds
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
    }, [_id, countdown]);

    useEffect(() => {
        setProgress((timeLeft / countdown) * 100);
    }, [timeLeft, countdown]);



    return (
        <div>
            <div className={`${timeLeft === 0 && "hidden"}`}>
                <div
                    style={{
                        width: "100%",
                        height: "10px",
                        backgroundColor: "#ddd",
                        borderRadius: "5px",
                        overflow: "hidden",
                    }}
                >
                    <div
                        className="bg-orange-500 rounded-r-full"
                        style={{
                            width: `${progress}%`,
                            height: "100%",
                            transition: "width 0.3s linear",
                        }}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <span className={`flex items-center justify-start pb-0.5 mt-1 text-[10px] text-white`}>
                        <span className="caption-top select-text text-gray-400 line-through">
                            {timeLeft === 0 && baseReward}
                        </span>
                        <Clock className="mr-2 h-5 w-5" />
                        {timeLeft > 0 ? formatTime(timeLeft) : 0}
                    </span>
                    <span className={`flex items-center gap-1 pb-0.5 mt-1 text-[10px] text-white`}>
                        <AiFillFire color={"#fca311"} size={20} />  {baseReward}
                    </span>
                </div>
            </div>
            <div className="flex items-center justify-between py-2">
                <h1 className={`jakarta text-xs ${timeLeft !== 0 ? "line-through text-gray-500 animate-pulse" : " text-white"} flex items-center gap-2 font-medium`}>
                    <GiToken color={"#fca311"} size={20} />
                    {shares}
                    {timeLeft === 0 ? null : <AiOutlineSwap color="white" size={19} />}
                </h1>

                <Button disabled={disabled} onClick={onClick} className="bg-orange-500 text-white h-7 tex-[10px] rounded-md hover:bg-orange-600 work-sans">
                    {btnTitle}
                </Button>
            </div>
        </div>
    );
};

