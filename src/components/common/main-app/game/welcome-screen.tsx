import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@lib/store"
import Confetti from "react-confetti";
import useWindowSize from "@/hooks/useWindowsize";
import game_logo from "@assets/images/game-logo.png";
import model from "@assets/images/model.png";
import { showConfetti } from "@/hooks/redux/slices/game-confetti";
import { setActiveScreen } from "@/hooks/redux/slices/game-screens-slice";
import { SCREENS } from "@/lib/utils";



function WelcomeScreen() {
    const { width, height } = useWindowSize();
    const dispatch = useDispatch();

    // Get confetti state from Redux
    const confettiShown = useSelector((state: RootState) => state.confetti.confettiShown);
    const [showLocalConfetti, setShowLocalConfetti] = useState(false);

    useEffect(() => {
        if (!confettiShown) {
            setShowLocalConfetti(true);
            dispatch(showConfetti());
            setTimeout(() => setShowLocalConfetti(false), 5000);
        }
    }, [confettiShown, dispatch]);

    // useEffect(() => {
    //     setTimeout(() => {
    //         dispatch(setActiveScreen(SCREENS.PHASE_1));
    //     }, 7000);
    // }, [dispatch]);

    return (
        <section className="flex flex-col items-center justify-stretch min-h-full flex-1 w-full bg-[#0f0543]">
            <div className="flex flex-col items-center justify-around gap-20 flex-1">
                <div className={"flex flex-col items-center"}>
                    <h1 className="text-white font-bold fredoka text-2xl">Welcome to</h1>
                    <img
                        src={game_logo}
                        alt={"An image displaying Ravegenie Games as an icon"}
                        className={"object-cover h-24 w-full mt-2"}
                    />
                </div>

                <div>
                    {showLocalConfetti && <Confetti numberOfPieces={500} recycle={false} width={width} height={height} />}
                    <h1 className={"atkinson text-center text-white text-base"}>Play games and win real rewards</h1>
                    <div>
                        <button onClick={() => dispatch(setActiveScreen(SCREENS.PHASE_1))}>front</button>
                    </div>
                    <img src={model} alt={"An image displaying Ravegenie Games as an icon"} className={"object-contain"} />
                </div>
            </div>
        </section>
    );
}

export default WelcomeScreen;
