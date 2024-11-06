import Logo from "../../../../assets/images/icons/ravegenie_logo.png";
import { TextButton } from "../../../common/buttons/Textbutton";
import { Input } from "../../../ui/input";
import smily_man from "../../../../assets/images/smily_man.png"


export function CreateUsername({
    setScreens
}: {
    setScreens?: (value: React.SetStateAction<string>) => void
}) {
    return (
        <div className="flex flex-col flex-1 justify-evenly  w-full min-h-full p-4 relative">
            <div className="flex items-center justify-center">
                <div className="relative h-[139px] w-[139px] ">
                    <img src={Logo} alt="Zenstreet Logo" className="h-full w-full object-contain mx-auto" />
                </div>
            </div>
            <div className="relative" >
                <img src={smily_man} alt="" className="object-contain h-[514px]" />
                <div className="absolute right-0 top-5 border border-white rounded-r-xl rounded-tl-xl w-[50%] py-3 px-2 z-30 h-fit">
                    <h1 className="text-sm inter text-white">
                        Lorem ipsum dolor sit amet consectetur 
                        adipisicing elit. Ab ducimus perferendis
                        , quos nemo fuga ad sequi
                    </h1>
                </div>
            </div>
            <div className="flex flex-col gap-5 justify-end pb-6">
                <Input type="text" placeholder="Enter your username" className="bg-[#22140B] text-[#FFFFFF59] lowercase outline-none text-[13px] aqum border-none ring-0 rounded-[10px] h-[70px] min-w-[306px] w-full" />

                <TextButton
                    name={"Proceed"}
                    disabled={false}
                    onClick={() => setScreens && setScreens("check-account")}
                    className={"uppercase mt-2"}
                />
            </div>
        </div>
    )
}


