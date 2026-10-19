import React from 'react';
import { motion } from 'framer-motion';

const revealEase = [0.25, 0.1, 0.25, 1];

/**
 * Eyebrow + heading (wrap the italic word in <em>) + subtext + optional action.
 */
const SectionHeader = ({ eyebrow, title, subtitle, action, align = 'left', className = '' }) => {
  const centered = align === 'center';
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1, ease: revealEase }}
      className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12 md:mb-16 ${
        centered ? 'items-center text-center md:flex-col md:items-center' : ''
      } ${className}`}
    >
      <div className={centered ? 'flex flex-col items-center' : ''}>
        <div className="flex items-center gap-3 mb-5">
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">{eyebrow}</span>
          {centered && <span className="w-8 h-px bg-stroke" />}
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-[-0.03em] leading-[1.05] text-text-primary [&_em]:font-display [&_em]:italic [&_em]:font-normal [&_em]:tracking-normal">
          {title}
        </h2>
        {subtitle && (
          <p className={`mt-4 text-sm md:text-base text-muted max-w-xl leading-relaxed ${centered ? 'mx-auto' : ''}`}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="hidden md:inline-flex shrink-0">{action}</div>}
    </motion.div>
  );
};

export default SectionHeader;
