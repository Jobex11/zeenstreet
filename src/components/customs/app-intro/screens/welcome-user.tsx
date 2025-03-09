import visionImage from "@assets/images/vision.png";
import handwave from "@assets/images/icons/hand-wave.png";
import { Fade } from "react-awesome-reveal";
import logo from "@assets/images/icons/ravegenie_logo_main.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { lazy } from "react";

const IconButton = lazy(() =>
    import("@/components/shared/buttons/Iconbutton").then((mod) => ({ default: mod.IconButton }))
);

export const WelcomeUser = () => {
    return (
        <div
            className="flex flex-col flex-1 justify-stretch w-full gap-3 min-h-full px-4 relative">
            <div className="flex flex-col pt-2">
                <img loading="lazy" src={logo} alt="Ravgenie logo"  className="h-fit w-40 object-contain object-center" />
                <Fade cascade>
                    <h1 className="text-5xl mt-2 font-bold aqum leading-[60px] uppercase text-[#FFFFFF] relative z-50">
                        THE
                        <br /> FUTURE
                        <br /> of Gaming.
                    </h1>
                </Fade>
            </div>

            <div
                className="bg-container absolute bottom-0 right-0 left-0 w-full z-40 h-[65%] overflow-hidden">
                <LazyLoadImage effect="blur" src={visionImage} alt="vision image" loading="lazy" className="min-h-full w-full object-cover object-center" />
            </div>
            <div className="absolute bottom-0 bg-opacity-40 right-0 left-0 w-full z-50 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[#000000] flex items-center justify-between p-4">
                <div className="flex items-center text-white gap-3 text-sm">
                    Twitter / Youtube / Telegram
                </div>
                <IconButton className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-[rgba(210,88,4,1)] text-3xl">
                    <LazyLoadImage effect="opacity" src={handwave} alt="handwave" loading="lazy" className="h-full w-full" />
                </IconButton>
            </div>
        </div>
    );
};

