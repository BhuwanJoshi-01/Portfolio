import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingScreen from '../components/Site/LoadingScreen';
import HeroStory from '../components/Story/HeroStory';
import ProjectShowcase from '../components/Story/ProjectShowcase';
import Manifesto from '../components/Site/Manifesto';
import Experience from '../components/Story/Experience';
import JourneyTimeline from '../components/Story/JourneyTimeline';
import SkillsVisualizer from '../components/Story/SkillsVisualizer';
import Explorations from '../components/Site/Explorations';
import Stats from '../components/Site/Stats';
import ContactStory from '../components/Story/ContactStory';

// The intro loader plays once per visit, not on every return from /resume
let hasLoaded = false;

const Index = () => {
  const [isLoading, setIsLoading] = useState(!hasLoaded);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;
    ScrollTrigger.refresh();
    const target = location.state?.scrollTo || location.hash.replace('#', '');
    if (!target || target === 'home') {
      window.scrollTo(0, 0);
      return;
    }
    const id = requestAnimationFrame(() =>
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
    );
    return () => cancelAnimationFrame(id);
  }, [isLoading, location.state, location.hash]);

  const finishLoading = () => {
    hasLoaded = true;
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence>{isLoading && <LoadingScreen onComplete={finishLoading} />}</AnimatePresence>
      <HeroStory ready={!isLoading} />
      <ProjectShowcase />
      <Manifesto />
      <Experience />
      <JourneyTimeline />
      <SkillsVisualizer />
      <Explorations />
      <Stats />
      <ContactStory />
    </>
  );
};

export default Index;
