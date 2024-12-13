import { useState, useEffect, useCallback } from "react";
import { CheckAccount } from "./screens/check-account";
import { Rewards } from "./screens/rewards";
import { Socials } from "./screens/socials";
import { WelcomeUser } from "./screens/welcome-user";
import { CreateUsername } from "./screens/create-username";
import confetti from "../../../assets/images/confetti.png";
import dottedBg from "../../../assets/images/dotted-bg.png";
import { useNavigate } from "react-router-dom";

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
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const user = {
        year: "4",
        shares: 100000,
    };

    const userAccountInfo = {
        telegramAge: 20,
        activityLevel: 30,
        isPremium: 60,
        ogStatus: 90,
    };

    const checkUsername = useCallback(async () => {
        setLoading(true);
        try {
            // Get Telegram ID from Telegram WebApp
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const telegram = (window as any).Telegram?.WebApp;
            const telegramId = telegram?.initDataUnsafe?.user?.id;

            if (!telegramId && currentScreen === SCREENS.WELCOME) {
                setTimeout(() => setCurrentScreen(SCREENS.CREATE_USERNAME), TIMEOUT);
                return;
            }

            const response = await fetch(
                `https://ravegenie-vgm7.onrender.com/api/username/has/${telegramId}`
            );
            const data = await response.json();

            if (response.ok && data.hasPreferredUsername) {
                setLoading(false);
                setTimeout(() => navigate("/home"), TIMEOUT);
            } else {
                setTimeout(() => setCurrentScreen(SCREENS.CREATE_USERNAME), TIMEOUT);
            }
        } catch (error) {
            console.error("Error checking username:", error);
            setTimeout(() => setCurrentScreen(SCREENS.WELCOME), TIMEOUT);
        } finally {
            setLoading(false);
        }
    }, [currentScreen, navigate]);

    useEffect(() => {
        checkUsername();
    }, [checkUsername]);

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
                        style={{ width: loading ? "100%" : "0%" }}
                    />
                )}
            </div>

            {currentScreen === SCREENS.WELCOME && <WelcomeUser />}
            {currentScreen === SCREENS.CREATE_USERNAME && (
                <CreateUsername setScreens={setCurrentScreen} />
            )}
            {currentScreen === SCREENS.CHECK_ACCOUNT && (
                <CheckAccount userInfo={userAccountInfo} setScreens={setCurrentScreen} />
            )}
            {currentScreen === SCREENS.REWARDS && (
                <Rewards user={user} setScreens={setCurrentScreen} />
            )}
            {currentScreen === SCREENS.SOCIALS && <Socials />}
        </section>
    );
}
