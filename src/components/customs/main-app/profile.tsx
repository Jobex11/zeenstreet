import { useState, useEffect } from "react";
import dotsbg from "@assets/images/dotted-bg.png";
import TaskCard from "@components/common/cards/Tasxcard";
import { Card, CardContent } from "@components/ui/card";
import wavybg from "@assets/images/card_bg.svg";
import profileImg from "@assets/images/profile_img.png";
import profileBadge from "@assets/images/icons/profile_badge.svg";
import { ShareFormatter } from "@components/common/shareFormatter";
import wood_force from "@assets/images/cards/wood.png";
import wave_force from "@assets/images/cards/wave.png";
import water_force from "@assets/images/cards/water.png";
import cosmic_force from "@assets/images/cards/cosmic.png";
import ice_force from "@assets/images/cards/ice.png";
import fire_force from "@assets/images/cards/fire.png";
import light_force from "@assets/images/cards/Light.png";
import earth_force from "@assets/images/cards/earth.png";
import metal_force from "@assets/images/cards/fire.png";
import collected1 from "@assets/images/cards/collected_1.png";
import collected2 from "@assets/images/cards/collected_2.png";
import collected3 from "@assets/images/cards/collected_3.png";
import collected4 from "@assets/images/cards/collected_4.png";
import achievement1 from "@assets/images/cards/achievement_1.png";
import achievement2 from "@assets/images/cards/achievement_2.png";
import achievement3 from "@assets/images/cards/achievement_3.png";
import achievement4 from "@assets/images/cards/achievement_4.png";
import achievement5 from "@assets/images/cards/achievement_5.png";
import { Drawer, DrawerContent, DrawerTrigger } from "@components/ui/drawer";
import { Button } from "@components/ui/button";
import { IoIosClose } from "react-icons/io";
import { DialogClose, DialogTitle } from "@components/ui/dialog";
import goldCoin from "@assets/images/icons/gold_coin.svg";
import { SlLock } from "react-icons/sl";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useGetUserSharesQuery } from "@hooks/redux/shares";
import { useGetUsernameQuery } from "@hooks/redux/users";

function Profile() {
    const [telegramId, setTelegramId] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<string>(profileImg);
    const [telegramUsername, setTelegramUsername] = useState("");

    // Fetch shares and username when `telegramId` is available
    const { data: shares } = useGetUserSharesQuery(telegramId ?? "", {
        skip: !telegramId, // Skip query if telegramId is null
    });
    const { data: username } = useGetUsernameQuery(telegramId ?? "", {
        skip: !telegramId, 
    });

     // Initialize Telegram WebApp and set user data
     useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            const initData = window.Telegram.WebApp.initDataUnsafe;
            const user = initData?.user;

            // Set Telegram user data
            if (user) {
                setTelegramId(user.id ?? null);
                setTelegramUsername(user.username ?? "User");
                setProfileImage(user.photo_url || profileImg);
            }
        }
    }, []);

    const wealthClass = [
        { name: "Bottom Feaders", img: wood_force },
        { name: "The Aspirers", img: earth_force },
        { name: "Stable Money", img: metal_force },
        { name: "Hight Achievers", img: wave_force },
        { name: "Elite Circle", img: water_force },
        { name: "Legacy Wealth", img: ice_force },
        { name: "Titans", img: fire_force },
        { name: "Planet Shakers", img: light_force },
        { name: "Sovereign Wealth", img: cosmic_force },
    ];

    const collected = [
        { name: "class1", img: collected1 },
        { name: "class2", img: collected2 },
        { name: "class3", img: collected3 },
        { name: "class4", img: collected4 },
        { name: "class5", img: collected1 },
    ];
    const achievement = [
        { name: "Refer 10 Friends", reward: 30, img: achievement1 },
        { name: "Refer 20 Friends", reward: 50, img: achievement2 },
        { name: "Refer 30 Friends", reward: 80, img: achievement3 },
        { name: "Refer 40 Friends", reward: 100, img: achievement4 },
        { name: "Refer 50 Friends", reward: 200, img: achievement5 },
        { name: "Refer 60 Friends", reward: 300, img: achievement5 },
        { name: "Refer 70 Friends", reward: 400, img: achievement5 },
    ];

    return (
        <div className="flex flex-col min-h-full">
            <div
                style={{
                    backgroundImage: `url(${dotsbg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
                className="flex flex-col flex-1 py-3 "
            >
                <div className="px-4 flex flex-col gap-8 pb-[8rem]">
                    {/* card */}
                    <div>
                        <TaskCard className='min-h-32 flex flex-col w-full justify-end p-0'>
                            <CardContent className='flex  justify-between px-2 py-0'>
                                <div className='flex items-center'>
                                    <div className='h-28 w-[106px]'>
                                        <LazyLoadImage
                                            effect="blur"
                                            src={profileImage}
                                            alt='profile image'
                                            className='w-full object-contain object-center rounded-full' />
                                    </div>
                                    <div className="flex flex-col pb-4">
                                        <h1 className="text-white text-base font-bold aqum">
                                            Hi {username.preferred_username || "User"}
                                        </h1>
                                        <h1 className="work-sans text-[13px] font-medium pb-1 text-[#FEFEFF]">
                                            {telegramUsername && `@${telegramUsername}`}
                                        </h1>
                                        <div className="bg-[#D36519] rounded-md text-white w-[107px] p-2 text-center">
                                            <h1 className="text-[7px] aqum font-bold">
                                                {ShareFormatter(shares || 0)} $shares
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                                <div className='h-[52px] w-[52px] mb-4 relative flex items-center justify-center'>
                                    <LazyLoadImage
                                        effect="blur"
                                        src={profileBadge}
                                        alt="rank badge"
                                        className='h-full w-full object-cover object-center' />
                                    <span className="text-[#EBB26D] absolute text-[13px] font-medium top-[10px] work-sans">1</span>
                                </div>
                            </CardContent>
                        </TaskCard>
                    </div>

                    {/*wealth class grid  */}
                    <div className="min-w-full">
                        <h1 className="work-sans text-[15px] font-semibold text-[#FEFEFF] pb-2">
                            Wealth classes
                        </h1>
                        <div className="w-full flex items-center pb-4 gap-4 overflow-x-auto">
                            {wealthClass.map((item) => (
                                <Drawer key={item.name}>
                                    <DrawerTrigger asChild>

                                        <div>
                                            <Card
                                                style={{
                                                    backgroundImage: `url(${wavybg})`,
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundSize: "cover"
                                                }}
                                                className='h-12 min-w-[70px] w-full relative rounded-md border border-gray-300 flex flex-col items-center justify-center text-white text-center uppercase aqum font-bold overflow-hidden'
                                            >
                                                <LazyLoadImage
                                                    effect="blur"
                                                    src={item.img}
                                                    alt={`wealth class ${item.name}`}
                                                    className="h-full w-full object-cover object-center rounded-md"
                                                />
                                                <div className="absolute inset-0 rounded-md bg-black/55 z-20 flex flex-col items-center justify-center">
                                                    <SlLock size={25} color="white" />
                                                </div>
                                            </Card>
                                            <h1 className="work-sans text-[#FEFEFF] text-[10px] font-normal capitalize text-center pt-1 whitespace-nowrap">
                                                {item.name}
                                            </h1>
                                        </div>
                                    </DrawerTrigger>
                                    <DrawerContent
                                        aria-describedby={undefined}
                                        aria-description="dialog"
                                        className="flex flex-col  min-h-fit bg-gradient-to-b from-[#292734] to-[#000000] border-none px-3 gap-3"
                                    >
                                        <DialogTitle className="sr-only" />
                                        <div className="h-full flex flex-col items-center justify-around w-full py-10 gap-5">
                                            <DialogClose className=" shadow-none bg-transparent absolute top-2 right-2 z-40 rounded-full text-4xl">
                                                <IoIosClose size={30} color="#A4A4A7" />
                                            </DialogClose>
                                            <LazyLoadImage
                                                effect="blur"
                                                src={item.img}
                                                alt="Refferal Images"
                                                className="h-[100px] w-[100px] object-contain object-center"
                                            />
                                            <h1 className="text-white work-sans font-semibold text-[15px] capitalize">
                                                {item.name}
                                            </h1>
                                            <h1 className="flex items-center gap-2 text-white work-sans text-[15px]">
                                                + 3000{" "}
                                                <LazyLoadImage
                                                    effect="blur"
                                                    src={goldCoin}
                                                    alt="coin"
                                                    className="h-5 w-5 object-contain"
                                                />{" "}
                                            </h1>

                                            {/* this button will be enabled if the user meets the requirements, condition will be via a state viarble or so */}
                                            <Button
                                                disabled={true}
                                                className="bg-[#D36519] hover:bg-orange-500 rounded-lg text-center py-4 h-[50px] w-full text-white work-sans"
                                            >
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
                            <h1 className="text-[#FEFEFF] text-[15px] font-semibold work-sans py-2">
                                Cards collected
                            </h1>
                            <div className="w-full h-full flex items-center pb-4 gap-4 overflow-x-auto">
                                {collected.map((item) => (
                                    <Drawer key={item.name}>
                                        <DrawerTrigger asChild>
                                            <div key={item.name}>
                                                <Card
                                                    style={{
                                                        backgroundImage: `url(${wavybg})`,
                                                        backgroundRepeat: "no-repeat",
                                                        backgroundSize: "cover",
                                                    }}
                                                    className="h-24 min-w-[70px] w-full rounded-md border border-gray-300 flex flex-col items-center justify-center text-white text-center uppercase aqum font-bold"
                                                >
                                                    <LazyLoadImage
                                                        effect="blur"
                                                        src={item.img}
                                                        alt=""
                                                        className="h-full w-full object-cover rounded-md"
                                                    />
                                                </Card>
                                            </div>
                                        </DrawerTrigger>
                                        <DrawerContent
                                            aria-describedby={undefined}
                                            aria-description="dialog"
                                            className="flex flex-col min-h-fit bg-gradient-to-b from-[#292734] to-[#000000] border-none px-3 gap-3"
                                        >
                                            <DialogTitle className="sr-only" />
                                            <div className="h-full flex flex-col items-center justify-around w-full py-10 gap-5">
                                                <DialogClose className=" shadow-none bg-transparent absolute top-2 right-2 z-40 rounded-full text-4xl">
                                                    <IoIosClose size={30} color="#A4A4A7" />
                                                </DialogClose>
                                                <LazyLoadImage
                                                    effect="blur"
                                                    src={item.img}
                                                    alt="Refferal Images"
                                                    className="h-[100px] w-[100px] object-contain object-center"
                                                />
                                                <h1 className="text-white work-sans font-semibold text-[15px] capitalize">
                                                    Some information about this card
                                                </h1>
                                                <h1 className="flex items-center gap-2 text-white work-sans text-[15px]">
                                                    + 3000{" "}
                                                    <LazyLoadImage
                                                        effect="blur"
                                                        src={goldCoin}
                                                        alt="coin"
                                                        className="h-5 w-5 object-contain"
                                                    />{" "}
                                                </h1>
                                                {/* this button will be enabled if the user meets the requirements, condition will be via a state viarble or so */}
                                                <Button
                                                    disabled={true}
                                                    className="bg-[#D36519] hover:bg-orange-500 text-center py-4 h-12 w-full text-white work-sans"
                                                >
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
                            <h1 className="text-[#FEFEFF] text-[15px] font-semibold work-sans py-2">
                                Achievments
                            </h1>
                            <div className=" min-h-[171px] border-none min-w-[326px] w-full p-2">
                                <h1 className="work-sans text-xs pb-2 text-[#FEFEFF] font-medium">
                                    Referrals
                                </h1>
                                <div className="flex items-center overflow-x-auto max-w-full gap-7 pb-5">
                                    {achievement.map((a, i) => (
                                        <Drawer key={i}>
                                            <DrawerTrigger asChild>
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="flex flex-col relative gap-1 min-w-fit">
                                                        <LazyLoadImage
                                                            effect="blur"
                                                            src={a.img}
                                                            alt="Refferal Images"
                                                            className="max-h-[58px] max-w-[46px] object-cover object-center"
                                                        />
                                                        {/* This div with lock icon will be rendered on a condition to check if the card is locked or not */}
                                                        <div className="absolute h-full w-full rounded-md  bg-black/40 z-20 flex flex-col items-center justify-center">
                                                            <SlLock size={25} color="white" />
                                                        </div>
                                                    </div>
                                                    <h1 className="work-sans text-[6px] text-[#FEFEFF] font-medium whitespace-nowrap">
                                                        {a.name}
                                                    </h1>
                                                </div>
                                            </DrawerTrigger>
                                            <DrawerContent
                                                aria-describedby={undefined}
                                                aria-description="dialog"
                                                className="flex flex-col min-h-fit bg-gradient-to-b from-[#292734] to-[#000000] border-none px-3 gap-3"
                                            >
                                                <DialogTitle className="sr-only" />
                                                <div className="h-full flex flex-col items-center justify-around w-full py-10 gap-5">
                                                    <DialogClose className=" shadow-none bg-transparent absolute top-2 right-2 z-40 rounded-full text-4xl">
                                                        <IoIosClose size={30} color="#A4A4A7" />
                                                    </DialogClose>
                                                    <LazyLoadImage
                                                        effect="blur"
                                                        src={a.img}
                                                        alt="Refferal Images"
                                                        className="h-[100px] w-[100px] object-contain object-center"
                                                    />
                                                    <h1 className="text-white work-sans font-semibold text-[15px]">
                                                        {a.name}
                                                    </h1>
                                                    <h1 className="flex items-center gap-2 text-white work-sans text-[15px]">
                                                        + {a.reward}{" "}
                                                        <LazyLoadImage
                                                            effect="blur"
                                                            src={goldCoin}
                                                            alt="coin"
                                                            className="h-5 w-5 object-contain"
                                                        />{" "}
                                                    </h1>
                                                    {/* this button will be enabled if the user meets the requirements, condition will be via a state viarble or so */}
                                                    <Button
                                                        disabled={true}
                                                        className="bg-[#D36519] hover:bg-orange-500 text-center rounded-lg py-4 h-12 w-full text-white work-sans"
                                                    >
                                                        Check
                                                    </Button>
                                                </div>
                                            </DrawerContent>
                                        </Drawer>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;


