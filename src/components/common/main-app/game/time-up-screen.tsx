import { User } from "lucide-react";
import time_up_img from "@assets/images/Time_up_icon.png"
import coins_img from "@assets/images/shares-img.png"
import booster_img from "@assets/images/Booster_img.png"
import flag_img from "@assets/images/flag_img.png"
import { Button } from "@/components/ui/button";
import { useEffect, lazy } from "react";
import { useDispatch } from "react-redux";
import { SCREENS } from "@/lib/utils";
import { setActiveScreen } from "@/hooks/redux/slices/game-screens-slice";

const ShareFormatter = lazy(() =>
    import("@/components/shared/shareFormatter").then((mod) => ({ default: mod.ShareFormatter }))
);


interface TimeUpScreenProps {
    total_players: number;
    end_game: boolean;
    eliminated_players: number;
    rewards: {
        coins: number;
        checkpoint: number;
        booster: number;
    }
}

function TimeUpScreen({ total_players, end_game, rewards, eliminated_players }: TimeUpScreenProps) {
    const { coins = 0, checkpoint = 0, booster = 0 } = rewards
    const dispatch = useDispatch()

    const reward = [
        { icon: coins_img, reward: coins },
        { icon: flag_img, reward: checkpoint },
        { icon: booster_img, reward: booster }
    ]

    useEffect(() => {
        setTimeout(() => {
            dispatch(setActiveScreen(SCREENS.CHECK_POINT));
        }, 7000);
    }, [dispatch]);

    return (
        <div className="flex flex-col items-center bg-[#0f0543] min-h-screen px-4 pt-10 text-white relative">
            {/* Image Grid */}
            <div className="w-full py-5 relative">
                <div className="flex relative flex-row items-center justify-between gap-1">
                    {/* Left section */}
                    <div className="flex flex-row items-center gap-1">
                        <User size={25} />
                        <span className="inconsolata font-semibold text-base "><ShareFormatter shares={total_players} /></span>
                    </div>

                    {/* Right section */}
                    <span className="atkinson font-semibold">{end_game && <button onClick={() => { }}>End Game</button>}</span>
                </div>
            </div>

            <div className={"flex flex-col items-center"}>
                <h1 className={"atkinson font-semibold text-2xl"}>UhOh! Time's Up</h1>
                <div>
                    <img
                        src={time_up_img}
                        alt={"an image showing a trophy"}
                        className={"h-auto w-full object-contain"} />
                </div>
                <h1 className={"atkinson text-base text-center"}>
                    You and <span className={"text-yellow-600"}><ShareFormatter shares={eliminated_players} /></span> others are eliminated.
                    Not to worry, you'll get 'em all next time.
                </h1>
            </div>

            <div className={"bg-[#0f0543] shadow-md grid grid-cols-3 place-items-center rounded-md gap-3 p-2 w-full border my-5 border-gray-300"}>
                {reward.map((rwd) => (
                    <div key={rwd.reward} className={"flex flex-row items-center"}>
                        <img src={rwd.icon} alt={"img"} className={"h-14 w-14 object-contain"} />
                        <span className={"atkinson font-bold text-lg"}>+{rwd.reward}</span>
                    </div>
                ))}
            </div>

            <div className={"flex flex-row items-center justify-around w-full gap-10 my-5"}>
                <Button className={"bg-[#F5A70D] hover:bg-yellow-600 w-44 fredoka text-black px-4"}>Share</Button>
                <Button className={"bg-green-600 hover:bg-green-500 w-44  text-white fredoka px-4"}>Continue</Button>
            </div>

        </div>
    )
}

export default TimeUpScreen
