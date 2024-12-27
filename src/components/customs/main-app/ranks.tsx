import { useState, useMemo, useEffect, Key } from "react";
import useEmblaCarousel from "embla-carousel-react";
import dotsbg from "@assets/images/dotted-bg.png";
import trophy from "@assets/images/icons/trophy.png";
import sprinkledStars from "@assets/images/icons/sprinkled_stars.png";
import eclipse from "@assets/images/eclipse.png";
import { ShareFormatter } from "@components/common/shareFormatter";
import { useGetAllUsersQuery } from "@hooks/redux/users";
import { useGetFilePathQuery, useGetTelegramUserPhotoUrlQuery } from "@hooks/redux/tg_photo";
import { useGetAllRanksQuery } from "@/hooks/redux/ranks";
import { HiOutlineUserGroup } from "react-icons/hi2";

interface Rank {
  rankRange: { min: number; max: number };
  rank: string;
  _id: string;
}

interface User {
  username: string;
  shares: number;
  telegram_id: string;
  _id: string;
}


function Ranks() {
  const [telegramId, setTelegramId] = useState<string | null>(null);
  const [emblaRef] = useEmblaCarousel();
  const { data: allUsers, isLoading: loadingUsers } = useGetAllUsersQuery(undefined);
  const { data: ranks, isSuccess: ranksLoaded } = useGetAllRanksQuery(undefined);


  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tgData = window.Telegram.WebApp.initDataUnsafe;
      if (tgData && tgData.user && tgData.user.id) {
        setTelegramId(tgData.user.id.toString());
      }
    }
  }, []);

  const rankRanges = useMemo(() => {
    if (!ranksLoaded || !ranks) return [];
    return ranks?.data?.map((rank: Rank) => ({
      rank: rank.rank,
      min: rank.rankRange.min,
      max: rank.rankRange.max,
    }));
  }, [ranks, ranksLoaded]);

  // Categorize users by rank
  const usersByRank = useMemo(() => {
    if (loadingUsers || !allUsers) return [];
  
    // Ensure rank ranges exist
    const updatedRanks = [...rankRanges];
    const lastRange = updatedRanks[updatedRanks.length - 1];
  
    // Include the current user in the highest rank if they exceed the range
    const currentUserDetails = allUsers.users.find(
      (user: User) => user.telegram_id === telegramId
    );
  
    if (currentUserDetails) {
      // Adjust the highest range's max to include the current user if necessary
      if (currentUserDetails.shares > lastRange?.max) {
        updatedRanks[updatedRanks.length - 1] = {
          ...lastRange,
          max: currentUserDetails.shares, // Extend the max range dynamically
        };
      }
    }
  
    // Group users by ranks
    return updatedRanks.map((range) => {
      const users = allUsers.users.filter(
        (user: User) => user.shares >= range.min && user.shares <= range.max
      );
  
      // Ensure the current user appears at the top of their rank group
      return {
        rank: range.rank,
        users: users.sort((a: { telegram_id: string | null; shares: number; }, b: { telegram_id: string | null; shares: number; }) => {
          if (a.telegram_id === telegramId) return -1;
          if (b.telegram_id === telegramId) return 1;
          return b.shares - a.shares; // Sort by shares in descending order
        }),
      };
    });
  }, [allUsers, loadingUsers, rankRanges, telegramId]);
  

  const currentUser = (telegram_id: string) => {
    const user = telegram_id === telegramId;
    return user
  }
  return (
    <div className="flex flex-col min-h-full">
      <div
        style={{
          backgroundImage: `url(${dotsbg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="flex flex-col flex-1 pb-3"
      >
        {/* Embla Carousel */}
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {usersByRank.map((group: { rank: string | number, users: { username: string; shares: number; telegram_id: string; _id: string; }[]; }, index: Key | null | undefined) => (
              <div className="embla__slide w-full flex-shrink-0" key={index}>
                <div className="flex flex-col gap-8">
                  <div>
                    <div
                      style={{
                        backgroundImage: `url(${eclipse}), url(${sprinkledStars})`,
                        backgroundRepeat: "no-repeat, no-repeat",
                        backgroundSize: "cover, cover",
                        backgroundPosition: "center, center",
                        backgroundBlendMode: "multiply,multiply ",
                      }}
                      className="h-[250px] flex flex-col items-center justify-center w-full rounded-md"
                    >
                      <img
                        loading="eager"
                        src={trophy}
                        alt="Rank Trophy"
                        className="h-full w-full object-center object-contain"
                      />
                      <h2 className="text-center text-lg font-semibold aqum pb-10 bg-gradient-to-r from-orange-500 via-orange-300 to-pink-500 bg-clip-text text-transparent">
                        {group.rank}
                      </h2>
                    </div>
                  </div>
                  <div className="flex flex-col mt-3 divide-y-2 divide-gray-800">
                    {
                      group?.users.length > 0 ?
                        group?.users?.map((user: { username: string; shares: number; telegram_id: string, _id: string }) => (
                          <div key={user._id} className={`flex ${currentUser(user.telegram_id) && "shadow-2xl bg-white rounded-lg px-1"} items-center justify-between py-2`}>
                            <div className="flex items-center gap-3">
                              <RankImage user={user} telegram_id={user.telegram_id} />
                              <h1 className={`${currentUser(user.telegram_id) && "text-black"} text-[#FFFFFF] text-sm capitalize font-bold jakarta`}>
                                {user.username}
                              </h1>
                            </div>
                            <div>
                              <h1 className={`font-medium text-base jakarta flex items-center gap-1 ${currentUser(user.telegram_id) ? " text-black" : "text-white"}`}>
                                <ShareFormatter shares={user.shares + 10000} />
                              </h1>
                            </div>
                          </div>
                        )) : (
                          <div className="text-center text-white text-lg flex flex-col gap-1 pt-5 items-center">
                            <HiOutlineUserGroup size={45} className="" />
                            {/* No users yet for this rank. */}
                          </div>
                        )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ranks;

interface ImageProps {
  telegram_id: string | null;
  user: User;
}

export const RankImage = ({ telegram_id, user }: ImageProps) => {
  const { data: photoData, isSuccess: isPhotoSuccess } = useGetTelegramUserPhotoUrlQuery(telegram_id, {
    skip: !telegram_id,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  const fileId = isPhotoSuccess ? photoData?.result?.photos?.[0]?.[2]?.file_id : null;

  const { data: filePathData, isSuccess: isFileSuccess } = useGetFilePathQuery(fileId, {
    skip: !fileId,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  const filePath = isFileSuccess ? filePathData?.result?.file_path : null;
  const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  return (
    <div className="h-[49px] w-[49px]">
      {filePath ? <img
        src={`https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`}
        alt="Rank badge"
        className="min-h-full w-full object-center rounded-full object-contain"
      />
        : <div className="h-[50px] w-[50px] flex items-center justify-center bg-orange-500 uppercase text-white work-sans font-medium border rounded-full">
          {user?.username?.slice(0, 2)}
        </div>}
    </div>
  )
}
