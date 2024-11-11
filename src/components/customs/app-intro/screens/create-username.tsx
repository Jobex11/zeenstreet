import Logo from "../../../../assets/images/icons/ravenenie_logo.png";
import { TextButton } from "../../../common/buttons/Textbutton";
import { Input } from "../../../ui/input";
import smily_man from "../../../../assets/images/smily_man.png"
// import dottedBg from "../../../../assets/images/dotted-bg.png"
import Typewriter from 'typewriter-effect';


export function CreateUsername({
    setScreens
}: {
    setScreens?: (value: React.SetStateAction<string>) => void
}) {
    return (
        <div className="flex flex-col flex-1 justify-stretch gap-10  w-full min-h-full relative p-4">
            <div className="flex items-center mx-auto">
                <div className="relative max-h-[139px] max-w-[139px] ">
                    <img src={Logo} alt="Zenstreet Logo" className="h-full w-full object-contain mx-auto" />
                </div>
            </div>
            <div className="relative overflow-hidden" >
                <img src={smily_man} alt="" className="object-contain max-h-[514px]" />

                <div className="absolute right-0 top-2 border border-white bg-[#292734] rounded-r-xl rounded-tl-xl w-[50%] min-h-[210px] py-3 px-2 z-30 h-fit">
                    <h1 className="text-sm inter text-gray-300">
                        <Typewriter
                            options={{
                                strings: [`
                                    Hi! I'm Mr. G your friendly Genie and I'm here to grant all your wishes.
                                    But first, tell me your name, and I'll help you climb the ranks, Accumulate riches and claim your spot among the-elite.
                                    `],
                                autoStart: true,
                                delay: 75
                            }}
                        />

                    </h1>

                    <strong className="pt-2 text-sm inter text-gray-300 uppercase">
                        And May <span className="text-orange-600">The Zen</span> Be With You!
                    </strong>
                </div>

                <div style={{}} className="flex flex-col gap-5 bg-[#000000]/80 bg-opacity-25 absolute right-0 min-h-auto left-0 bottom-0 justify-center w-full">
                    <Input type="text" placeholder="Enter your username" className="bg-[#22140B] text-[#FFFFFF59] lowercase outline-none text-[13px] aqum border-none ring-0 rounded-[10px] h-[70px] min-w-[306px] mx-auto w-full" />

                    <TextButton
                        name={"Proceed"}
                        disabled={false}
                        onClick={() => setScreens && setScreens("check-account")}
                        className={"uppercase mt-2"}
                    />
                </div>
            </div>

        </div>
    )
}
