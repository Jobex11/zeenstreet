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
import { FiLoader } from "react-icons/fi"
import { useGetTelegramId } from "@hooks/getTelegramId";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

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
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { telegramId } = useGetTelegramId()
    const confirmedAccounts = useSelector((state: RootState) => state.confirmAccount.confirmedAccounts);
    const allConfirmed = Object.values(confirmedAccounts).every(Boolean);
    const { data: users, isLoading, } = useCheckUsernameQuery(telegramId ?? "", {
        skip: !telegramId,
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

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


    useEffect(() => {
        const welcomeTimeout = setTimeout(() => {
            if (isLoading) {
                setLoading(true);
                return;
            }

            // Navigate directly to home if username and all accounts are confirmed
            if (!isLoading && users?.hasPreferredUsername && allConfirmed) {
                navigate("/home");
                return;
            }
            // Show create username screen if username is not set
            if (!isLoading && !users?.hasPreferredUsername) {
                setCurrentScreen(SCREENS.CREATE_USERNAME);
                return;
            }

            // Check if all accounts are confirmed
            setCurrentScreen(SCREENS.SOCIALS);
        }, TIMEOUT);

        // Cleanup timeout on unmount
        return () => clearTimeout(welcomeTimeout);
    }, [isLoading, allConfirmed, navigate, users]);



    const getBackgroundStyles = () => {
        const isSocialsOrRewards = [SCREENS.SOCIALS, SCREENS.REWARDS].includes(
            currentScreen
        );
        return {
            backgroundImage: isSocialsOrRewards
                ? `url(${confetti}), url(${dottedBg})`
                : `url(${dottedBg})`,
            backgroundSize: isSocialsOrRewards ? "auto, cover" : "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
        };
    };


    return (
        <section
            style={getBackgroundStyles()}
            className="min-h-screen w-full flex flex-col max-w-xl relative mx-auto bg-gradient-to-b from-[#292734] to-[#000000]"
        >
            <div className="h-full w-full absolute flex flex-col justify-center items-center overflow-hidden">
                {loading && (
                    <FiLoader size={30} color="white" className="animate-spin" />
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
            {currentScreen === SCREENS.SOCIALS && <Socials telegram_id={telegramId} />}
        </section>
    );
}
