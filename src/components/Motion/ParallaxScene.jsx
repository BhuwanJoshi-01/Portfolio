import React, { forwardRef, useEffect, useMemo, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion } from 'framer-motion';
import { ParallaxContext } from './ParallaxContext';

const ParallaxScene = forwardRef(({
  children,
  perspective = 1200,
  intensity = 1,
  className = '',
  style,
}, forwardedRef) => {
  const localRef = useRef(null);
  const setRef = (node) => {
    localRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  const reduce = useReducedMotion();
  const isHoverless = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: none)').matches;
  }, []);
  const enabled = !reduce && !isHoverless;

  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  useEffect(() => {
    if (!enabled) return;
    const node = localRef.current;
    if (!node) return;

    let raf = 0;
    const handler = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = node.getBoundingClientRect();
        if (!r.width || !r.height) return;
        const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
        const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
        normX.set(Math.max(-1.2, Math.min(1.2, nx)));
        normY.set(Math.max(-1.2, Math.min(1.2, ny)));
      });
    };
    const reset = () => { normX.set(0); normY.set(0); };

    node.addEventListener('mousemove', handler, { passive: true });
    node.addEventListener('mouseleave', reset, { passive: true });
    return () => {
      node.removeEventListener('mousemove', handler);
      node.removeEventListener('mouseleave', reset);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled, normX, normY]);

  const ctx = useMemo(
    () => ({ normX, normY, enabled, intensity }),
    [normX, normY, enabled, intensity]
  );

  return (
    <ParallaxContext.Provider value={ctx}>
      <motion.div
        ref={setRef}
        className={className}
        style={{
          position: 'relative',
          perspective: `${perspective}px`,
          transformStyle: 'preserve-3d',
          willChange: enabled ? 'transform' : 'auto',
          ...style,
        }}
      >
        {children}
      </motion.div>
    </ParallaxContext.Provider>
  );
});

ParallaxScene.displayName = 'ParallaxScene';
export default ParallaxScene;
