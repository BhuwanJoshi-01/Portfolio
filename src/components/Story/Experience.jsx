import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Briefcase, MapPin, Calendar, ChevronRight } from 'lucide-react';
import SceneWrapper from '../Motion/SceneWrapper';
import ParallaxScene from '../Motion/ParallaxScene';
import ParallaxLayer from '../Motion/ParallaxLayer';
import { ease } from '../../hooks/useMotionConfig';

const experiences = [
  {
    role: 'Development Intern',
    company: 'RAIN — Sunway College Kathmandu',
    location: 'Kathmandu, Nepal',
    period: 'Jan 2026 — Present',
    current: true,
    description:
      'Building features for the RAIN platform across mobile and web. Day-to-day work spans React Native development in TypeScript and backend integration with Node.js and Firebase.',
    responsibilities: [
      'Implement features for mobile and web clients with React Native and TypeScript',
      'Integrate backend services using Node.js and Firebase',
      'Collaborate with the team on bug resolution and code review',
      'Test and deploy modules across iOS, Android, and web targets',
    ],
    tech: ['TypeScript', 'React Native', 'Node.js', 'Firebase', 'Expo'],
    accent: '#6366f1',
  },
  {
    role: 'Software Development Intern',
    company: 'Prateek Innovations',
    location: 'Kathmandu, Nepal',
    period: '2026 — Present',
    current: true,
    description:
      'Contributing to product development as part of a software engineering internship. Working across the stack on user-facing features and backend integrations.',
    responsibilities: [
      'Develop and ship user-facing features for web applications',
      'Build backend integrations and contribute to API work',
      'Participate in code reviews and design discussions',
      'Support iteration on product requirements with the team',
    ],
    tech: ['JavaScript', 'React', 'Node.js'],
    accent: '#a855f7',
  },
];

const ExperienceCard = ({ exp, index }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 25 });
  const sy = useSpring(y, { stiffness: 200, damping: 25 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ['4deg', '-4deg']);
  const rotateY = useTransform(sx, [-0.5, 0.5], ['-4deg', '4deg']);

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
      transition={{ duration: 0.8, delay: index * 0.15, ease: ease.cinematic }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative p-6 md:p-8 rounded-2xl gradient-border h-full overflow-hidden group"
      >
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'var(--color-card)',
            border: '1px solid var(--color-border)',
          }}
        />

        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 60px ${exp.accent}10, 0 0 50px ${exp.accent}15`,
          }}
        />

        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
          style={{
            background: `linear-gradient(90deg, ${exp.accent}, ${exp.accent}40)`,
            opacity: 0.7,
          }}
        />

        <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <Calendar size={13} style={{ color: exp.accent }} />
              {exp.period}
            </span>
            {exp.current && (
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                style={{
                  background: 'rgba(34, 197, 94, 0.10)',
                  color: '#22c55e',
                  border: '1px solid rgba(34, 197, 94, 0.30)',
                }}
              >
                <span className="relative flex w-2 h-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                    style={{ background: '#22c55e' }} />
                  <span className="relative inline-flex rounded-full h-2 w-2"
                    style={{ background: '#22c55e' }} />
                </span>
                Current
              </span>
            )}
          </div>

          <div className="flex items-start gap-4 mb-5">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: `linear-gradient(135deg, ${exp.accent}, ${exp.accent}60)`,
                boxShadow: `0 0 20px ${exp.accent}30`,
              }}
            >
              <Briefcase size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className="text-xl md:text-2xl font-bold leading-tight mb-1"
                style={{ color: 'var(--color-text)' }}
              >
                {exp.role}
              </h3>
              <p className="text-sm font-semibold" style={{ color: exp.accent }}>
                {exp.company}
              </p>
              <p
                className="text-xs mt-1 inline-flex items-center gap-1"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <MapPin size={12} />
                {exp.location}
              </p>
            </div>
          </div>

          <p
            className="text-sm leading-relaxed mb-5"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {exp.description}
          </p>

          <div className="mb-5">
            <h4
              className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Key Contributions
            </h4>
            <ul className="space-y-2">
              {exp.responsibilities.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-2.5 text-sm leading-relaxed"
                  style={{ color: 'var(--color-text)' }}
                >
                  <ChevronRight
                    size={16}
                    className="shrink-0 mt-0.5"
                    style={{ color: exp.accent }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="flex flex-wrap gap-2 pt-4 border-t"
            style={{ borderColor: 'var(--color-border)' }}
          >
            {exp.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-full text-xs font-medium glass"
                style={{ color: 'var(--color-text)' }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <SceneWrapper
      id="experience"
      glowColor="rgba(var(--color-accent-rgb), 0.15)"
      glowPosition="50% 50%"
    >
      <ParallaxScene
        className="py-24 md:py-32 relative"
        style={{ background: 'var(--color-bg)' }}
      >
        <ParallaxLayer depth={0.08} blur="far">
          <div
            className="absolute top-[10%] right-[-10%] w-[45vw] h-[45vw] rounded-full"
            style={{
              background:
                'radial-gradient(circle, var(--color-gradient-start), transparent 70%)',
              opacity: 0.14,
            }}
          />
          <div
            className="absolute bottom-[10%] left-[-10%] w-[40vw] h-[40vw] rounded-full"
            style={{
              background:
                'radial-gradient(circle, var(--color-gradient-end), transparent 70%)',
              opacity: 0.12,
            }}
          />
        </ParallaxLayer>

        <ParallaxLayer depth={0.2} blur="mid">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(to bottom, rgba(var(--color-accent-rgb), 0.06) 1px, transparent 1px)',
              backgroundSize: '100% 56px',
              opacity: 0.5,
            }}
          />
        </ParallaxLayer>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: ease.cinematic }}
            className="text-center mb-16 md:mb-20"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-sm font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ color: 'var(--color-accent)' }}
            >
              Experience
            </motion.span>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5"
              style={{ color: 'var(--color-text)' }}
            >
              Where I'm <span className="text-gradient">Currently Building</span>
            </h2>
            <p
              className="max-w-xl mx-auto text-lg leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Active internships and the work I'm doing right now.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.company} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </ParallaxScene>
    </SceneWrapper>
  );
};

export default Experience;
