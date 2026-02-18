import React from 'react';
import { motion } from 'framer-motion';

/**
 * Cinematic text reveal component.
 * Splits text into words and animates each with staggered clip-path reveal.
 *
 * @param {string} text - Text to animate
 * @param {string} className - Additional classes
 * @param {string} as - HTML element type ('h1', 'h2', 'p', 'span')
 * @param {number} delay - Initial delay before animation starts
 * @param {boolean} once - Only animate once (default true)
 */
const RevealText = ({ text, className = '', as = 'div', delay = 0, once = true }) => {
  const words = text.split(' ');
  const Tag = as;

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const wordVariant = {
    hidden: {
      y: '100%',
      opacity: 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
      className={`flex flex-wrap ${className}`}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block mr-[0.3em]">
          <motion.span
            variants={wordVariant}
            className="inline-block"
          >
            <Tag className={className}>{word}</Tag>
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

/**
 * Animate each character individually for hero-level text.
 */
export const RevealChars = ({ text, className = '', delay = 0, once = true }) => {
  const chars = text.split('');

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const charVariant = {
    hidden: { opacity: 0, y: 40, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={`inline-block ${className}`}
      style={{ perspective: '400px' }}
      aria-label={text}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          variants={charVariant}
          className="inline-block"
          style={{ transformOrigin: 'bottom' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default RevealText;
