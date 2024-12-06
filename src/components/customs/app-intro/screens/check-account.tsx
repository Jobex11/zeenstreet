import { TextButton } from "../../../common/buttons/Textbutton";
import { LuCheckCircle } from "react-icons/lu";
import Logo from "../../../../assets/images/icons/ravenenie_logo.png";
import { Progress } from "../../../ui/progress";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import { useState, useEffect } from "react";


interface CheckAccountProps {
    userInfo: {
        telegramAge: number,
        activityLevel: number,
        isPremium: number,
        ogStatus: number
    };
    setScreens?: (value: React.SetStateAction<string>) => void
}

export const CheckAccount = ({ setScreens, userInfo }: CheckAccountProps) => {
    const progressValues = [
        { title: "Telegram age", progress: userInfo.telegramAge },
        { title: "Activity level analyzed", progress: userInfo.activityLevel },
        { title: "Telegram Premium checked", progress: userInfo.isPremium },
        { title: "Bonus eligibility checked", progress: userInfo.ogStatus },
    ];

    // I simply removed the useEffect for now

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setProgressValues((prevProgress) =>
    //             prevProgress.map((item, index) => ({
    //                 ...item,
    //                 progress: item.progress + (index + 1) * 10,
    //             }))
    //         );
    //     }, 500);
    //     return () => clearTimeout(timer);
    // }, []);

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
                    className=""
                />
            </div>
        </div>
    );
};
