import { useState, useMemo, useEffect, Key, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
// import dotsbg from "@assets/images/dotted-bg.png";
import trophy from "@assets/images/icons/trophy.png";
import sprinkledStars from "@assets/images/icons/sprinkled_stars.png";
import eclipse from "@assets/images/eclipse.png";
import { ShareFormatter } from "@components/common/shareFormatter";
import { useGetAllUsersQuery } from "@hooks/redux/users";
import { useGetFilePathQuery, useGetTelegramUserPhotoUrlQuery } from "@hooks/redux/tg_photo";
import { useGetAllRanksQuery } from "@/hooks/redux/ranks";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import avatarImg from "@assets/images/icons/users_avatar.svg"
import { Skeleton } from "@components/ui/skeleton";
// import { ScrollArea, ScrollBar } from "@components/ui/scroll-area"
// import InfiniteScroll from "react-infinite-scroll-component";
// import { FiLoader } from "react-icons/fi"

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
  const [userPages] = useState<number>(1)
  const limit = 10
  const [telegramId, setTelegramId] = useState<string | null>(null);
  const [emblaRef, embla] = useEmblaCarousel({ dragFree: false, watchDrag: false });
  const { data: allUsers, isLoading: loadingUsers, isSuccess: usersLoaded } = useGetAllUsersQuery([userPages, limit], {
    refetchOnReconnect: true,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const { data: ranks, isSuccess: ranksLoaded } = useGetAllRanksQuery(undefined, {
    refetchOnReconnect: true,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });


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
        users: users.sort((a: { shares: number; }, b: { shares: number; }) => b.shares - a.shares),
      };

    });
  }, [allUsers, loadingUsers, rankRanges, telegramId]);


  const currentUser = (telegram_id: string) => {
    const user = telegram_id === telegramId;
    return user
  }


  const scrollPrev = async () => {
    if (usersLoaded && ranksLoaded && embla) {
      await embla.scrollPrev();
    }
  };


  const scrollNext = async () => {
    if (usersLoaded && ranksLoaded && embla) {
      await embla.scrollNext();
    }
  };


  const scrollableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (scrollableRef.current) {
        const windowHeight = window.innerHeight;
        const topOffset = scrollableRef.current.offsetTop;
        const desiredHeight = windowHeight - topOffset - 20; // 20px buffer
        scrollableRef.current.style.height = `${desiredHeight}px`;
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className="flex flex-col min-h-full pb-32 flex-1">

      {loadingUsers &&
        <div className="flex flex-col gap-4 px-2 h-full">
          <Skeleton className='h-52 relative w-full rounded-md bg-gray-600 shadow-2xl'>
            <div
              className="absolute top-1/2 h-10 w-10 flex items-center justify-center left-2 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded-full shadow-md hover:bg-gray-600"
            />
            <div
              className="absolute top-1/2 h-10 w-10 flex items-center justify-center right-2 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded-full shadow-md hover:bg-gray-600"
            />
          </Skeleton>
          <div>
            <Skeleton className='h-11 mb-2 w-full rounded-md bg-gray-600 shadow-2xl' />
            <Skeleton className='h-11 w-full rounded-md bg-gray-600 shadow-2xl' />
          </div>
        </div>
      }

      {/* <div
        style={{
          backgroundImage: `url(${dotsbg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="flex flex-col max-h-full flex-1 "
      > */}
      {/* Embla Carousel */}
      {usersLoaded &&
        <div className="relative h-full flex-1 ">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container flex">
              {usersByRank.map((group: { rank: string | number, users: { username: string; shares: number; telegram_id: string; _id: string; }[]; }, index: Key | null | undefined) => (
                <div className="embla__slide w-full " key={index}>
                  <div className="flex flex-col gap-10 flex-1 h-full pb-28">
                    <div
                      style={{
                        backgroundImage: `url(${eclipse}), url(${sprinkledStars})`,
                        backgroundRepeat: "no-repeat, no-repeat",
                        backgroundSize: "cover, cover",
                        backgroundPosition: "center, center",
                        backgroundBlendMode: "multiply,multiply ",
                      }}
                      className="h-[240px] flex flex-col items-center justify-center w-full rounded-md"
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


                    {/* <InfiniteScroll
                        dataLength={group?.users.length || 0}
                        next={loadNextPage}
                        hasMore={allUsers?.currentPage < allUsers?.totalPages}
                        loader={
                          <div className="flex flex-col items-center justify-center py-5">
                            <FiLoader size={30} color="white" className="animate-spin" />
                          </div>}
                        scrollThreshold={0.9}
                        scrollableTarget="scrollableDiv"
                        //  className={"overflow-y-auto"}
                      > */}

                    <div className="flex flex-col divide-y-2 divide-gray-800 my-3">
                      {
                        group?.users?.length > 0 ?
                          group?.users?.map((user: { username: string; shares: number; telegram_id: string, _id: string }) => (
                            <div key={user._id} className={`flex mb-3 ${currentUser(user.telegram_id) && "shadow-2xl bg-white rounded-lg px-1"} items-center justify-between py-1`}>
                              <div className="flex items-center gap-3">
                                <RankImage user={user} telegram_id={user.telegram_id} />
                                <h1 className={`${currentUser(user.telegram_id) && "text-black"} text-[#FFFFFF] text-sm capitalize font-semibold jakarta`}>
                                  {user.username}
                                </h1>
                              </div>
                              <div>
                                <h1 className={`font-medium text-xs jakarta flex items-center gap-1 ${currentUser(user.telegram_id) ? " text-black" : "text-white"}`}>
                                  <ShareFormatter shares={user.shares} />
                                </h1>
                              </div>
                            </div>
                          )) : (
                            <div className="text-center text-white text-lg flex flex-col gap-1 pt-5 items-center">
                              <HiOutlineUserGroup size={45} className="" />
                            </div>
                          )}
                    </div>
                    {/* </InfiniteScroll> */}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={scrollPrev}
              className="absolute top-1/4 h-10 w-10 flex items-center justify-center left-2 transform -translate-y-1/2 bg-orange-600 text-white active:scale-110 p-2 rounded-full shadow-md hover:bg-orange-700"
            >
              <IoIosArrowBack size={20} />
            </button>
            <button
              onClick={scrollNext}
              className="absolute top-1/4 h-10 w-10 flex items-center justify-center right-2 transform -translate-y-1/2 bg-orange-600 text-white active:scale-110 p-2 rounded-full shadow-md hover:bg-orange-700"
            >
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
      }
    </div>
    // </div >
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
  const BOT_TOKEN = "7876229498:AAEvj3K6fNEOOtr9vb1FeJY7Epp8bPh0VcU"
  return (
    <div className="h-[49px] w-[49px]">
      {filePath ? <img
        src={`https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`}
        alt="Rank badge"
        className="min-h-full w-full object-center rounded-full object-contain"
      />
        :
        <img
          src={avatarImg}
          alt={`${user.username}'s Logo`}
          className="h-full w-full rounded-full object-cover object-center"
        />

      }
    </div>
  )
}


// const testUsers = [
//   { username: "john_doe", shares: 100, telegram_id: "12345", _id: "1" },
//   { username: "jane_smith", shares: 200, telegram_id: "67890", _id: "2" },
//   { username: "alex_brown", shares: 50, telegram_id: "54321", _id: "3" },
//   { username: "maria_gonzalez", shares: 150, telegram_id: "98765", _id: "4" },
//   { username: "chris_lee", shares: 80, telegram_id: "19283", _id: "5" },
//   { username: "emma_wilson", shares: 300, telegram_id: "29384", _id: "6" },
//   { username: "oliver_jones", shares: 120, telegram_id: "37465", _id: "7" },
//   { username: "sophia_davis", shares: 90, telegram_id: "48576", _id: "8" },
//   { username: "liam_moore", shares: 200, telegram_id: "59687", _id: "9" },
//   { username: "ava_miller", shares: 60, telegram_id: "60798", _id: "10" },
//   { username: "william_taylor", shares: 250, telegram_id: "71809", _id: "11" },
//   { username: "isabella_anderson", shares: 40, telegram_id: "82910", _id: "12" },
//   { username: "noah_thompson", shares: 130, telegram_id: "93021", _id: "13" },
//   { username: "mia_harris", shares: 110, telegram_id: "10432", _id: "14" },
//   { username: "james_clark", shares: 300, telegram_id: "11543", _id: "15" },
//   { username: "lucas_white", shares: 70, telegram_id: "12654", _id: "16" },
//   { username: "amelia_hall", shares: 180, telegram_id: "13765", _id: "17" },
//   { username: "benjamin_lopez", shares: 220, telegram_id: "14876", _id: "18" },
//   { username: "elijah_martin", shares: 140, telegram_id: "15987", _id: "19" },
//   { username: "harper_walker", shares: 90, telegram_id: "16098", _id: "20" },
//   { username: "mia_harris", shares: 110, telegram_id: "10432", _id: "14" },
//   { username: "james_clark", shares: 300, telegram_id: "11543", _id: "15" },
//   { username: "lucas_white", shares: 70, telegram_id: "12654", _id: "16" },
//   { username: "amelia_hall", shares: 180, telegram_id: "13765", _id: "17" },
//   { username: "benjamin_lopez", shares: 220, telegram_id: "14876", _id: "18" },
//   { username: "elijah_martin", shares: 140, telegram_id: "15987", _id: "19" },
//   { username: "harper_walker", shares: 90, telegram_id: "16098", _id: "20" },
// ];
