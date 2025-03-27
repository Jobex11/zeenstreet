import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import GameImageIcon from "@assets/images/game-name.png";
import { getButtonConfig, SCREENS } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { setActiveScreen } from "@/hooks/redux/slices/game-screens-slice";

interface GainAccessProps {
    time: string;
    status: "waiting" | "qualified" | "closed";
}
function GainAccess({ status, time }: GainAccessProps) {
    const [gameStatus, setGameStatus] = useState<"waiting" | "qualified" | "closed">(status);
    const dispatch = useDispatch()
    useEffect(() => {
        setGameStatus(status);
    }, [status]);

    // Handle Button Click
    const handleButtonClick = () => {
        if (gameStatus === "waiting") {
            // Simulate a successful request
            setTimeout(() => {
                setGameStatus("qualified");
                dispatch(setActiveScreen(SCREENS.GAME_SCREEN))
            }, 5000);
        }
    };

    const { text, bgColor, textColor } = getButtonConfig({ gameStatus });

    return (
        <section className="flex flex-col h-full flex-1 items-center justify-between game_phase_2 pb-10">
            <div className="absolute inset-0 bg-[#0f0543] opacity-50" />

            {/* Centered Image */}
            <div className="flex-1 flex items-center justify-center mt-[8rem] relative">
                <img src={GameImageIcon} alt="Pick a word image" className="h-48 w-48 object-contain" />
            </div>

            {/* Text & Button pushed downward */}
            <div className="flex flex-col items-center gap-3 pb-14 relative">
                <h1 className="text-white atkinson text-base">Game begins in...</h1>
                <h1 className="text-white atkinson text-3xl font-semibold">{time}</h1>

                {/* Button changes dynamically */}
                <Button
                    className={`${bgColor} rounded-md px-10 ${textColor} fredoka disabled:opacity-80`}
                    onClick={handleButtonClick}
                    disabled={gameStatus === "closed"}
                >
                    {text}
                </Button>
            </div>
        </section>
    );
}

export default GainAccess;
