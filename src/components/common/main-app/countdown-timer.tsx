import { formatTime } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { GiToken } from 'react-icons/gi';
import { IoMdClock } from "react-icons/io";

interface Timer {
    timeRemaining: number;
    countdown: number;
    baseReward: number;
    shares: number;
}

export const CountdownTimer = ({ timeRemaining, countdown, shares, baseReward }: Timer) => {
    const [timeLeft, setTimeLeft] = useState(Math.max(timeRemaining, 0));
    const [progress, setProgress] = useState((timeRemaining / countdown) * 100);

    useEffect(() => {
        // Ensure countdown is valid
        if (countdown <= 0) {
            console.error("Invalid countdown value. Countdown must be greater than 0.");
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                const newTime = Math.max(prevTime - 1, 0);
                setProgress((newTime / countdown) * 100);
                return newTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [countdown]);

    return (
        <div>
            <div
                className={`${timeLeft === 0 && "hidden"}`}
                style={{
                    width: '100%',
                    height: '11px',
                    backgroundColor: '#ddd',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                <div
                    className='rounded-r-full bg-orange-500'
                    style={{
                        width: `${progress}%`,
                        height: '100%',
                        transition: 'width 1s linear',
                    }}
                ></div>
            </div>
            <div className={"flex items-center justify-between py-2"}>
                <h1 className={"work-sans text-sm flex items-center gap-2 font-semibold text-white"}>
                    <GiToken color={"#fca311"} size={25} />
                    {timeLeft === 0 ? shares : baseReward}
                    {" "} shares</h1>

                <span className={`flex ${timeLeft === 0 && "hidden"} items-center gap-2 min-w-28  text-white work-sans`}>
                    <IoMdClock color='white' size={25} />
                    {formatTime(timeLeft)}
                </span>
            </div>
        </div>
    );
};
