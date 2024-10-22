import { Link } from "react-router-dom";
import dotsbg from "../../../assets/images/dotted-bg.png";
import logo from "../../../assets/images/icons/Logo.png";
import TaskCard from "../../common/cards/Tasxcard";
import { IoAdd } from "react-icons/io5";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import filter from "../../../assets/images/icons/filter.svg"

function Home() {
    return (
        <div className='flex flex-col min-h-full'>
            <div style={{
                backgroundImage: `url(${dotsbg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }} className='flex flex-col flex-1 py-3 '>
                {/* user rewards */}
                <div>
                    <h1 className='uppercase aqum font-bold text-xl text-white text-center'>Total $shares</h1>
                    <h1 className='text-6xl font-bold aqum text-white pb-6 text-center'>100,000 </h1>
                </div>
                {/* latest cards */}
                <div className="flex items-center overflow-x-auto flex-nowrap w-full h-auto gap-3">
                    <TaskCard >
                        <h1 className="py-10">Heading</h1>
                    </TaskCard>
                    <TaskCard >Card</TaskCard>
                    <TaskCard >Card</TaskCard>
                </div>


                <div className='flex flex-col pt-10 px-4 gap-5 '>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-2 work-sans">
                            <h1 className="text-[#FEFEFF] text-lg font-semibold">Today&apos;s Tasks</h1>
                            <h1 className="text-[#FFFFFF] text-sm">18 Tasks Pending</h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link to={"/"}>
                                <span>
                                    <img src={filter} alt="filter" className="" />
                                </span>
                            </Link>
                            <div className="h-11 w-[1px] border border-[#E4E4E4]"/>
                            <Link to={"/"}>
                                <span><IoAdd color="white" size={26} /></span>
                            </Link>
                        </div>
                    </div>
                    <div  className="flex flex-col gap-5 pb-[8rem]">
                        <TaskCard>
                            <CardHeader className="flex flex-row justify-between items-center py-0 px-3">
                                <CardTitle className="text-[#FFFFFF] text-[11px] font-medium">Ongoing Project</CardTitle>
                                <div className="flex flex-col">
                                    <img src={logo} alt="logo" className="h-[54px] w-[54px]" />
                                    <h1 className="text-[11px] poppins text-[#FFFFFF] font-medium">Daily Task</h1>
                                </div>
                            </CardHeader>
                            <CardContent className="px-3">
                                <CardTitle className="text-xl font-bold text-white">Refer Friends</CardTitle>
                                <CardDescription className="text-[11px] font-bold text-white">100,000,000 $Shares</CardDescription>
                            </CardContent>
                            <hr className="mx-3" />
                            <CardFooter className="pt-3 px-3 flex items-center justify-between">
                                <CardTitle className="text-[11px] font-bold text-white">Continue</CardTitle>
                                <Button disabled className="rounded-[5px] h-5 text-[10px] font-[500] bg-[#D25804]">Confirm</Button>
                            </CardFooter>
                        </TaskCard>
                        <TaskCard>
                            <CardHeader className="flex flex-row justify-between items-center py-0 px-3">
                                <CardTitle className="text-[#FFFFFF] text-[11px] font-medium">Ongoing Project</CardTitle>
                                <div className="flex flex-col">
                                    <img src={logo} alt="logo" className="h-[54px] w-[54px]" />
                                    <h1 className="text-[11px] poppins text-[#FFFFFF] font-medium">Daily Task</h1>
                                </div>
                            </CardHeader>
                            <CardContent className="px-3">
                                <CardTitle className="text-xl font-bold text-white">Refer Friends</CardTitle>
                                <CardDescription className="text-[11px] font-bold text-white">100,000,000 $Shares</CardDescription>
                            </CardContent>
                            <hr className="mx-3" />
                            <CardFooter className="pt-3 px-3 flex items-center justify-between">
                                <CardTitle className="text-[11px] font-bold text-white">Continue</CardTitle>
                                <Button disabled className="rounded-[5px] h-5 text-[10px] font-[500] bg-[#D25804]">Confirm</Button>
                            </CardFooter>
                        </TaskCard>
                        <TaskCard>
                            <CardHeader className="flex flex-row justify-between items-center py-0 px-3">
                                <CardTitle className="text-[#FFFFFF] text-[11px] font-medium">Ongoing Project</CardTitle>
                                <div className="flex flex-col">
                                    <img src={logo} alt="logo" className="h-[54px] w-[54px]" />
                                    <h1 className="text-[11px] poppins text-[#FFFFFF] font-medium">Daily Task</h1>
                                </div>
                            </CardHeader>
                            <CardContent className="px-3">
                                <CardTitle className="text-xl font-bold text-white">Refer Friends</CardTitle>
                                <CardDescription className="text-[11px] font-bold text-white">100,000,000 $Shares</CardDescription>
                            </CardContent>
                            <hr className="mx-3" />
                            <CardFooter className="pt-3 px-3 flex items-center justify-between">
                                <CardTitle className="text-[11px] font-bold text-white">Continue</CardTitle>
                                <Button disabled className="rounded-[5px] h-5 text-[10px] font-[500] bg-[#D25804]">Confirm</Button>
                            </CardFooter>
                        </TaskCard>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
