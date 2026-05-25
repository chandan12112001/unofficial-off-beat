"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseImagePreloaderOptions {
  totalFrames: number;
  basePath: string;
  batchSize?: number;
  priorityFrames?: number;
}

interface UseImagePreloaderReturn {
  images: React.MutableRefObject<HTMLImageElement[]>;
  progress: number;
  isReady: boolean;
  loadedCount: number;
}

export function useImagePreloader({
  totalFrames,
  basePath,
  batchSize = 30,
  priorityFrames = 60,
}: UseImagePreloaderOptions): UseImagePreloaderReturn {
  const images = useRef<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const loadedRef = useRef(0);
  const hasStarted = useRef(false);
  // Use a ref for the ready check so loadImage callback never needs isReady in its deps
  const isReadyRef = useRef(false);

  const getFramePath = useCallback(
    (index: number): string => {
      const frameNumber = String(index + 1).padStart(5, "0");
      return `${basePath}/${frameNumber}.webp`;
    },
    [basePath]
  );

  // FIXED: removed `isReady` from deps — use isReadyRef instead to avoid
  // stale-closure / callback-recreation mid-load which caused the stuck-at-25% bug
  const loadImage = useCallback(
    (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image();

        img.onload = () => {
          // Use decode() to push rasterization off the main thread.
          // Always resolve (never reject) so loadBatch.allSettled accounting stays correct.
          const decodeP = typeof img.decode === "function"
            ? img.decode().catch(() => { /* non-fatal */ })
            : Promise.resolve();

          decodeP.finally(() => {
            loadedRef.current++;
            const currentProgress = Math.round(
              (loadedRef.current / totalFrames) * 100
            );
            setProgress(currentProgress);
            setLoadedCount(loadedRef.current);

            // Use ref — not the stale closure value — to avoid triggering
            // unnecessary re-renders and callback recreations
            if (currentProgress >= 20 && !isReadyRef.current) {
              isReadyRef.current = true;
              setIsReady(true);
            }
            resolve(img);
          });
        };

        img.onerror = () => {
          // Count as loaded so progress never blocks on a bad file
          loadedRef.current++;
          setProgress(Math.round((loadedRef.current / totalFrames) * 100));
          resolve(img); // resolve (not reject) — keeps allSettled accounting clean
        };

        img.src = getFramePath(index);
      });
    },
    // NO isReady in deps — that was the root cause of the stuck-at-25% bug
    [totalFrames, getFramePath]
  );

  const loadBatch = useCallback(
    async (startIndex: number, count: number): Promise<void> => {
      const endIndex = Math.min(startIndex + count, totalFrames);
      const promises: Promise<HTMLImageElement>[] = [];

      for (let i = startIndex; i < endIndex; i++) {
        promises.push(loadImage(i));
      }

      const results = await Promise.allSettled(promises);
      results.forEach((result, idx) => {
        if (result.status === "fulfilled" && result.value.naturalWidth > 0) {
          images.current[startIndex + idx] = result.value;
        }
      });
    },
    [totalFrames, loadImage]
  );

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    images.current = new Array(totalFrames);

    const loadAll = async () => {
      // Phase 1: Load priority frames first (sequential — ensures frame 0 is ready ASAP)
      await loadBatch(0, priorityFrames);

      // Phase 2: Load remaining with THROTTLED concurrency (max 4 batches at once).
      // Firing all 240 images simultaneously overwhelmed the HTTP queue and decode
      // pipeline which caused progress to stall at ~25%.
      const MAX_CONCURRENT_BATCHES = 4;
      const batches: [number, number][] = [];
      for (let i = priorityFrames; i < totalFrames; i += batchSize) {
        batches.push([i, batchSize]);
      }

      for (let i = 0; i < batches.length; i += MAX_CONCURRENT_BATCHES) {
        const chunk = batches.slice(i, i + MAX_CONCURRENT_BATCHES);
        await Promise.all(chunk.map(([start, size]) => loadBatch(start, size)));
      }
    };

    loadAll();
  // loadBatch is stable now (loadImage has no isReady dep), so this effect
  // will only ever fire once — which is the correct behaviour
  }, [totalFrames, priorityFrames, batchSize, loadBatch]);

  return { images, progress, isReady, loadedCount };
}
