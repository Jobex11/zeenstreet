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


export default function ZeenAppIntro() {

    const [currentScreen, setCurrentScreen] = useState<string>(SCREENS.WELCOME);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const telegramId = (window as any).Telegram?.WebApp?.initDataUnsafe?.user?.id;

    // Use RTK Query hook for checking the username
    const { data, isLoading, } = useCheckUsernameQuery(telegramId ?? "", {
        skip: !telegramId, 
    });

    useEffect(() => {
        if (isLoading) {
            setLoading(true);
        } else {
            setLoading(false);
            
            // If no data is returned or user doesn't exist
            if (!data || !data.hasPreferredUsername) {
                setTimeout(() => {
                    if (!telegramId) {
                        setCurrentScreen(SCREENS.CREATE_USERNAME);
                    } else {
                        setCurrentScreen(SCREENS.CHECK_ACCOUNT);
                    }
                }, TIMEOUT);
            } else if (data?.hasPreferredUsername) {
                // Navigate to home screen if username exists
                setTimeout(() => navigate("/home"), TIMEOUT);
            }
        }
    }, [isLoading, data, telegramId, navigate]);
    

    


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
