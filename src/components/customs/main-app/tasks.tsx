'use client'

import { Button } from '@/components/ui/button';
import  { useState } from 'react'

function Tasks() {
    const [tabs, setTabs] = useState("All");
    const btnTabs = ["All", "Special", "Daily", "events", "Referral", "Partners", "Social"];

    const handleActiveTabs = (name: string) => {
        setTabs(name)
    }
    return (
        <section className='flex flex-col w-full'>
            <div className='flex items-center gap-6 overflow-x-auto max-w-full p-5'>
                {btnTabs.map((tab) => (
                    <Button key={tab} onClick={() => handleActiveTabs(tab)} className={` w-[88px] h-8 px-10 hover:bg-transparent capitalize ${tabs === tab ? "bg-red-500 border-2 rounded-xl font-semibold text-[#FFFFFF] border-[#F7F7F7]" : "bg-blue-500 rounded-none border-none "}`}>
                      {tab}
                    </Button>
                ))}
            </div>
        </section>
    )
}

export default Tasks
