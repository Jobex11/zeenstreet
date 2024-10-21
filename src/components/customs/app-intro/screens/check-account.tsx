import { TextButton } from "@/components/common/buttons/Textbutton";
import { LuCheckCircle } from "react-icons/lu";
import Logo from "../../../../assets/images/icons/Logo.png"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react";

export const CheckAccount = ({ setScreens }: { setScreens?: (value: React.SetStateAction<string>) => void }) => {
    const [progressValues, setProgressValues] = useState([
        { title: "Telegram age", progress: 60 },
        { title: "Activity level analyzed", progress: 40 },
        { title: "Telegram Premium checked", progress: 30 },
        { title: "OG Status confirmed", progress: 10 },
    ]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setProgressValues((prevProgress) => prevProgress.map((item, index) => ({
                ...item,
                progress: item.progress + (index + 1) * 10
            })));
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col justify-around min-h-full p-4">
            <div className="flex flex-col items-center">
                {/* Logo */}
                <div className="relative h-[94px] w-[94px]">
                    <img src={Logo}  alt="Zenstreet Logo" className="h-full w-full" />
                </div>
                <h1 className="text-xl font-bold text-[#FFFFFF] uppercase py-4 aqum">Checking account</h1>

                {/* Map over progress items */}
                <div className="flex flex-col gap-10 w-full py-2">
                    {progressValues.map((item, index) => (
                        <div key={index} className="flex flex-col gap-2 py-2">
                            <div className="flex items-center justify-between w-full">
                                <h1 className="uppercase text-sm font-bold text-[#FFFFFFCC] aqum">{item.title}</h1>
                                <span><LuCheckCircle color={'#D25804'} size={25} /></span>
                            </div>
                            <Progress value={item.progress} className="w-full custom-progress h-4 bg-[#D258041F]" />
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
                className="mt-16"
            />
        </div>
    )
}
