import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { navItems, profile } from '../../data/portfolio';
import useSectionNav from '../../hooks/useSectionNav';

const SECTIONS = ['home', 'work', 'experience', 'journey', 'skills', 'manifesto', 'explorations', 'stats', 'contact'];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  const goTo = useSectionNav();
  const onResume = location.pathname === '/resume';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      for (const section of SECTIONS) {
        const el = document.getElementById(section);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 140) {
          setActiveSection(section);
          break;
        }
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const isActive = (item) => (item.route ? location.pathname === item.route : !onResume && activeSection === item.id);

  const handleClick = (item) => {
    if (item.route) {
      if (location.pathname !== item.route) navigate(item.route);
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      goTo(item.id);
    }
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="no-print fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4"
      aria-label="Primary"
    >
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/80 px-2 py-2 transition-shadow duration-500 ${
          isScrolled ? 'shadow-md shadow-black/10' : ''
        }`}
      >
        <button
          onClick={() => goTo('home')}
          aria-label="Back to top"
          className="logo-ring w-9 h-9 rounded-full p-[1.5px] shrink-0"
        >
          <span className="flex w-full h-full items-center justify-center rounded-full bg-bg font-display italic text-[13px] text-text-primary">
            {profile.initials}
          </span>
        </button>

        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        <ul className="flex items-center">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <li key={item.id} className={item.desktopOnly ? 'hidden md:block' : ''}>
                <button
                  onClick={() => handleClick(item)}
                  aria-current={active ? 'page' : undefined}
                  className={`relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-300 ${
                    active ? 'text-text-primary' : 'text-muted hover:text-text-primary hover:bg-stroke/50'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="navPill"
                      className="absolute inset-0 rounded-full bg-stroke/50"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        <button
          onClick={() => goTo('contact')}
          className="group relative ml-1 sm:ml-0 rounded-full text-xs sm:text-sm"
        >
          <span
            aria-hidden="true"
            className="absolute -inset-[2px] rounded-full accent-gradient-animated opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <span className="relative inline-flex items-center gap-1 rounded-full bg-surface backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 text-text-primary">
            Say hi <span aria-hidden="true">↗</span>
          </span>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navigation;
