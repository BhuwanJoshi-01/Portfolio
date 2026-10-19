import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useSectionNav from '../../hooks/useSectionNav';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4';
const FADE = 0.5; // seconds

/**
 * Video that loops manually with a 0.5s fade-in at the start and a
 * 0.5s fade-out before the end. Only loads + ticks while near the viewport.
 */
const FadeLoopVideo = ({ active }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !active) return;

    if (!video.src) video.src = VIDEO_SRC;
    video.play().catch(() => {});

    let raf;
    let restartTimer;
    const tick = () => {
      const { currentTime: t, duration: d } = video;
      if (d && !Number.isNaN(d)) {
        let opacity = 1;
        if (t < FADE) opacity = t / FADE;
        else if (d - t < FADE) opacity = Math.max(0, (d - t) / FADE);
        video.style.opacity = String(opacity);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onEnded = () => {
      video.style.opacity = '0';
      restartTimer = setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
      }, 100);
    };
    video.addEventListener('ended', onEnded);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(restartTimer);
      video.removeEventListener('ended', onEnded);
      video.pause();
    };
  }, [active]);

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      preload="none"
      aria-hidden="true"
      className="w-full h-full object-cover"
      style={{ opacity: 0 }}
    />
  );
};

const Manifesto = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [nearby, setNearby] = useState(false);
  const goTo = useSectionNav();

  // The white panel opens from an inset card to full-bleed as it scrolls in
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'start start'] });
  const inset = useTransform(scrollYProgress, [0, 1], [6, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const clipPath = useTransform([inset, radius], ([i, r]) => `inset(0% ${i}% round ${r}px)`);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const reveal = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.25 });
    const proximity = new IntersectionObserver(([e]) => setNearby(e.isIntersecting), { rootMargin: '300px' });
    reveal.observe(node);
    proximity.observe(node);
    return () => {
      reveal.disconnect();
      proximity.disconnect();
    };
  }, []);

  return (
    <section id="manifesto" ref={sectionRef} className="relative bg-bg">
      <motion.div
        style={{ clipPath }}
        className={`relative min-h-screen w-full overflow-hidden bg-white flex items-center justify-center ${visible ? 'is-visible' : ''}`}
      >
        {/* Background video layer */}
        <div className="absolute z-0" style={{ top: '300px', left: 0, right: 0, bottom: 0 }}>
          <FadeLoopVideo active={nearby} />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        </div>

        {/* Statement */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-28">
          <h2
            className="fade-rise font-display font-normal text-5xl sm:text-7xl md:text-8xl max-w-7xl text-black"
            style={{ lineHeight: 0.95, letterSpacing: '-2.46px' }}
          >
            Beyond <em className="text-[#6F6F6F]">the noise,</em> I build <em className="text-[#6F6F6F]">what lasts.</em>
          </h2>
          <p className="fade-rise-delay text-base sm:text-lg max-w-2xl mt-8 leading-relaxed text-[#6F6F6F]">
            Building platforms for curious learners, fearless makers, and thoughtful teams. Through the noise, I craft
            calm, fast software — from the database schema to the last pixel.
          </p>
          <button
            onClick={() => goTo('journey')}
            className="fade-rise-delay-2 rounded-full px-14 py-5 text-base mt-12 bg-black text-white hover:scale-[1.03] transition-transform"
          >
            Begin Journey
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Manifesto;
