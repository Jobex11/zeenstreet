import { useEffect, useState, useRef } from "react";
import dotsbg from "@assets/images/dotted-bg.png";
import { Link } from "react-router-dom";
import { useGetNotificationsQuery } from "@hooks/redux/notifications";
import avatarImg from "@assets/images/icons/users_avatar.svg";
import { GiRank2 } from "react-icons/gi";
import { LuMedal } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

function Header() {
  const [page] = useState(0);
  const [unseenCount, setUnseenCount] = useState(0);
  const limit = 10;
  const users = useSelector((state: RootState) => state.userData);
  const { data: notifications, isLoading } = useGetNotificationsQuery([page, limit], {
    refetchOnReconnect: true,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const notificationRefs = useRef<Record<string, HTMLElement | null>>({});



  useEffect(() => {
    if (notifications?.notifications) {
      const lastViewed = localStorage.getItem("lastNotificationViewed");
      const unseen = notifications.notifications.filter(
        (notif: { createdAt: string | number | Date }) =>
          new Date(notif.createdAt) > new Date(lastViewed || 0)
      );
      setUnseenCount(unseen.length || 0);
    }
  }, [notifications]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const notificationId = entry.target.getAttribute("data-id");
            if (notificationId) {
              // Mark as seen
              const lastViewed = localStorage.getItem("lastNotificationViewed") || 0;
              const notificationTime = new Date(
                notifications?.notifications.find(
                  (n: { _id: string }) => n._id === notificationId
                )?.createdAt
              );
              if (notificationTime > new Date(lastViewed)) {
                localStorage.setItem("lastNotificationViewed", notificationTime.toISOString());
                setUnseenCount((prev) => Math.max(0, prev - 1));
              }
            }
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the notification is visible
    );

    // Observe each notification
    Object.values(notificationRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [notifications]);

  const handleViewNotifications = () => {
    localStorage.setItem("lastNotificationViewed", new Date().toISOString());
    setUnseenCount(0);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${dotsbg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="h-fit w-full top-0 sticky z-50"
    >
      <header className="flex items-center justify-between w-full py-4 px-3 ">
        <div className="flex items-center gap-4">
          <Link to={"/leader-board"}>
            <LuMedal size={23} color={"white"} />
          </Link>
          <Link to={"/ranks"}>
            <GiRank2 color={"white"} size={28} />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to={"/profile"}>
            <div className="flex items-center bg-transparent border border-gray-500 hover:bg-transparent pr-2 rounded-md gap-2 h-7 min-w-16">
              <img
                src={users.photo_url ?? avatarImg}
                loading="lazy"
                alt="user placeholder"
                className="h-6 w-6 rounded-md"
              />
              <span className="text-[9px] work-sans font-medium text-white">
                @{users.username}
              </span>
            </div>
          </Link>
          <Link
            to="/notifications"
            className="relative w-fit h-fit"
            onClick={handleViewNotifications}
          >
            <MdOutlineMailOutline size={28} color="white" />
            {unseenCount > 0 && (
              <div className="h-4 w-4 bg-[#D36519] text-xs text-white flex items-center justify-center rounded-full work-sans absolute -top-1 -left-1 z-20">
                {isLoading ? 0 : unseenCount}
              </div>
            )}
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Header;
