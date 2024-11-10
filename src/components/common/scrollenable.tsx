import React, { useEffect, useRef } from 'react';

interface Props {
    children:React.ReactNode;
}
const ScrollableComponent = ({ children }:Props) => {
  const scrollableElementRef =  useRef<HTMLDivElement>(null);

  const ensureDocumentIsScrollable = () => {
    const isScrollable =
      document.documentElement.scrollHeight > window.innerHeight;
    if (!isScrollable) {
      document.documentElement.style.setProperty(
        'height',
        'calc(100vh + 1px)',
        'important'
      );
    }
  };

  const preventCollapse = () => {
    if (window.scrollY === 0) {
      window.scrollTo(0, 1);
    }
  };

  useEffect(() => {
    const scrollableElement = scrollableElementRef.current;
    scrollableElement?.addEventListener('touchstart', preventCollapse);

    window.addEventListener('load', ensureDocumentIsScrollable);

    return () => {
      scrollableElement?.removeEventListener('touchstart', preventCollapse);
      window.removeEventListener('load', ensureDocumentIsScrollable);
    };
  }, []);

  return (
    <div
      ref={scrollableElementRef}
      className='overflow-y-scroll min-h-screen'
    >
      {children}
    </div>
  );
};

export default ScrollableComponent;
