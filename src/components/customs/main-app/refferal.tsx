import { useEffect, useState, Fragment } from "react";
import dotsbg from "@assets/images/dotted-bg.png";
import logo from "@assets/images/icons/zenstreet_logo.png";
import CardWrapper from "@/components/common/cards/card-wrapper";
import { CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Button } from "@components/ui/button";
import wavybg from "@assets/images/card_bg.svg";
import { toast } from "sonner";
import { GoTriangleUp } from "react-icons/go";
import { IoMdShareAlt } from "react-icons/io";
import { IconButton } from "@components/common/buttons/Iconbutton";
import { MdInfo } from "react-icons/md";
import { IoCopy } from "react-icons/io5";
import { ShareFormatter } from "@components/common/shareFormatter";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Skeleton } from "@components/ui/skeleton";
import {
  useGetReferralLinkQuery,
  useGetReferralCodeQuery,
  useGetTier1ReferralQuery,
  useGetTier2ReferralQuery,
  useCliamReferralSharesMutation,
} from "@hooks/redux/referrals";
import {
  useGetTelegramUserPhotoUrlQuery,
  useGetFilePathQuery,
} from "@hooks/redux/tg_photo";
import { useGetUsersByIdQuery } from "@hooks/redux/users";
import useWindowSize from "@hooks/useWindowsize";
import Confetti from "react-confetti";
import { useGetUserSharesQuery } from "@hooks/redux/shares";
import avatarImg from "@assets/images/icons/users_avatar.svg"
import tier1_img from "@assets/images/icons/tier1_friend.svg"
import tier2_img from "@assets/images/icons/tier2_friend.svg"
import { ScrollArea } from '@components/ui/scroll-area'
import InfiniteScroll from "react-infinite-scroll-component";
import { FiLoader } from "react-icons/fi"


interface Referral {
  userLogo: string;
  name: string;
  userName: string;
  createdAt: string;
  rewardedShares: string;
  isTier2: boolean;
}

function Referral() {
  const [tier1Page, setTier1Page] = useState<number>(1);
  const [tier2Page, setTier2Page] = useState<number>(1)
  const limit = 10
  const [telegramId, setTelegramId] = useState<string | null>(null);
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
      refetchOnMountOrArgChange: true,
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
      refetchOnMountOrArgChange: true,
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

  const { data: referralCode } = useGetReferralCodeQuery(telegramId ?? "", {
    skip: !telegramId,
    refetchOnReconnect: true,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const { data: referralLink } = useGetReferralLinkQuery(telegramId ?? "", {
    skip: !telegramId,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  // Initialize Telegram WebApp
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tgData = window.Telegram.WebApp.initDataUnsafe;
      if (tgData && tgData.user && tgData.user.id) {
        setTelegramId(tgData.user.id.toString());
      }
    }
  }, []);

  const handleCopyReferralLink = async () => {
    if (referralLink) {
      await navigator.clipboard.writeText(referralLink?.referralLink);
      navigator.vibrate([50, 50]);
      toast.info("Referral link copied!", { className: "text-xs work-sans" });
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
    }
  };

  const handleActiveTabs = (name: string) => {
    setTabs(name);
  };

  const handleClaimReferralShares = async () => {
    try {
      const refShares = await claimReferralShares(telegramId).unwrap();
      if (refShares) {
        toast.success(refShares.message, { className: "text-xs work-sans" });
        refetchUserData();
        refetch()
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data || "Failed to claim referral shares.", {
        className: "text-xs work-sans",
      });
      console.error("Claiming referral shares error:", error);
    }
  };

  console.log("Data", tier1Data)


  const handleNextPageTier1 = () => {
    if (tier1Data?.page < tier1Data?.totalPages) {
      setTier1Page((prev) => prev + 1);
    }
  };


  const handleNextPageTier2 = () => {
    if (tier2Data?.page < tier2Data?.totalPages) {
      setTier2Page((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      {showConfetti && <Confetti width={width} height={height} />}
      <div
        style={{
          backgroundImage: `url(${dotsbg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="flex flex-col flex-1 py-3 "
      >
        <div className="px-4 flex flex-col gap-8 pb-[8rem]">
          <CardWrapper>
            <CardHeader className="flex flex-col items-center py-0">
              <div className="h-[84px] w-[92px]">
                <LazyLoadImage
                  effect="blur"
                  src={logo}
                  alt="zeen streeet logo"
                  className={"min-h-full object-cover object-center w-full"}
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
                  <h1 className="aqum text-[11px] text-center font-bold text-white pt-2">
                    Referral Link:
                  </h1>
                  <div className="flex  items-center gap-2">
                    <Button
                      onClick={handleCopyReferralLink}
                      className="h-[23px] w-24 bg-[#D25804] hover:bg-orange-500 text-white text-xs font-semibold text-center poppins"
                    >
                      {referralCode?.referralCode.slice(0, 10) || "...."}
                    </Button>
                    <IconButton
                      className="bg-transparent w-fit hover:bg-transparent"
                      onClick={handleCopyReferralLink}
                    >
                      <IoCopy color="white" size={30} />
                    </IconButton>
                    <button
                      onClick={handleShareReferralLink}
                      className="bg-transparent w-fit hover:bg-transparent"
                    >
                      <span>
                        <IoMdShareAlt color="white" size={25} />
                      </span>
                    </button>
                  </div>
                </div>
                <div
                  className={`flex flex-col items-center ${!userData?.user?.claimReferrals_shares && "hidden"}`}
                >
                  <h1 className="aqum text-[13px] font-bold text-center items-top flex   text-white py-2">
                    <span>
                      <MdInfo color="#D25804" size={10} />
                    </span>
                    You&apos;ve been awared
                    <br />
                    <span className="mx-2"><ShareFormatter
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
                    className="min-w-[111.2px] h-[30px] bg-[#D25804] hover:bg-orange-500 text-white text-xs font-semibold text-center poppins"
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

          <div>
            <div className="flex items-center justify-between py-4">
              {btnTabs.map((tab) => (
                <Button
                  style={{
                    backgroundImage: `url(${wavybg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  key={tab.name}
                  onClick={() => handleActiveTabs(tab.name)}
                  className={`poppins object-cover  w-[88px] h-8 px-10 bg-[#171717] relative hover:bg-transparent capitalize ${tabs === tab.name
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
                    <Fragment>
                      <ScrollArea className="flex-1 h-full p-1">
                        <InfiniteScroll
                          dataLength={tier1Data?.tier1?.length || 0}
                          next={handleNextPageTier1}
                          hasMore={tier1Data?.page < tier1Data?.totalPages}
                          loader={
                            <div className="flex flex-col items-center justify-center py-3">
                              <FiLoader size={30} color="white" className="animate-spin" />
                            </div>}
                          scrollThreshold={0.9}
                          scrollableTarget="scrollableDiv"
                        >
                          {!loading && tier1Data?.tier1.length > 0 ? (
                            tier1Data?.tier1.map(
                              (ref: {
                                telegram_id: string;
                                userLogo: string;
                                username: string;
                                dateJoined: string;
                                accountName: string;
                                isTier2?: boolean;
                                shares: string;
                              }) => (
                                <Referrals key={ref.telegram_id} referrals={ref} />
                              )
                            )
                          ) : (
                            <div className="p-4 flex flex-col gap-3 items-center ">
                              <img src={tier1_img} alt="Tier 1 image" className={"h-20 w-20 object-contain object-center"} />
                              <p
                                className={
                                  "text-white work-sans text-sm text-center"
                                }
                              >
                                Your Direct Workforce Will Reside Here
                              </p>
                            </div>
                          )}
                        </InfiniteScroll>
                      </ScrollArea>
                    </Fragment>
                  )}

                  {tabs === "Tier 2" && (
                    <Fragment>
                      <ScrollArea className="flex-1 h-full p-1">
                        <InfiniteScroll
                          dataLength={tier2Data?.tier?.length || 0}
                          next={handleNextPageTier2}
                          hasMore={tier2Data?.page < tier2Data?.totalPages}
                          loader={
                            <div className="flex flex-col items-center justify-center py-3">
                              <FiLoader size={30} color="white" className="animate-spin" />
                            </div>}
                          scrollThreshold={0.9}
                          scrollableTarget="scrollableDiv"
                        >
                          {!loading && tier2Data?.tier2.length > 0 ? (
                            tier2Data?.tier2.map(
                              (ref: {
                                telegram_id: string;
                                userLogo: string;
                                username: string;
                                accountName: string;
                                dateJoined: string;
                                isTier2?: boolean | undefined;
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
                        </InfiniteScroll>
                      </ScrollArea>
                    </Fragment>
                  )}
                </Fragment>
              )}
            </Fragment>
          </div>
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
    isTier2?: boolean;
    shares: string;
    telegram_id?: string;
  };
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
  const BOT_TOKEN = "7876229498:AAEvj3K6fNEOOtr9vb1FeJY7Epp8bPh0VcU"
  return (
    <Fragment>
      <div className="flex items-center justify-between my-2 py-3 border-b border-[#5F59598A]">
        <div className="flex items-center gap-2">
          <div className="h-[50px] w-[50px] rounded-full">
            {filePath ? (
              <img
                src={`https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`}
                alt={`${referrals.username} Logo`}
                className="h-full w-full rounded-full object-cover object-center"
              />
            ) : (
              <img
                src={avatarImg}
                alt={`${referrals.username} Logo`}
                className="h-full w-full rounded-full object-cover object-center"
              />

            )}
          </div>
          <div className="flex flex-col">
            <h1 className="text-xs font-medium font-mono text-white">
              {referrals.username}
            </h1>
            <p className="text-[#B7B3B3] text-[8px]">
              {referrals.dateJoined}{" "}
              <span className="font-bold">
                {referrals.isTier2 && referrals.accountName}
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-white text-xs font-bold">{referrals.shares}</h1>
          <span className="flex items-center justify-end">
            <GoTriangleUp size={18} color={"#00D95F"} />
          </span>
        </div>
      </div>
    </Fragment>
  );
};
