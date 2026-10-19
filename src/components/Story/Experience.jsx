import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin, ArrowDown } from 'lucide-react';
import SceneWrapper from '../Motion/SceneWrapper';
import ParallaxScene from '../Motion/ParallaxScene';
import ParallaxLayer from '../Motion/ParallaxLayer';
import SectionHeader from '../UI/SectionHeader';
import { experiences } from '../../data/portfolio';

const VersionTrail = ({ versions }) => (
  <div className="mt-8">
    <h4 className="mb-4 text-[10px] uppercase tracking-[0.25em] text-muted">Release notes</h4>
    <ol className="relative flex flex-col gap-3">
      {versions.map((v, i) => (
        <React.Fragment key={v.version}>
          <motion.li
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`relative flex items-start gap-4 rounded-2xl border p-4 ${
              v.current ? 'border-transparent bg-bg' : 'border-stroke bg-bg/40'
            }`}
          >
            {v.current && (
              <span
                aria-hidden="true"
                className="absolute -inset-px rounded-2xl accent-gradient-animated opacity-60 -z-10"
              />
            )}
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[11px] ${
                v.current ? 'accent-gradient text-black' : 'border border-stroke text-muted'
              }`}
            >
              {v.version}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                <span
                  className={`font-display italic text-lg ${v.current ? 'text-text-primary' : 'text-muted line-through decoration-stroke'}`}
                >
                  {v.role}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted">{v.period}</span>
              </span>
              <span className="mt-1 block text-xs text-muted leading-relaxed">{v.note}</span>
            </span>
          </motion.li>
          {i < versions.length - 1 && (
            <motion.span
              initial={{ opacity: 0, y: -6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 + i * 0.25 }}
              className="flex items-center gap-2 pl-5 text-[10px] uppercase tracking-[0.25em] text-[#89AACC]"
            >
              <ArrowDown size={12} /> Promoted
            </motion.span>
          )}
        </React.Fragment>
      ))}
      <li className="flex items-center gap-4 rounded-2xl border border-dashed border-stroke p-4 text-muted">
        <span className="shrink-0 rounded-full border border-dashed border-stroke px-2.5 py-1 font-mono text-[11px]">
          v{versions.length + 1}.0
        </span>
        <span className="text-xs">
          Next release in development
          <span className="inline-block w-1.5 h-3 ml-1 align-middle bg-muted animate-pulse" />
        </span>
      </li>
    </ol>
  </div>
);

const ExperienceCard = ({ exp, index }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 25 });
  const sy = useSpring(y, { stiffness: 200, damping: 25 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ['4deg', '-4deg']);
  const rotateY = useTransform(sx, [-0.5, 0.5], ['-4deg', '4deg']);
  const glowX = useTransform(sx, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(sy, [-0.5, 0.5], ['0%', '100%']);
  const glow = useTransform(
    [glowX, glowY],
    ([gx, gy]) => `radial-gradient(400px circle at ${gx} ${gy}, rgba(137,170,204,0.10), transparent 60%)`
  );

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative h-full rounded-3xl bg-surface border border-stroke p-7 md:p-9 gradient-border"
      >
        <motion.div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: glow }} />
        <span className="absolute top-0 left-8 right-8 h-px accent-gradient opacity-60" />

        <div className="relative">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
            <span className="text-xs text-muted uppercase tracking-[0.25em]">{exp.period}</span>
            {exp.current && (
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                </span>
                Current
              </span>
            )}
          </div>

          <h3 className="text-3xl md:text-4xl font-display italic text-text-primary leading-tight">{exp.role}</h3>
          <p className="mt-2 text-sm text-text-primary/90">{exp.company}</p>
          <p className="mt-1 text-xs text-muted inline-flex items-center gap-1.5">
            <MapPin size={12} />
            {exp.location}
          </p>

          <p className="mt-6 text-sm text-muted leading-relaxed">{exp.description}</p>

          {exp.versions && <VersionTrail versions={exp.versions} />}

          <h4 className="mt-8 mb-4 text-[10px] uppercase tracking-[0.25em] text-muted">Key Contributions</h4>
          <ul className="space-y-3">
            {exp.responsibilities.map((item, i) => (
              <li key={i} className="flex gap-4 text-sm text-text-primary/90 leading-relaxed">
                <span className="font-display italic text-muted tabular-nums shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-stroke flex flex-wrap gap-2">
            {exp.tech.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full text-xs border border-stroke text-text-primary/90">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Experience = () => (
  <SceneWrapper id="experience" className="bg-bg" glowColor="rgba(137,170,204,0.35)" glowPosition="50% 0%">
    <ParallaxScene className="py-16 md:py-24 relative">
      {/* DEPTH 0.2 — horizontal ruling */}
      <ParallaxLayer depth={0.2} blur="mid">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '100% 56px',
          }}
        />
      </ParallaxLayer>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Experience"
          title={
            <>
              Where I&rsquo;m <em>currently building</em>
            </>
          }
          subtitle="Active internships and the work I'm doing right now."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.company} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </ParallaxScene>
  </SceneWrapper>
);

export default Experience;
