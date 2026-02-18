import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '../Navigation/Navigation';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen noise-overlay" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* Page entrance animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Navigation />
        <main className="flex flex-col w-full">
          {children}
        </main>

        {/* Cinematic footer */}
        <footer className="relative py-12 overflow-hidden" style={{ background: 'var(--color-surface)' }}>
          {/* Top gradient separator */}
          <div className="absolute inset-x-0 top-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, var(--color-accent-glow), transparent)' }} />

          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-gradient font-bold text-lg">BJ</span>
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  © {new Date().getFullYear()} Bhuwan Joshi
                </span>
              </div>
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
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
