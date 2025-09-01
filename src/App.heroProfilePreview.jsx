import React from 'react';
import { ThemeProvider } from './context/ThemeContext.jsx';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import CursorFollower from './components/CursorFollower/CursorFollower';
import ParallaxSection from './components/ParallaxSection/ParallaxSection';
import FloatingElements from './components/FloatingElements/FloatingElements';
import './styles/global.css';
import './styles/theme.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <FloatingElements density="medium" />
        <CursorFollower />
        <Navigation />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;