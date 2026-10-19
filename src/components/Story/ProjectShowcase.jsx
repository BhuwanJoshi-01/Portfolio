import React, { useCallback, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SceneWrapper from '../Motion/SceneWrapper';
import SectionHeader from '../UI/SectionHeader';
import PillButton from '../UI/PillButton';
import ProjectDrawer from '../Site/ProjectDrawer';
import ProjectIndex from '../Site/ProjectIndex';
import { projects, socialLinks, splitTitle } from '../../data/portfolio';

// Bento rhythm: 7/5, 5/7, then a full-width closer
// 6 featured cards → three clean 7/5 rows
const SPANS = ['md:col-span-7', 'md:col-span-5', 'md:col-span-5', 'md:col-span-7', 'md:col-span-7', 'md:col-span-5'];
const HEIGHTS = ['md:h-[460px]', 'md:h-[460px]', 'md:h-[420px]', 'md:h-[420px]', 'md:h-[440px]', 'md:h-[440px]'];

const ProjectCard = ({ project, index, onOpen }) => {
  const tiltRef = useRef(null);
  const cardRef = useRef(null);
  const { name, tagline } = splitTitle(project.title);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 20 });
  const sy = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ['4deg', '-4deg']);
  const rotateY = useTransform(sx, [-0.5, 0.5], ['-4deg', '4deg']);

  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const handleMouseMove = (e) => {
    if (!tiltRef.current) return;
    const rect = tiltRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      className={`${SPANS[index % SPANS.length]} flex flex-col gap-4`}
      style={{ perspective: 1200 }}
    >
      <motion.button
        ref={tiltRef}
        type="button"
        onClick={() => onOpen(project)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        aria-label={`View ${project.title}`}
        className={`group relative w-full aspect-[4/3] ${HEIGHTS[index % HEIGHTS.length]} md:aspect-auto overflow-hidden rounded-3xl bg-surface border border-stroke text-left cursor-pointer`}
      >
        <motion.div className="absolute inset-[-10%]" style={{ y: imageY }}>
          <img
            src={project.image}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </motion.div>

        <div className="absolute inset-0 halftone opacity-20 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        <span className="absolute top-5 left-5 text-[11px] uppercase tracking-[0.25em] text-white/80 tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="absolute inset-0 bg-bg/70 backdrop-blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <span className="relative rounded-full p-[1.5px] accent-gradient-animated translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
            <span className="flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 text-sm">
              View — <span className="font-display italic text-base">{name}</span>
            </span>
          </span>
        </div>
      </motion.button>

      <div className="flex items-start justify-between gap-4 px-1">
        <div>
          <h3 className="text-lg text-text-primary">
            <span className="font-display italic text-2xl">{name}</span>
            {tagline && <span className="text-muted text-sm"> — {tagline}</span>}
          </h3>
          <p className="mt-1 text-sm text-muted leading-relaxed line-clamp-2 max-w-xl">{project.description}</p>
        </div>
        <ul className="hidden sm:flex flex-wrap justify-end gap-1.5 max-w-[45%] shrink-0">
          {project.technologies.slice(0, 3).map((t) => (
            <li key={t} className="px-2.5 py-1 rounded-full border border-stroke text-[11px] text-muted whitespace-nowrap">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
};

const ProjectShowcase = () => {
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);
  const github = socialLinks.find((s) => s.label === 'GitHub')?.href;
  const visible = projects.filter((p) => !p.hidden);
  const featured = visible.filter((p) => p.featured);
  const rest = visible.filter((p) => !p.featured);

  return (
    <SceneWrapper id="work" className="bg-bg">
      <div className="py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <SectionHeader
            eyebrow="Selected Work"
            title={
              <>
                Featured <em>projects</em>
              </>
            }
            subtitle="A selection of projects I've worked on, from concept to launch."
            action={
              <PillButton variant="outline" href={github} target="_blank" rel="noreferrer">
                View all work <ArrowRight size={16} />
              </PillButton>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-10 md:gap-x-6 md:gap-y-12">
            {featured.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} onOpen={setActive} />
            ))}
          </div>

          {rest.length > 0 && <ProjectIndex projects={rest} onOpen={setActive} />}
        </div>
      </div>

      <ProjectDrawer project={active} onClose={close} />
    </SceneWrapper>
  );
};

export default ProjectShowcase;
