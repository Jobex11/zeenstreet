import Header from './app-header';
import BottmNavigation from './bottom-nav';

function MainappLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='min-h-screen h-screen w-full max-w-xl mx-auto relative bg-gradient-to-b from-[#292734] to-[#000000]'>
      {/* App top header */}
      <Header />

      {/* App main content */}
      <div className='flex flex-col flex-1 h-[calc(100vh-80px)] overflow-y-auto'>
        {children}
      </div>

      {/* Bottom Navigation */}
      <BottmNavigation />
    </section>
  )
}

export default MainappLayout;
