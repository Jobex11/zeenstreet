import dotsbg from "@assets/images/dotted-bg.png";
import { Skeleton } from "@components/ui/skeleton";
import { useGetNotificationsQuery } from "@hooks/redux/notifications";
import moment from 'moment';
import { useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { TbBellRinging2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { FiLoader } from "react-icons/fi"
import { Input } from "@components/ui/input";
import { RiSearch2Line } from "react-icons/ri";


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

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [notificationPage, setNotificationPage] = useState<number>(1)
  const limit = 10

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


  const handleRefetch = async () => {
    await refetch();
  }

  const filteredNotifications = notifications?.notifications.filter((notification: { title: string; }) =>
    notification.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasFilteredResults = filteredNotifications && filteredNotifications.length > 0;

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
            <h1 className="text-sm font-semibold text-white work-sans">Notifications</h1>
            <button
              type="button"
              onClick={() => { handleRefetch(); navigator.vibrate([50, 50]) }}
              className="text-white work-sans text-sm hover:text-gray-500 flex items-center gap-2"
            >
              Refresh
              <FiRefreshCcw color="white" className={`${isLoading && "animate-spin"}`} />
            </button>
          </div>
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
            <div className="flex-1 overflow-y-auto">
              <InfiniteScroll
                dataLength={filteredNotifications.length}
                next={loadNextPage}
                hasMore={notifications?.currentPage < notifications?.totalPages}
                loader={
                  <div className="flex flex-col items-center justify-center py-5">
                    <FiLoader size={30} color="white" className="animate-spin" />
                  </div>
                }
                scrollThreshold={0.9}
                refreshFunction={async () => {
                  await refetch();
                }}
                pullDownToRefresh
                pullDownToRefreshThreshold={50}
                pullDownToRefreshContent={
                  <div className="flex items-center justify-center gap-2">
                    <FiRefreshCcw color="white" className={`${isLoading && "animate-spin"}`} />
                    <span className="work-sans text-sm text-white">Pull to refresh</span>
                  </div>
                }
                releaseToRefreshContent={
                  <div className="flex items-center justify-center gap-2">
                    <FiRefreshCcw color="white" className={`${isLoading && "animate-spin"}`} />
                    <span className="work-sans text-sm text-white">Release to refresh</span>
                  </div>
                }
              >
                <div className="flex flex-col gap-3 pb-[6rem]">
                  {filteredNotifications.map((notification: NotificationTypes) => (
                    <Link
                      to={notification.url}
                      key={notification._id}
                      className="py-4 px-2 flex items-center gap-3 rounded border-b border-[#3E3D3D] hover:bg-gray-900 duration-200 inter"
                    >
                      <div className="rounded-full h-[50px] w-[50px]">
                        <img
                          src={notification.logo}
                          alt="Notification Logo"
                          className="h-full w-full object-cover object-center rounded-full"
                        />
                      </div>
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
                    </Link>
                  ))}
                </div>
              </InfiniteScroll>
            </div>
          )}
        </div>
      </div>
    </div>

  )
}

export default MailNotification
