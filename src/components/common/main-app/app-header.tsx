import dotsbg from "../../../assets/images/dotted-bg.png";
import medalIcon from "../../../assets/images/icons/medal.svg"
import dropbox from "../../../assets/images/icons/dropbox (2).svg";
import profilePlaceholder from "../../../assets/images/icons/user-placeholder.svg";
import mailIcon from "../../../assets/images/icons/mail-icon.svg";
import { Button } from "../../ui/button";

function Header() {
    return (
        <div style={{
            backgroundImage: `url(${dotsbg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }} className='h-fit w-full top-0 sticky z-50'>
            <header className='flex items-center justify-between w-full py-5 px-3'>
                <div className='flex items-center gap-4'>

                    <div>
                        <img src={medalIcon} alt='medial icon' className='h-[21px] w-5' />
                    </div>
                    <div>
                        <img src={dropbox} alt='dropbox' className='h-5 w-5' />
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    <Button className='flex items-center bg-transparent border hover:bg-transparent min-w-[62px]'>
                        <img src={profilePlaceholder} alt='user placeholder' className='h-5 w-5' />
                        <span className='text-[9px] work-sans font-medium text-white'>@Alex</span>
                    </Button>
                    <div>
                        <img src={mailIcon} alt='main icon' className='h-5 w-7' />
                    </div>
                </div>
            </header>
            
        </div>
    )
}

export default Header
