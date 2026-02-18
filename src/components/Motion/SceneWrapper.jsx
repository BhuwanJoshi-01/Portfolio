import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * SceneWrapper — Cinematic section container
 * 
 * Wraps each portfolio "scene" with:
 * - Scroll-driven dissolve transitions (fade + subtle scale)
 * - Perspective container for child 3D effects
 * - Atmospheric spotlight glow per scene
 * - GPU-accelerated transforms only
 *
 * @param {string} id - Section anchor ID
 * @param {string} glowColor - CSS color for the atmospheric spotlight
 * @param {string} glowPosition - CSS position string for the glow (e.g., "50% 0%")
 * @param {boolean} isFirst - Skip the fade-in entrance for the hero
 * @param {boolean} isLast - Skip the fade-out exit for the last section
 * @param {string} className - Additional classes
 */
const SceneWrapper = ({
  children,
  id,
  className = '',
  glowColor,
  glowPosition = '50% 0%',
  isFirst = false,
  isLast = false,
}) => {
  const ref = useRef(null);

  // Track this section's position in viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Entrance: fade/scale up as section enters viewport
  // 0 = section bottom at viewport bottom, 0.15 = section entering
  const enterOpacity = useTransform(
    scrollYProgress,
    [0, 0.15],
    isFirst ? [1, 1] : [0, 1]
  );
  const enterScale = useTransform(
    scrollYProgress,
    [0, 0.15],
    isFirst ? [1, 1] : [0.97, 1]
  );

  // Exit: fade/scale down as section leaves viewport  
  const exitOpacity = useTransform(
    scrollYProgress,
    [0.85, 1],
    isLast ? [1, 1] : [1, 0]
  );
  const exitScale = useTransform(
    scrollYProgress,
    [0.85, 1],
    isLast ? [1, 1] : [1, 0.97]
  );

  // Combine enter and exit (multiply)
  const combinedOpacity = useTransform(
    [enterOpacity, exitOpacity],
    ([enter, exit]) => Math.min(enter, exit)
  );
  const combinedScale = useTransform(
    [enterScale, exitScale],
    ([enter, exit]) => Math.min(enter, exit)
  );

  // Smooth the values
  const smoothOpacity = useSpring(combinedOpacity, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const smoothScale = useSpring(combinedScale, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`relative overflow-hidden ${className}`}
      style={{
        opacity: smoothOpacity,
        scale: smoothScale,
        willChange: 'opacity, transform',
        perspective: '1200px',
      }}
    >
      {/* Atmospheric spotlight */}
      {glowColor && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 40% at ${glowPosition}, ${glowColor}, transparent)`,
            opacity: 'var(--scene-glow-opacity)',
          }}
        />
      )}

      {children}
    </motion.section>
  );
};

export default SceneWrapper;
