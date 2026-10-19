import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import ParticleField from '../Motion/ParticleField';
import ParallaxScene from '../Motion/ParallaxScene';
import ParallaxLayer from '../Motion/ParallaxLayer';
import HlsVideo from '../UI/HlsVideo';
import PillButton from '../UI/PillButton';
import useSectionNav from '../../hooks/useSectionNav';
import { profile } from '../../data/portfolio';

const useKathmanduTime = () => {
  const format = () =>
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kathmandu',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
};

const HeroStory = ({ ready = true }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const time = useKathmanduTime();
  const goTo = useSectionNav();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const midY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '55%']);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const rotateX = useTransform(scrollYProgress, [0, 0.4], [0, 8]);
  const sRotateX = useSpring(rotateX, { stiffness: 80, damping: 25 });

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % profile.roles.length), 2000);
    return () => clearInterval(id);
  }, []);

  useLayoutEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.name-reveal', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }).fromTo(
        '.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1, clearProps: 'filter' },
        0.3
      );
    }, contentRef);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section id="home" className="relative">
      <ParallaxScene
        ref={containerRef}
        perspective={1200}
        intensity={1}
        className="relative h-screen min-h-[640px] w-full flex items-center justify-center overflow-hidden bg-bg"
      >
        {/* DEEP BACKGROUND — streaming video, drifts with scroll + cursor */}
        <ParallaxLayer depth={0.06} tilt={false} blur="sharp">
          <motion.div style={{ y: videoY, scale: 1.08 }} className="absolute inset-0 overflow-hidden">
            <HlsVideo />
          </motion.div>
        </ParallaxLayer>
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        <ParticleField count={24} />

        {/* MIDGROUND — thin geometric outlines */}
        <ParallaxLayer depth={0.3} blur="mid">
          <motion.div style={{ y: midY }} className="absolute inset-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute top-[18%] right-[14%] w-24 h-24 rounded-full border border-white/10"
            >
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full accent-gradient" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-[24%] left-[10%] w-32 h-32 rounded-full border border-dashed border-white/10"
            />
            <motion.div
              animate={{ y: [0, -25, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[58%] right-[26%] w-1.5 h-1.5 rounded-full bg-white/30"
            />
            <motion.div
              animate={{ y: [0, 18, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[30%] left-[22%] w-1 h-1 rounded-full bg-white/40"
            />
          </motion.div>
        </ParallaxLayer>

        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent pointer-events-none" />

        {/* CONTENT — minimal drift, no tilt for readability */}
        <ParallaxLayer
          depth={0.05}
          tilt={false}
          blur="sharp"
          style={{ position: 'relative', inset: 'auto', pointerEvents: 'auto' }}
          className="z-10"
        >
          <motion.div
            ref={contentRef}
            style={{ y: textY, opacity, scale, rotateX: sRotateX, transformPerspective: 1200 }}
            className="relative flex flex-col items-center text-center px-6"
          >
            <span className="blur-in opacity-0 text-xs text-muted uppercase tracking-[0.3em] mb-8">
              Portfolio &rsquo;26
            </span>

            <h1 className="name-reveal opacity-0 text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
              {profile.name}
            </h1>

            <p className="blur-in opacity-0 text-base md:text-xl text-text-primary/80 mb-4">
              <span
                key={roleIndex}
                className="font-display italic text-text-primary animate-role-fade-in inline-block text-xl md:text-2xl"
              >
                {profile.roles[roleIndex]}
              </span>{' '}
              developer, building from {profile.location}.
            </p>

            <p className="blur-in opacity-0 text-sm md:text-base text-muted max-w-md mb-12 leading-relaxed">
              {profile.intro}
            </p>

            <div className="blur-in opacity-0 inline-flex flex-wrap justify-center gap-4">
              <PillButton
                as="button"
                variant="solid"
                onClick={() => goTo('work')}
              >
                See Works
              </PillButton>
              <PillButton
                as="button"
                variant="outline"
                onClick={() => goTo('contact')}
              >
                Reach out...
              </PillButton>
            </div>
          </motion.div>
        </ParallaxLayer>

        {/* Editorial corners */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex absolute bottom-10 left-10 z-10 items-center gap-3"
        >
          <span className="relative">
            <img
              src={profile.photo}
              alt={profile.name}
              loading="eager"
              className="w-10 h-10 rounded-full object-cover border border-white/15"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-bg" />
          </span>
          <span className="flex flex-col text-left">
            <span className="text-xs text-text-primary">{profile.headline}</span>
            <span className="text-[11px] text-muted">Open to internships & freelance</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex absolute bottom-10 right-10 z-10 flex-col items-end text-right"
        >
          <span className="text-[11px] text-muted uppercase tracking-[0.2em]">Kathmandu, NP</span>
          <span className="font-display italic text-2xl text-text-primary tabular-nums">{time}</span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <span className="text-xs text-muted uppercase tracking-[0.2em]">Scroll</span>
          <span className="relative w-px h-10 bg-stroke overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-1/2 bg-text-primary/80 animate-scroll-down" />
          </span>
        </motion.div>
      </ParallaxScene>
    </section>
  );
};

export default HeroStory;
