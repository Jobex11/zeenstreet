import dotsbg from "../../../assets/images/dotted-bg.png";
import TaskCard from "../../common/cards/Tasxcard";
import { Card, CardContent } from "../../ui/card";
import wavybg from "../../../assets/images/card_bg.svg";
import profileImage from "../../../assets/images/profile_img.png";
import profileBadge from "../../../assets/images/icons/profile_badge.svg";
import { ShareFormatter } from "../../common/shareFormatter";

function Profile() {
    const wealthClass = [
        { name: "class1" },
        { name: "class2" },
        { name: "class3" },
        { name: "class4" },
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
                        <div className='w-full grid grid-cols-4 gap-4'>
                            {wealthClass.map((item) => (
                                <Card key={item.name} style={{
                                    backgroundImage: `url(${wavybg})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover"
                                }} className='h-[48px] min-w-[68px] w-full rounded-md border border-gray-300 flex flex-col items-center justify-center text-white text-center uppercase aqum font-bold'>

                                </Card>
                            ))}
                        </div>
                    </div>


                    <div className="flex flex-col gap-4">
                        {/* cards collected */}

                        <div>
                            <h1 className="text-[#FEFEFF] text-[15px] font-semibold work-sans py-2">Cards collected</h1>
                            <Card className="bg-[#171717] rounded-lg h-[131px] min-w-[326px] w-full">

                            </Card>
                        </div>

                        {/* Achievments */}
                        <div>
                            <h1 className="text-[#FEFEFF] text-[15px] font-semibold work-sans py-2">Achievments</h1>
                            <Card className="bg-[#171717] rounded-lg h-[131px] min-w-[326px] w-full">

                            </Card>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Profile
