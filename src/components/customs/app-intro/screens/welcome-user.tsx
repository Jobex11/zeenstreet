import visionImage from "../../../../assets/images/vision.png";
import handwave from "../../../../assets/images/icons/hand-wave.png";
import { IconButton } from "../../../common/buttons/Iconbutton";
import { Fade } from "react-awesome-reveal";
import rave from "../../../../assets/images/icons/Rave.png";
import genie from "../../../../assets/images/icons/GENIE.png";
import logo from "../../../../assets/images/icons/ravegenie_logo.png";
import Zenlogo from "../../../../assets/images/icons/Logo.png"

export const WelcomeUser = () => {
    return (
        <div
            className="flex flex-col flex-1 w-full min-h-full p-4 relative">
            <div className="flex flex-col gap-3 pb-2">
                <img src={Zenlogo} alt="Zenstreet logo" className="max-h-[94px] w-[94px] object-contain object-center" />
                <img src={logo} alt="Ravgenie logo" className="max-h-[200px] w-[139px] object-contain object-center" />
            </div>
            <Fade>
                <h1 className="text-5xl font-bold aqum  uppercase text-[#FFFFFF]">
                    THE
                    <br /> FUTURE
                    <br /> of Gaming.
                </h1>
            </Fade>
            <div />

            <div
                style={{
                    backgroundImage: `url(${rave}), url(${genie})`,
                    backgroundRepeat: "no-repeat, no-repeat",
                    backgroundSize: "contain, contain",
                    backgroundPosition: "top, bottom",
                    backgroundBlendMode: "multiply",
                }}
                className="absolute bottom-0 right-0 left-0 w-full z-40 max-h-[470px] overflow-hidden">
                <img src={visionImage} alt="vision image" className="min-h-full w-full object-cover object-center" />
            </div>
            <div className="absolute bottom-0 right-0 left-0 w-full  z-50 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[#000000] flex items-center justify-between p-4">
                <div className="flex items-center text-white gap-3 text-sm">
                    Twitter / Youtube / Telegram
                </div>

                <IconButton className="h-[50px] w-[50px] md:h-[63px] md:w-[63px] rounded-full bg-[rgba(210,88,4,1)] text-3xl">
                    <img src={handwave} alt="handwave" className="h-full w-full" />
                </IconButton>
            </div>
        </div>
    );
};

