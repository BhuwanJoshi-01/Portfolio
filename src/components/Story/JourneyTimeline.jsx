import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Briefcase, GraduationCap, Rocket, Code2, Cloud, Smartphone } from 'lucide-react';

const experience = [
  {
    year: '2025 - Present',
    title: 'Mobile & Advanced Server-Side Development',
    company: 'Independent / Contract',
    description: 'Developing cross-platform mobile applications using React Native, Expo, and Flutter. Implementing advanced server-side architectures with microservices, real-time communication (WebSockets, WebRTC), and AI/ML integrations.',
    icon: Smartphone,
    color: '#6366f1',
  },
  {
    year: '2023 - 2025',
    title: 'Full-Stack & Cloud Projects',
    company: 'Freelance / Open Source',
    description: 'Built comprehensive full-stack applications combining modern frontend frameworks with robust backend APIs. Leveraged cloud platforms (AWS, GCP, Firebase) and DevOps practices for scalable deployments.',
    icon: Rocket,
    color: '#8b5cf6',
  },
  {
    year: '2022',
    title: 'Cloud & DevOps Engineering',
    company: 'Learning & Projects',
    description: 'Mastered cloud infrastructure across AWS, GCP, and Azure. Implemented CI/CD pipelines, containerization with Docker/Kubernetes, and monitoring with Sentry.',
    icon: Cloud,
    color: '#a855f7',
  },
  {
    year: '2021',
    title: 'Advanced Backend & Databases',
    company: 'Self-Directed',
    description: 'Designed and optimized database architectures using PostgreSQL, MySQL, MongoDB, and Redis. Implemented authentication systems with JWT, OAuth, and session management.',
    icon: Briefcase,
    color: '#c084fc',
  },
  {
    year: '2020',
    title: 'Backend API Development',
    company: 'Self-Directed',
    description: 'Created scalable REST APIs and GraphQL services using Node.js, Python (Django, FastAPI), and various authentication frameworks.',
    icon: Code2,
    color: '#e879f9',
  },
  {
    year: '2019',
    title: 'Frontend Development',
    company: 'Start of Journey',
    description: 'Built responsive, interactive user interfaces using React, Vue.js, HTML5, CSS3, and modern CSS frameworks like Tailwind CSS.',
    icon: GraduationCap,
    color: '#f0abfc',
  },
];

const TimelineItem = ({ exp, index, total }) => {
  const ref = useRef(null);
  const isLeft = index % 2 === 0;
  const Icon = exp.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
      className="mb-12 md:mb-16"
    >
      {/* Mobile layout */}
      <div className="md:hidden flex gap-4">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${exp.color}, ${exp.color}88)`,
              boxShadow: `0 0 15px ${exp.color}40`,
            }}>
            <Icon size={16} className="text-white" />
          </div>
          {index < total - 1 && (
            <div className="w-[2px] flex-1 mt-3" style={{ background: 'var(--color-border)' }} />
          )}
        </div>
        <div className="pb-4 flex-1">
          <span className="text-sm font-bold tracking-wider uppercase mb-1 block" style={{ color: exp.color }}>
            {exp.year}
          </span>
          <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--color-text)' }}>
            {exp.title}
          </h3>
          <h4 className="text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
            {exp.company}
          </h4>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            {exp.description}
          </p>
        </div>
      </div>

      {/* Desktop layout — 3-column grid */}
      <div className="hidden md:grid" style={{ gridTemplateColumns: '1fr 60px 1fr', alignItems: 'start' }}>
        {/* Left column */}
        <div className={isLeft ? '' : 'order-1'}>
          {isLeft && (
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl relative group cursor-default text-right"
              style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: `0 0 30px ${exp.color}15, inset 0 0 30px ${exp.color}05` }} />
              <span className="text-sm font-bold tracking-wider uppercase mb-2 block" style={{ color: exp.color }}>{exp.year}</span>
              <h3 className="text-lg md:text-xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>{exp.title}</h3>
              <h4 className="text-sm font-medium mb-3" style={{ color: 'var(--color-text-secondary)' }}>{exp.company}</h4>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{exp.description}</p>
            </motion.div>
          )}
        </div>

        {/* Center column — icon */}
        <div className="flex justify-center order-2">
          <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg shrink-0 relative z-20"
            style={{
              background: `linear-gradient(135deg, ${exp.color}, ${exp.color}88)`,
              boxShadow: `0 0 20px ${exp.color}40`,
            }}>
            <Icon size={20} className="text-white" />
          </div>
        </div>

        {/* Right column */}
        <div className={isLeft ? 'order-3' : 'order-3'}>
          {!isLeft && (
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl relative group cursor-default"
              style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: `0 0 30px ${exp.color}15, inset 0 0 30px ${exp.color}05` }} />
              <span className="text-sm font-bold tracking-wider uppercase mb-2 block" style={{ color: exp.color }}>{exp.year}</span>
              <h3 className="text-lg md:text-xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>{exp.title}</h3>
              <h4 className="text-sm font-medium mb-3" style={{ color: 'var(--color-text-secondary)' }}>{exp.company}</h4>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{exp.description}</p>
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
    offset: ["start 80%", "end 40%"],
  });

  const lineHeight = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <section id="journey" className="py-24 md:py-32 relative overflow-hidden" style={{ background: 'var(--color-surface)' }}>
      {/* Background radial spotlight */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 0%, var(--color-accent-glow), transparent)',
          opacity: 0.3,
        }} />

      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            My Journey
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            How I Got <span className="text-gradient">Here</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            From curious beginner to full-stack architect — a journey of continuous growth and relentless learning.
          </p>
        </motion.div>

        <div className="relative">
          {/* Static background line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-full rounded-full"
            style={{ background: 'var(--color-border)' }} />

          {/* Animated glowing line */}
          <motion.div
            style={{ scaleY: lineHeight, transformOrigin: 'top' }}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-full rounded-full glow-line"
            css={{ background: 'linear-gradient(180deg, var(--color-gradient-start), var(--color-gradient-mid), var(--color-gradient-end))' }}
          >
            <div className="w-full h-full rounded-full"
              style={{ background: 'linear-gradient(180deg, var(--color-gradient-start), var(--color-gradient-mid), var(--color-gradient-end))' }} />
          </motion.div>

          {/* Timeline items */}
          {experience.map((exp, index) => (
            <TimelineItem key={index} exp={exp} index={index} total={experience.length} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
