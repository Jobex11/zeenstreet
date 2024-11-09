import { TextButton } from "../../../common/buttons/Textbutton";
import { Card } from "../../../ui/card";
import medal from "../../../../assets/images/icons/medal.png"
import Logo from "../../../../assets/images/icons/ravegenie_logo.png";
import { Fade, Zoom } from "react-awesome-reveal";
import CountUp from "react-countup"

interface RewardsProps {
    year: string;
    shares: number
}

export const Rewards = (
    {
        user,
        setScreens
    }: {
        user: RewardsProps,
        setScreens?: (value: React.SetStateAction<string>) => void
    }
) => {
    return (
        <div className="flex flex-col flex-1 justify-stretch gap-10  w-full min-h-full p-4 relative">
            <div className="flex flex-1 flex-col justify-stretch">
                <div className="relative h-[139px] w-[139px] mx-auto">
                    <img src={Logo} alt="" className="h-full w-full object-contain" />
                </div>

                <div className="flex flex-col flex-1 justify-around">
                    <div>
                        <Fade>
                            <div className="aqum flex flex-col gap-4 items-center">
                                <h1 className="text-7xl text-[#D25804] font-extrabold aqum">{user?.year}</h1>
                                <h1 className="text-[#D25804] text-2xl">Years</h1>

                                <div className="relative h-28 w-28">
                                    <img src={medal} alt="" className="h-full w-full object-contain object-center" />
                                </div>

                            </div>
                        </Fade>
                        <Zoom>
                            <div className="flex flex-col gap-2 items-center">
                                <h1 className="capitalise text-lg font-bold text-white text-center py-3 aqum">Here is your Reward</h1>

                                <Card className="aqum flex w-56 h-[89px] mx-auto border-none flex-col rounded-xl items-center justify-center gap-2 p-3 bg-[#D25804] text-white">
                                    <h1 className=""><CountUp start={0} separator="," end={100000} /></h1>
                                    <h1>$SHARES</h1>
                                </Card>

                                <blockquote className="tahoma max-w-[286px] uppercase pt-5 mx-auto text-xs font-medium text-center py-2 text-[#C2C2C2]">
                                    Complete the quests in the next page to claim your shares
                                </blockquote>
                            </div>
                        </Zoom>
                    </div>
                </div>
                </div>
                <TextButton
                    name={"Proceed"}
                    disabled={false}
                    onClick={() => setScreens && setScreens("check-socials")}
                    className={"uppercase mt-4"}
                />
            

        </div>
    )
}
