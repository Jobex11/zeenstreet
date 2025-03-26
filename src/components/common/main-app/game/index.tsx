import Header from "@/components/shared/app-header"
import BottmNavigation from "@/components/shared/bottom-nav"
import MusicPanel from "@components/shared/music-panel";

interface GameLayoutProps {
    children?: React.ReactNode | React.ReactElement;
    show_layout: boolean;
    show_header: boolean;
    show_bottom_nav: boolean
    hide_video_tip: boolean;
    shares: number
}
function GameLayout(
    {
        children,
        show_bottom_nav,
        show_header,
        show_layout,
        hide_video_tip,
        shares
    }: GameLayoutProps) {
    return (
        <main className={` ${show_layout ? "flex" : "hidden"} min-h-screen h-screen w-full max-w-screen-sm sm:px-10 flex flex-col flex-1 mx-auto relative bg-gradient-to-b from-[#292734] to-[#000000]`}>
            {show_header && <Header />}
            <div className='flex flex-col overflow-y-auto relative z-10 flex-1'>
                <MusicPanel
                    hide_video_tip={hide_video_tip}
                    shares={shares} />
                {children}
            </div>
            {show_bottom_nav && <BottmNavigation />}
        </main>
    )
}

export default GameLayout
