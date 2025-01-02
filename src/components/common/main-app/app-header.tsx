import { useEffect, useState } from "react";
import dotsbg from "@assets/images/dotted-bg.png";
import { Link } from "react-router-dom";
import { useGetNotificationsQuery } from "@hooks/redux/notifications"
import avatarImg from "@assets/images/icons/users_avatar.svg"
import { GiRank2 } from "react-icons/gi";
import { LuMedal } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";

function Header() {
  const [page] = useState(0);
  const [profileImage, setProfileImage] = useState<string>(avatarImg);
  const limit = 10
  const [telegramUsername, setTelegramUsername] = useState("");
  const { data: notifications } = useGetNotificationsQuery([page, limit],
    { refetchOnReconnect: true, refetchOnFocus: true, refetchOnMountOrArgChange: true });


  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const initData = window.Telegram.WebApp.initDataUnsafe;
      const user = initData?.user;

      // Set Telegram user data
      if (user) {
        // setTelegramId(user.id ?? null);
        setProfileImage(user.photo_url || avatarImg);
        setTelegramUsername(user.username ?? "User");
      }
    }
  }, []);


  return (
    <div
      style={{
        backgroundImage: `url(${dotsbg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="h-fit w-full  top-0 sticky z-50"
    >
      <header className="flex items-center justify-between w-full py-4 px-3 ">
        <div className="flex items-center gap-4">
          <Link to={"/leader-board"}>
            <LuMedal
              size={26}
              color={"white"} />
          </Link>
          <Link to={"/ranks"}>
            <GiRank2
              color={"white"}
              size={30}
            />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to={"/profile"}>
            <div className="flex items-center bg-transparent border border-gray-500 hover:bg-transparent pr-2 rounded-md gap-2 h-7 min-w-16">
              <img
                src={profileImage}
                loading="lazy"
                alt="user placeholder"
                className="h-6 w-6 rounded-md"
              />
              <span className="text-[9px] work-sans font-medium text-white">
                @{telegramUsername.slice(0, 10) || "You"}
              </span>
            </div>
          </Link>
          <Link to={"/notifications"} className="relative w-fit h-fit">
            <MdOutlineMailOutline size={30} color="white"/>
            {
              notifications?.totalNotifications &&
              <div className="h-4 w-4 bg-[#D36519] text-xs text-white flex items-center justify-center rounded-full work-sans absolute -top-1 -left-1 z-20">
                {notifications?.totalNotifications || 0}
              </div>
            }
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Header;
