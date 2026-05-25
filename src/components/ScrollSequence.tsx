"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDebouncedResize } from "@/src/hooks/useDebouncedResize";

gsap.registerPlugin(ScrollTrigger);

const BG_COLOR = "#050507";

interface ScrollSequenceProps {
  images: React.MutableRefObject<HTMLImageElement[]>;
  totalFrames: number;
  isReady: boolean;
}

export default function ScrollSequence({
  images,
  totalFrames,
  isReady,
}: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationLoopRef = useRef<number | null>(null);
  const lastRenderedFrame = useRef(-1);
  const windowSize = useDebouncedResize();

  // ─── Canvas setup ─────────────────────────────────────────────────────────
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    // Recreate context each time dimensions change
    const ctx = canvas.getContext("2d", { alpha: false });
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      // Fill with background immediately so there is never a black flash
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, w, h);
      contextRef.current = ctx;
    }

    // Force re-render of current frame after resize
    lastRenderedFrame.current = -1;
  }, []);

  // ─── Render a single frame (cover-fit) ────────────────────────────────────
  const renderFrame = useCallback(
    (frameIndex: number) => {
      const ctx = contextRef.current;
      const canvas = canvasRef.current;
      if (!ctx || !canvas) return;

      const clamped = Math.max(0, Math.min(Math.round(frameIndex), totalFrames - 1));

      // Skip if already rendered this exact frame
      if (clamped === lastRenderedFrame.current) return;

      const img = images.current[clamped];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;

      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;

      let dw: number, dh: number, dx: number, dy: number;
      if (ir > cr) {
        dh = ch; dw = ch * ir;
        dx = (cw - dw) / 2; dy = 0;
      } else {
        dw = cw; dh = cw / ir;
        dx = 0; dy = (ch - dh) / 2;
      }

      // Fill background first — eliminates the horizontal black-line artifact
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);

      lastRenderedFrame.current = clamped;
    },
    [images, totalFrames]
  );

  // ─── High-performance render loop (60 fps lerp) ───────────────────────────
  const startRenderLoop = useCallback(() => {
    // Higher factor = snappier response (feels like 60fps)
    const LERP = 0.14;
    const SNAP = 0.05;

    const loop = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > SNAP) {
        currentFrameRef.current = current + diff * LERP;
        renderFrame(currentFrameRef.current);
      } else if (current !== target) {
        currentFrameRef.current = target;
        renderFrame(target);
      }
      // Always schedule next frame — browser will drop to idle naturally
      animationLoopRef.current = requestAnimationFrame(loop);
    };

    animationLoopRef.current = requestAnimationFrame(loop);
  }, [renderFrame]);

  const stopRenderLoop = useCallback(() => {
    if (animationLoopRef.current !== null) {
      cancelAnimationFrame(animationLoopRef.current);
      animationLoopRef.current = null;
    }
  }, []);

  // ─── Init ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    setupCanvas();
  }, [setupCanvas]);

  // ─── Handle resize ────────────────────────────────────────────────────────
  useEffect(() => {
    setupCanvas();
    renderFrame(Math.round(currentFrameRef.current));
  }, [windowSize, setupCanvas, renderFrame]);

  // ─── ScrollTrigger ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isReady || !containerRef.current || !canvasRef.current) return;

    renderFrame(0);
    startRenderLoop();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        // scrub: true gives the most direct 1-to-1 mapping; lerp handles smoothing
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          targetFrameRef.current = self.progress * (totalFrames - 1);
        },
      });
    }, containerRef);

    return () => {
      stopRenderLoop();
      ctx.revert();
    };
  }, [isReady, totalFrames, renderFrame, startRenderLoop, stopRenderLoop]);

  // ─── Cleanup ──────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => stopRenderLoop();
  }, [stopRenderLoop]);

  return (
    <section
      ref={containerRef}
      id="scroll-sequence"
      style={{
        position: "relative",
        width: "100%",
        height: "900vh",
        background: BG_COLOR,
      }}
    >
      {/* Canvas — CSS sticky pins it while we scroll through 900 vh */}
      <canvas
        ref={canvasRef}
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "block",
          background: BG_COLOR,
          willChange: "contents",
          outline: "none",
          border: "none",
          boxShadow: "none",
        }}
      />

      {/* Cinematic vignette — fixed to viewport so it never shifts */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          zIndex: 2,
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(5,5,7,0.55) 100%)",
        }}
      />

      {/* Top cinematic bar — fixed to viewport */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "6vh",
          pointerEvents: "none",
          zIndex: 2,
          background: "linear-gradient(to bottom, rgba(5,5,7,0.7), transparent)",
        }}
      />

      {/* Bottom cinematic bar — fixed to viewport */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "6vh",
          pointerEvents: "none",
          zIndex: 2,
          background: "linear-gradient(to top, rgba(5,5,7,0.7), transparent)",
        }}
      />
    </section>
  );
}
