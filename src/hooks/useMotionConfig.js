import { useReducedMotion } from 'framer-motion';

/* ═══════════════════════════════════════════
   CINEMATIC MOTION PRESETS
   ═══════════════════════════════════════════ */

// Easing curves
export const ease = {
    cinematic: [0.25, 0.46, 0.45, 0.94],
    dramaticIn: [0.6, 0.01, 0.05, 0.95],
    smoothOut: [0.16, 1, 0.3, 1],
    elasticSnap: [0.68, -0.55, 0.265, 1.55],
    gentle: [0.4, 0, 0.2, 1],
};

// Spring presets
export const springs = {
    smooth: { stiffness: 100, damping: 30, restDelta: 0.001 },
    snappy: { stiffness: 300, damping: 30, restDelta: 0.001 },
    bouncy: { stiffness: 400, damping: 25, restDelta: 0.001 },
    slow: { stiffness: 60, damping: 20, restDelta: 0.001 },
    gentle: { stiffness: 80, damping: 25, restDelta: 0.001 },
};

// Duration presets
export const durations = {
    fast: 0.3,
    normal: 0.6,
    slow: 0.9,
    dramatic: 1.2,
    cinematic: 1.5,
};

/* ═══════════════════════════════════════════
   ANIMATION VARIANT FACTORIES
   ═══════════════════════════════════════════ */

/**
 * Fade up with configurable offset and timing
 */
export const fadeUpVariants = (delay = 0, distance = 40) => ({
    hidden: { opacity: 0, y: distance },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: durations.slow,
            delay,
            ease: ease.cinematic,
        },
    },
});

/**
 * Stagger container for children
 */
export const staggerContainer = (staggerDelay = 0.08, startDelay = 0) => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: staggerDelay,
            delayChildren: startDelay,
        },
    },
});

/**
 * Scale in from a point
 */
export const scaleInVariants = (delay = 0) => ({
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: durations.slow,
            delay,
            ease: ease.smoothOut,
        },
    },
});

/**
 * Slide in from direction
 */
export const slideInVariants = (direction = 'left', delay = 0, distance = 60) => {
    const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
    const value = direction === 'left' || direction === 'up' ? -distance : distance;
    return {
        hidden: { opacity: 0, [axis]: value },
        visible: {
            opacity: 1,
            [axis]: 0,
            transition: {
                duration: durations.slow,
                delay,
                ease: ease.cinematic,
            },
        },
    };
};

/* ═══════════════════════════════════════════
   REDUCED MOTION HOOK
   ═══════════════════════════════════════════ */

/**
 * Returns safe motion values depending on user preference
 */
export const useMotionSafe = () => {
    const shouldReduce = useReducedMotion();

    return {
        shouldReduce,
        // Returns the value or a static alternative
        safeSpring: shouldReduce ? { duration: 0 } : undefined,
        safeTransition: (transition) =>
            shouldReduce
                ? { ...transition, duration: 0, delay: 0 }
                : transition,
    };
};

export default { ease, springs, durations };
