import { useState, useEffect } from "react";
import { CheckAccount } from "./screens/check-account";
import { Rewards } from "./screens/rewards";
import { Socials } from "./screens/socials";
import { WelcomeUser } from "./screens/welcome-user";
import { CreateUsername } from "./screens/create-username";
import { CheckSocialAccounts } from "./screens/check-socials";
import confetti from "../../../assets/images/confetti.png"
import dottedBg from "../../../assets/images/dotted-bg.png"
import { useNavigate } from "react-router-dom";



export default function ZeenAppIntro() {
    const [screens, setScreens] = useState<string>("welcome-user");
    const navigate = useNavigate()

    const user = {
        year: "4",
        shares: 100000
    }

    const isUser = false;
    const userAccountInfo = {
        telegramAge: 20,
        activityLevel: 30,
        isPremium: 60,
        ogStatus: 90
    }
    useEffect(() => {
        if (screens === "welcome-user" && !isUser) {
            setTimeout(() => {
                setScreens("check-account");
            }, 5000);
        } else if (screens === "welcome-user" && isUser) {
            setTimeout(() => {
                navigate("/home");
            }, 5000)
        }
    }, [screens, isUser, navigate])

    return (
        <section
            style={{
                backgroundImage: `${screens === "rewards" ? `url(${confetti}), url(${dottedBg})` : `url(${dottedBg})`}`,
                backgroundRepeat: `no-repeat, no-repeat`,
                backgroundPosition: "top center, bottom center",
                backgroundSize: `${screens === "rewards" ? "contain, cover" : "cover, cover"} `,
            }}
            className="min-h-screen w-full flex flex-col flex-1 max-w-xl mx-auto bg-gradient-to-b from-[#292734] to-[#000000]"
        >
            {screens === "welcome-user" && <WelcomeUser />}
            {screens === "check-account" && <CheckAccount userInfo={userAccountInfo} setScreens={setScreens} />}
            {screens === "rewards" && <Rewards user={user} setScreens={setScreens} />}
            {screens === "check-socials" && <CheckSocialAccounts setScreens={setScreens} />}
            {screens === "socials" && <Socials />}
            {screens === "create-username" && <CreateUsername />}

        </section>

    )
}
