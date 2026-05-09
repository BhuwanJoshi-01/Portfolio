import { useEffect, useMemo, useRef } from 'react';
import { useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { springs } from './useMotionConfig';

const MAX_TRANSLATE_PX = 40;
const MAX_ROTATE_DEG = 2.5;

export const useMouseParallax = ({
  targetRef,
  depth = 0.5,
  spring = springs.smooth,
} = {}) => {
  const reduce = useReducedMotion();
  const isHoverless = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: none)').matches;
  }, []);

  const normX = useMotionValue(0);
  const normY = useMotionValue(0);
  const sx = useSpring(normX, spring);
  const sy = useSpring(normY, spring);

  const x = useTransform(sx, [-1, 1], [-depth * MAX_TRANSLATE_PX, depth * MAX_TRANSLATE_PX]);
  const y = useTransform(sy, [-1, 1], [-depth * MAX_TRANSLATE_PX, depth * MAX_TRANSLATE_PX]);
  const rotateX = useTransform(sy, [-1, 1], [depth * MAX_ROTATE_DEG, -depth * MAX_ROTATE_DEG]);
  const rotateY = useTransform(sx, [-1, 1], [-depth * MAX_ROTATE_DEG, depth * MAX_ROTATE_DEG]);

  const rafId = useRef(0);
  useEffect(() => {
    if (reduce || isHoverless) return;
    const node = targetRef?.current ?? window;

    const handler = (e) => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = 0;
        if (node === window) {
          normX.set((e.clientX / window.innerWidth) * 2 - 1);
          normY.set((e.clientY / window.innerHeight) * 2 - 1);
        } else {
          const r = node.getBoundingClientRect();
          if (!r.width || !r.height) return;
          normX.set(((e.clientX - r.left) / r.width) * 2 - 1);
          normY.set(((e.clientY - r.top) / r.height) * 2 - 1);
        }
      });
    };

    node.addEventListener('mousemove', handler, { passive: true });
    return () => {
      node.removeEventListener('mousemove', handler);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [targetRef, reduce, isHoverless, normX, normY]);

  return { x, y, rotateX, rotateY, normX, normY };
};

export default useMouseParallax;
