import visionImage from "../../../../assets/images/vision.png";
import handwave from "../../../../assets/images/icons/hand-wave.png";
import { IconButton } from "../../../common/buttons/Iconbutton";
import { Fade } from "react-awesome-reveal";

export const WelcomeUser = () => {
    return (
        <div className="flex flex-col w-full h-full flex-1 min-h-[812px] p-4 relative">
              <Fade>
            <h1 className="text-4xl font-bold aqum uppercase text-[#FFFFFF]">
                THE
                <br /> FUTURE
                <br /> of web3.
            </h1>
            </Fade>

            <p className="pt-4 text-[#FFFFFF] text-sm md:text-base lg:text-lg tahoma">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus delectus aliquam voluptates facilis ab temporibus deserunt enim placeat. Adipisci rerum molestiae amet veritatis non quisquam fugit consequuntur nam, explicabo recusandae!
            </p>

            {/* Image Container */}
            <div className="min-h-[516px] bg-transparent absolute bottom-1 left-0 right-0 z-[99]">
                <div className="relative h-full w-full">
                    {/* Ensure the image scales properly on mobile */}
                    <img
                        src={visionImage}
                        alt="vision image"
                        className="h-auto w-full object-center object-cover"
                    />
                </div>

                {/* Overlay with icons and button */}
                <div className="relative">
                    <div className="absolute bottom-0 w-full h-auto bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[#000000] flex items-center flex-col justify-end">
                        <div className="flex items-center justify-between w-full p-4">
                            <div className="flex items-center text-white gap-3 text-sm">
                                Twitter / Youtube / Telegram
                            </div>


                            <IconButton className="h-[50px] w-[50px] md:h-[63px] md:w-[63px] rounded-full bg-[rgba(210,88,4,1)] text-3xl">
                                <img src={handwave} alt="handwave" className="h-full w-full" />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
