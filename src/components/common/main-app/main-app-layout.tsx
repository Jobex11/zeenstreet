import { PropsWithChildren } from 'react';
import Header from './app-header';
import BottmNavigation from './bottom-nav';

function MainappLayout({ children }: PropsWithChildren) {
  return (
    <section className='min-h-screen h-screen w-full max-w-screen-sm sm:px-10 flex flex-col flex-1 mx-auto relative bg-gradient-to-b from-[#292734] to-[#000000]'>
      <Header />

      <div className='flex flex-col flex-1 h-[calc(100vh-80px)] overflow-y-auto'>
        {children}
      </div>

      <BottmNavigation />
    </section>
  )
}

export default MainappLayout;
