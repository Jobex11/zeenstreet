import dotsbg from "../../../assets/images/dotted-bg.png";
import TaskCard from "../../common/cards/Tasxcard";

function Home() {
    return (
        <div className='flex flex-col min-h-full'>
            <div style={{
                backgroundImage: `url(${dotsbg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }} className='flex flex-col py-3 h-full '>
                <h1 className='uppercase aqum font-bold text-xl text-white text-center'>Total $shares</h1>
                <h1 className='text-6xl font-bold aqum text-white pb-6 text-center'>100,000 </h1>
                <div className="flex items-center overflow-x-auto flex-nowrap gap-3">
                    <TaskCard />
                    <TaskCard />
                    <TaskCard />
                </div>

                <div className='flex flex-col'>

                </div>
            </div>
        </div>
    )
}

export default Home
