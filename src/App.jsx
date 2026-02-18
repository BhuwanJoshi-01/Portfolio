import React from 'react';
import Layout from './components/Layout/Layout';
import HeroStory from './components/Story/HeroStory';
import JourneyTimeline from './components/Story/JourneyTimeline';
import SkillsVisualizer from './components/Story/SkillsVisualizer';
import ProjectShowcase from './components/Story/ProjectShowcase';
import ContactStory from './components/Story/ContactStory';

const App = () => {
  return (
    <Layout>
      <HeroStory />
      <JourneyTimeline />
      <SkillsVisualizer />
      <ProjectShowcase />
      <ContactStory />
    </Layout>
  );
};

export default App;
