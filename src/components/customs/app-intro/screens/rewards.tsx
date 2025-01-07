import { TextButton } from "@components/common/buttons/Textbutton";
import { Card } from "@components/ui/card";
import medal from "@assets/images/icons/medal.png";
import Logo from "@assets/images/icons/ravenenie_logo.png";
import { Fade, Zoom } from "react-awesome-reveal";
import CountUp from "react-countup"
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useUpdateUserSharesMutation } from "@hooks/redux/shares";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useUpdateUserDataMutation } from "@/hooks/redux/users";
import Confetti from "react-confetti";
import useWindowSize from "@hooks/useWindowsize";

interface RewardsProps {
  shares: number;
  province: string;
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

  const [showConfetti, setShowConfetti] = useState(false);
  const [telegramId, setTelegramId] = useState<string | null>(null);
  const [updateShare, { isLoading }] = useUpdateUserSharesMutation();
  const [updateData, { isLoading: updating }] = useUpdateUserDataMutation();
  const { width, height } = useWindowSize();
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const initData = window.Telegram.WebApp.initDataUnsafe;
      const user = initData?.user;

      // Set Telegram user data
      if (user) {
        setTelegramId(user.id ?? null);
      }
    }
  }, []);

  const handleUpdateUserShare = async () => {
    try {
      const shares = await updateShare({ shares: user.shares, telegram_id: telegramId, shareType: "reward_shares" }).unwrap();
      const updatedUser = await updateData({
        telegram_id: telegramId,
        province: user.province
      }).unwrap();
      console.log("Updated user:", updatedUser);
      if (shares) {
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false)
          setScreens?.("socials");
        }
          , 5000);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.error, { className: "text-xs work-sans py-3" });
      console.log(error.data.error)
    }
  }


  return (
    <div className="flex flex-col flex-1  justify-stretch gap-10 w-full min-h-full p-4 relative">
      {showConfetti && <Confetti width={width} height={height} />}
      <div className="flex  flex-col justify-stretch gap-5">
        <div className="relative h-fit w-36 mx-auto">
          <LazyLoadImage effect="blur" src={Logo} alt="" className="h-full w-full object-contain" />
        </div>

        <div className="flex flex-col flex-1 justify-stretch">
          <div>
            <Fade>
              <div className="aqum flex flex-col gap-4 items-center">
                <h1 className="text-xl text-white text-center font-extrabold work-sans">You are now a citizen of the</h1>
                <h1 className="text-orange-600 text-2xl text-center aqum font-semibold uppercase">{user.province}</h1>
                <h1 className="text-xl text-white text-center font-semibold work-sans pb-2">Province</h1>
                <div className="relative h-28 w-28">
                  <LazyLoadImage effect="blur" src={medal} alt="Badge" className="h-full w-full object-contain object-center" />
                </div>

              </div>
            </Fade>
            <Zoom>
              <div className="flex flex-col gap-2 items-center">
                <h1 className="capitalise text-lg font-bold text-white text-center py-3 aqum">Here is your Reward</h1>

                <Card className="aqum flex w-56 h-[89px] mx-auto border-none flex-col rounded-xl items-center justify-center gap-2 p-3 bg-[#D25804] text-white">
                  <h1><CountUp start={0} separator="," end={user.shares} /></h1>
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
        name={`${isLoading ? "Processing..." : "Proceed"}`}
        disabled={isLoading || updating || showConfetti}
        onClick={handleUpdateUserShare}
        className={"uppercase mt-4"}
      />
    </div>
  );
};
