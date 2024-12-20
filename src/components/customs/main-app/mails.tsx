import dotsbg from "@assets/images/dotted-bg.png";
import { useGetNotificationsQuery, notificationApi } from "@hooks/redux/notifications"
import { socket } from "@lib/socket.io";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@components/ui/skeleton"
import moment from 'moment';
import { TbBellRinging2 } from "react-icons/tb";
import { FiRefreshCcw } from "react-icons/fi";

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
  const [notificationPage] = useState(1)
  const limit = 10

  const { data: notifications, isLoading, refetch } = useGetNotificationsQuery({ notificationPage, limit },
    { refetchOnReconnect: true, refetchOnFocus: true });


  useEffect(() => {
    socket.on("notificationCreated", (newNotification) => {
      console.log("New task created, invalidating tasks tag", newNotification);
      notificationApi.util.invalidateTags(["Notifications"])
    });

    return () => {
      socket.off("notificationCreated");
    };
  }, []);

  // const loadNextPage = () => {
  //   if (notifications?.currentPage < notifications?.totalPages) {
  //     setNotificationPage(notifications?.currentPage + 1);
  //   }
  // };


  // const loadPrevPage = () => {
  //   if (notifications?.currentPage > 1) {
  //     setNotificationPage(notifications?.currentPage - 1);
  //   }
  // };

  const handleRefetch = () => {
    refetch();
    notificationApi.util.invalidateTags(['Notifications'])
  }

  return (
    <div className='flex flex-col min-h-full'>
      <div style={{
        backgroundImage: `url(${dotsbg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }} className='flex flex-col flex-1 py-3 '>
        <div className="flex flex-col px-4 ">
          <div className="flex items-center justify-between py-3 inter">
            <h1 className="text-xl font-semibold text-white work-sans">Notificaions</h1>
            <button type="button" onClick={() => handleRefetch()} className="text-white work-sans flex items-center gap-2">Refresh <FiRefreshCcw color="white" className={`${isLoading && "animate-spin"}`} /></button>
          </div>
          <Fragment>
            {isLoading && <div className={"flex flex-col w-full gap-3"}>
              {[0, 1, 2, 3, 4].map((skeleton) => (
                <Skeleton key={skeleton} className={"min-w-full rounded-md h-20 w-full bg-gray-600 shadow-lg"} />
              ))}
            </div>}

            {!notifications?.notifications &&
              <div className={"flex flex-col h-full items-center justify-center gap-5 pt-10"}>
                <TbBellRinging2 size={50} color={"white"} />
                <p className={"text-white work-sans text-lg"}>No notifications yet</p>
              </div>}
          </Fragment>

          {/* notifications */}
          <div className="flex flex-col gap-3 pb-[8rem]">
            {notifications?.notifications?.map((notification: NotificationTypes) => (
              <Link to={notification.url} key={notification._id} className="py-5 px-2 flex items-center gap-3 rounded border-b border-[#3E3D3D] hover:bg-gray-900 duration-200 inter">
                <div className=" rounded-full h-[50px] min-w-[50px]">
                  <img
                    src={notification.logo}
                    alt="Notification Logo"
                    className="h-full min-w-full object-cover object-center rounded-full" />
                </div>

                <div>
                  <h1 className="text-[10px] font-semibold text-[#FFFFFF] line-clamp-1">{notification.title}
                    <span className="text-[#9EA6FF] text-[8px] font-semibold">{" "}@{notification.name}</span></h1>
                  <h1 className="text-[9px] italic text-[#FFFFFF] font-normal line-clamp-1 pt-0.5">{notification.description}</h1>
                  <h1 className="text-[#D25804] text-[8px] font-medium pt-0.5">Posted {moment(notification.createdAt).fromNow()}</h1>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MailNotification
