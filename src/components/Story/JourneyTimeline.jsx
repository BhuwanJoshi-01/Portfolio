import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import SceneWrapper from '../Motion/SceneWrapper';
import ParallaxScene from '../Motion/ParallaxScene';
import ParallaxLayer from '../Motion/ParallaxLayer';
import SectionHeader from '../UI/SectionHeader';
import { journey } from '../../data/portfolio';

const rowEase = [0.25, 0.1, 0.25, 1];

const JourneyRow = ({ item, index, open, onToggle }) => {
  const Icon = item.icon;
  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.06, ease: rowEase }}
    >
      <motion.div
        layout
        transition={{ layout: { duration: 0.5, ease: rowEase } }}
        className={`group border border-stroke transition-colors duration-300 ${
          open ? 'bg-surface rounded-[32px]' : 'bg-surface/30 hover:bg-surface rounded-[40px] sm:rounded-full'
        }`}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="w-full flex items-center gap-4 sm:gap-6 p-4 text-left"
        >
          <motion.span
            layout="position"
            className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[1.5px] bg-stroke group-hover:accent-gradient transition-colors"
          >
            <span className="flex w-full h-full items-center justify-center rounded-full bg-bg text-text-primary">
              <Icon size={20} strokeWidth={1.5} />
            </span>
          </motion.span>

          <motion.span layout="position" className="flex-1 min-w-0">
            <span className="block text-base sm:text-lg text-text-primary leading-snug">{item.title}</span>
            <span className="block text-xs sm:text-sm text-muted mt-0.5 truncate">{item.company}</span>
          </motion.span>

          <motion.span layout="position" className="hidden sm:flex items-center gap-4 shrink-0 pr-2">
            <span className="font-display italic text-xl text-text-primary/90 whitespace-nowrap">{item.year}</span>
          </motion.span>

          <motion.span
            layout="position"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 w-9 h-9 rounded-full border border-stroke flex items-center justify-center text-muted group-hover:text-text-primary"
          >
            <Plus size={16} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: rowEase }}
              className="overflow-hidden"
            >
              <div className="px-6 sm:pl-[6.5rem] sm:pr-16 pb-6">
                <span className="sm:hidden block font-display italic text-lg text-text-primary/90 mb-2">{item.year}</span>
                <p className="text-sm text-muted leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.li>
  );
};

const JourneyTimeline = () => {
  const listRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 80%', 'end 50%'] });
  const railScale = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  return (
    <SceneWrapper id="journey" className="bg-bg">
      <ParallaxScene className="py-16 md:py-24 relative">
        {/* DEPTH 0.05 — dotted blueprint grid */}
        <ParallaxLayer depth={0.05} blur="far">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
              backgroundSize: '32px 32px',
              maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000, transparent)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000, transparent)',
            }}
          />
        </ParallaxLayer>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <SectionHeader
            eyebrow="My Journey"
            title={
              <>
                How I got <em>here</em>
              </>
            }
            subtitle="From self-taught beginnings to a CS+AI degree — a journey of continuous learning, anchored in real projects and experiments."
            action={
              <Link
                to="/resume"
                className="group inline-flex items-center gap-2 text-sm text-muted hover:text-text-primary transition-colors"
              >
                Full resume
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            }
          />

          <div className="relative md:pl-10" ref={listRef}>
            {/* Scroll-drawn rail */}
            <span className="hidden md:block absolute left-0 top-2 bottom-2 w-px bg-stroke" />
            <motion.span
              style={{ scaleY: railScale, transformOrigin: 'top' }}
              className="hidden md:block absolute left-0 top-2 bottom-2 w-px accent-gradient glow-line"
            />

            <ul className="flex flex-col gap-3 sm:gap-4">
              {journey.map((item, i) => (
                <JourneyRow
                  key={item.title}
                  item={item}
                  index={i}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              ))}
            </ul>
          </div>
        </div>
      </ParallaxScene>
    </SceneWrapper>
  );
};

export default JourneyTimeline;
