import dotsbg from "../../../assets/images/dotted-bg.png";
import TaskCard from "../../common/cards/Tasxcard";
import { Card, CardContent } from "../../ui/card";
import wavybg from "../../../assets/images/card_bg.svg";
import profileImage from "../../../assets/images/profile_img.png";
import profileBadge from "../../../assets/images/icons/profile_badge.svg";
import { ShareFormatter } from "../../common/shareFormatter";
import class1_img from "../../../assets/images/cards/wealth_class1.png"
import class2_img from "../../../assets/images/cards/wealth_class2.png"
import class3_img from "../../../assets/images/cards/wealth_class3.png"
import class4_img from "../../../assets/images/cards/wealth_class4.png"
import collected1 from "../../../assets/images/cards/collected_1.png"
import collected2 from "../../../assets/images/cards/collected_2.png"
import collected3 from "../../../assets/images/cards/collected_3.png"
import collected4 from "../../../assets/images/cards/collected_4.png"
import achievement1 from "../../../assets/images/cards/achievement_1.png"
import achievement2 from "../../../assets/images/cards/achievement_2.png"
import achievement3 from "../../../assets/images/cards/achievement_3.png"
import achievement4 from "../../../assets/images/cards/achievement_4.png"
import achievement5 from "../../../assets/images/cards/achievement_5.png"
import { Drawer, DrawerContent, DrawerTrigger } from "../../ui/drawer";
import { Button } from "../../ui/button";
import { IoIosClose } from "react-icons/io";
import { DialogClose, DialogTitle } from "../../ui/dialog";
import goldCoin from "../../../assets/images/icons/gold_coin.svg";

function Profile() {
    const wealthClass = [
        { name: "class1", img: class1_img },
        { name: "class2", img: class2_img },
        { name: "class3", img: class3_img },
        { name: "class4", img: class4_img },
        { name: "class5", img: class1_img },
        { name: "class6", img: class2_img },
    ]

    const collected = [
        { name: "class1", img: collected1 },
        { name: "class2", img: collected2 },
        { name: "class3", img: collected3 },
        { name: "class4", img: collected4 },
        { name: "class5", img: collected1 },
    ]
    const achievement = [
        { name: "Refer 10 Friends", reward: 30, img: achievement1 },
        { name: "Refer 20 Friends", reward: 50, img: achievement2 },
        { name: "Refer 30 Friends", reward: 80, img: achievement3 },
        { name: "Refer 40 Friends", reward: 100, img: achievement4 },
        { name: "Refer 50 Friends", reward: 200, img: achievement5 },
    ]

    return (
        <div className='flex flex-col min-h-full'>
            <div style={{
                backgroundImage: `url(${dotsbg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }} className='flex flex-col flex-1 py-3 '>
                <div className='px-4 flex flex-col gap-8 pb-[8rem]'>

                    {/* card */}
                    <div>
                        <TaskCard className='min-h-[130px] flex flex-col w-full justify-end p-0'>
                            <CardContent className='flex  justify-between items-end  px-2 py-0'>
                                <div className='flex items-center'>
                                    <div className='h-[99px] w-[106px]'>
                                        <img src={profileImage} alt='profile aimated image' className='h-full w-full object-cover object-center' />
                                    </div>
                                    <div className='flex flex-col pb-4'>
                                        <h1 className='text-white text-base font-bold aqum'>Hi Alex</h1>
                                        <h1 className='work-sans text-[13px] font-medium pb-1 text-[#FEFEFF]'>@alexekubo</h1>
                                        <div className='bg-[#D36519] rounded-md text-white w-[107px] p-2 text-center'>
                                            <h1 className='text-[7px] aqum font-bold'>{ShareFormatter(100000000)} $shares</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className='h-[52px] w-[52px] mb-4 relative flex items-center justify-center'>
                                    <img src={profileBadge} alt="rank badge" className='h-full w-full object-cover object-center' />
                                    <span className="text-[#EBB26D] absolute text-[13px] font-medium top-[10px] work-sans">1</span>
                                </div>
                            </CardContent>
                        </TaskCard>
                    </div>

                    {/*wealth class grid  */}
                    <div className='min-w-full'>
                        <h1 className='work-sans text-[15px] font-semibold text-[#FEFEFF] pb-2'>Wealth class</h1>
                        <div className='w-full flex items-center pb-4 gap-4 overflow-x-auto'>
                            {wealthClass.map((item) => (
                                <Drawer key={item.name}>
                                    <DrawerTrigger asChild>
                                        <div>
                                            <Card style={{
                                                backgroundImage: `url(${wavybg})`,
                                                backgroundRepeat: "no-repeat",
                                                backgroundSize: "cover"
                                            }} className='h-[48px] min-w-[70px] w-full rounded-md border border-gray-300 flex flex-col items-center justify-center text-white text-center uppercase aqum font-bold'>
                                                <img src={item.img} alt="" className="h-full w-full object-cover" />
                                            </Card>
                                            <h1 className="work-sans text-[#FEFEFF] text-[10px] font-normal capitalize text-center pt-1">{item.name}</h1>
                                        </div>
                                    </DrawerTrigger>
                                    <DrawerContent aria-describedby={undefined} aria-description="dialog" className="flex flex-col min-h-fit bg-[#1C1B23] border-none px-3 gap-3">
                                        <DialogTitle className="sr-only" />
                                        <div className="h-full flex flex-col items-center justify-around w-full py-10 gap-5">
                                            <DialogClose className=" shadow-none bg-transparent absolute top-2 right-2 z-40 rounded-full text-4xl">
                                                <IoIosClose size={30} color="#A4A4A7" />
                                            </DialogClose>
                                            <img src={item.img} alt="Refferal Images" className="h-[100px] w-[100px] object-contain object-center" />
                                            <h1 className="text-white work-sans font-semibold text-[15px] capitalize">{item.name}</h1>
                                            <h1 className="flex items-center gap-2 text-white work-sans text-[15px]">+ 3000 <img src={goldCoin} alt="coin" className="h-5 w-5 object-contain" /> </h1>
                                            <Button disabled={false} className="bg-[#D36519] hover:bg-orange-500 rounded-lg text-center py-4 h-[50px] w-full text-white work-sans">
                                                Claim shares
                                            </Button>
                                        </div>
                                    </DrawerContent>
                                </Drawer>
                            ))}
                        </div>
                    </div>


                    <div className="flex flex-col gap-4">
                        {/* cards collected */}
                        <div>
                            <h1 className="text-[#FEFEFF] text-[15px] font-semibold work-sans py-2">Cards collected</h1>
                            <div className='w-full flex items-center pb-4 gap-4 overflow-x-auto'>
                                {collected.map((item) => (
                                    <Drawer key={item.name}>
                                        <DrawerTrigger asChild>
                                            <div key={item.name}>
                                                <Card style={{
                                                    backgroundImage: `url(${wavybg})`,
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundSize: "cover"
                                                }} className='h-[95px] min-w-[70px] w-full rounded-md border border-gray-300 flex flex-col items-center justify-center text-white text-center uppercase aqum font-bold'>
                                                    <img src={item.img} alt="" className="h-full w-full object-cover" />
                                                </Card>
                                            </div>
                                        </DrawerTrigger>
                                        <DrawerContent aria-describedby={undefined} aria-description="dialog" className="flex flex-col min-h-fit bg-[#1C1B23] border-none px-3 gap-3">
                                            <DialogTitle className="sr-only" />
                                            <div className="h-full flex flex-col items-center justify-around w-full py-10 gap-5">
                                                <DialogClose className=" shadow-none bg-transparent absolute top-2 right-2 z-40 rounded-full text-4xl">
                                                    <IoIosClose size={30} color="#A4A4A7" />
                                                </DialogClose>
                                                <img src={item.img} alt="Refferal Images" className="h-[100px] w-[100px] object-contain object-center" />
                                                <h1 className="text-white work-sans font-semibold text-[15px] capitalize">Some information about this card</h1>
                                                <h1 className="flex items-center gap-2 text-white work-sans text-[15px]">+ 3000 <img src={goldCoin} alt="coin" className="h-5 w-5 object-contain" /> </h1>
                                                <Button disabled={true} className="bg-[#D36519] hover:bg-orange-500 text-center py-4 h-12 w-full text-white work-sans">
                                                    Claim shares
                                                </Button>
                                            </div>
                                        </DrawerContent>
                                    </Drawer>
                                ))}
                            </div>
                        </div>

                        {/* Achievments */}
                        <div>
                            <h1 className="text-[#FEFEFF] text-[15px] font-semibold work-sans py-2">Achievments</h1>
                            <Card className="bg-[#171717] rounded-lg min-h-[171px] min-w-[326px] w-full p-2">
                                <h1 className="work-sans text-[11px] text-[#FEFEFF] font-medium" >Referrals</h1>
                                <div className="grid grid-cols-4 gap-4 place-content-center place-items-center">
                                    {achievement.map((a, i) => (
                                        <Drawer key={i}>
                                            <DrawerTrigger asChild>
                                                <div className="flex flex-col gap-1">
                                                    <img src={a.img} alt="Refferal Images" className="h-[58px] w-[46px] object-contain object-center" />
                                                    <h1 className="work-sans text-[6px] text-[#FEFEFF] font-medium">{a.name}</h1>
                                                </div>
                                            </DrawerTrigger>
                                            <DrawerContent aria-describedby={undefined} aria-description="dialog" className="flex flex-col min-h-fit bg-[#1C1B23] border-none px-3 gap-3">
                                                <DialogTitle className="sr-only" />
                                                <div className="h-full flex flex-col items-center justify-around w-full py-10 gap-5">
                                                    <DialogClose className=" shadow-none bg-transparent absolute top-2 right-2 z-40 rounded-full text-4xl">
                                                        <IoIosClose size={30} color="#A4A4A7" />
                                                    </DialogClose>
                                                    <img src={a.img} alt="Refferal Images" className="h-[100px] w-[100px] object-contain object-center" />
                                                    <h1 className="text-white work-sans font-semibold text-[15px]">{a.name}</h1>
                                                    <h1 className="flex items-center gap-2 text-white work-sans text-[15px]">+ {a.reward} <img src={goldCoin} alt="coin" className="h-5 w-5 object-contain" /> </h1>
                                                    <Button disabled={false} className="bg-[#D36519] hover:bg-orange-500 text-center rounded-lg py-4 h-12 w-full text-white work-sans">
                                                        Check
                                                    </Button>
                                                </div>
                                            </DrawerContent>
                                        </Drawer>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>

                </div>

            </div>
        </div >
    )
}

export default Profile
