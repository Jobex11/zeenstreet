import { useEffect, useState } from "react";
import dotsbg from "@assets/images/dotted-bg.png";
import medalIcon from "@assets/images/icons/medal.svg";
import dropbox from "@assets/images/icons/dropbox.svg";
import profilePlaceholder from "@assets/images/icons/user-placeholder.svg";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useGetNotificationsQuery} from "@hooks/redux/notifications"
import { AiFillBell } from "react-icons/ai";

function Header() {

  const [profileImage, setProfileImage] = useState<string>(profilePlaceholder);
  const limit = 10
  const [telegramUsername, setTelegramUsername] = useState("");
  const { data: notifications } = useGetNotificationsQuery({ limit },
    { refetchOnReconnect: true, refetchOnFocus: true });


  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const initData = window.Telegram.WebApp.initDataUnsafe;
      const user = initData?.user;

      // Set Telegram user data
      if (user) {
        // setTelegramId(user.id ?? null);
        setProfileImage(user.photo_url || profilePlaceholder);
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
      className="h-fit w-full top-0 sticky z-50"
    >
      <header className="flex items-center justify-between w-full py-4 px-3">
        <div className="flex items-center gap-4">
          <span>
            <LazyLoadImage
              effect="blur"
              src={medalIcon}
              alt="medial icon"
              className="h-6 w-6" />
          </span>
          <Link to={"/ranks"}>
            <LazyLoadImage
              effect="blur"
              src={dropbox}
              alt="dropbox"
              className="h-6 w-6" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to={"/profile"}>
            <div className="flex items-center bg-transparent border hover:bg-transparent pr-2 rounded-md gap-2 h-7 min-w-16">
              <LazyLoadImage effect="blur"
                src={profileImage}
                alt="user placeholder"
                className="h-6 w-6 rounded-md"
              />
              <span className="text-[9px] work-sans font-medium text-white">
                @{telegramUsername || "You"}
              </span>
            </div>
          </Link>
          <Link to={"/notifications"} className="relative w-fit h-fit">
            <AiFillBell size={30} color={"white"}/>
            <div className="h-4 w-4 bg-[#D36519] text-xs text-white flex items-center justify-center rounded-full work-sans absolute -top-1 -left-1 z-20">
              {notifications?.totalNotifications || 0}
            </div>
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Header;
