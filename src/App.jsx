import React from 'react';
import Layout from './components/Layout/Layout';
import HeroStory from './components/Story/HeroStory';
import JourneyTimeline from './components/Story/JourneyTimeline';
import SkillsVisualizer from './components/Story/SkillsVisualizer';
import ProjectShowcase from './components/Story/ProjectShowcase';
import ContactStory from './components/Story/ContactStory';
import SectionTransition from './components/Motion/SectionTransition';

const App = () => {
  return (
    <Layout>
      <HeroStory />
      <SectionTransition />
      <JourneyTimeline />
      <SectionTransition flip />
      <SkillsVisualizer />
      <SectionTransition />
      <ProjectShowcase />
      <SectionTransition flip />
      <ContactStory />
    </Layout>
  );
};

export default App;
