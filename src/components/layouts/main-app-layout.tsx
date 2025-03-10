import { lazy, PropsWithChildren, useEffect, useState } from 'react';
import BottmNavigation from '../shared/bottom-nav';
import Header from '../shared/app-header';
const ShootingStars = lazy(() =>
  import("@components/ui/shooting-stars").then((mod) => ({ default: mod.ShootingStars }))
);
const StarsBackground = lazy(() =>
  import("@components/ui/stars-background").then((mod) => ({ default: mod.StarsBackground }))
);

 
function MainappLayout({ children }: PropsWithChildren) {
  const [showStars, setShowStars] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowStars(true), 2500);
  }, []);
  const isProfilePage = window.location.pathname === "/profile"

  return (
    <section className='min-h-screen h-screen w-full max-w-screen-sm sm:px-10 flex flex-col flex-1 mx-auto relative bg-gradient-to-b from-[#292734] to-[#000000]'>
      <div className="absolute inset-0 z-0 pointer-events-none">
        {!isProfilePage && showStars && <ShootingStars />}
        {!isProfilePage && showStars && <StarsBackground />}
      </div>
      <Header />


      <div className='flex flex-col flex-1 h-[calc(100vh-90px)] overflow-y-auto relative z-10'>
        {children}
      </div>

      <BottmNavigation />
    </section>

  )
}

export default MainappLayout;
