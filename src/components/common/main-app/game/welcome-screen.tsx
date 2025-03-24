import Stepper from "@/components/shared/stepper";
import useWindowSize from "@/hooks/useWindowsize";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

function WelcomeScreen() {
    const [showConfetti, setShowConfetti] = useState(false);
    const { width, height } = useWindowSize();

    useEffect(() => {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
    }, [])

    return (
        <section className="flex flex-col items-center pt-10 flex-1 w-full bottom-0 pb-48">
            <h1 className="text-white font-bold aqum ">Welcome to Ravegenie Games</h1>
            <div>
                {showConfetti && <Confetti friction={1} width={width} height={height} />}
            </div>
            <Stepper/>
        </section>
    )
}

export default WelcomeScreen
