import { TextButton } from "@components/common/buttons/Textbutton";
import { LuCheckCircle } from "react-icons/lu";
import Logo from "@assets/images/icons/ravenenie_logo.png";
import { Progress } from "@components/ui/progress";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect, useState } from "react";

interface CheckAccountProps {
    setScreens?: (value: React.SetStateAction<string>) => void
}

export const CheckAccount = ({ setScreens }: CheckAccountProps) => {
    const [isPremium, setIsPremium] = useState<boolean | undefined>(false);
    // Define ranges for random values
    const minTelegramAge = 4; // Minimum age in years
    const maxTelegramAge = 10; // Maximum age in years
    const minActivityLevel = 50; // Minimum activity level (as a percentage)
    const maxActivityLevel = 100; // Maximum activity level
    const minOgStatus = 50; // Minimum OG status level
    const maxOgStatus = 100; // Maximum OG status level

    // Generate random values
    const randomTelegramAge = Math.floor(
        Math.random() * (maxTelegramAge - minTelegramAge + 1)
    ) + minTelegramAge;

    const randomActivityLevel = Math.floor(
        Math.random() * (maxActivityLevel - minActivityLevel + 1)
    ) + minActivityLevel;

    const randomOgStatus = Math.floor(
        Math.random() * (maxOgStatus - minOgStatus + 1)
    ) + minOgStatus;

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            const initData = window.Telegram.WebApp.initDataUnsafe;
            const user = initData?.user;

            // Set Telegram user data
            if (user) {
                setIsPremium(user.is_premium)
            }
        }
    }, []);

    const progressValues = [
        { title: "Telegram age", progress: randomTelegramAge * 10 },
        { title: "Activity level analyzed", progress: randomActivityLevel },
        { title: "Telegram Premium checked", progress: isPremium ? 100 : 0 },
        { title: "Bonus eligibility checked", progress: randomOgStatus * 20 },
    ];


    return (
        <div className="flex flex-col flex-1  w-full min-h-full p-4 relative">
            <div className="flex flex-col flex-1 justify-between gap-4">
                <div className="flex flex-col items-center justify-around h-full gap-10">
                    {/* Logo */}
                    <div className="relative h-fit w-[139px]">
                        <LazyLoadImage effect="blur" src={Logo} alt="Zenstreet Logo" className="h-full w-full object-contain" />
                    </div>
                    <h1 className="text-xl font-bold text-[#FFFFFF] uppercase aqum">Checking account</h1>

                    {/* Progress items */}
                    <div className="flex flex-col gap-8 w-full py-2">
                        {progressValues.map((item, index) => (
                            <div key={index} className="flex flex-col gap-2 py-2">
                                <div className="flex items-center justify-between w-full">
                                    <h1 className="uppercase text-sm font-bold text-[#FFFFFFCC] aqum">{item.title}</h1>
                                    <span><LuCheckCircle color={'#D25804'} size={20} /></span>
                                </div>
                                <Progress value={item.progress} className="w-full h-3 bg-[#D258041F]" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Button */}
                <TextButton
                    name={"Continue"}
                    disabled={false}
                    onClick={() => setScreens && setScreens("rewards")}
                    type={"button"}
                />
            </div>
        </div>
    );
};
