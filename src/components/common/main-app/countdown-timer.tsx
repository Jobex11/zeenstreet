import { useState, useEffect } from "react";
import { GiToken } from "react-icons/gi";
import { IoMdClock } from "react-icons/io";

interface Timer {
    timeRemaining: number;
    countdown: number;
    baseReward: number;
    shares: number;
    _id: string
}

export const CountdownTimer = ({ timeRemaining, countdown, _id, shares, baseReward }: Timer) => {
    const TIMER_KEY = "countdown-timer";
    const [progress, setProgress] = useState<number>(0);

    const [timeLeft, setTimeLeft] = useState(() => {
        const savedTime = localStorage.getItem(TIMER_KEY + _id);
        const now = Date.now();

        if (savedTime) {
            const { savedTimeLeft, lastUpdated } = JSON.parse(savedTime);
            const elapsed = Math.floor((now - lastUpdated) / 1000); // Time elapsed in seconds
            const calculatedTimeLeft = Math.max(savedTimeLeft - elapsed, 0);

            // Use the smaller of timeRemaining and calculatedTimeLeft
            return Math.min(timeRemaining, calculatedTimeLeft);
        }

        // If no saved time, use the `timeRemaining` from the data
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

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

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
            </div>
            <div className="flex items-center justify-between py-2">
                <h1 className="work-sans text-sm flex items-center gap-2 font-semibold text-white">
                    <GiToken color={"#fca311"} size={25} />
                    {timeLeft === 0 ? shares : `${baseReward}/${shares}`} shares
                </h1>
                <span className={`flex items-center justify-end pb-0.5 gap-2 text-xs text-white`}>
                    <span className="caption-top select-text text-gray-400 line-through">
                        {timeLeft === 0 && baseReward}
                    </span>
                    <IoMdClock size={25} />
                    {timeLeft > 0 ? formatTime(timeLeft) : ""}
                </span>
            </div>
        </div>
    );
};

