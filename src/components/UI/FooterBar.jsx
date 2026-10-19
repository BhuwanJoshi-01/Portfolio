import React from 'react';
import { profile, socialLinks } from '../../data/portfolio';

const FooterBar = ({ className = '' }) => (
  <div
    className={`flex flex-col-reverse gap-6 md:flex-row md:items-center md:justify-between border-t border-stroke pt-8 ${className}`}
  >
    <div className="flex flex-col gap-1 text-xs text-muted">
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
      <span>Crafted with passion · Built with React, GSAP + Framer Motion</span>
    </div>

    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {socialLinks.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-muted hover:text-text-primary transition-colors"
        >
          {label}
        </a>
      ))}
      <span className="flex items-center gap-2 text-sm text-text-primary">
        <span className="relative flex w-2 h-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        Available for projects
      </span>
    </div>
  </div>
);

export default FooterBar;
