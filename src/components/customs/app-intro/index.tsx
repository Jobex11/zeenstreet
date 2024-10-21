import { useState } from "react";
import { CheckAccount } from "./screens/check-account";
import { Rewards } from "./screens/rewards";
import { Socials } from "./screens/socials";
import { WelcomeUser } from "./screens/welcome-user";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IconButton } from "../../common/buttons/Iconbutton";
import Logo from "../../../assets/images/icons/Logo.png"
// import dottedBg from "../../../assets/images/dotted-bg.png"

const user = {
    year: "4",
    shares: "100,000"
}

export default function ZeenAppIntro() {
    const [screens, setScreens] = useState<string>("welcome-user");


    return (
        <section  className="min-h-screen w-full max-w-xl mx-auto bg-gradient-to-b from-[#292734] to-[#000000] overflow-x-hidden">
            {/* top header */}
            <header className={`flex items-center justify-between bg-transparent w-full h-auto border-none m-0 p-3`}>
                {screens === "welcome-user" ?
                    <div className="flex flex-col">
                            <img src={Logo} alt="Zenstreet Logo" className={`h-[88px] w-[88px]`} />
                        <h1 className="text-[#D25804] uppercase font-bold text-lg aqum">Zenblox</h1>
                    </div>
                    : <div />}
                <IconButton className="bg-transparent hover:bg-transparent border-none shadow-none w-fit">
                    <HiOutlineMenuAlt4 size={25} color={"white"} />
                </IconButton>
            </header>

            {/* nav contents contents */}

            <>
                {screens === "welcome-user" && <WelcomeUser />}
                {screens === "check-account" && <CheckAccount />}
                {screens === "rewards" && <Rewards user={user} setScreens={setScreens} />}
                {screens === "socials" && <Socials />}
            </>
        </section>
    )
}
