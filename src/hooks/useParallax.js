import { useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * Custom parallax hook for multi-layer depth effects.
 * @param {React.RefObject} targetRef - Element ref to track
 * @param {object} options
 * @param {number} options.speed - Parallax speed multiplier (default 0.5). Negative = reverse.
 * @param {string} options.direction - 'y' or 'x' (default 'y')
 * @param {boolean} options.clamp - Clamp output range (default true)
 * @param {array} options.inputRange - Custom scroll input range
 * @param {array} options.outputRange - Custom transform output range
 */
export const useParallax = (targetRef, options = {}) => {
    const {
        speed = 0.5,
        direction = 'y',
        clamp = true,
        inputRange,
        outputRange,
    } = options;

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const range = outputRange || [-100 * speed, 100 * speed];
    const input = inputRange || [0, 1];

    const rawValue = useTransform(scrollYProgress, input, range, {
        clamp,
    });

    const smoothValue = useSpring(rawValue, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return {
        [direction]: smoothValue,
        scrollYProgress,
    };
};

/**
 * Simple opacity fade tied to scroll progress.
 */
export const useScrollFade = (targetRef, fadeIn = true) => {
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: fadeIn ? ["start end", "end center"] : ["start start", "end start"],
    });

    const opacity = useTransform(
        scrollYProgress,
        fadeIn ? [0, 0.3] : [0.7, 1],
        fadeIn ? [0, 1] : [1, 0]
    );

    return { opacity, scrollYProgress };
};

export default useParallax;
