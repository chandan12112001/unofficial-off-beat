"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface WindowSize {
  width: number;
  height: number;
}

export function useDebouncedResize(delay: number = 100): WindowSize {
  const [size, setSize] = useState<WindowSize>({
    width: typeof window !== "undefined" ? window.innerWidth : 1920,
    height: typeof window !== "undefined" ? window.innerHeight : 1080,
  });

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleResize = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, delay);
  }, [delay]);

  useEffect(() => {
    // Set initial size
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleResize]);

  return size;
}
