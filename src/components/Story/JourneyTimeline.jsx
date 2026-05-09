import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useInView } from 'framer-motion';
import { GraduationCap, Rocket, Code2, Cloud, Lightbulb } from 'lucide-react';
import SceneWrapper from '../Motion/SceneWrapper';
import ParallaxScene from '../Motion/ParallaxScene';
import ParallaxLayer from '../Motion/ParallaxLayer';
import { ease } from '../../hooks/useMotionConfig';

const experience = [
  {
    year: '2025 — Present',
    title: 'Mobile & Advanced Server-Side Development',
    company: 'Independent / Contract',
    description:
      'Developing cross-platform mobile applications using React Native, Expo, and Flutter. Implementing advanced server-side architectures with microservices, real-time communication (WebSockets, WebRTC), and AI/ML integrations.',
    icon: GraduationCap,
    color: '#6366f1',
  },
  {
    year: '2024',
    title: 'Self-directed Full-Stack Projects',
    company: 'Forgex · KodeSQL · QuickWash',
    description:
      'Django + PostgreSQL backends, React Native + Expo frontends. REST APIs, auth patterns, mentorship platforms, and real-time booking — shipped to real users.',
    icon: Rocket,
    color: '#a855f7',
  },
  {
    year: '2023',
    title: 'Backend & Databases',
    company: 'Self-taught experiments',
    description:
      'Django, Node/Express, PostgreSQL, Redis, Firebase. Authentication patterns, REST design, schema modeling, deployment basics.',
    icon: Cloud,
    color: '#c084fc',
  },
  {
    year: '2022',
    title: 'First Server-Side Experiments',
    company: 'Personal projects',
    description:
      'Built first REST APIs in Node and Django. Learned the full request lifecycle from URL to database, plus deployment fundamentals.',
    icon: Code2,
    color: '#e879f9',
  },
  {
    year: 'Mar 2024',
    title: '+2 Completion',
    company: 'Little Buddha Academy, Mahendranagar',
    description:
      'Finished high school (GPA 3.0). Self-taught HTML, CSS, JavaScript, and React fundamentals during senior year — the start of the journey.',
    icon: Lightbulb,
    color: '#f0abfc',
  },
];

const YearBadge = ({ year, color }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.span
      ref={ref}
      className="text-sm font-bold tracking-wider uppercase block"
      style={{ color }}
      initial={{ opacity: 0, x: -10 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: ease.cinematic }}
    >
      {year}
    </motion.span>
  );
};

const TimelineItem = ({ exp, index, total, scrollProgress }) => {
  const ref = useRef(null);
  const isLeft = index % 2 === 0;
  const Icon = exp.icon;
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const nodeStart = index / total;
  const nodeEnd = (index + 1) / total;
  const nodeGlow = useTransform(scrollProgress, [nodeStart, nodeEnd], [0.3, 1]);
  const smoothGlow = useSpring(nodeGlow, { stiffness: 80, damping: 20 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: ease.cinematic, delay: 0.1 }}
      className="mb-14 md:mb-20"
    >
      {/* Mobile layout */}
      <div className="md:hidden flex gap-4">
        <div className="flex flex-col items-center">
          <motion.div
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${exp.color}, ${exp.color}88)`,
              boxShadow: `0 0 20px ${exp.color}40`,
              scale: isInView ? 1 : 0.5,
            }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <Icon size={16} className="text-white" />
          </motion.div>
          {index < total - 1 && (
            <div
              className="w-[2px] flex-1 mt-3"
              style={{ background: 'var(--color-border)' }}
            />
          )}
        </div>
        <div className="pb-4 flex-1">
          <YearBadge year={exp.year} color={exp.color} />
          <h3 className="text-lg font-bold mb-1 mt-1" style={{ color: 'var(--color-text)' }}>
            {exp.title}
          </h3>
          <h4
            className="text-sm font-medium mb-2"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {exp.company}
          </h4>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {exp.description}
          </p>
        </div>
      </div>

      {/* Desktop layout — 3-column grid */}
      <div
        className="hidden md:grid"
        style={{ gridTemplateColumns: '1fr 64px 1fr', alignItems: 'start' }}
      >
        <div className={isLeft ? '' : 'order-1'}>
          {isLeft && (
            <motion.div
              whileHover={{ y: -5, scale: 1.015 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl relative group cursor-default text-right gradient-border"
              style={{
                background: 'var(--color-card)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: `0 0 40px ${exp.color}15, inset 0 0 40px ${exp.color}05`,
                }}
              />
              <YearBadge year={exp.year} color={exp.color} />
              <h3
                className="text-lg md:text-xl font-bold mb-1 mt-2"
                style={{ color: 'var(--color-text)' }}
              >
                {exp.title}
              </h3>
              <h4
                className="text-sm font-medium mb-3"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {exp.company}
              </h4>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {exp.description}
              </p>
            </motion.div>
          )}
        </div>

        <div className="flex justify-center order-2">
          <motion.div
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg shrink-0 relative z-20"
            style={{
              background: `linear-gradient(135deg, ${exp.color}, ${exp.color}88)`,
              boxShadow: `0 0 25px ${exp.color}50`,
              scale: smoothGlow,
            }}
          >
            <Icon size={20} className="text-white" />
          </motion.div>
        </div>

        <div className={isLeft ? 'order-3' : 'order-3'}>
          {!isLeft && (
            <motion.div
              whileHover={{ y: -5, scale: 1.015 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl relative group cursor-default gradient-border"
              style={{
                background: 'var(--color-card)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: `0 0 40px ${exp.color}15, inset 0 0 40px ${exp.color}05`,
                }}
              />
              <YearBadge year={exp.year} color={exp.color} />
              <h3
                className="text-lg md:text-xl font-bold mb-1 mt-2"
                style={{ color: 'var(--color-text)' }}
              >
                {exp.title}
              </h3>
              <h4
                className="text-sm font-medium mb-3"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {exp.company}
              </h4>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {exp.description}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const JourneyTimeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 40%'],
  });

  const lineHeight = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  const tipGlow = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const smoothTipGlow = useSpring(tipGlow, { stiffness: 100, damping: 30 });

  return (
    <SceneWrapper id="journey" glowColor="var(--color-accent-glow)" glowPosition="50% 0%">
      <ParallaxScene
        className="py-24 md:py-32 relative"
        style={{ background: 'var(--color-surface)' }}
      >
        {/* DEPTH 0.05 — dotted blueprint grid */}
        <ParallaxLayer depth={0.05} blur="far">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(var(--color-accent-rgb), 0.18) 1px, transparent 0)',
              backgroundSize: '32px 32px',
              opacity: 0.35,
            }}
          />
        </ParallaxLayer>

        {/* DEPTH 0.15 — atmospheric mesh */}
        <ParallaxLayer depth={0.15} blur="far">
          <div
            className="absolute top-[5%] right-[-10%] w-[50vw] h-[50vw] rounded-full"
            style={{
              background: 'radial-gradient(circle, var(--color-gradient-mid), transparent 70%)',
              opacity: 0.18,
            }}
          />
          <div
            className="absolute bottom-[10%] left-[-15%] w-[40vw] h-[40vw] rounded-full"
            style={{
              background:
                'radial-gradient(circle, var(--color-gradient-end), transparent 70%)',
              opacity: 0.12,
            }}
          />
        </ParallaxLayer>

        <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: ease.cinematic }}
            className="text-center mb-16 md:mb-24"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-sm font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ color: 'var(--color-accent)' }}
            >
              My Journey
            </motion.span>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5"
              style={{ color: 'var(--color-text)' }}
            >
              How I Got <span className="text-gradient">Here</span>
            </h2>
            <p
              className="max-w-2xl mx-auto text-lg leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              From self-taught beginnings to a CS+AI degree — a journey of continuous learning,
              anchored in real projects and experiments.
            </p>
          </motion.div>

          <div className="relative">
            <div
              className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-full rounded-full"
              style={{ background: 'var(--color-border)' }}
            />

            <motion.div
              style={{ scaleY: lineHeight, transformOrigin: 'top' }}
              className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-full rounded-full"
            >
              <div
                className="w-full h-full rounded-full glow-line"
                style={{
                  background:
                    'linear-gradient(180deg, var(--color-gradient-start), var(--color-gradient-mid), var(--color-gradient-end))',
                }}
              />
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                style={{
                  background: 'var(--color-accent)',
                  boxShadow: '0 0 15px var(--color-accent-glow)',
                  opacity: smoothTipGlow,
                }}
              />
            </motion.div>

            {experience.map((exp, index) => (
              <TimelineItem
                key={index}
                exp={exp}
                index={index}
                total={experience.length}
                scrollProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </ParallaxScene>
    </SceneWrapper>
  );
};

export default JourneyTimeline;
