"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0.5,
    normalizedY: 0.5,
  });

  const rafId = useRef<number | null>(null);
  const latestEvent = useRef<{ x: number; y: number } | null>(null);

  const updatePosition = useCallback(() => {
    if (latestEvent.current) {
      const { x, y } = latestEvent.current;
      setPosition({
        x,
        y,
        normalizedX: x / window.innerWidth,
        normalizedY: y / window.innerHeight,
      });
      latestEvent.current = null;
    }
    rafId.current = null;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      latestEvent.current = { x: e.clientX, y: e.clientY };
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [updatePosition]);

  return position;
}
