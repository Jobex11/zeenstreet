import Logo from "../../../../assets/images/icons/ravegenie_logo.png";
import { TextButton } from "../../../common/buttons/Textbutton";
import { Input } from "../../../ui/input";
import smily_man from "../../../../assets/images/smily_man.png"
// import dottedBg from "../../../../assets/images/dotted-bg.png"

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
                <div className="absolute right-0 top-5 border border-white bg-white rounded-r-xl rounded-tl-xl w-[50%] py-3 px-2 z-30 h-fit">
                    <h1 className="text-sm inter text-gray-700">
                        Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Ab ducimus perferendis
                        , quos nemo fuga ad sequi
                    </h1>
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


