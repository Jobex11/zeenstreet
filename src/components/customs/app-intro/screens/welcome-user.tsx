import visionImage from "@assets/images/vision.png";
import handwave from "@assets/images/icons/hand-wave.png";
import { IconButton } from "@components/common/buttons/Iconbutton";
import { Fade } from "react-awesome-reveal";
import rave from "@assets/images/icons/Rave.png";
import genie from "@assets/images/icons/GENIE.png";
import logo from "@assets/images/icons/ravegenie_logo_main.png";
import { LazyLoadImage } from "react-lazy-load-image-component";


export const WelcomeUser = () => {
    return (
        <div
            className="flex flex-col flex-1 justify-stretch w-full gap-3 min-h-full px-4 relative">
            <div className="flex flex-col pt-2">
                <img loading="eager" src={logo} alt="Ravgenie logo" className="h-fit w-40 object-cover object-center" />
            </div>
            <Fade cascade>
                <h1 className="text-5xl mt-2 font-bold aqum  leading-[60px] uppercase text-[#FFFFFF]">
                    THE
                    <br /> FUTURE
                    <br /> of Gaming.
                </h1>
            </Fade>
            <div
                style={{
                    backgroundImage: `url(${rave}), url(${genie})`,
                    backgroundRepeat: "no-repeat, no-repeat",
                    backgroundSize: "contain, contain",
                    backgroundPosition: "center, bottom",
                    backgroundBlendMode: "multiply",
                }}
                className="absolute bottom-0 right-0 left-0 w-full z-40 h-[65%] overflow-hidden">
                <LazyLoadImage effect="blur" src={visionImage} alt="vision image" className="min-h-full w-full object-contain object-center" />
            </div>
            <div className="absolute bottom-0 bg-opacity-40 right-0 left-0 w-full z-50 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[#000000] flex items-center justify-between p-4">
                <div className="flex items-center text-white gap-3 text-sm">
                    Twitter / Youtube / Telegram
                </div>
                <IconButton className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-[rgba(210,88,4,1)] text-3xl">
                    <LazyLoadImage effect="opacity" src={handwave} alt="handwave" className="h-full w-full" />
                </IconButton>
            </div>
        </div>
    );
};

