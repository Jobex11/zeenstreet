import { TextButton } from "@components/common/buttons/Textbutton";
import { LuCheckCircle } from "react-icons/lu";
import Logo from "@assets/images/icons/ravenenie_logo.png";
import { Progress } from "@components/ui/progress";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface CheckAccountProps {
    setScreens?: (value: React.SetStateAction<string>) => void
}

export const CheckAccount = ({ setScreens }: CheckAccountProps) => {

    // Define min and max ranges for values
    const minElementalProvince = 1000;
    const maxElementalProvince = 90000;
    const minEmberOfEnlightmentLevel = 1000;
    const maxEmberOfEnlightmentLevel = 90000;
    const minVeilofFortune = 1000;
    const maxVeilofFortune = 90000;
    const minBonusEligible = 1000;
    const maxBonusEligible = 90000;

    const getRandomValue = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    // Normalize a value to a given range
    const normalizeValue = (value: number, min: number, max: number) =>
        Math.round(((value - min) / (max - min)) * 100);

    // Generate random values and normalize them to a range of 0–100
    const randomElementalProvince = normalizeValue(
        getRandomValue(minElementalProvince, maxElementalProvince),
        minElementalProvince,
        maxElementalProvince
    );
    const randomEmberOfEnlightmentLevel = normalizeValue(
        getRandomValue(minEmberOfEnlightmentLevel, maxEmberOfEnlightmentLevel),
        minEmberOfEnlightmentLevel,
        maxEmberOfEnlightmentLevel
    );
    const randomVeilofFortune = normalizeValue(
        getRandomValue(minVeilofFortune, maxVeilofFortune),
        minVeilofFortune,
        maxVeilofFortune
    );
    const randomBonusEligible = normalizeValue(
        getRandomValue(minBonusEligible, maxBonusEligible),
        minBonusEligible,
        maxBonusEligible
    );

    const progressValues = [
        { title: "Elemental Province", progress: randomElementalProvince },
        { title: "Ember of Enlightment", progress: randomEmberOfEnlightmentLevel },
        { title: "Veil of Fortune", progress: randomVeilofFortune },
        { title: "Bonus Eligibility Check", progress: randomBonusEligible },
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
