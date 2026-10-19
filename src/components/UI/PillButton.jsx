import React from 'react';
import MagneticButton from '../Motion/MagneticButton';

/**
 * PillButton — rounded CTA with an animated accent-gradient ring on hover.
 *
 * variant:
 *  - solid   → light fill; inverts to dark with the ring on hover
 *  - outline → stroke border; the border dissolves into the ring on hover
 *  - surface → glassy surface fill (navbar)
 */
const VARIANTS = {
  solid: 'bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary',
  outline: 'border-2 border-stroke bg-bg text-text-primary group-hover:border-transparent',
  surface: 'bg-surface backdrop-blur-md text-text-primary',
};

const SIZES = {
  md: 'text-sm px-7 py-3.5',
  sm: 'text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2',
};

const PillButton = ({
  variant = 'solid',
  size = 'md',
  as = 'a',
  magnetic = true,
  className = '',
  innerClassName = '',
  children,
  ...rest
}) => {
  const content = (
    <>
      <span
        aria-hidden="true"
        className="absolute -inset-[2px] rounded-full accent-gradient-animated opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      <span
        className={`relative inline-flex items-center gap-2 rounded-full transition-colors duration-300 ${SIZES[size]} ${VARIANTS[variant]} ${innerClassName}`}
      >
        {children}
      </span>
    </>
  );

  const classes = `group relative rounded-full hover:scale-105 transition-transform duration-300 ${className}`;

  if (!magnetic) {
    const Tag = as;
    return (
      <Tag className={`inline-flex ${classes}`} {...rest}>
        {content}
      </Tag>
    );
  }

  return (
    <MagneticButton as={as} strength={0.5} className={classes} {...rest}>
      {content}
    </MagneticButton>
  );
};

export default PillButton;
