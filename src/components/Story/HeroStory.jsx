import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { RevealChars } from '../Motion/RevealText';
import ParticleField from '../Motion/ParticleField';

const HeroStory = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Multi-layer parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const midY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const fgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const orbitRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* ═══ BACKGROUND LAYER ═══ */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-[10%] right-[10%] w-[30vw] h-[30vw] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, var(--color-gradient-start), transparent 70%)' }} />
        <div className="absolute bottom-[15%] left-[5%] w-[40vw] h-[40vw] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, var(--color-gradient-end), transparent 70%)' }} />
        <div className="absolute top-[40%] left-[50%] w-[25vw] h-[25vw] rounded-full opacity-15 -translate-x-1/2"
          style={{ background: 'radial-gradient(circle, var(--color-gradient-mid), transparent 70%)' }} />
      </motion.div>

      {/* ═══ PARTICLE FIELD ═══ */}
      <ParticleField count={25} />

      {/* ═══ MIDGROUND LAYER — Geometric shapes ═══ */}
      <motion.div style={{ y: midY }} className="absolute inset-0 pointer-events-none">
        {/* Floating geometric elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[20%] w-16 h-16 border border-indigo-300/20 dark:border-indigo-500/20 rounded-lg"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[30%] left-[15%] w-24 h-24 border border-purple-300/15 dark:border-purple-500/15 rounded-full"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[60%] right-[30%] w-3 h-3 rounded-full"
          style={{ background: 'var(--color-accent)', opacity: 0.3 }}
        />
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[25%] w-2 h-2 rounded-full"
          style={{ background: 'var(--color-gradient-end)', opacity: 0.4 }}
        />
      </motion.div>

      {/* ═══ FOREGROUND CONTENT ═══ */}
      <motion.div
        style={{ y: textY, opacity, scale }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Profile image with orbital ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative inline-block mb-10"
        >
          {/* Orbital ring */}
          <motion.div
            style={{ rotate: orbitRotate, borderColor: 'var(--color-accent-glow)' }}
            className="absolute -inset-4 rounded-full border border-dashed"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full glow-accent"
              style={{ background: 'var(--color-accent)' }} />
          </motion.div>

          {/* Profile image */}
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ring-2 ring-offset-4 ring-offset-transparent shadow-2xl"
            style={{ 
              ringColor: 'var(--color-accent-glow)',
              boxShadow: '0 0 40px var(--color-accent-glow)'
            }}>
            <img src="/profile_img.png" alt="Bhuwan Joshi" className="w-full h-full object-cover" />
          </div>

          {/* Status indicator */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 300 }}
            className="absolute bottom-1 right-1 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold text-white"
            style={{ background: '#22c55e', boxShadow: '0 0 12px rgba(34, 197, 94, 0.5)' }}
          >
            <Sparkles size={10} /> Open
          </motion.div>
        </motion.div>

        {/* Name with character reveal */}
        <div className="mb-4">
          <RevealChars
            text="Bhuwan Joshi"
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            delay={0.3}
          />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-xl md:text-2xl font-medium mb-6 text-gradient"
        >
          Full Stack Developer & Architect
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-10"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Crafting scalable web applications and cross-platform mobile experiences.
          Specializing in modern tech stacks to bridge the gap between complex engineering and elegant design.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative px-8 py-3.5 rounded-full font-semibold text-white overflow-hidden transition-transform hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end))' }}
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'linear-gradient(135deg, var(--color-gradient-end), var(--color-gradient-start))' }} />
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95 glass"
            style={{ color: 'var(--color-text)' }}
          >
            Get In Touch
          </a>
        </motion.div>
      </motion.div>

      {/* ═══ SCROLL INDICATOR ═══ */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-xs font-medium tracking-widest uppercase"
          style={{ color: 'var(--color-text-secondary)' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} style={{ color: 'var(--color-accent)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroStory;
