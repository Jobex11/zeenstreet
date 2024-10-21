import visionImage from "../../../../assets/images/vision.png"
import { IconButton } from "@/components/common/buttons/Iconbutton"

export const WelcomeUser = () => {
    return (
        <div className="flex flex-col flex-1 w-full h-full min-h-[812px] p-4 relative">
            <h1 className="text-6xl font-bold aqum uppercase text-[#FFFFFF]">THE<br/> FUTURE <br/> of web3.</h1>
            <p className="pt-4 text-[#FFFFFF] tahoma">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus delectus aliquam voluptates facilis ab temporibus deserunt enim placeat. Adipisci rerum molestiae amet veritatis non quisquam fugit consequuntur nam, explicabo recusandae!
            </p>

            <div className=" min-h-[516px] bg-transparent absolute bottom-1 left-0 right-0 z-[99]">
            <div className="relative min-h-[520px] w-full">
            <img src={visionImage} alt="vision image" className=" h-full w-full object-center object-cover" />
            </div>
                <div className=" relative">
                    <div className="absolute bottom-0 w-full h-48 bg-gradient-to-b from-[rgba(0,0,0,0)] to-[#000000] flex items-center flex-col justify-end">
                        <div className="flex items-center justify-between w-full p-4">
                            <div className="flex items-center text-white gap-3">
                                Twitter / Youtube / Telegram
                            </div>
                            <IconButton className="h-16 w-16 rounded-full bg-[rgba(210,88,4,1)] text-3xl">
                                👋
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
