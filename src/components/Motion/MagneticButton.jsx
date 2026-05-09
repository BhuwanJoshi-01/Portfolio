import React, { forwardRef, useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { springs } from '../../hooks/useMotionConfig';

const MAX_SHIFT_PX = 8;

const MagneticButton = forwardRef(({
  as = 'button',
  strength = 1,
  spring = springs.bouncy,
  className = '',
  style,
  children,
  ...rest
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

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const handleMove = (e) => {
    if (!enabled || !localRef.current) return;
    const rect = localRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set((px - 0.5) * 2 * MAX_SHIFT_PX * strength);
    y.set((py - 0.5) * 2 * MAX_SHIFT_PX * strength);
    localRef.current.style.setProperty('--mouse-x', `${px * 100}%`);
    localRef.current.style.setProperty('--mouse-y', `${py * 100}%`);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    if (localRef.current) {
      localRef.current.style.setProperty('--mouse-x', '50%');
      localRef.current.style.setProperty('--mouse-y', '50%');
    }
  };

  const Tag = as === 'a' ? motion.a : motion.button;
  return (
    <Tag
      ref={setRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={enabled ? { scale: 0.97 } : undefined}
      className={className}
      style={{
        x: enabled ? sx : 0,
        y: enabled ? sy : 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
});

MagneticButton.displayName = 'MagneticButton';
export default MagneticButton;
