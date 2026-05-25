"use client";

import { useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafCallbackRef = useRef<gsap.TickerCallback | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      // Higher duration = slower, more cinematic deceleration
      duration: 1.8,
      // Smooth exponential easing for buttery feel
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Lower lerp = smoother interpolation (0.05–0.1 range is ultra-smooth)
      lerp: 0.06,
      // Smooth wheel scrolling
      smoothWheel: true,
      // Reduce wheel speed for more cinematic pacing
      wheelMultiplier: 0.8,
      // Touch settings
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll events to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Create the RAF callback and store reference for cleanup
    const rafCallback: gsap.TickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    rafCallbackRef.current = rafCallback;

    gsap.ticker.add(rafCallback);
    // Disable lag smoothing so GSAP never skips frames
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (rafCallbackRef.current) {
        gsap.ticker.remove(rafCallbackRef.current);
      }
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
