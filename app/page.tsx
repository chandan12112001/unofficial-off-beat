"use client"
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from '../src/components/Loader';
import CustomCursor from '../src/components/CustomCursor';
// import SmoothScroll from '../src/components/SmoothScroll';
import Navigation from '../src/components/Navigation';
import HeroSection from '../src/components/HeroSection';
import MarqueeStrip from '../src/components/MarqueeStrip';
import AboutSection from '../src/components/AboutSection';
import BuildersSection from '../src/components/BuildersSection';
import PhilosophySection from '../src/components/PhilosophySection';
import CTASection from '../src/components/CTASection';
import Footer from '../src/components/Footer';
import { useImagePreloader } from "@/src/hooks/useImagePreloader";
import SmoothScroll from "../src/components/SmoothScroll";
import ScrollSequence from "../src/components/ScrollSequence";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const { images, progress, isReady } = useImagePreloader({
    totalFrames: 300,
    basePath: "/scrolling-webapp",  // → public/sequence/00001.png–00300.png
    batchSize: 20,
    priorityFrames: 30,
  });

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
          <div style={{ background: '#080808', overflowX: 'clip' }}>
            <Navigation />
            <HeroSection />
            <MarqueeStrip />
            <ScrollSequence
              images={images}
              totalFrames={300}
              isReady={isReady}
            />
            <BuildersSection />
            <AboutSection />
            <PhilosophySection />
            <CTASection />
            <Footer />
          </div>
        </SmoothScroll>
      )}
    </>
  );
}
