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
  batchSize = 20,
  priorityFrames = 30,
}: UseImagePreloaderOptions): UseImagePreloaderReturn {
  const images = useRef<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const loadedRef = useRef(0);
  const hasStarted = useRef(false);

  const getFramePath = useCallback(
    (index: number): string => {
      const frameNumber = String(index + 1).padStart(5, "0");
      return `${basePath}/${frameNumber}.png`;
    },
    [basePath]
  );

  const loadImage = useCallback(
    (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedRef.current++;
          const currentProgress = Math.round(
            (loadedRef.current / totalFrames) * 100
          );
          setProgress(currentProgress);
          setLoadedCount(loadedRef.current);

          if (currentProgress >= 80 && !isReady) {
            setIsReady(true);
          }

          resolve(img);
        };
        img.onerror = () => {
          // Still count as loaded to not block progress
          loadedRef.current++;
          setProgress(
            Math.round((loadedRef.current / totalFrames) * 100)
          );
          reject(new Error(`Failed to load frame ${index}`));
        };
        img.src = getFramePath(index);
      });
    },
    [totalFrames, getFramePath, isReady]
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
        if (result.status === "fulfilled") {
          images.current[startIndex + idx] = result.value;
        }
      });
    },
    [totalFrames, loadImage]
  );

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    // Pre-allocate array
    images.current = new Array(totalFrames);

    const loadAll = async () => {
      // Phase 1: Load priority frames first (first N frames)
      await loadBatch(0, priorityFrames);

      // Phase 2: Load remaining in batches
      for (let i = priorityFrames; i < totalFrames; i += batchSize) {
        await loadBatch(i, batchSize);
      }
    };

    loadAll();
  }, [totalFrames, priorityFrames, batchSize, loadBatch]);

  return { images, progress, isReady, loadedCount };
}
