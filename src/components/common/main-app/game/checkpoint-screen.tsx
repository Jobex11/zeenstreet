import { User } from "lucide-react";
import coins_img from "@assets/images/shares-img.png"
import booster_img from "@assets/images/Booster_img.png"
import flag_img_checkpoint from "@assets/images/checkpoint_flag.png"
import gold_bar from "@assets/images/gold-bars.png";
import { lazy } from "react"
import { setActiveScreen } from "@/hooks/redux/slices/game-screens-slice";
import { SCREENS } from "@/lib/utils";
import { useDispatch } from "react-redux";

const ShareFormatter = lazy(() =>
    import("@/components/shared/shareFormatter").then((mod) => ({ default: mod.ShareFormatter }))
);

interface CheckpointScreenProps {
    total_players: number;
    screen_index: string;
    available_players: number;
    rewards: {
        coins: number;
        golds: number;
        booster: number;
    }
}

function CheckpointScreen({ total_players, screen_index, rewards, available_players }: CheckpointScreenProps) {
    const { coins = 0, golds = 0, booster = 0 } = rewards;
    const dispatch = useDispatch()
    const reward = [
        { icon: gold_bar, reward: coins, text: "Checkpoint Reward Pool" },
        { icon: coins_img, reward: golds, text: "Your Share" },
        { icon: booster_img, reward: booster, text: "Booster" }
    ]


    return (
        <div className="flex flex-col items-center bg-[#0f0543] min-h-full px-3 py-10 text-white relative">
            {/* Image Grid */}
            <div className="w-full py-5 relative">
                <div className="flex relative flex-row items-center justify-between gap-1">
                    {/* Left section */}
                    <div className="flex flex-row items-center gap-1">
                        <User size={25} />
                        <span className="inconsolata font-medium text-base "><ShareFormatter shares={total_players} /></span>
                    </div>

                    {/* Right section */}
                    <span className="atkinson font-medium">{screen_index}</span>
                </div>
            </div>

            <div className={"flex flex-col items-center"}>
                <h1 className={"atkinson font-medium text-2xl"}>Checkpoint!</h1>
                <div className="h-64">
                    <img
                        src={flag_img_checkpoint}
                        alt={"an image showing a trophy"}
                        className={"h-full w-full object-contain"} />
                </div>
                <h1 className={"atkinson text-base text-center"}>
                    <span className={"text-green-500"}>Congratulations</span>. You and <span className={"text-yellow-600"}>
                        <ShareFormatter shares={available_players} />
                    </span> others made it here
                </h1>
                <button onClick={() => dispatch(setActiveScreen(SCREENS.TIME_UP))}>back</button>
            </div>

            <div className="bg-[#8986b7]/15 shadow-md grid grid-cols-2 md:grid-cols-4 place-items-center rounded-md gap-3 p-2 w-full border my-5 border-gray-500">
                {reward.map((rwd, index) => (
                    <div
                        key={index}
                        className={`flex flex-col items-center gap-2 ${index === 0 ? "col-span-2" : "col-span-1"
                            }`}
                    >
                        <h1 className={"text-[#F5A70D] text-sm fredoka"}>{rwd.text}</h1>
                        <div className={"flex flex-row items-center gap-2"}>
                            <img src={rwd.icon} alt="img" className={` ${index === 0 ? "h-16 w-16" : "h-14 w-14"}  object-contain`} />
                            <span className="atkinson font-semibold text-lg">+{rwd.reward}</span>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default CheckpointScreen
