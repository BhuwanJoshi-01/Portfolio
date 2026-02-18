import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Globe, Server, Database, Smartphone, Wrench,
} from 'lucide-react';

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

const SkillBar = ({ name, level, color, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{name}</span>
        <span className="text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: delay * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            boxShadow: `0 0 8px ${color}40`,
          }}
        />
      </div>
    </div>
  );
};

const SkillCard = ({ category, index }) => {
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6 }}
      className="group relative p-6 rounded-2xl overflow-hidden"
      style={{
        background: 'var(--color-card)',
        border: '1px solid var(--color-border)',
      }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 40px ${category.color}08, 0 0 30px ${category.color}10` }} />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${category.color}15` }}>
          <Icon size={20} style={{ color: category.color }} />
        </div>
        <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
          {category.title}
        </h3>
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
    </motion.div>
  );
};

const SkillsVisualizer = () => {
  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 80% 20%, var(--color-accent-glow), transparent)',
          opacity: 0.15,
        }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            Technical Arsenal
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            Craft & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg" style={{ color: 'var(--color-text-secondary)' }}>
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
    </section>
  );
};

export default SkillsVisualizer;
