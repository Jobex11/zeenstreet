import dotsbg from "@assets/images/dotted-bg.png";
import { Skeleton } from "@components/ui/skeleton";
import { useGetNotificationsQuery, useGetPingedNotificationsQuery } from "@hooks/redux/notifications";
import moment from 'moment';
import { Fragment, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { TbBellRinging2 } from "react-icons/tb";
import { Input } from "@components/ui/input";
import { RiSearch2Line } from "react-icons/ri";
import { useTelegramWebApp } from "@hooks/useTelegramWebapp"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useGetTelegramId } from "@/hooks/getTelegramId";
import { useSearchParams } from "react-router-dom";
import { IoFilterOutline } from "react-icons/io5";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { GiPingPongBat } from "react-icons/gi";
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useGetFilePathQuery, useGetTelegramUserPhotoUrlQuery } from '@hooks/redux/tg_photo';
import AddReview from "@/components/common/main-app/add-review";

interface NotificationTypes {
  _id: string
  title: string;
  logo: string;
  description: string;
  createdAt: string;
  name: string;
  url: string
}


function MailNotification() {

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [notificationPage, setNotificationPage] = useState<number>(1);
  const { telegramId } = useGetTelegramId();
  const limit = 10;
  const activeTab = searchParams.get("tab") || "In-app Notifications";
  const btnTabs = ["In-app Notifications", "Ping Notifications"];
  const { openLink } = useTelegramWebApp();
  const { data: pingedNotification, isLoading: isLoadingPing, refetch: refetchPing } = useGetPingedNotificationsQuery(telegramId, {
    skip: !telegramId,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  })

  const { data: notifications, isLoading, refetch, } = useGetNotificationsQuery([notificationPage, limit],
    {
      refetchOnReconnect: true,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    });

  const loadNextPage = () => {
    if (notifications?.currentPage < notifications?.totalPages) {
      setNotificationPage((prev) => prev + 1);
    }
  };

  const loadPreviousPage = () => {
    if (notifications?.currentPage > 1) {
      setNotificationPage((prev) => prev - 1);
    }
  };


  const handleRefetch = async () => {
    await refetch();
    await refetchPing();
  }

  const filteredNotifications = notifications?.notifications.filter((notification: { title: string; }) =>
    notification.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasFilteredResults = filteredNotifications && filteredNotifications.length > 0;

  const handleActiveTabs = (name: string) => {
    setSearchParams({ tab: name });
  };

  return (
    <div className='flex flex-col h-screen'>
      <div
        style={{
          backgroundImage: `url(${dotsbg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className='flex flex-col flex-1 py-3'
      >
        <div className="flex flex-col px-4">
          <div className="flex items-center justify-between py-3 inter">

            <div className="flex items-center gap-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger className={"outline-none border-none relative"}>
                  <Fragment>
                    <IoFilterOutline color="white" size={30} />
                    <div className={"h-2 w-2 z-20 bg-orange-600 animate-pulse rounded-full absolute top-0 left-0"} />
                  </Fragment>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-orange-600 rounded text-white flex flex-col border-none work-sans">
                  {btnTabs.map((tabs) => (
                    <DropdownMenuItem key={tabs} className={`${activeTab === tabs && "bg-white text-black"}`} onClick={() => handleActiveTabs(tabs)} >{tabs}</DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <AddReview />
            </div>

            <button
              type="button"
              onClick={() => { handleRefetch(); navigator.vibrate([50, 50]) }}
              className="text-white work-sans text-xs hover:text-gray-500 flex items-center gap-2"
            >
              Refresh
              <FiRefreshCcw color="white" className={`${isLoading && "animate-spin"}`} />
            </button>
          </div>

          <Fragment>
            {activeTab === "In-app Notifications" ?
              <Fragment>
                <div className={`${notifications?.notifications.length >= 10 ? "block" : "hidden"} relative mb-3`}>
                  <Input
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full work-sans border rounded-lg py-5 bg-inherit pl-9 text-white"
                  />
                  <RiSearch2Line color="white" size={23} className="absolute top-2.5 left-2" />
                </div>

                {isLoading && (
                  <div className="flex flex-col w-full gap-3">
                    {[0, 1, 2, 3, 4].map((skeleton) => (
                      <Skeleton key={skeleton} className="min-w-full rounded-md h-16 w-full bg-gray-600 shadow-lg" />
                    ))}
                  </div>
                )}

                {!isLoading && (!hasFilteredResults || !notifications?.notifications) && (
                  <div className="flex flex-col h-full items-center justify-center gap-5 pt-10">
                    <TbBellRinging2 size={50} color={"white"} />
                    <p className="text-white work-sans text-lg">No notifications found.</p>
                  </div>
                )}

                {hasFilteredResults && (
                  <div className="flex-1 overflow-y-auto pb-[6rem]">
                    <div className="flex flex-col gap-3 ">
                      {filteredNotifications.map((notification: NotificationTypes) => (
                        <div
                          onClick={() => {
                            openLink(notification.url, { try_instant_view: false })
                          }}
                          key={notification._id}
                          className="py-4 px-2 flex items-center gap-3  border-b border-[#3E3D3D] hover:bg-gray-900 duration-200 inter"
                        >
                          <Avatar className="w-12 h-12 relative">
                            <AvatarImage
                              src={notification.logo}
                              alt={notification.logo}
                              className={"object-cover object-center h-full w-full"}
                            />
                            <AvatarFallback className={"uppercase font-bold"}>{notification.logo[0]}</AvatarFallback>
                            <div className={"absolute top-0 w-full h-full z-10 bg-transparent rounded-full"} />
                          </Avatar>
                          <div>
                            <h1 className="text-[10px] font-semibold text-[#FFFFFF] line-clamp-1">
                              {notification.title}
                              <span className="text-[#9EA6FF] text-[8px] font-semibold"> @{notification.name}</span>
                            </h1>
                            <h1 className="text-[9px] italic text-[#FFFFFF] font-normal line-clamp-1 pt-0.5">
                              {notification.description}
                            </h1>
                            <h1 className="text-[#D25804] text-[8px] font-medium pt-0.5">
                              Posted {moment(notification.createdAt).fromNow()}
                            </h1>
                          </div>
                        </div>
                      ))}
                    </div>

                    {notifications?.totalPages > 1 && (
                      <div className="flex items-center justify-center gap-5 py-3">
                        {notifications?.currentPage > 1 && (
                          <button
                            className="bg-white rounded-full h-6 w-6 shadow-lg flex items-center justify-center"
                            onClick={loadPreviousPage}
                          >
                            <IoIosArrowBack />
                          </button>
                        )}

                        {notifications?.currentPage < notifications?.totalPages && (
                          <button
                            className="bg-white rounded-full h-6 w-6 shadow-lg flex items-center justify-center"
                            onClick={loadNextPage}
                          >
                            <IoIosArrowForward />
                          </button>
                        )}
                      </div>
                    )}

                  </div>
                )}
              </Fragment>
              : <Fragment>
                {isLoadingPing && (
                  <div className="flex flex-col w-full gap-3">
                    {[0, 1, 2, 3, 4].map((skeleton) => (
                      <Skeleton key={skeleton} className="min-w-full rounded-md h-24 w-full bg-gray-600 shadow-lg" />
                    ))}
                  </div>
                )}

                {!isLoadingPing && pingedNotification?.data?.length === 0 && (
                  <div className="flex flex-col h-full items-center justify-center gap-5 pt-10">
                    <GiPingPongBat size={50} color={"white"} />
                    <p className="text-white work-sans text-lg">No Ping Notifications found.</p>
                    <p className="text-gray-300 work-sans text-sm text-center">
                      To view a Ping Notification, you need to be referred by someone. This could mean that no one referred you, or your referrer has not sent any Ping Notifications yet.
                    </p>
                  </div>
                )}

                {pingedNotification?.data?.map((notification: NotificationData) => (
                  <NotificationCard key={notification._id} notification={notification} />
                ))}
              </Fragment>}
          </Fragment>
        </div>

      </div>
    </div>

  )
}

export default MailNotification




interface NotificationData {
  _id: string
  telegram_id: string
  sent_by: {
    _id: string
    accountName: string
  }
  title: string
  message: string
  recipients: string[]
  createdAt: string
}

interface NotificationCardProps {
  notification: NotificationData
}

export function NotificationCard({ notification }: NotificationCardProps) {

  const { data: photoData, isSuccess: isPhotoSuccess } = useGetTelegramUserPhotoUrlQuery(notification?.telegram_id, {
    skip: !notification?.telegram_id,
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
    <Card className="w-full max-w-2xl work-sans mt-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3">
        <div className="flex items-center space-x-4">
          <Avatar className="w-12 h-12 relative">
            <AvatarImage
              src={`https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`}
              alt={notification.sent_by.accountName} />
            <AvatarFallback>{notification.sent_by.accountName[0]}</AvatarFallback>
            <div className={"absolute top-0 w-full h-full z-10 bg-transparent rounded-full"} />
          </Avatar>
          <div>
            <p className="text-xs font-medium leading-none">{notification.sent_by.accountName}</p>
          </div>
        </div>
        <Badge variant="outline">{format(new Date(notification.createdAt), "PPp")}</Badge>
      </CardHeader>
      <CardContent className={"px-3"}>
        <div className="grid gap-4">
          <div className="space-y-2">
            <p>{notification.title}</p>
            <p className="text-xs text-muted-foreground break-words work-sans">{notification.message}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

