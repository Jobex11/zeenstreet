import { TextButton } from "@components/common/buttons/Textbutton";
import { Card } from "@components/ui/card";
import medal from "@assets/images/icons/medal.png";
import Logo from "@assets/images/icons/ravenenie_logo.png";
import { Fade, Zoom } from "react-awesome-reveal";
import CountUp from "react-countup"
import { LazyLoadImage } from "react-lazy-load-image-component";

interface RewardsProps {
  year?: string;
  shares: number;
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
    <div className="flex flex-col flex-1  justify-stretch gap-10 w-full min-h-full p-4 relative">
      <div className="flex  flex-col justify-stretch gap-5">
        <div className="relative h-fit w-[139px] mx-auto">
          <LazyLoadImage effect="blur" src={Logo} alt="" className="h-full w-full object-contain" />
        </div>

        <div className="flex flex-col flex-1 justify-stretch">
          <div>
            <Fade>
              <div className="aqum flex flex-col gap-4 items-center">
                <h1 className="text-xl text-white text-center font-extrabold aqum">Few more steps to get started</h1>

                <div className="relative h-28 w-28">
                  <LazyLoadImage effect="blur" src={medal} alt="" className="h-full w-full object-contain object-center" />
                </div>

              </div>
            </Fade>
            <Zoom>
              <div className="flex flex-col gap-2 items-center">
                <h1 className="capitalise text-lg font-bold text-white text-center py-3 aqum">Here is your Reward</h1>

                <Card className="aqum flex w-56 h-[89px] mx-auto border-none flex-col rounded-xl items-center justify-center gap-2 p-3 bg-[#D25804] text-white">
                  <h1 className=""><CountUp start={0} separator="," end={user.shares} /></h1>
                  <h1>$SHARES</h1>
                </Card>

                <blockquote className="tahoma max-w-72 uppercase pt-5 mx-auto text-xs font-medium text-center py-2 text-[#C2C2C2]">
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
        onClick={() => setScreens && setScreens("socials")}
        className={"uppercase mt-4"}
      />
    </div>
  );
};
