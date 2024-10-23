import { useState } from 'react'
import dotsbg from "../../../assets/images/dotted-bg.png";
import logo from "../../../assets/images/icons/Logo.png";
import TaskCard from "../../common/cards/Tasxcard";
import { CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import wavybg from "../../../assets/images/card_bg.svg";
import avatarImage from "../../../assets/images/icons/avatar_img.png";
import { toast } from 'sonner';
import { GoTriangleUp } from "react-icons/go";
import { IoMdShareAlt } from "react-icons/io";
import { IconButton } from '../../common/buttons/Iconbutton';
import { MdInfo } from "react-icons/md";
import { IoCopy } from "react-icons/io5";
import { ShareFormatter } from "../../common/shareFormatter";


function Referral() {
    const [tabs, setTabs] = useState<string>("Tier 1");
    const btnTabs = [
        { name: "Tier 1" },
        { name: "Tier 2" }
    ]
    const handleActiveTabs = (name: string) => {
        setTabs(name)
    }

    const tier1Referrals = [
        { userLogo: avatarImage, name: "sebastian", userName: "@Benjamin", createdAt: "12-3-2023", rewardedShares: "1124", isTier2: false },
        { userLogo: avatarImage, name: "sebastian", userName: "@Benjamin", createdAt: "12-3-2023", rewardedShares: "1124", isTier2: false },
        { userLogo: avatarImage, name: "sebastian", userName: "@Benjamin", createdAt: "12-3-2023", rewardedShares: "1124", isTier2: false }
    ]

    const tier2Referrals = [
        { userLogo: avatarImage, name: "sebastian", userName: "@Benjamin", createdAt: "12-3-2023", rewardedShares: "1124", isTier2: true },
        { userLogo: avatarImage, name: "sebastian", userName: "@Benjamin", createdAt: "12-3-2023", rewardedShares: "1124", isTier2: true },
        { userLogo: avatarImage, name: "sebastian", userName: "@Benjamin", createdAt: "12-3-2023", rewardedShares: "1124", isTier2: true }
    ]

    const handleCopyReferralLink = (link: string) => {
        navigator.clipboard.writeText(link);
        navigator.vibrate([50, 50]);
        toast.info("Referral link copied!");
    }

    return (
        <div className='flex flex-col min-h-full'>
            <div style={{
                backgroundImage: `url(${dotsbg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }} className='flex flex-col flex-1 py-3 '>
                <div className='px-4 flex flex-col gap-8 pb-[8rem]'>

                    {/* top card */}
                    <TaskCard>
                        <CardHeader className="flex flex-col items-center">
                            <div className='h-[84px] w-[92px]'>
                                <img src={logo} alt="zeen streeet logo" className={"min-h-full object-cover object-center w-full"} />
                            </div>
                        </CardHeader>
                        <CardContent className='flex flex-col items-center'>
                            <CardTitle className="uppercase text-[11px] text-center font-bold text-white aqum py-2">expand your empire!<br /> grow your team to join the wealth<br /> rush and earn exclusive rewards</CardTitle>
                            <CardDescription className="flex flex-col items-center">
                                <div className='flex flex-col items-center justify-center'>
                                    <h1 className="aqum text-[11px] text-center font-bold text-white pt-2">Referral Link:</h1>
                                    <div className='flex  items-center gap-2'>
                                        <Button onClick={() => handleCopyReferralLink("https://t.me/bot/startapp?=333333333")} className="h-[23px] w-[99.2px] bg-[#D25804] hover:bg-orange-500 text-white text-xs font-semibold text-center poppins">1ty37x567356r4</Button>
                                        <IconButton className='bg-transparent w-fit hover:bg-transparent' onClick={() => handleCopyReferralLink("https://t.me/bot/startapp?=333333333")}>
                                            <IoCopy color='white' />
                                        </IconButton>
                                        <IconButton className='bg-transparent w-fit hover:bg-transparent'>
                                            <IoMdShareAlt color='white' />
                                        </IconButton>

                                    </div>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <h1 className="aqum text-[13px] font-bold text-center items-top flex  text-white py-2"><span><MdInfo color='#D25804' size={10} /></span> You&apos;ve been awared<br/> {ShareFormatter(100000000)} $shares</h1>
                                    <Button className='w-[111.2px] h-[30px] bg-[#D25804] hover:bg-orange-500 text-white text-xs font-semibold text-center poppins'>Claim now</Button>
                                </div>
                            </CardDescription>
                        </CardContent>
                    </TaskCard>


                    <div>
                        {/* tab buttons */}
                        <div className="flex items-center justify-between">
                            {btnTabs.map((tab) => (
                                <Button
                                    style={{ backgroundImage: `url(${wavybg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
                                    key={tab.name}
                                    // disabled={tabs !== tab.name}
                                    onClick={() => handleActiveTabs(tab.name)}
                                    className={`poppins object-cover duration-300 transition-all w-[88px] h-8 px-10 bg-[#171717] hover:bg-transparent capitalize ${tabs === tab.name ? " border rounded-lg font-semibold text-[#FFFFFF] border-[#F7F7F7]" : "bg-opacity-75  rounded-none outline-none border-none "}`}>
                                    {tab.name}
                                </Button>
                            ))}

                        </div>

                        {/* Referral list */}

                        <>
                            {tabs === "Tier 1" &&
                                <>
                                    {tier1Referrals.length === 0 && <div className='p-4 text-center'>No Referrals yet</div>}
                                    {tier1Referrals.map((ref) => (
                                        <Referrals referrals={ref} />
                                    ))}</>}

                            {tabs === "Tier 2" &&
                                <>
                                    {tier2Referrals.length === 0 && <div className='p-4 text-center'>No Referrals yet</div>}
                                    {tier2Referrals.map((ref) => (
                                        <Referrals referrals={ref} />
                                    ))}</>}
                        </>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Referral


interface RefferalsProps {
    referrals: {
        userLogo: string
        userName: string
        name: string
        createdAt: string
        isTier2: boolean
        rewardedShares: string
    }
}

export const Referrals = ({ referrals }: RefferalsProps) => {
    return (
        <>
            {!referrals && <div className='p-4 text-center'>No Referrals yet</div>}
            <div className='flex items-center justify-between py-5 border-b border-[#5F59598A]'>
                {/* user info */}
                <div className='flex items-center gap-2'>
                    <div className="h-[50px] w-[50px] rounded-full">
                        <img src={referrals.userLogo} alt={referrals.name + "Logo"} className='h-full w-full rounded-s-none object-cover object-center' />
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-xs font-medium font-mono text-white'>{referrals.name}</h1>
                        <p className='text-[#B7B3B3] text-[8px]'>{referrals.createdAt} {" "} <span className='font-bold'>{referrals.isTier2 && referrals.userName}</span></p>
                    </div>
                </div>
                {/* shares */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-white text-xs font-bold">{referrals.rewardedShares}</h1>
                    <GoTriangleUp size={18} color={"#00D95F"} />
                </div>
            </div>
        </>
    )
}
