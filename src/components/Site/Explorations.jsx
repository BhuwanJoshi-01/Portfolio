import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';
import PillButton from '../UI/PillButton';
import { explorations, socialLinks } from '../../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const ROTATIONS = [-6, 4, -3, 7, -5, 3];

const Lightbox = ({ item, onClose }) => {
  useEffect(() => {
    if (!item) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [item, onClose]);

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/85 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
        >
          <motion.figure
            initial={{ scale: 0.9, y: 30, rotate: -2 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={item.src} alt={item.title} className="w-full max-h-[75vh] object-contain rounded-2xl" />
            <figcaption className="mt-4 flex items-baseline justify-between gap-4">
              <span className="font-display italic text-2xl text-text-primary">{item.title}</span>
              <span className="text-xs text-muted uppercase tracking-[0.2em]">{item.caption}</span>
            </figcaption>
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-surface border border-stroke flex items-center justify-center text-text-primary"
            >
              <X size={18} />
            </button>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

const ExplorationCard = ({ item, rotation, onOpen }) => (
  <button
    type="button"
    onClick={() => onOpen(item)}
    className="group pointer-events-auto block w-full max-w-[320px] aspect-square rounded-3xl overflow-hidden border border-stroke bg-surface shadow-2xl shadow-black/50 transition-transform duration-500 hover:!rotate-0 hover:scale-105"
    style={{ transform: `rotate(${rotation}deg)` }}
    aria-label={`Open ${item.title}`}
  >
    <span className="relative block w-full h-full">
      <img src={item.src} alt="" loading="lazy" className="w-full h-full object-cover" />
      <span className="absolute inset-0 halftone opacity-20 mix-blend-multiply" />
      <span className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <span className="font-display italic text-lg text-white">{item.title}</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/70">View</span>
      </span>
    </span>
  </button>
);

const Explorations = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [active, setActive] = useState(null);
  const github = socialLinks.find((s) => s.label === 'GitHub')?.href;

  const left = explorations.filter((_, i) => i % 2 === 0);
  const right = explorations.filter((_, i) => i % 2 === 1);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: contentRef.current,
        pinSpacing: false,
      });

      const scrub = { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true };
      gsap.fromTo(leftRef.current, { y: '10vh' }, { y: '-40vh', ease: 'none', scrollTrigger: scrub });
      gsap.fromTo(rightRef.current, { y: '40vh' }, { y: '-80vh', ease: 'none', scrollTrigger: { ...scrub } });

      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
        }
      );
    }, sectionRef);

    // Layout above shifts once fonts + images settle
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);

    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section id="explorations" ref={sectionRef} className="relative min-h-[300vh] bg-bg">
      {/* Layer 1 — pinned centre */}
      <div ref={contentRef} className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">Explorations</span>
          <span className="w-8 h-px bg-stroke" />
        </div>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-[-0.03em] text-text-primary">
          Visual <em className="font-display italic tracking-normal">playground</em>
        </h2>
        <p className="mt-5 text-sm md:text-base text-muted max-w-md leading-relaxed">
          Screens, side quests and hardware experiments — a scrapbook of things I&rsquo;ve built along the way.
        </p>
        <div className="mt-10">
          <PillButton variant="outline" href={github} target="_blank" rel="noreferrer">
            Browse GitHub <span aria-hidden="true">↗</span>
          </PillButton>
        </div>
      </div>

      {/* Layer 2 — parallax columns */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <div className="max-w-[1400px] mx-auto h-full grid grid-cols-2 gap-12 md:gap-40 px-6 md:px-10 pt-[60vh]">
          <div ref={leftRef} className="flex flex-col items-start gap-[40vh]">
            {left.map((item, i) => (
              <ExplorationCard key={item.title} item={item} rotation={ROTATIONS[i * 2]} onOpen={setActive} />
            ))}
          </div>
          <div ref={rightRef} className="flex flex-col items-end gap-[40vh]">
            {right.map((item, i) => (
              <ExplorationCard key={item.title} item={item} rotation={ROTATIONS[i * 2 + 1]} onOpen={setActive} />
            ))}
          </div>
        </div>
      </div>

      <Lightbox item={active} onClose={() => setActive(null)} />
    </section>
  );
};

export default Explorations;
