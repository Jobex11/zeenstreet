import CardWrapper from "@/components/common/cards/card-wrapper";
import { triggerErrorVibration } from "@/lib/utils";
import dotsbg from "@assets/images/dotted-bg.png";
import tier1_img from "@assets/images/icons/tier1_friend.svg";
import tier2_img from "@assets/images/icons/tier2_friend.svg";
import avatarImg from "@assets/images/icons/users_avatar.svg";
import logo from "@assets/images/icons/zenstreet_logo.png";
import { ShareFormatter } from "@components/common/shareFormatter";
import { Button } from "@components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Drawer, DrawerContent, DrawerTrigger } from "@components/ui/drawer";
import { ScrollArea, ScrollBar } from '@components/ui/scroll-area';
import { Skeleton } from "@components/ui/skeleton";
import {
  useCliamReferralSharesMutation,
  useGetReferralLinkQuery,
  useGetTier1ReferralQuery,
  useGetTier2ReferralQuery,
} from "@hooks/redux/referrals";
import { useGetUserSharesQuery } from "@hooks/redux/shares";
import {
  useGetFilePathQuery,
  useGetTelegramUserPhotoUrlQuery,
} from "@hooks/redux/tg_photo";
import { useGetUsersByIdQuery } from "@hooks/redux/users";
import useWindowSize from "@hooks/useWindowsize";
import { Fragment, useState } from "react";
import Confetti from "react-confetti";
import { IoCopyOutline } from "react-icons/io5";
import { MdInfo } from "react-icons/md";
import { RiShareLine } from "react-icons/ri";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { toast } from "sonner";
import { useGetTelegramId } from "@hooks/getTelegramId"
import { HiMiniUsers } from "react-icons/hi2";


interface Referral {
  userLogo: string;
  name: string;
  userName: string;
  accountName: string;
  createdAt: string;
  rewardedShares: string;
  isTier2: boolean;
}

function Referral() {

  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const [tier1Page, setTier1Page] = useState<number>(1);
  const [tier2Page, setTier2Page] = useState<number>(1);
  const { telegramId } = useGetTelegramId()
  const limit = 10;
  const [tabs, setTabs] = useState<string>("Tier 1");
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const btnTabs = [{ name: "Tier 1" }, { name: "Tier 2" }];

  const [claimReferralShares, { isLoading: claimingShares }] =
    useCliamReferralSharesMutation();
  const { refetch } = useGetUserSharesQuery(
    telegramId ?? "",
    {
      skip: !telegramId,
      refetchOnReconnect: true,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true
    }
  );
  const { data: userData, refetch: refetchUserData } = useGetUsersByIdQuery(
    telegramId ?? "",
    {
      skip: !telegramId,
      refetchOnReconnect: true,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: tier1Data, isLoading: loading } = useGetTier1ReferralQuery(
    { telegram_id: telegramId, page: tier1Page, limit: limit },
    {
      skip: !telegramId,
      refetchOnReconnect: true,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true
    }
  );

  // Query for tier2 referrals with pagination
  const { data: tier2Data } = useGetTier2ReferralQuery(
    { telegram_id: telegramId, page: tier2Page, limit: limit },
    {
      skip: !telegramId,
      refetchOnReconnect: true,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: referralLink } = useGetReferralLinkQuery(telegramId ?? "", {
    skip: !telegramId,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });


  const handleCopyReferralLink = async () => {
    if (referralLink) {
      await navigator.clipboard.writeText(referralLink?.referralLink);
      triggerErrorVibration()
      toast.success("Referral link copied!", { className: "text-xs work-sans py-3" });
      setOpenDrawer((open) => !open)
    }
  };

  const handleShareReferralLink = () => {
    if (referralLink) {
      const tg = window.Telegram?.WebApp;
      const shareText =
        "Join me on Ravegenie Games to earn rewards by completing tasks and so much more🎉";
      const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(
        referralLink.referralLink
      )}&text=${encodeURIComponent(shareText)}`;
      tg.openTelegramLink(fullUrl);
      setOpenDrawer((open) => !open)
    }
  };

  const handleActiveTabs = (name: string) => {
    setTabs(name);
  };

  const handleClaimReferralShares = async () => {
    try {
      const refShares = await claimReferralShares(telegramId).unwrap();
      if (refShares) {
        toast.success(refShares.message, { className: "text-xs work-sans py-3" });
        refetchUserData();
        refetch()
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data.error || error?.data?.message || "Failed to claim referral shares.", {
        className: "text-xs work-sans py-3",
      });
      triggerErrorVibration()
    }
  };

  const handleNextPageTier1 = () => {
    if (tier1Data?.page < tier1Data?.totalPages) {
      setTier1Page((prev) => prev + 1);
    }
  };

  const loadPreviousTier1Page = () => {
    if (tier1Data?.page > 1) {
      setTier1Page((prev) => prev - 1);
    }
  };

  const handleNextPageTier2 = () => {
    if (tier2Data?.page < tier2Data?.totalPages) {
      setTier2Page((prev) => prev + 1);
    }
  };

  const loadPreviousTier2Page = () => {
    if (tier2Data?.page > 1) {
      setTier2Page((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {showConfetti && <Confetti width={width} height={height} />}
      <div
        style={{
          backgroundImage: `url(${dotsbg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="flex flex-col pt-3 h-full"
      >
        <div className="px-4 flex flex-col gap-5">
          <CardWrapper>
            <CardHeader className="flex flex-col items-center py-0">
              <div className="h-[84px] w-[92px] relative">
                <img
                  loading="eager"
                  src={logo}
                  alt="zeen streeet logo"
                  className={"min-h-full object-cover object-center w-full"}
                />
                <div className={
                  "absolute z-20 bg-transparent h-full w-full top-0 bottom-0"
                }
                />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <CardTitle className="uppercase text-[12.5px] text-center font-bold text-white aqum py-2">
                expand your empire!
                <br />{" "}
                <span className="text-[11.5px]">
                  grow your team to join the wealth
                  <br /> rush and earn exclusive rewards
                </span>
              </CardTitle>
              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center justify-center">
                  <h1 className="aqum text-[11px] text-center font-bold text-white pt-2 flex items-center gap-2">
                    Friends <HiMiniUsers size={25} />
                  </h1>

                  <div className="flex w-full items-center gap-2">
                    <Drawer open={openDrawer} onOpenChange={() => setOpenDrawer(!openDrawer)}>
                      <DrawerTrigger>
                        <Button className="max-w-full px-10 mt-3 bg-[#D25804] hover:bg-orange-500 text-white text-xs font-semibold text-center poppins">
                          Invite Friends
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent
                        aria-describedby={undefined}
                        aria-description="dialog"
                        className="flex flex-col justify-evenly h-fit pb-8 bg-gradient-to-b from-[#292734] to-[#000000] rounded-lg border-none px-3 gap-3">
                        <Button
                          onClick={handleCopyReferralLink}
                          className="flex justify-center py-5 work-sans items-center gap-3 mt-3 bg-[#D25804] hover:bg-orange-500">
                          Copy referral link
                          <IoCopyOutline color="white" size={33} />
                        </Button>

                        <Button
                          onClick={handleShareReferralLink}
                          className="flex justify-center py-5 work-sans items-center gap-3 bg-[#D25804] hover:bg-orange-500">
                          Share <RiShareLine color="white" size={33} />
                        </Button>
                      </DrawerContent>
                    </Drawer>
                  </div>
                </div>
                <div
                  className={`flex flex-col items-center ${!userData?.user?.claimReferrals_shares && "hidden"}`}
                >
                  <h1 className="aqum text-xs font-bold text-center items-top flex text-white py-2">
                    <span>
                      <MdInfo color="#D25804" size={10} />
                    </span>
                    You&apos;ve been awared
                    <br />
                    <span className="mx-1"><ShareFormatter
                      shares={userData?.user?.claimReferrals_shares}
                    /></span>
                    Shares
                  </h1>
                  <Button
                    onClick={handleClaimReferralShares}
                    disabled={
                      claimingShares ||
                      !userData?.user?.claimReferrals_shares
                    }
                    className="min-w-[111.2px] h-[30px] bg-[#D25804] px-3 hover:bg-orange-500 text-white text-xs font-semibold text-center poppins"
                  >
                    {claimingShares
                      ? "Claiming..."
                      : userData?.user?.claimReferrals_shares
                        ? `Claim ${userData?.user?.claimReferrals_shares} Referral Shares `
                        : "No Shares to Claim"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </CardWrapper>

          <div className="flex items-center justify-between">
            {btnTabs.map((tab) => (
              <Button
                key={tab.name}
                onClick={() => handleActiveTabs(tab.name)}
                className={`work-sans object-cover max-w-24 h-8 px-10 bg-[#171717] relative hover:bg-transparent capitalize ${tabs === tab.name
                  ? " border rounded-lg font-semibold text-[#FFFFFF] border-[#F7F7F7] text-sm"
                  : "rounded-none outline-none ring-0 border-none shadow-none font-normal text-[11px] "
                  }`}
              >
                {tab.name}
                {tabs !== tab.name && (
                  <div className="bg-black/20 absolute right-0 left-0 h-full w-full z-10" />
                )}
              </Button>
            ))}
          </div>

          <Fragment>
            {loading ? (
              <div className="text-center text-white">
                <div className={"flex flex-col gap-3"}>
                  {[0, 1, 2, 3].map((ske) => (
                    <Skeleton
                      key={ske}
                      className={"h-14 w-full rounded bg-gray-600 shadow-lg"}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <Fragment>
                {tabs === "Tier 1" && (
                  <div className={"pb-24"}>
                    <ScrollArea className="h-fit px-1 items-center whitespace-nowrap max-w-full">
                      {!loading && tier1Data?.tier1.length > 0 ? (
                        tier1Data?.tier1.map(
                          (ref: {
                            telegram_id: string;
                            userLogo: string;
                            username: string;
                            dateJoined: string;
                            accountName: string;
                            province: string;
                            shares: string;
                          }) => (
                            <Referrals key={ref.telegram_id} referrals={ref} />
                          )
                        )
                      ) : (
                        <div className="p-4 flex flex-col gap-3 items-center">
                          <img src={tier1_img} loading="lazy" alt="Tier 1 image" className={"h-20 w-20 object-contain object-center"} />
                          <p
                            className={
                              "text-white work-sans text-sm text-center"
                            }
                          >
                            Your Direct Workforce Will Reside Here
                          </p>
                        </div>
                      )}
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>

                    <div className="flex items-center justify-center gap-5 py-3 h-18">
                      {/* Previous Button */}
                      <button
                        disabled={tier1Data?.page === 1}
                        className={`bg-white rounded-full active:scale-110 h-6 w-6 shadow-lg flex items-center justify-center ${tier1Data?.page === 1 ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        onClick={loadPreviousTier1Page}
                      >
                        <IoIosArrowBack />
                      </button>

                      {/* Next Button */}
                      <button
                        disabled={tier1Data?.page >= tier1Data?.totalPages}
                        className={`bg-white rounded-full active:scale-110 h-6 w-6 shadow-lg flex items-center justify-center ${tier1Data?.page >= tier1Data?.totalPages ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        onClick={handleNextPageTier1}
                      >
                        <IoIosArrowForward />
                      </button>
                    </div>
                  </div>
                )}

                {tabs === "Tier 2" && (
                  <div className={"pb-24"}>
                    <ScrollArea className="h-fit px-1 items-center whitespace-nowrap max-w-full">
                      {!loading && tier2Data?.tier2.length > 0 ? (
                        tier2Data?.tier2.map(
                          (ref: {
                            telegram_id: string;
                            userLogo: string;
                            username: string;
                            accountName: string;
                            province: string;
                            referredBy: string;
                            dateJoined: string;
                            shares: string;
                          }) => (
                            <Referrals key={ref.telegram_id} referrals={ref} />
                          )
                        )
                      ) : (
                        <div className="p-4 flex flex-col items-center gap-3 pt-3 ">
                          <img src={tier2_img} alt="Tier 1 image" className={"h-20 w-20 object-contain object-center"} />
                          <p
                            className={
                              "text-white work-sans text-center text-sm max-w-[250px]"
                            }
                          >
                            Your Tier 2 Workforce Will Reside Here
                          </p>
                        </div>
                      )}
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                    <div className="flex items-center justify-center gap-5 py-3 h-18">
                      {/* Previous Button */}
                      <button
                        disabled={tier2Data?.page === 1}
                        className={`bg-white rounded-full h-6 w-6 active:scale-110 shadow-lg flex items-center justify-center ${tier2Data?.page === 1 ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        onClick={loadPreviousTier2Page}
                      >
                        <IoIosArrowBack />
                      </button>

                      {/* Next Button */}
                      <button
                        disabled={tier2Data?.page >= tier2Data?.totalPages}
                        className={`bg-white rounded-full active:scale-110 h-6 w-6 shadow-lg flex items-center justify-center ${tier2Data?.page >= tier2Data?.totalPages ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        onClick={handleNextPageTier2}
                      >
                        <IoIosArrowForward />
                      </button>
                    </div>
                  </div>
                )}
              </Fragment>
            )}
          </Fragment>
        </div>
      </div>
    </div>
  );
}

export default Referral;

interface RefferalsProps {
  referrals: {
    userLogo: string;
    username: string;
    accountName: string;
    dateJoined: string;
    province: string;
    shares: string;
    referredBy?: string;
    telegram_id?: string;
  };
  isTier2?: string;
}

export const Referrals = ({ referrals }: RefferalsProps) => {
  const { data: photoData, isSuccess: isPhotoSuccess } =
    useGetTelegramUserPhotoUrlQuery(referrals.telegram_id, {
      skip: !referrals.telegram_id,
      refetchOnReconnect: true,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    });

  const fileId = isPhotoSuccess
    ? photoData?.result?.photos?.[0]?.[2]?.file_id
    : null;

  const { data: filePathData, isSuccess: isFileSuccess } = useGetFilePathQuery(
    fileId,
    {
      skip: !fileId,
      refetchOnReconnect: true,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  const filePath = isFileSuccess ? filePathData?.result?.file_path : null;
  const BOT_TOKEN = "7876229498:AAHtNuIYCcpP_kxr_EEVH6aKdIZYlJNTvq4"
  return (
    <Fragment>
      <div className="flex items-center justify-between py-3 border-b border-[#5F59598A]">
        <div className="flex items-center gap-2">
          <div className="h-[50px] w-[50px] rounded-full relative">
            {filePath ? (
              <img
                src={`https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`}
                alt={`${referrals.username} Logo`}
                loading="lazy"
                className="h-full w-full rounded-full object-cover object-center"
              />
            ) : (
              <img
                src={avatarImg}
                loading="lazy"
                alt={`${referrals.username} Logo`}
                className="h-full w-full rounded-full object-cover object-center"
              />
            )}
            <div className={"absolute top-0 w-full h-full z-10 bg-transparent rounded-full"} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xs font-medium font-mono text-white mb-0.5">
              {referrals.accountName}
            </h1>
            <p className="text-[#B7B3B3] text-[8px] flex items-center gap-1">
              {referrals.dateJoined}{" "}
              <span className="font-semibold work-sans">
                {referrals.referredBy && `Referred By ${referrals.referredBy}`}
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-1">
          <h1 className="text-white text-[10px] text-left font-semibold">{referrals.shares}</h1>
          <p className="flex items-center text-[10px] work-sans text-[#00D95F]">
            {referrals.province}
          </p>
        </div>
      </div>
    </Fragment>
  );
};
