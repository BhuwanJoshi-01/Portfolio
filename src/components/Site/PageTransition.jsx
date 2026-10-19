import React from 'react';
import { motion } from 'framer-motion';

const curtainEase = [0.76, 0, 0.24, 1];

/**
 * Route transition: content cross-fades while a curtain sweeps over the viewport.
 * Opacity only on the content wrapper — a transform here would break GSAP pinning.
 */
const PageTransition = ({ children }) => (
  <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      {children}
    </motion.div>

    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[9000] bg-surface pointer-events-none flex items-center justify-center"
      initial={{ scaleY: 1, transformOrigin: '50% 0%' }}
      animate={{ scaleY: 0, transformOrigin: '50% 0%', transition: { duration: 0.7, ease: curtainEase, delay: 0.1 } }}
      exit={{ scaleY: 1, transformOrigin: '50% 100%', transition: { duration: 0.55, ease: curtainEase } }}
    >
      <span className="font-display italic text-5xl md:text-7xl text-text-primary/80">BJ</span>
      <span className="absolute bottom-0 left-0 right-0 h-[3px] accent-gradient" />
    </motion.div>
  </>
);

export default PageTransition;
