import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../Navigation/Navigation';
import AmbientBackground from '../Motion/AmbientBackground';

const Layout = ({ children }) => {
  const cursorGlowRef = useRef(null);

  // Cursor-following glow effect
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
    <div className="min-h-screen noise-overlay" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* Ambient gradient orbs */}
      <AmbientBackground />

      {/* Cursor glow — hidden on touch devices */}
      <div
        ref={cursorGlowRef}
        className="cursor-glow hidden lg:block"
        style={{ opacity: 0.6 }}
      />

      {/* Cinematic page entrance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10"
      >
        <Navigation />
        <main className="flex flex-col w-full">
          {children}
        </main>

        {/* Cinematic footer */}
        <footer className="relative py-12 overflow-hidden" style={{ background: 'var(--color-surface)' }}>
          {/* Animated gradient separator */}
          <div className="absolute inset-x-0 top-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent 5%, var(--color-gradient-start), var(--color-gradient-mid), var(--color-gradient-end), transparent 95%)' }} />

          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-gradient font-bold text-lg">BJ</span>
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  © {new Date().getFullYear()} Bhuwan Joshi
                </span>
              </div>
              <p className="text-xs tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
                Crafted with passion · Built with React + Framer Motion
              </p>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  );
};

export default Layout;
