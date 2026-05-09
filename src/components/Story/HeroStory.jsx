import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { RevealChars } from '../Motion/RevealText';
import ParticleField from '../Motion/ParticleField';
import SceneWrapper from '../Motion/SceneWrapper';
import ParallaxScene from '../Motion/ParallaxScene';
import ParallaxLayer from '../Motion/ParallaxLayer';
import MagneticButton from '../Motion/MagneticButton';
import { ease } from '../../hooks/useMotionConfig';

const HeroStory = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const midY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);
  const rotateX = useTransform(scrollYProgress, [0, 0.4], [0, 8]);
  const sRotateX = useSpring(rotateX, { stiffness: 80, damping: 25 });

  return (
    <SceneWrapper id="home" isFirst glowColor="var(--color-accent-glow)" glowPosition="50% 30%">
      <ParallaxScene
        ref={containerRef}
        perspective={1200}
        intensity={1}
        className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden"
        style={{ background: 'var(--color-bg)' }}
      >
        {/* DEEP BACKGROUND — gradient orbs */}
        <ParallaxLayer depth={0.08} blur="far">
          <motion.div style={{ y: bgY }} className="absolute inset-0">
            <div
              className="absolute top-[5%] right-[5%] w-[35vw] h-[35vw] rounded-full"
              style={{
                background: 'radial-gradient(circle, var(--color-gradient-start), transparent 70%)',
                opacity: 0.25,
              }}
            />
            <div
              className="absolute bottom-[10%] left-[0%] w-[45vw] h-[45vw] rounded-full"
              style={{
                background: 'radial-gradient(circle, var(--color-gradient-end), transparent 70%)',
                opacity: 0.18,
              }}
            />
            <div
              className="absolute top-[35%] left-[45%] w-[30vw] h-[30vw] rounded-full -translate-x-1/2"
              style={{
                background: 'radial-gradient(circle, var(--color-gradient-mid), transparent 70%)',
                opacity: 0.12,
              }}
            />
          </motion.div>
        </ParallaxLayer>

        {/* PARTICLES — own animation, no parallax */}
        <ParticleField count={30} />

        {/* MIDGROUND — geometric shapes */}
        <ParallaxLayer depth={0.3} blur="mid">
          <motion.div style={{ y: midY }} className="absolute inset-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute top-[18%] right-[18%] w-20 h-20 rounded-lg"
              style={{ border: '1px solid rgba(var(--color-accent-rgb), 0.1)' }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-[25%] left-[12%] w-28 h-28 rounded-full"
              style={{ border: '1px solid rgba(var(--color-accent-rgb), 0.08)' }}
            />
            <motion.div
              animate={{ y: [0, -25, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[55%] right-[28%] w-2 h-2 rounded-full"
              style={{ background: 'var(--color-accent)', opacity: 0.25 }}
            />
            <motion.div
              animate={{ y: [0, 18, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[28%] left-[22%] w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--color-gradient-end)', opacity: 0.35 }}
            />
            <motion.div
              animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-[40%] right-[12%] w-1 h-1 rounded-full"
              style={{ background: 'var(--color-gradient-mid)', opacity: 0.3 }}
            />
          </motion.div>
        </ParallaxLayer>

        {/* CONTENT — minimal drift, no tilt for readability */}
        <ParallaxLayer
          depth={0.05}
          tilt={false}
          blur="sharp"
          style={{ position: 'relative', inset: 'auto', pointerEvents: 'auto' }}
          className="z-10"
        >
          <motion.div
            style={{
              y: textY,
              opacity,
              scale,
              rotateX: sRotateX,
              transformPerspective: 1200,
            }}
            className="relative text-center px-4 max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: ease.smoothOut }}
              className="relative inline-block mb-10"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-5 rounded-full"
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ border: '1px dashed rgba(var(--color-accent-rgb), 0.2)' }}
                />
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full glow-accent"
                  style={{ background: 'var(--color-accent)' }}
                />
              </motion.div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-3 rounded-full"
                style={{ border: '1px solid rgba(var(--color-accent-rgb), 0.08)' }}
              />
              <div
                className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden shadow-2xl"
                style={{
                  boxShadow: '0 0 50px var(--color-accent-glow), 0 25px 50px rgba(0,0,0,0.3)',
                  border: '2px solid rgba(var(--color-accent-rgb), 0.15)',
                }}
              >
                <img
                  src="/profile_picture.png"
                  alt="Bhuwan Joshi"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.5, type: 'spring', stiffness: 300 }}
                className="absolute -bottom-1 -right-1 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold text-white tracking-wide"
                style={{
                  background: '#22c55e',
                  boxShadow: '0 0 16px rgba(34, 197, 94, 0.5)',
                }}
              >
                <Sparkles size={10} /> OPEN
              </motion.div>
            </motion.div>

            <div className="mb-5">
              <RevealChars
                text="Bhuwan Joshi"
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
                delay={0.4}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1, ease: ease.cinematic }}
              className="mb-6"
            >
              <span
                className="text-xl md:text-2xl lg:text-3xl font-semibold text-gradient"
                style={{ textShadow: '0 0 40px var(--color-accent-glow)' }}
              >
                Full Stack Developer · React Native + Web
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.9, ease: ease.cinematic }}
              className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-12"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Crafting scalable web applications and cross-platform mobile experiences with
              React, TypeScript, and modern full-stack architectures.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8, ease: ease.cinematic }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <MagneticButton
                as="a"
                href="#projects"
                className="group relative px-8 py-4 rounded-full font-semibold text-white overflow-hidden btn-magnetic"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end))',
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    →
                  </motion.span>
                </span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--color-gradient-end), var(--color-gradient-start))',
                  }}
                />
              </MagneticButton>
              <MagneticButton
                as="a"
                href="#contact"
                strength={0.4}
                className="px-8 py-4 rounded-full font-semibold transition-colors duration-300 glass gradient-border btn-magnetic"
                style={{ color: 'var(--color-text)' }}
              >
                Get In Touch
              </MagneticButton>
            </motion.div>
          </motion.div>
        </ParallaxLayer>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <span
            className="text-[10px] font-semibold tracking-[0.3em] uppercase"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Scroll to explore
          </span>
          <div
            className="w-6 h-10 rounded-full flex justify-center pt-2"
            style={{ border: '2px solid var(--color-border)' }}
          >
            <div
              className="w-1 h-2.5 rounded-full scroll-indicator-dot"
              style={{ background: 'var(--color-accent)' }}
            />
          </div>
        </motion.div>
      </ParallaxScene>
    </SceneWrapper>
  );
};

export default HeroStory;
