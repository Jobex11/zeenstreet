import { useState, useEffect } from "react";
import { CheckAccount } from "./screens/check-account";
import { Rewards } from "./screens/rewards";
import { Socials } from "./screens/socials";
import { WelcomeUser } from "./screens/welcome-user";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import confetti from "../../../assets/images/confetti.png"
import logo from "../../../assets/images/icons/Logo.png"
import dottedBg from "../../../assets/images/dotted-bg.png"
import { useNavigate } from "react-router-dom";



export default function ZeenAppIntro() {
    const [screens, setScreens] = useState<string>("welcome-user");
    const navigate = useNavigate()
    console.log(confetti);

    const user = {
        year: "4",
        shares: 100000
    }

    const isUser = false; 
    useEffect(() => {
        if (screens === "welcome-user" && !isUser) {
            setTimeout(() => {
                setScreens("check-account")
            }, 5000)
        } else if (screens === "welcome-user" && isUser) {
            setTimeout(() => {
                navigate("/home");
            }, 5000)
        }
    }, [screens, isUser, navigate])

    return (
        <section className="bg-gradient-to-b from-[#292734] to-[#000000]">
            <div
                style={{
                    backgroundImage: `${screens === "rewards" ? `url(${confetti}), url(${dottedBg})` : `url(${dottedBg})`}`,
                    backgroundRepeat: `no-repeat, no-repeat`,
                    backgroundPosition: "top center, bottom center", 
                    backgroundSize: "contain, cover",
                }}
                className="min-h-screen w-full flex flex-col flex-1 max-w-xl mx-auto bg-gradient-to-b from-[#292734] to-[#000000]"
            >
                {/* top header */}
                <header className={`flex items-center justify-between bg-transparent w-full h-auto border-none m-0 p-3`}>
                    {screens === "welcome-user" ? (
                        <div className="flex flex-col gap-0">
                            <img src={logo} alt="Zenstreet Logo" className={`h-[88px] w-[88px]`} />
                            <h1 className="text-[#D25804] uppercase font-bold text-lg aqum">Zenblox</h1>
                        </div>
                    ) : <div />}
                    <HiOutlineMenuAlt4 size={25} color={"white"} />
                </header>

                {/* nav contents contents */}
                {screens === "welcome-user" && <WelcomeUser />}
                {screens === "check-account" && <CheckAccount setScreens={setScreens} />}
                {screens === "rewards" && <Rewards user={user} setScreens={setScreens} />}
                {screens === "socials" && <Socials />}
            </div>
        </section>
    )
}
