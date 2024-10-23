import { useState, useEffect } from "react";
import { CheckAccount } from "./screens/check-account";
import { Rewards } from "./screens/rewards";
import { Socials } from "./screens/socials";
import { WelcomeUser } from "./screens/welcome-user";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import confetti from "../../../assets/images/confetti.png"
import logo from "../../../assets/images/icons/Logo.png"
import dottedBg from "../../../assets/images/dotted-bg.png"



export default function ZeenAppIntro() {
    const [screens, setScreens] = useState<string>("welcome-user");
    console.log("Users");

    const user = {
        year: "4",
        shares: 100000
    }

    useEffect(() => {
         if(screens === "welcome-user") {
            setTimeout(() => {
                setScreens("check-account")
            },5000)
         }else return;
    })

    return (
        <section
            style={{
                backgroundImage: `${screens === "rewards" ? `url(${confetti}), url(${dottedBg})` : `url(${dottedBg})`}`,
                backgroundRepeat: `no-repeat, no-repeat`,
                backgroundPosition: "top, center",
                backgroundSize: `contain, cover`,
            }}
            className="min-h-screen w-full max-w-xl mx-auto "
        >
            {/* top header */}
            <div className="min-h-screen flex flex-col flex-1 bg-gradient-to-b from-[#292734] to-[#000000]">
                <header className={`flex items-center justify-between bg-transparent w-full h-auto border-none m-0 p-3`}>
                    {screens === "welcome-user" ? (
                        <div className="flex flex-col">
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
