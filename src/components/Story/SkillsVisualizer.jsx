import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Globe, Server, Database, Smartphone, Wrench } from 'lucide-react';
import SceneWrapper from '../Motion/SceneWrapper';
import { ease } from '../../hooks/useMotionConfig';

const skillCategories = [
  {
    title: "Frontend & UI",
    icon: Globe,
    color: "#6366f1",
    skills: [
      { name: "React", level: 95 },
      { name: "Vue.js", level: 80 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Framer Motion", level: 85 },
      { name: "HTML5/CSS3", level: 95 },
      { name: "Redux", level: 80 },
    ],
  },
  {
    title: "Backend & API",
    icon: Server,
    color: "#8b5cf6",
    skills: [
      { name: "Node.js", level: 92 },
      { name: "Express", level: 90 },
      { name: "NestJS", level: 82 },
      { name: "Django", level: 85 },
      { name: "FastAPI", level: 88 },
      { name: "GraphQL", level: 78 },
      { name: "REST APIs", level: 95 },
    ],
  },
  {
    title: "Database & Cloud",
    icon: Database,
    color: "#a855f7",
    skills: [
      { name: "PostgreSQL", level: 88 },
      { name: "MongoDB", level: 85 },
      { name: "Redis", level: 78 },
      { name: "AWS", level: 80 },
      { name: "Firebase", level: 88 },
      { name: "Docker", level: 82 },
      { name: "Kubernetes", level: 72 },
    ],
  },
  {
    title: "Mobile & AI",
    icon: Smartphone,
    color: "#c084fc",
    skills: [
      { name: "React Native", level: 88 },
      { name: "Expo", level: 85 },
      { name: "Flutter", level: 75 },
      { name: "TensorFlow", level: 68 },
      { name: "PyTorch", level: 65 },
    ],
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    color: "#e879f9",
    skills: [
      { name: "Git", level: 95 },
      { name: "GitHub Actions", level: 82 },
      { name: "Linux", level: 85 },
      { name: "Nginx", level: 78 },
      { name: "Jest", level: 80 },
      { name: "Playwright", level: 75 },
    ],
  },
];

/** Animated counter that counts up on reveal */
const AnimatedCounter = ({ value, color }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1200;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-xs font-mono tabular-nums" style={{ color }}>
      {count}%
    </span>
  );
};

const SkillBar = ({ name, level, color, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{name}</span>
        <AnimatedCounter value={level} color={color} />
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: delay * 0.06, ease: ease.smoothOut }}
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}aa)`,
            boxShadow: `0 0 10px ${color}30`,
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <motion.div
              animate={isInView ? { x: ['0%', '200%'] } : {}}
              transition={{ duration: 2, delay: delay * 0.06 + 0.8, ease: "easeInOut" }}
              className="absolute inset-y-0 -left-full w-1/2"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const SkillCard = ({ category, index }) => {
  const Icon = category.icon;
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  // Total level for this category
  const avgLevel = Math.round(category.skills.reduce((a, s) => a + s.level, 0) / category.skills.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: ease.cinematic }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative p-6 rounded-2xl overflow-hidden gradient-border h-full"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
      >
        {/* Card background */}
        <div className="absolute inset-0 rounded-2xl" style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }} />

        {/* Glow on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: `inset 0 0 50px ${category.color}08, 0 0 40px ${category.color}10` }} />

        {/* Content */}
        <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${category.color}15` }}>
                <Icon size={20} style={{ color: category.color }} />
              </div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                {category.title}
              </h3>
            </div>
            {/* Average badge */}
            <div className="px-2.5 py-1 rounded-full text-[10px] font-bold"
              style={{ background: `${category.color}15`, color: category.color }}>
              AVG {avgLevel}%
            </div>
          </div>

          {/* Skill bars */}
          {category.skills.map((skill, i) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              level={skill.level}
              color={category.color}
              delay={i}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const SkillsVisualizer = () => {
  return (
    <SceneWrapper id="skills" glowColor="rgba(var(--color-accent-rgb), 0.2)" glowPosition="80% 20%">
      <div className="py-24 md:py-32 relative" style={{ background: 'var(--color-bg)' }}>
        <div className="container mx-auto px-4 relative z-10">
          {/* Section header */}
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
              Technical Arsenal
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5" style={{ color: 'var(--color-text)' }}>
              Craft & <span className="text-gradient">Expertise</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              A comprehensive toolkit built over years of solving real-world problems.
            </p>
          </motion.div>

          {/* Skills grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <SkillCard key={category.title} category={category} index={index} />
            ))}
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
};

export default SkillsVisualizer;
