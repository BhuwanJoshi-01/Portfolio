import React from 'react';

/**
 * AmbientBackground — Atmospheric floating elements
 *
 * Renders slow-drifting gradient orbs and light flares
 * at the page level for continuous ambient motion.
 * All CSS-animated, GPU-accelerated, zero JS runtime cost.
 */
const AmbientBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Primary gradient orb — top right */}
      <div
        className="ambient-orb ambient-orb--1"
        style={{
          top: '5%',
          right: '-5%',
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, var(--color-gradient-start), transparent 70%)',
          opacity: 0.08,
        }}
      />

      {/* Secondary orb — bottom left */}
      <div
        className="ambient-orb ambient-orb--2"
        style={{
          bottom: '10%',
          left: '-8%',
          width: '35vw',
          height: '35vw',
          background: 'radial-gradient(circle, var(--color-gradient-end), transparent 70%)',
          opacity: 0.06,
        }}
      />

      {/* Tertiary orb — center */}
      <div
        className="ambient-orb ambient-orb--3"
        style={{
          top: '40%',
          left: '50%',
          width: '30vw',
          height: '30vw',
          background: 'radial-gradient(circle, var(--color-gradient-mid), transparent 70%)',
          opacity: 0.04,
          transform: 'translateX(-50%)',
        }}
      />

      {/* Light flare 1 */}
      <div
        className="light-flare"
        style={{
          top: '20%',
          right: '15%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(var(--color-accent-rgb), 0.15), transparent 70%)',
          animationDelay: '0s',
        }}
      />

      {/* Light flare 2 */}
      <div
        className="light-flare"
        style={{
          bottom: '30%',
          left: '10%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(var(--color-accent-rgb), 0.1), transparent 70%)',
          animationDelay: '-4s',
        }}
      />
    </div>
  );
};

export default AmbientBackground;
