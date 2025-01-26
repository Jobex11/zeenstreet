import sprinkledStars from "@assets/images/icons/sprinkled_stars.png"
import avatarImg from "@assets/images/icons/users_avatar.svg"
import { ShareFormatter } from '@components/common/shareFormatter'
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar"
import { ScrollArea } from '@components/ui/scroll-area'
import { Skeleton } from '@components/ui/skeleton'
import { useGetFilePathQuery, useGetTelegramUserPhotoUrlQuery } from '@hooks/redux/tg_photo'
import { useGetAllUsersQuery } from '@hooks/redux/users'
import { Fragment, useState } from 'react'
import { useGetTelegramId } from "@hooks/getTelegramId"

interface User {
    username: string;
    accountName: string;
    shares: number;
    cards: number;
    telegram_id: string;
    _id: string;
    unlockedCardsCount?: number;
    referralCount?: number;
}

interface UserImageProps {
    index: number;
    telegram_id: string;
    user: User;
}

const UserImages = ({ telegram_id, index, user }: UserImageProps) => {
    const { data: photoData, isSuccess: isPhotoSuccess } = useGetTelegramUserPhotoUrlQuery(telegram_id, {
        skip: !telegram_id,
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true

    });

    const fileId = isPhotoSuccess ? photoData?.result?.photos?.[0]?.[2]?.file_id : null;

    const { data: filePathData, isSuccess: isFileSuccess } = useGetFilePathQuery(fileId, {
        skip: !fileId,
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    const filePath = isFileSuccess ? filePathData?.result?.file_path : null;
    const BOT_TOKEN = "7876229498:AAHtNuIYCcpP_kxr_EEVH6aKdIZYlJNTvq4"

    return (
        <div className={`relative flex flex-col items-center  ${index === 0 ? 'w-24 h-24 shadow-xl' : 'w-16 h-16'}`} >
            {filePath ? <Avatar className={`w-full h-full shadow-2xl relative`}>
                <AvatarImage
                    src={`https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`}
                    alt={user?.accountName || user?.username} />
                <AvatarFallback className='uppercase bg-orange-500 text-white aqum text-xl work-sans font-medium'>{user && user?.accountName[0] || user?.username[0]}</AvatarFallback>
                <div className={"absolute top-0 w-full h-full z-10 bg-transparent rounded-full"} />
            </Avatar> :
                <Avatar className="w-full h-full relative">
                    <AvatarImage
                        src={avatarImg}
                        alt={user?.accountName || user?.username} />
                    <div className={"absolute top-0 w-full h-full z-10 bg-transparent rounded-full"} />
                </Avatar>}

            <div className={`absolute -bottom-2 z-40 h-5 w-5 rounded-full flex items-center text-xs justify-center work-sans ${index === 0 ? "bg-yellow-500 font-medium" : index === 1 ? "bg-green-600" : index === 2 ? "bg-purple-700" : ""}`}>
                {
                    index === 0 ? 1 : index === 1 ? 2 : index === 2 ? 3 : 0
                }
            </div>
        </div>
    )
}

export default function GlobalLeaderboard() {


    // const [userPages, setUserPage] = useState<number>(2)
    // const limit = 10
    const { telegramId } = useGetTelegramId()
    const [activeTab, setActiveTab] = useState<'shares' | 'unlockedCardsCount' | 'referralCount'>('shares');
    const { data: allUsers, isLoading, isSuccess, } = useGetAllUsersQuery(undefined, {
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });


    const sortedUsers = allUsers?.users ? [...allUsers.users].sort((a, b) => b[activeTab] - a[activeTab]) : [];
    const topThree = sortedUsers.slice(0, 3)
    const restUsers = sortedUsers.slice(3)

    const tabBtn = [
        { tab: "shares", name: "Shares" },
        { tab: "unlockedCardsCount", name: "Cards" },
        { tab: "referralCount", name: "Referrals" }
    ]

    const handleActiveTabs = (tab: 'shares' | 'unlockedCardsCount' | 'referralCount') => {
        setActiveTab(tab)
    }

    const currentUser = (telegram_id: string) => {
        const isCurrent = telegram_id === telegramId;
        console.log("Current user check:", { telegram_id, telegramId, isCurrent });
        return isCurrent;
    };

    // const loadNextPage = () => {
    //     if (allUsers?.currentPage < allUsers?.totalPages) {
    //         setUserPage((prev) => prev + 1);
    //     }
    // };


    return (
        <div className="flex flex-col h-screen text-white">
            <Fragment>
                {isLoading && <div className='flex flex-col gap-4 mt-10 px-3'>
                    <div className=' grid grid-cols-3 mb-3'>
                        {[0, 1, 3].map((ske) => (
                            <div key={ske} className={`flex flex-col h-full items-center ${ske === 0 ? 'order-2' : ske === 1 ? 'order-1' : 'order-3'}`}>
                                <Skeleton className='rounded-full h-20 w-20 bg-gray-600 shadow-lg' />
                            </div>
                        ))}
                    </div>
                    <Fragment>
                        <Skeleton className='h-10 w-full rounded-md bg-gray-600 shadow-2xl' />
                        <Skeleton className='h-10 w-full rounded-md bg-gray-600 shadow-2xl' />
                        <Skeleton className='h-10 w-full rounded-md bg-gray-600 shadow-2xl' />
                        <Skeleton className='h-10 w-full rounded-md bg-gray-600 shadow-2xl' />
                    </Fragment>
                </div>}
            </Fragment>
            {isSuccess &&
                <div style={
                    {
                        backgroundImage: `url(${sprinkledStars}), url(${sprinkledStars}), url(${sprinkledStars})`,
                        backgroundSize: "contain, contain",
                        backgroundRepeat: "no-repeat,",
                        backgroundPosition: "center, top",
                        backgroundBlendMode: "multiply",
                        backfaceVisibility: "visible"
                    }} className={`bg-black/5  rounded-b-lg`}>
                    <h1 className={"jakarta text-center text-xl font-semibold py-3 bg-gradient-to-r from-pink-600  via-orange-400 to-pink-600 bg-clip-text text-transparent"}>Leaderboard</h1>
                    <div className="h-fit pt-5 pb-6 px-4"  >
                        <div className="grid grid-cols-3 place-content-evenly place-items-stretch">
                            {topThree.map((user, index) => (
                                <div key={user._id} className={`flex flex-col h-full items-center ${index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'}`}>
                                    <UserImages index={index} user={user} telegram_id={user.telegram_id} />
                                    <span className="font-medium work-sans capitalize text-[10px] mt-3 line-clamp-1">{user?.accountName || user?.username}</span>
                                    <span className="text-sm work-sans"><ShareFormatter shares={user[activeTab]} /></span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>}
            <div className='flex items-center w-full mt-3 border-t border-gray-700' >
                {isSuccess && tabBtn.map((btn) => (
                    <div key={btn.name} className='flex flex-col w-full'>
                        <button
                            onClick={() => handleActiveTabs(btn.tab as 'shares' | 'unlockedCardsCount' | 'referralCount')}
                            className={`work-sans text-sm py-3 ${activeTab === btn.tab && "border-orange-600"} hover:text-gray-300 duration-150  w-full border-b-2 border-transparent`}
                            aria-pressed={activeTab === btn.tab}
                        >
                            {btn.name}
                        </button>
                        <div
                            className={`rounded-md w-full h-1 mx-auto transition-all duration-300 ease-in-out ${activeTab === btn.tab ? "bg-orange-500 scale-x-100" : "bg-transparent scale-x-0"
                                }`}
                        />
                    </div>
                ))}
            </div>



            <ScrollArea className="flex-1 h-full px-4 py-2 mt-7 pb-24 overflow-y-auto scroll-smooth">
                {restUsers?.slice(0, 100).map((user, index) => {
                    return (
                        <div key={user._id} className={`${currentUser(user?.telegram_id) && " rounded-md shadow-2xl text-black bg-white flex items-center justify-between px-2"} flex items-center justify-between py-1 border-b border-white/10`}>
                            <div className="flex items-center">
                                <span className="w-6 text-center">{index + 4}</span>
                                <MiniImage user={user} />
                                <span className="ml-2 jakarta font-medium text-sm">{user?.accountName || user?.username}</span>
                            </div>
                            <span className="text-sm work-sans pr-2"><ShareFormatter shares={user[activeTab]} /></span>
                        </div>
                    )
                })}
            </ScrollArea>
        </div>
    )
}


interface MiniImageProps {
    user: {
        telegram_id: string;
        accountName: string;
        username: string;
    }
}

export const MiniImage = ({ user }: MiniImageProps) => {

    const { data: photoData, isSuccess: isPhotoSuccess } = useGetTelegramUserPhotoUrlQuery(user?.telegram_id, {
        skip: !user?.telegram_id,
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });
    const fileId = isPhotoSuccess ? photoData?.result?.photos?.[0]?.[2]?.file_id : null;

    const { data: filePathData, isSuccess: isFileSuccess } = useGetFilePathQuery(fileId, {
        skip: !fileId,
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    const filePath = isFileSuccess ? filePathData?.result?.file_path : null;
    const BOT_TOKEN = "7876229498:AAHtNuIYCcpP_kxr_EEVH6aKdIZYlJNTvq4"
    return (
        <Fragment>
            {filePath ? <Avatar className="w-12 h-12 relative">
                <AvatarImage
                    src={`https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`}
                    alt={user.accountName || user.username} />
                <AvatarFallback className='uppercase bg-orange-500 text-white aqum text-xl work-sans font-medium'>{user && user?.accountName?.slice(0, 1) || user && user?.username?.slice(0, 1)}</AvatarFallback>
                <div className={"absolute top-0 w-full h-full z-10 bg-transparent rounded-full"} />
            </Avatar> :
                <Avatar className="w-12 h-12 relative">
                    <AvatarImage
                        src={avatarImg}
                        alt={user.accountName || user.username} />
                    <div className={"absolute top-0 w-full h-full z-10 bg-transparent rounded-full"} />
                </Avatar>
            }
        </Fragment>
    )
}
