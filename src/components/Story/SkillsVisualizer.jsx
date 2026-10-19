import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SceneWrapper from '../Motion/SceneWrapper';
import ParallaxScene from '../Motion/ParallaxScene';
import ParallaxLayer from '../Motion/ParallaxLayer';
import SectionHeader from '../UI/SectionHeader';
import { skillCategories } from '../../data/portfolio';

// Bento rhythm on a 6-col grid: two wide, three narrow
const SPANS = ['lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2'];

const TIERS = {
  daily: { dots: 3, label: 'Daily driver' },
  comfortable: { dots: 2, label: 'Comfortable' },
  learning: { dots: 1, label: 'Learning' },
};

const TierDots = ({ tier }) => (
  <span className="flex gap-0.5" aria-hidden="true">
    {[0, 1, 2].map((i) => (
      <span key={i} className={`w-1 h-1 rounded-full ${i < TIERS[tier].dots ? 'accent-gradient' : 'bg-stroke'}`} />
    ))}
  </span>
);

const SkillCard = ({ category, index }) => {
  const Icon = category.icon;
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 25 });
  const sy = useSpring(y, { stiffness: 200, damping: 25 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(sx, [-0.5, 0.5], ['-5deg', '5deg']);

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
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className={`md:col-span-1 ${SPANS[index]}`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className="group relative h-full rounded-3xl bg-surface/60 hover:bg-surface border border-stroke p-6 md:p-7 transition-colors gradient-border"
      >
        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <span className="w-11 h-11 rounded-full border border-stroke flex items-center justify-center text-text-primary">
              <Icon size={18} strokeWidth={1.5} />
            </span>
            <span className="font-display italic text-3xl text-muted/60 tabular-nums">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <h3 className="text-2xl font-display italic text-text-primary mb-5">{category.title}</h3>

          <div className="flex flex-wrap gap-2 min-h-[5.5rem]">
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
                title={TIERS[skill.tier].label}
                className="px-3 py-1.5 rounded-full text-xs bg-bg border border-stroke text-text-primary select-none flex items-center gap-2 cursor-grab active:cursor-grabbing hover:border-white/20"
                style={{ touchAction: 'none' }}
              >
                <span>{skill.name}</span>
                <TierDots tier={skill.tier} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SkillsVisualizer = () => (
  <SceneWrapper id="skills" className="bg-bg">
    <ParallaxScene className="py-16 md:py-24 relative">
      {/* DEPTH 0.25 — scattered geometric outlines */}
      <ParallaxLayer depth={0.25} blur="mid">
        <div className="absolute top-[18%] left-[8%] w-16 h-16 rounded-full border border-white/5" />
        <div className="absolute top-[12%] right-[12%] w-10 h-10 rotate-12 border border-white/5" />
        <div className="absolute bottom-[16%] left-[20%] w-8 h-8 rounded-full border border-white/5" />
        <div className="absolute bottom-[22%] right-[16%] w-12 h-12 -rotate-6 border border-white/5" />
        <div className="absolute top-[46%] left-[52%] w-20 h-20 rounded-full border border-white/[0.04]" />
      </ParallaxLayer>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Technical Arsenal"
          title={
            <>
              Craft & <em>expertise</em>
            </>
          }
          subtitle="A toolkit shaped by self-taught experiments and years of solving real-world problems — drag the chips around to feel them respond."
          action={
            <div className="flex items-center gap-5 text-[11px] uppercase tracking-[0.2em] text-muted">
              {Object.entries(TIERS).map(([tier, { label }]) => (
                <span key={tier} className="flex items-center gap-2">
                  <TierDots tier={tier} />
                  {label}
                </span>
              ))}
            </div>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 md:gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </ParallaxScene>
  </SceneWrapper>
);

export default SkillsVisualizer;
