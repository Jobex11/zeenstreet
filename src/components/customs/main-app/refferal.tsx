import { useEffect, useState } from "react";
import dotsbg from "@assets/images/dotted-bg.png";
import logo from "@assets/images/icons/zenstreet_logo.png";
import CardWrapper from "@components/common/cards/Tasxcard";
import { CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Button } from "@components/ui/button";
import wavybg from "@assets/images/card_bg.svg";
import avatarImage from "@assets/images/icons/avatar_img.png";
import { toast } from "sonner";
import { GoTriangleUp } from "react-icons/go";
import { IoMdShareAlt } from "react-icons/io";
import { IconButton } from "@components/common/buttons/Iconbutton";
import { MdInfo } from "react-icons/md";
import { IoCopy } from "react-icons/io5";
import { ShareFormatter } from "@components/common/shareFormatter";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface Referral {
  userLogo: string;
  name: string;
  userName: string;
  createdAt: string;
  rewardedShares: string;
  isTier2: boolean;
}

interface Tier1DataItem {
  telegram_id: string;
  accountName: string;
  username: string;
  dateJoined: string;
  shares: number;
}

interface Tier1Data {
  tier1: Tier1DataItem[];
}
interface Tier2DataItem {
  telegram_id: string;
  accountName: string;
  username: string;
  dateJoined: string;
  shares: number;
}

interface Tier2Data {
  tier2: Tier2DataItem[];
}

function Referral() {
  const [telegramId, setTelegramId] = useState<string | null>(null);
  const [tabs, setTabs] = useState<string>("Tier 1");

  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referralLink, setReferralLink] = useState<string | null>(null);

  const [tier1Referrals, setTier1Referrals] = useState<Referral[]>([]);
  const [tier2Referrals, setTier2Referrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const btnTabs = [{ name: "Tier 1" }, { name: "Tier 2" }];

  //backend start

  // Initialize Telegram WebApp
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tgData = window.Telegram.WebApp.initDataUnsafe;
      if (tgData && tgData.user && tgData.user.id) {
        setTelegramId(tgData.user.id.toString());
      }
    }
  }, []);

  // Fetch Tier Data
  useEffect(() => {
    if (telegramId) {
      fetchReferrals();
    }
  }, [telegramId]);

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

  const fetchReferrals = async () => {
    setLoading(true);
    try {
      // Fetch Tier 1 Referrals
      const tier1Response = await fetch(
        `https://ravegenie-vgm7.onrender.com/api/referral/tier1/${telegramId}`
      );
      const tier1Data = await tier1Response.json();

      const tier1Mapped: Referral[] = tier1Data.tier1.map(
        (ref: Tier1DataItem) => ({
          userLogo: `https://api.telegram.org/bot${BOT_TOKEN}/getUserProfilePhotos?user_id=${ref.telegram_id}`,
          name: ref.accountName,
          userName: ref.username,
          createdAt: ref.dateJoined,
          rewardedShares: ref.shares.toString(),
          isTier2: false,
        })
      );

      setTier1Referrals(tier1Mapped);

      // Fetch Tier 2 Referrals
      const tier2Response = await fetch(
        `https://ravegenie-vgm7.onrender.com/api/referral/tier2/${telegramId}`
      );
      const tier2Data = await tier2Response.json();

      const tier2Mapped: Referral[] = tier2Data.tier2.map(
        (ref: Tier2DataItem) => ({
          userLogo: `https://api.telegram.org/bot${BOT_TOKEN}/getUserProfilePhotos?user_id=${ref.telegram_id}`,
          name: ref.accountName,
          userName: ref.username,
          createdAt: ref.dateJoined,
          rewardedShares: ref.shares.toString(),
          isTier2: true,
        })
      );

      setTier2Referrals(tier2Mapped);
    } catch (error) {
      console.error("Error fetching referrals:", error);
    } finally {
      setLoading(false);
    }
  };

  //backend stop

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const initData = window.Telegram.WebApp.initDataUnsafe;
      const user = initData?.user;

      if (user) {
        setTelegramId(user.id ?? null);
      }
    }
  }, []);

  useEffect(() => {
    if (telegramId) {
      fetch(
        `https://ravegenie-vgm7.onrender.com/api/referral/referral-code/${telegramId}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.referralCode) {
            setReferralCode(data.referralCode);
          }
        })
        .catch((err) => console.error("Error fetching referral code:", err));

      fetch(
        `https://ravegenie-vgm7.onrender.com/api/referral/referral-link/${telegramId}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.referralLink) {
            setReferralLink(data.referralLink);
          }
        })
        .catch((err) => console.error("Error fetching referral link:", err));
    }
  }, [telegramId]);

  const handleCopyReferralLink = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      navigator.vibrate([50, 50]);
      toast.info("Referral link copied!");
    }
  };

  const handleShareReferralLink = () => {
    if (referralLink) {
      const tg = window.Telegram?.WebApp;
      const shareText =
        "Join me on Ravegenie Games to earn rewards by completing tasks 🎉";
      const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(
        referralLink
      )}&text=${encodeURIComponent(shareText)}`;
      tg.openTelegramLink(fullUrl);
    }
  };

  const handleActiveTabs = (name: string) => {
    setTabs(name);
  };
  return (
    <div className="flex flex-col min-h-full">
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
                      {referralCode || "Loading..."}
                    </Button>
                    <IconButton
                      className="bg-transparent w-fit hover:bg-transparent"
                      onClick={handleCopyReferralLink}
                    >
                      <IoCopy color="white" />
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
                <div className="flex flex-col items-center">
                  <h1 className="aqum text-[13px] font-bold text-center items-top flex  text-white py-2">
                    <span>
                      <MdInfo color="#D25804" size={10} />
                    </span>{" "}
                    You&apos;ve been awared
                    <br /> {ShareFormatter(1000)} $shares
                  </h1>
                  <Button className="w-[111.2px] h-[30px] bg-[#D25804] hover:bg-orange-500 text-white text-xs font-semibold text-center poppins">
                    Claim now
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
                  className={`poppins object-cover  w-[88px] h-8 px-10 bg-[#171717] relative hover:bg-transparent capitalize ${
                    tabs === tab.name
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

            <>
              {loading ? (
                <div className="text-center">Loading referrals...</div>
              ) : (
                <>
                  {tabs === "Tier 1" && (
                    <>
                      {tier1Referrals.length > 0 ? (
                        tier1Referrals.map((ref) => (
                          <Referrals key={ref.createdAt} referrals={ref} />
                        ))
                      ) : (
                        <div className="p-4 text-center">No Referrals yet</div>
                      )}
                    </>
                  )}

                  {tabs === "Tier 2" && (
                    <>
                      {tier2Referrals.length > 0 ? (
                        tier2Referrals.map((ref) => (
                          <Referrals key={ref.createdAt} referrals={ref} />
                        ))
                      ) : (
                        <div className="p-4 text-center">No Referrals yet</div>
                      )}
                    </>
                  )}
                </>
              )}
            </>
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
    userName: string;
    name: string;
    createdAt: string;
    isTier2: boolean;
    rewardedShares: string;
  };
}

export const Referrals = ({ referrals }: RefferalsProps) => {
  return (
    <>
      {!referrals && <div className="p-4 text-center">No Referrals yet</div>}
      <div className="flex items-center justify-between py-5 border-b border-[#5F59598A]">
        <div className="flex items-center gap-2">
          <div className="h-[50px] w-[50px] rounded-full">
            <LazyLoadImage
              effect="blur"
              src={referrals.userLogo}
              alt={referrals.name + "Logo"}
              className="h-full w-full rounded-s-none object-cover object-center"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xs font-medium font-mono text-white">
              {referrals.name}
            </h1>
            <p className="text-[#B7B3B3] text-[8px]">
              {referrals.createdAt}{" "}
              <span className="font-bold">
                {referrals.isTier2 && referrals.userName}
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-white text-xs font-bold">
            {referrals.rewardedShares}
          </h1>
          <span className="flex items-center  justify-end">
            {" "}
            <GoTriangleUp size={18} color={"#00D95F"} />
          </span>
        </div>
      </div>
    </>
  );
};

/*
import { useEffect, useState } from "react";
import dotsbg from "@assets/images/dotted-bg.png";
import logo from "@assets/images/icons/zenstreet_logo.png";
import CardWrapper from "@components/common/cards/Tasxcard";
import { CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Button } from "@components/ui/button";
import wavybg from "@assets/images/card_bg.svg";
import avatarImage from "@assets/images/icons/avatar_img.png";
import { toast } from "sonner";
import { GoTriangleUp } from "react-icons/go";
import { IoMdShareAlt } from "react-icons/io";
import { IconButton } from "@components/common/buttons/Iconbutton";
import { MdInfo } from "react-icons/md";
import { IoCopy } from "react-icons/io5";
import { ShareFormatter } from "@components/common/shareFormatter";
import { LazyLoadImage } from "react-lazy-load-image-component";

const tier1Referrals = [
  {
    userLogo: avatarImage,
    name: "sebastian",
    userName: "@Benjamin",
    createdAt: "12-3-2023",
    rewardedShares: "1124",
    isTier2: false,
  },
  {
    userLogo: avatarImage,
    name: "sebastian",
    userName: "@Benjamin",
    createdAt: "12-2-2023",
    rewardedShares: "1124",
    isTier2: false,
  },
  {
    userLogo: avatarImage,
    name: "sebastian",
    userName: "@Benjamin",
    createdAt: "12-5-2023",
    rewardedShares: "1124",
    isTier2: false,
  },
];

const tier2Referrals = [
  {
    userLogo: avatarImage,
    name: "sebastian",
    userName: "@Benjamin",
    createdAt: "12-6-2023",
    rewardedShares: "1124",
    isTier2: true,
  },
  {
    userLogo: avatarImage,
    name: "sebastian",
    userName: "@Benjamin",
    createdAt: "12-7-2023",
    rewardedShares: "1124",
    isTier2: true,
  },
  {
    userLogo: avatarImage,
    name: "sebastian",
    userName: "@Benjamin",
    createdAt: "12-9-2023",
    rewardedShares: "1124",
    isTier2: true,
  },
];

function Referral() {
  const [telegramId, setTelegramId] = useState<string | null>(null);
  const [tabs, setTabs] = useState<string>("Tier 1");
  const btnTabs = [{ name: "Tier 1" }, { name: "Tier 2" }];

  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referralLink, setReferralLink] = useState<string | null>(null);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const initData = window.Telegram.WebApp.initDataUnsafe;
      const user = initData?.user;

      if (user) {
        setTelegramId(user.id ?? null);
      }
    }
  }, []);

  useEffect(() => {
    if (telegramId) {
      fetch(
        `https://ravegenie-vgm7.onrender.com/api/referral/referral-code/${telegramId}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.referralCode) {
            setReferralCode(data.referralCode);
          }
        })
        .catch((err) => console.error("Error fetching referral code:", err));

      fetch(
        `https://ravegenie-vgm7.onrender.com/api/referral/referral-link/${telegramId}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.referralLink) {
            setReferralLink(data.referralLink);
          }
        })
        .catch((err) => console.error("Error fetching referral link:", err));
    }
  }, [telegramId]);

  const handleCopyReferralLink = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      navigator.vibrate([50, 50]);
      toast.info("Referral link copied!");
    }
  };

  const handleShareReferralLink = () => {
    if (referralLink) {
      const tg = window.Telegram?.WebApp;
      const shareText =
        "Join me on Ravegenie Games to earn rewards by completing tasks 🎉";
      const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(
        referralLink
      )}&text=${encodeURIComponent(shareText)}`;
      tg.openTelegramLink(fullUrl);
    }
  };

  const handleActiveTabs = (name: string) => {
    setTabs(name);
  };
  return (
    <div className="flex flex-col min-h-full">
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
                      {referralCode || "Loading..."}
                    </Button>
                    <IconButton
                      className="bg-transparent w-fit hover:bg-transparent"
                      onClick={handleCopyReferralLink}
                    >
                      <IoCopy color="white" />
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
                <div className="flex flex-col items-center">
                  <h1 className="aqum text-[13px] font-bold text-center items-top flex  text-white py-2">
                    <span>
                      <MdInfo color="#D25804" size={10} />
                    </span>{" "}
                    You&apos;ve been awared
                    <br /> {ShareFormatter(1000)} $shares
                  </h1>
                  <Button className="w-[111.2px] h-[30px] bg-[#D25804] hover:bg-orange-500 text-white text-xs font-semibold text-center poppins">
                    Claim now
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
                  className={`poppins object-cover  w-[88px] h-8 px-10 bg-[#171717] relative hover:bg-transparent capitalize ${
                    tabs === tab.name
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

            <>
              {tabs === "Tier 1" && (
                <>
                  {tier1Referrals.length > 0 ? (
                    tier1Referrals.map((ref) => (
                      <Referrals key={ref.createdAt} referrals={ref} />
                    ))
                  ) : (
                    <div className="p-4 text-center">No Referrals yet</div>
                  )}
                </>
              )}

              {tabs === "Tier 2" && (
                <>
                  {tier2Referrals.length > 0 ? (
                    tier2Referrals.map((ref) => (
                      <Referrals key={ref.createdAt} referrals={ref} />
                    ))
                  ) : (
                    <div className="p-4 text-center">No Referrals yet</div>
                  )}
                </>
              )}
            </>
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
    userName: string;
    name: string;
    createdAt: string;
    isTier2: boolean;
    rewardedShares: string;
  };
}

export const Referrals = ({ referrals }: RefferalsProps) => {
  return (
    <>
      {!referrals && <div className="p-4 text-center">No Referrals yet</div>}
      <div className="flex items-center justify-between py-5 border-b border-[#5F59598A]">
        <div className="flex items-center gap-2">
          <div className="h-[50px] w-[50px] rounded-full">
            <LazyLoadImage
              effect="blur"
              src={referrals.userLogo}
              alt={referrals.name + "Logo"}
              className="h-full w-full rounded-s-none object-cover object-center"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xs font-medium font-mono text-white">
              {referrals.name}
            </h1>
            <p className="text-[#B7B3B3] text-[8px]">
              {referrals.createdAt}{" "}
              <span className="font-bold">
                {referrals.isTier2 && referrals.userName}
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-white text-xs font-bold">
            {referrals.rewardedShares}
          </h1>
          <span className="flex items-center  justify-end">
            {" "}
            <GoTriangleUp size={18} color={"#00D95F"} />
          </span>
        </div>
      </div>
    </>
  );
};

*/
