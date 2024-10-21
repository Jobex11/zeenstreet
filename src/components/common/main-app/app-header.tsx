import dotsbg from "../../../assets/images/dotted-bg.png";
import medalIcon from "../../../assets/images/icons/medal.svg"
import dropbox from "../../../assets/images/icons/dropbox (2).svg";
import profilePlaceholder from "../../../assets/images/icons/user-placeholder.svg";
import mailIcon from "../../../assets/images/icons/mail-icon.svg";

function Header() {
    return (
        <div style={{
            backgroundImage: `url(${dotsbg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }} className='h-fit w-full top-0 sticky z-50'>
            <header className='flex items-center justify-between w-full py-10 px-3'>
                <div className='flex items-center gap-4'>

                    <div>
                        <img src={medalIcon} alt='medial icon' className='h-5 w-5' />
                    </div>
                    <div>
                        <img src={dropbox} alt='dropbox' className='h-5 w-5' />
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    <div className='flex items-center'>
                        <img src={profilePlaceholder} alt='user placeholder' className='h-5 w-5' />
                        <span className='text-sm font-medium text-white'>@Alex</span>
                    </div>
                    <div>
                        <img src={mailIcon} alt='main icon' className='h-5 w-5' />
                    </div>
                </div>
            </header>
            
        </div>
    )
}

export default Header
