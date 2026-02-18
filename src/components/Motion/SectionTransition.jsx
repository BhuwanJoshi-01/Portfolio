import React from 'react';

const SectionTransition = ({ flip = false, className = '' }) => {
  return (
    <div className={`relative w-full h-24 md:h-32 overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={`absolute inset-0 w-full h-full ${flip ? 'rotate-180' : ''}`}
        fill="none"
      >
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-gradient-start)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="var(--color-gradient-mid)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--color-gradient-end)" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path
          d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,30 1440,60 L1440,120 L0,120 Z"
          fill="url(#wave-gradient)"
        />
        <path
          d="M0,80 C240,40 480,100 720,60 C960,20 1200,90 1440,50 L1440,120 L0,120 Z"
          fill="url(#wave-gradient)"
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

export default SectionTransition;
