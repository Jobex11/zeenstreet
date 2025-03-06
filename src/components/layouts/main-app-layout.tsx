import { PropsWithChildren } from 'react';
import Header from '../shared/app-header';
import BottmNavigation from '../shared/bottom-nav';
import { ShootingStars } from "@components/ui/shooting-stars";
import { StarsBackground } from "@components/ui/stars-background";

function MainappLayout({ children }: PropsWithChildren) {
  return (
    <section className='min-h-screen h-screen w-full max-w-screen-sm sm:px-10 flex flex-col flex-1 mx-auto relative bg-gradient-to-b from-[#292734] to-[#000000]'>

      {/* Background Elements (Stars) Positioned Above the Gradient but Behind Content */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ShootingStars />
        <StarsBackground />
      </div>

      <Header />

      {/* Content should be above the stars but still clickable */}
      <div className='flex flex-col flex-1 h-[calc(100vh-90px)] overflow-y-auto relative z-10'>
        {children}
      </div>

      <BottmNavigation />
    </section>

  )
}

export default MainappLayout;
