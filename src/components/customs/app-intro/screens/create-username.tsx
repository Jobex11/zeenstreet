import Logo from "../../../../assets/images/icons/ravegenie_logo.png";


export function CreateUsername() {
    return (
        <div className="flex flex-col flex-1 justify-around  w-full min-h-full p-4 relative">
            <div className="relative h-[139px] w-[139px]">
                <img src={Logo} alt="Zenstreet Logo" className="h-full w-full object-contain" />
            </div>
            <h1 className="text-xl font-bold text-[#FFFFFF] uppercase py-4 aqum">Checking account</h1>

        </div>
    )
}


