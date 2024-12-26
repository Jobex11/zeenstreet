import { useState, useEffect } from "react";
import { CheckAccount } from "./screens/check-account";
import { Rewards } from "./screens/rewards";
import { Socials } from "./screens/socials";
import { WelcomeUser } from "./screens/welcome-user";
import { CreateUsername } from "./screens/create-username";
import confetti from "@assets/images/confetti.png";
import dottedBg from "@assets/images/dotted-bg.png";
import { useNavigate } from "react-router-dom";
import { useCheckUsernameQuery } from "@hooks/redux/users";

const SCREENS = {
    WELCOME: "welcome-user",
    CREATE_USERNAME: "create-username",
    CHECK_ACCOUNT: "check-account",
    REWARDS: "rewards",
    SOCIALS: "socials",
};

const TIMEOUT = 4000;

export default function ZeenAppIntro() {

    const [currentScreen, setCurrentScreen] = useState<string>(SCREENS.WELCOME);
    const [loading,] = useState<boolean>(false);
    const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
    const navigate = useNavigate();

    const provinces = [
        { name: "Obsidia", minShares: 1000, maxShares: 10000 },
        { name: "Platinara", minShares: 10001, maxShares: 20000 },
        { name: "Gravis", minShares: 20001, maxShares: 30000 },
        { name: "Jadelandia", minShares: 30001, maxShares: 40000 },
        { name: "Rubyterra", minShares: 40001, maxShares: 50000 },
        { name: "Ebonheim", minShares: 50001, maxShares: 60000 },
        { name: "Sapphirum", minShares: 60001, maxShares: 70000 },
        { name: "Astropolis", minShares: 70001, maxShares: 80000 },
        { name: "Opulexia", minShares: 80001, maxShares: 90000 },

    ];
    const getRandomShares = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    const assignProvince = (shares: number) => {
        return provinces.find(
            (province) => shares >= province.minShares && shares <= province.maxShares
        )?.name || "Unknown";
    };

    const minShares = 1000;
    const maxShares = 90000;
    const randomShares = getRandomShares(minShares, maxShares);

    const user = {
        shares: randomShares,
        province: assignProvince(randomShares),
    };


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const telegramId = (window as any).Telegram?.WebApp?.initDataUnsafe?.user?.id;
    const { data, isLoading, } = useCheckUsernameQuery(telegramId ?? "", {
        skip: !telegramId
    });

    useEffect(() => {
        const hasOpenedBefore = localStorage.getItem('hasOpenedBefore');
        if (hasOpenedBefore) {
            setIsFirstTime(false);
        } else {
            localStorage.setItem('hasOpenedBefore', 'true');
        }
    }, []);

    useEffect(() => {
        if (isLoading) return;

        if (data?.hasPreferredUsername) {
            if (!isFirstTime) {
                // If not first time and has username, show welcome briefly then go to home
                setTimeout(() => navigate("/home"), TIMEOUT);
            } else {
                // If first time and has username, go through the flow
                setCurrentScreen(SCREENS.CHECK_ACCOUNT);
            }
        } else if (currentScreen === SCREENS.WELCOME) {
            // If no username, start the flow from create username
            setTimeout(() => setCurrentScreen(SCREENS.CREATE_USERNAME), TIMEOUT);
        }
    }, [isLoading, data, isFirstTime, navigate, currentScreen]);



    const getBackgroundStyles = () => {
        const isRewardsScreen = currentScreen === SCREENS.REWARDS;
        return {
            backgroundImage: isRewardsScreen
                ? `url(${confetti}), url(${dottedBg})`
                : `url(${dottedBg})`,
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundPosition: "top center, bottom center",
            backgroundSize: isRewardsScreen ? "contain, cover" : "cover, cover",
        };
    };


    return (
        <section
            style={getBackgroundStyles()}
            className="min-h-screen w-full flex flex-col max-w-xl mx-auto bg-gradient-to-b from-[#292734] to-[#000000]"
        >
            <div className="h-1 w-full relative overflow-hidden">
                {loading && (
                    <div
                        className="bg-orange-600 h-full transition-all duration-500 animate-pulse"
                        style={{ width: isLoading ? "100%" : "0%" }}
                    />
                )}
            </div>

            {currentScreen === SCREENS.WELCOME && <WelcomeUser />}
            {currentScreen === SCREENS.CREATE_USERNAME && (
                <CreateUsername setScreens={setCurrentScreen} />
            )}
            {currentScreen === SCREENS.CHECK_ACCOUNT && (
                <CheckAccount setScreens={setCurrentScreen} />
            )}
            {currentScreen === SCREENS.REWARDS && (
                <Rewards user={user} setScreens={setCurrentScreen} />
            )}
            {currentScreen === SCREENS.SOCIALS && <Socials />}
        </section>
    );
}
