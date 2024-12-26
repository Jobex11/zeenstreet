import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar"
import { useGetFilePathQuery, useGetTelegramUserPhotoUrlQuery } from '@hooks/redux/tg_photo'
import { useGetAllUsersQuery } from '@hooks/redux/users'
import { ShareFormatter } from '@components/common/shareFormatter'
import { PiPersonSimpleSnowboardLight } from "react-icons/pi";

interface User {
    username: string;
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
        <div className={`relative flex flex-col items-center  ${index === 0 ? 'w-28 h-28 shadow-xl' : 'w-20 h-20 '}`} >
            <Avatar className={`w-full h-full shadow-2xl`}>
                <AvatarImage
                    src={`https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`}
                    alt={user.username} />
                <AvatarFallback className='uppercase bg-orange-500 text-white aqum text-xl font-bold'>{user.username.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className={`absolute -bottom-2 z-40 h-8 w-8 rounded-full flex items-center justify-center work-sans ${index === 0 ? "bg-orange-500 font-bold" : index === 1 ? "bg-green-600" : index === 2 ? "bg-purple-700" : ""}`}>
                {
                    index === 0 ? 1 : index === 1 ? 2 : index === 2 ? 3 : 0
                }
            </div>
        </div>
    )
}

export default function GlobalLeaderboard() {
    const [activeTab, setActiveTab] = useState<'shares' | 'unlockedCardsCount' | 'referralCount'>('shares');
    const { data: allUsers } = useGetAllUsersQuery(undefined);
    const [telegramId, setTelegramId] = useState<string | null>(null);


    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            const tgData = window.Telegram.WebApp.initDataUnsafe;
            if (tgData && tgData.user && tgData.user.id) {
                setTelegramId(tgData.user.id.toString());
            }
        }
    }, []);

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


    return (
        <div className="flex flex-col h-screen text-white">
            <div className="h-fit pt-10 px-4">
                <h1 className="text-2xl font-bold text-center work-sans mb-4">Global Leaderboard</h1>
                <PiPersonSimpleSnowboardLight size={60} color={"white"} className='mx-auto mb-3' />
                <div className=" grid grid-cols-3 place-content-evenly place-items-stretch mt-4">
                    {topThree.map((user, index) => (
                        <div key={user._id} className={`flex flex-col h-full items-center ${index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'}`}>
                            <UserImages index={index} user={user} telegram_id={user.telegram_id} />
                            <span className="font-semibold work-sans capitalize mt-3 line-clamp-1">{user.username.slice(0,13)}</span>
                            <span className="text-sm work-sans"><ShareFormatter shares={user[activeTab]} /></span>
                        </div>
                    ))}
                </div>

                <div className='flex items-center w-full border-t border-white/10 mt-3'>
                    {tabBtn.map((btn) => (
                        <div key={btn.name} className='flex flex-col w-full'>
                            <button
                                onClick={() => handleActiveTabs(btn.tab as 'shares' | 'unlockedCardsCount' | 'referralCount')}
                                className={` work-sans py-3 ${activeTab === btn.tab && "border-orange-600"} hover:text-gray-700 duration-150  w-full border-b-2 border-transparent`}
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
            </div>

            <div className="flex-1 px-4 py-2 overflow-y-auto">
                {restUsers?.reverse().map((user, index) => {
                    return (
                        <div key={user._id} className={`${user?.telegram_id === telegramId && " rounded-md shadow-2xl text-white bg-slate-900 flex items-center justify-between px-2"} flex items-center justify-between py-2 border-b border-white/10`}>
                            <div className="flex items-center">
                                <span className="w-6 text-center">{index + 4}</span>
                                <MiniImage user={user} />
                                <span className="ml-2 jakarta">{user.username}</span>
                            </div>
                            <span className="text-sm work-sans pr-2"><ShareFormatter shares={user[activeTab]} /></span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


interface MiniImageProps {
    user: {
        telegram_id: string;
        username: string;
    }
}

export const MiniImage = ({ user }: MiniImageProps) => {

    const { data: photoData, isSuccess: isPhotoSuccess } = useGetTelegramUserPhotoUrlQuery(user?.telegram_id, {
        skip: !user?.telegram_id,
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
        <Avatar className="w-12 h-12 ml-2">
            <AvatarImage
                src={`https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`}
                alt={user.username} />
            <AvatarFallback className='uppercase bg-orange-500 text-white aqum text-xl font-semibold'>{user.username.slice(0, 2)}</AvatarFallback>
        </Avatar>
    )

}
