import visionImage from "../../../../assets/images/vision.png";
import handwave from "../../../../assets/images/icons/hand-wave.png";
import { IconButton } from "../../../common/buttons/Iconbutton";
import { Fade } from "react-awesome-reveal";
import rave from "../../../../assets/images/icons/Rave.png";
import genie from "../../../../assets/images/icons/GENIE.png";
import logo from "../../../../assets/images/icons/ravegene_logo_lg.png";
import Zenlogo from "../../../../assets/images/icons/Logo.png"

export const WelcomeUser = () => {
    return (
        <div style={{
            backgroundImage: `url(${rave}), url(${genie})`,
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundSize: "contain, contain",
            backgroundPosition: "center, bottom",
            backgroundBlendMode: "multiply",
        }}
            className="flex flex-col flex-1 w-full min-h-full p-4 relative">
            <div className="flex flex-col relative">
                <img src={Zenlogo} alt="" className="h-[94px] w-[94px] object-contain object-center absolute top-0" />
                <img src={logo} alt="" className="h-[219px] w-[219px] object-contain object-center" />
            </div>
            <Fade>
                <h1 className="text-6xl font-bold aqum uppercase text-[#FFFFFF]">
                    THE
                    <br /> FUTURE
                    <br /> of web3.
                </h1>
            </Fade>

            {/* <p className="text-[#C2C2C2] font-normal text-sm lg:text-lg tahoma leading-6 pt-5">
                The world is at your feet, Climb the ranks, accumulate riches, and claim your spot among the elite, and <span className="uppercase">MAY THE ZEN BE WITH YOU</span>
            </p> */}
            <div className=" absolute bottom-0 right-0 left-0 w-full z-40 h-[516px] ">
                <img src={visionImage} alt="vision image" className="h-full w-full object-center" />
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

