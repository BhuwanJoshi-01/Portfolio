import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Globe, Server, Database, Smartphone, Wrench } from 'lucide-react';
import SceneWrapper from '../Motion/SceneWrapper';
import ParallaxScene from '../Motion/ParallaxScene';
import ParallaxLayer from '../Motion/ParallaxLayer';
import { ease } from '../../hooks/useMotionConfig';

const skillCategories = [
  {
    title: 'Frontend & UI',
    icon: Globe,
    color: '#6366f1',
    skills: [
      { name: 'React', tier: 'daily' },
      { name: 'TypeScript', tier: 'comfortable' },
      { name: 'Tailwind CSS', tier: 'daily' },
      { name: 'Framer Motion', tier: 'comfortable' },
      { name: 'HTML5/CSS3', tier: 'daily' },
      { name: 'Next.js', tier: 'learning' },
    ],
  },
  {
    title: 'Backend & API',
    icon: Server,
    color: '#8b5cf6',
    skills: [
      { name: 'Node.js', tier: 'daily' },
      { name: 'Express', tier: 'comfortable' },
      { name: 'Django', tier: 'comfortable' },
      { name: 'REST APIs', tier: 'daily' },
      { name: 'GraphQL', tier: 'learning' },
    ],
  },
  {
    title: 'Database & Cloud',
    icon: Database,
    color: '#a855f7',
    skills: [
      { name: 'PostgreSQL', tier: 'comfortable' },
      { name: 'Firebase', tier: 'daily' },
      { name: 'Redis', tier: 'comfortable' },
      { name: 'MongoDB', tier: 'learning' },
      { name: 'Docker', tier: 'learning' },
    ],
  },
  {
    title: 'Mobile & AI',
    icon: Smartphone,
    color: '#c084fc',
    skills: [
      { name: 'React Native', tier: 'daily' },
      { name: 'Expo', tier: 'comfortable' },
      { name: 'TensorFlow', tier: 'learning' },
      { name: 'Linear Algebra for AI', tier: 'comfortable' },
    ],
  },
  {
    title: 'Tools & CS Foundations',
    icon: Wrench,
    color: '#e879f9',
    skills: [
      { name: 'Git', tier: 'daily' },
      { name: 'Linux', tier: 'comfortable' },
      { name: 'DSA', tier: 'comfortable' },
      { name: 'GitHub Actions', tier: 'learning' },
      { name: 'Jest', tier: 'learning' },
    ],
  },
];

const tierLabel = (tier) =>
  tier === 'daily' ? '●●●' : tier === 'comfortable' ? '●●' : '●';
const tierTitle = (tier) =>
  tier === 'daily' ? 'Daily driver' : tier === 'comfortable' ? 'Comfortable' : 'Learning';

const SkillCard = ({ category, index }) => {
  const Icon = category.icon;
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

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
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: ease.cinematic }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative p-6 rounded-2xl overflow-hidden gradient-border h-full"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
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
            boxShadow: `inset 0 0 50px ${category.color}08, 0 0 40px ${category.color}10`,
          }}
        />

        <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${category.color}15` }}
            >
              <Icon size={20} style={{ color: category.color }} />
            </div>
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
              {category.title}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2 mb-5 min-h-[6rem]">
            {category.skills.map((skill) => (
              <motion.div
                key={skill.name}
                drag
                dragConstraints={cardRef}
                dragElastic={0.25}
                dragSnapToOrigin
                dragTransition={{ bounceStiffness: 500, bounceDamping: 18 }}
                whileTap={{ scale: 1.08, zIndex: 10 }}
                whileHover={{ scale: 1.04 }}
                title={tierTitle(skill.tier)}
                className="px-3 py-1.5 rounded-full text-xs font-medium glass select-none flex items-center gap-2 cursor-grab active:cursor-grabbing"
                style={{ touchAction: 'none', color: 'var(--color-text)' }}
              >
                <span>{skill.name}</span>
                <span
                  className="text-[10px] tracking-tight"
                  style={{ color: category.color }}
                >
                  {tierLabel(skill.tier)}
                </span>
              </motion.div>
            ))}
          </div>

          <div
            className="text-[10px] uppercase tracking-[0.15em] flex flex-wrap gap-x-3 gap-y-1 opacity-60"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <span>●●● Daily</span>
            <span>●● Comfortable</span>
            <span>● Learning</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SkillsVisualizer = () => {
  return (
    <SceneWrapper
      id="skills"
      glowColor="rgba(var(--color-accent-rgb), 0.2)"
      glowPosition="80% 20%"
    >
      <ParallaxScene
        className="py-24 md:py-32 relative"
        style={{ background: 'var(--color-bg)' }}
      >
        {/* DEPTH 0.10 — corner radial orbs */}
        <ParallaxLayer depth={0.1} blur="far">
          <div
            className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full"
            style={{
              background:
                'radial-gradient(circle, var(--color-gradient-start), transparent 70%)',
              opacity: 0.14,
            }}
          />
          <div
            className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full"
            style={{
              background: 'radial-gradient(circle, var(--color-gradient-end), transparent 70%)',
              opacity: 0.14,
            }}
          />
        </ParallaxLayer>

        {/* DEPTH 0.25 — scattered geometric outlines */}
        <ParallaxLayer depth={0.25} blur="mid">
          <div
            className="absolute top-[20%] left-[12%] w-16 h-16 rounded-full"
            style={{ border: '1px solid rgba(var(--color-accent-rgb), 0.08)' }}
          />
          <div
            className="absolute top-[15%] right-[15%] w-10 h-10 rotate-12"
            style={{ border: '1px solid rgba(var(--color-accent-rgb), 0.08)' }}
          />
          <div
            className="absolute bottom-[18%] left-[22%] w-8 h-8 rounded-full"
            style={{ border: '1px solid rgba(var(--color-accent-rgb), 0.08)' }}
          />
          <div
            className="absolute bottom-[22%] right-[18%] w-12 h-12 -rotate-6"
            style={{ border: '1px solid rgba(var(--color-accent-rgb), 0.08)' }}
          />
          <div
            className="absolute top-[48%] left-[55%] w-20 h-20 rounded-full"
            style={{ border: '1px solid rgba(var(--color-accent-rgb), 0.06)' }}
          />
          <div
            className="absolute top-[35%] left-[42%] w-6 h-6 rotate-45"
            style={{ border: '1px solid rgba(var(--color-accent-rgb), 0.08)' }}
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
              Technical Arsenal
            </motion.span>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5"
              style={{ color: 'var(--color-text)' }}
            >
              Craft & <span className="text-gradient">Expertise</span>
            </h2>
            <p
              className="max-w-2xl mx-auto text-lg leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              A toolkit shaped by self-taught experiments and over years of solving real-world problems. — drag the chips around to feel them respond.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <SkillCard key={category.title} category={category} index={index} />
            ))}
          </div>
        </div>
      </ParallaxScene>
    </SceneWrapper>
  );
};

export default SkillsVisualizer;
