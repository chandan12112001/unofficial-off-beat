import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import MarqueeStrip from './components/MarqueeStrip';
import AboutSection from './components/AboutSection';
import BuildersSection from './components/BuildersSection';
import PhilosophySection from './components/PhilosophySection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <>
      {/* Noise grain overlay */}
      <div className="noise-overlay" />

      {/* Custom cursor (desktop only) */}
      {!isMobile && <CustomCursor />}

      {/* Loader */}
      <AnimatePresence mode="wait">
        {loading && (
          <Loader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main content */}
      {!loading && (
        <SmoothScroll>
          <div style={{ background: '#080808', overflowX: 'hidden' }}>
            <Navigation />
            <HeroSection />
            <MarqueeStrip />
            <AboutSection />
            <BuildersSection />
            <PhilosophySection />
            <CTASection />
            <Footer />
          </div>
        </SmoothScroll>
      )}
    </>
  );
}
