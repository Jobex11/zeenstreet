import { useState, useEffect } from "react";

const CircularTimer = ({ time = 12 }) => {
    const [remainingTime, setRemainingTime] = useState(time);

    useEffect(() => {
        if (remainingTime > 0) {
            const timer = setTimeout(() => setRemainingTime(remainingTime - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [remainingTime]);

    const radius = 25;
    const circumference = 2 * Math.PI * radius;
    const progress = (remainingTime / time) * circumference;

    return (
        <div className="relative w-16 h-16 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg width="64" height="64" viewBox="0 0 64 64">
                {/* Background Circle */}
                <circle cx="32" cy="32" r={radius} stroke="#ccc" strokeWidth="5" fill="transparent" />
                {/* Progress Circle */}
                <circle
                    cx="32"
                    cy="32"
                    r={radius}
                    stroke="green"
                    strokeWidth="5"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    strokeLinecap="round"
                    transform="rotate(-90 32 32)"
                />
            </svg>
            {/* Timer Value */}
            <span className="absolute text-white text-lg font-bold">{remainingTime}</span>
        </div>
    );
};

export default CircularTimer;
