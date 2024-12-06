import { useEffect, useState } from "react";
import axios from "axios";
import dotsbg from "../../../assets/images/dotted-bg.png";
import medalIcon from "../../../assets/images/icons/medal.svg";
import dropbox from "../../../assets/images/icons/dropbox (2).svg";
import profilePlaceholder from "../../../assets/images/icons/user-placeholder.svg";
import mailIcon from "../../../assets/images/icons/mail-icon.svg";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
function Header() {
  /*backend functions */
  /* State variables */
  const [username, setUsername] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string>(profilePlaceholder);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve Telegram user data
        const telegramData = window.Telegram.WebApp.initDataUnsafe?.user;
        const telegramId = telegramData?.id;

        if (!telegramId) {
          console.error("Telegram ID not found");
          setUsername("User"); // Fallback username
          return;
        }

        // Set Telegram profile photo or fallback to placeholder
        if (telegramData.photo_url) {
          setProfileImage(telegramData.photo_url);
        }

        // Fetch the preferred username from the backend using GET request
        const response = await axios.get(
          `https://ravegenie-vgm7.onrender.com/api/username/${telegramId}`
        );

        const { preferred_username } = response.data;
        setUsername(preferred_username || "User"); // Fallback to 'User' if not set
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUsername("User"); // Fallback on error
      }
    };

    fetchUserData();
  }, []);

  /* backend functions */
  return (
    <div
      style={{
        backgroundImage: `url(${dotsbg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="h-fit w-full top-0 sticky z-50"
    >
      <header className="flex items-center justify-between w-full py-[17px] px-3">
        <div className="flex items-center gap-4">
          {/* <Link to={"/"}> */}
          <LazyLoadImage effect="blur" src={medalIcon} alt="medial icon" className="h-6 w-6" />
          {/* </Link> */}
          <Link to={"/ranks"}>
            <LazyLoadImage effect="blur" src={dropbox} alt="dropbox" className="h-6 w-6" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to={"/profile"}>
            <div className="flex items-center bg-transparent border hover:bg-transparent px-2 rounded-md gap-2 h-[30px] min-w-[62px]">
              <LazyLoadImage effect="blur"
                src={profileImage}
                alt="user placeholder"
                className="h-6 w-6"
              />
              <span className="text-[9px] work-sans font-medium text-white">
                @{username || "Loading..."}
              </span>
            </div>
          </Link>
          <Link to={"/notifications"} className="relative">
            <LazyLoadImage effect="blur" src={mailIcon} alt="main icon" className="h-5 w-7" />
            <div className="h-[9.2px] w-[9.2px] bg-[#D36519] rounded-full absolute -top-1 -left-1 z-20" />
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Header;
