import React, { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Lock } from 'lucide-react';
import { splitTitle } from '../../data/portfolio';

const rowEase = [0.25, 0.1, 0.25, 1];

/**
 * Archive list of every project: category filter, cursor-following image
 * preview on hover (desktop), click opens the project drawer.
 */
const ProjectIndex = ({ projects, onOpen }) => {
  const categories = useMemo(() => ['All', ...new Set(projects.map((p) => p.category))], [projects]);
  const [filter, setFilter] = useState('All');
  const [hovered, setHovered] = useState(null);
  const listRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 30 });
  const sy = useSpring(y, { stiffness: 250, damping: 30 });

  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  const handleMove = (e) => {
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <div className="mt-24 md:mt-32">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Index</span>
          </div>
          <h3 className="text-3xl md:text-4xl tracking-[-0.02em] text-text-primary">
            Everything <em className="font-display italic">else</em>
            <span className="ml-3 align-top text-sm text-muted tabular-nums">({projects.length})</span>
          </h3>
        </div>

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={filter === c}
              onClick={() => setFilter(c)}
              className={`relative rounded-full px-4 py-1.5 text-xs transition-colors ${
                filter === c ? 'text-bg' : 'text-muted hover:text-text-primary border border-stroke'
              }`}
            >
              {filter === c && (
                <motion.span
                  layoutId="indexFilter"
                  className="absolute inset-0 rounded-full bg-text-primary"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>
      </div>

      <div ref={listRef} className="relative" onMouseMove={handleMove} onMouseLeave={() => setHovered(null)}>
        <ul className="border-t border-stroke">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((project, i) => {
              const { name, tagline } = splitTitle(project.title);
              return (
                <motion.li
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(i, 8) * 0.03, ease: rowEase }}
                  className="border-b border-stroke"
                >
                  <button
                    type="button"
                    onClick={() => onOpen(project)}
                    onMouseEnter={() => setHovered(project)}
                    className="group w-full grid grid-cols-[3rem_1fr_auto] md:grid-cols-[4rem_1.3fr_1fr_8rem_2rem] items-center gap-4 py-5 text-left"
                  >
                    <span className="text-xs text-muted tabular-nums">{project.year}</span>
                    <span className="min-w-0">
                      <span className="block font-display italic text-xl md:text-2xl text-text-primary transition-transform duration-300 group-hover:translate-x-2">
                        {name}
                        {project.confidential && (
                          <Lock size={12} className="inline-block ml-2 -mt-1 text-muted" aria-label="Proprietary" />
                        )}
                      </span>
                      <span className="block text-xs text-muted truncate md:hidden">{tagline || project.category}</span>
                    </span>
                    <span className="hidden md:block text-sm text-muted truncate">{tagline || project.description}</span>
                    <span className="hidden md:block text-[11px] uppercase tracking-[0.2em] text-muted">{project.category}</span>
                    <ArrowUpRight
                      size={18}
                      className="justify-self-end text-muted transition-all duration-300 group-hover:text-text-primary group-hover:rotate-45"
                    />
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        {/* Floating preview */}
        <motion.div
          aria-hidden="true"
          className="hidden lg:block pointer-events-none absolute left-0 top-0 z-20 w-72 aspect-[4/3] -translate-x-1/2 -translate-y-1/2"
          style={{ x: sx, y: sy }}
        >
          <AnimatePresence>
            {hovered?.image && (
              <motion.div
                key={hovered.id}
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 rounded-2xl overflow-hidden border border-stroke shadow-2xl shadow-black/60"
              >
                <img src={hovered.image} alt="" className="w-full h-full object-cover" />
                <span className="absolute inset-0 halftone opacity-20 mix-blend-multiply" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectIndex;
