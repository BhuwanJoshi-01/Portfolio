import React, { useEffect, useRef } from 'react';
import Navigation from '../Navigation/Navigation';
import AmbientBackground from '../Motion/AmbientBackground';
import ScrollProgress from '../Motion/ScrollProgress';

const Layout = ({ children }) => {
  const cursorGlowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${e.clientX}px`;
        cursorGlowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen noise-overlay bg-bg text-text-primary font-body">
      <AmbientBackground />
      <ScrollProgress />
      <Navigation />

      {/* Cursor glow — above section content (z-10), below the nav (z-50) */}
      <div ref={cursorGlowRef} className="cursor-glow hidden lg:block" />

      {/* No transforms on this wrapper: GSAP pinning needs an untransformed ancestor chain */}
      <div className="relative flex flex-col w-full">{children}</div>
    </div>
  );
};

export default Layout;
