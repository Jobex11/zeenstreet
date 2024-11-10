import dotsbg from "../../../assets/images/dotted-bg.png";
import medalIcon from "../../../assets/images/icons/medal.svg"
import dropbox from "../../../assets/images/icons/dropbox (2).svg";
import profilePlaceholder from "../../../assets/images/icons/user-placeholder.svg";
import mailIcon from "../../../assets/images/icons/mail-icon.svg";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div style={{
            backgroundImage: `url(${dotsbg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }} className='h-fit w-full top-0 sticky z-50'>
            <header className='flex items-center justify-between w-full py-[17px] px-3'>
                <div className='flex items-center gap-4'>

                    {/* <Link to={"/"}> */}
                        <img src={medalIcon} alt='medial icon' className='h-6 w-6' />
                    {/* </Link> */}
                    <Link to={"/ranks"}>
                        <img src={dropbox} alt='dropbox' className='h-6 w-6' />
                    </Link>
                </div>

                <div className='flex items-center gap-4'>
                    <Link to={"/profile"}>
                    <div className='flex items-center bg-transparent border hover:bg-transparent px-2 rounded-md gap-2 h-[30px] min-w-[62px]'>
                            <img src={profilePlaceholder} alt='user placeholder' className='h-6 w-6' />
                            <span className='text-[9px] work-sans font-medium text-white'>@Alex</span>
                        </div>
                    </Link>
                    <Link to={"/notifications"} className="relative">
                        <img src={mailIcon} alt='main icon' className='h-5 w-7' />
                        <div className="h-[9.2px] w-[9.2px] bg-[#D36519] rounded-full absolute -top-1 -left-1 z-20" />
                    </Link>
                </div>
            </header>
        </div>
    )
}

export default Header
