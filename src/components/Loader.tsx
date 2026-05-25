import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [_phase, setPhase] = useState<'assembling' | 'complete'>('assembling');

  useEffect(() => {
    const duration = 2200;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const prog = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.floor(prog));

      if (prog < 100) {
        requestAnimationFrame(animate);
      } else {
        setPhase('complete');
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 800);
        }, 400);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  const letters = ['O', 'F', 'F', '/', 'B', 'E', 'A', 'T'];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: '#080808' }}
        >
          {/* Grid lines */}
          <div className="absolute inset-0 grid-lines opacity-30" />

          {/* Top noise */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px'
          }} />

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-16">
            {/* Logo letters assembling */}
            <div className="flex items-center gap-0 overflow-hidden">
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ 
                    opacity: 0, 
                    y: 60,
                    filter: 'blur(20px)',
                  }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    filter: 'blur(0px)',
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.07 + 0.2,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  style={{
                    fontSize: 'clamp(48px, 10vw, 100px)',
                    fontWeight: 900,
                    letterSpacing: '-0.04em',
                    fontFamily: 'Inter Tight, sans-serif',
                    color: letter === '/' ? '#6378ff' : '#f8f8f8',
                    lineHeight: 1,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Studios label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              style={{
                fontSize: '11px',
                letterSpacing: '0.3em',
                color: 'rgba(255,255,255,0.3)',
                fontFamily: 'Inter Tight, sans-serif',
                fontWeight: 500,
                textTransform: 'uppercase',
                marginTop: '-12px',
              }}
            >
              STUDIOS
            </motion.div>

            {/* Progress */}
            <div className="flex flex-col items-center gap-4 w-[280px]">
              {/* Progress bar */}
              <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full"
                  style={{
                    background: 'linear-gradient(90deg, #6378ff, #a78bfa)',
                    width: `${progress}%`,
                    transition: 'width 0.1s linear',
                    boxShadow: '0 0 20px rgba(99,120,255,0.8)',
                  }}
                />
              </div>

              {/* Progress number */}
              <div className="flex justify-between w-full">
                <span style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter Tight, sans-serif' }}>
                  INITIALIZING
                </span>
                <span style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter Tight, sans-serif', fontVariantNumeric: 'tabular-nums' }}>
                  {progress.toString().padStart(3, '0')}%
                </span>
              </div>
            </div>
          </div>

          {/* Scanning line */}
          <motion.div
            initial={{ top: '-2px' }}
            animate={{ top: '102%' }}
            transition={{ duration: 2.2, ease: 'linear', repeat: Infinity }}
            className="absolute left-0 w-full h-[1px] pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(99,120,255,0.4), transparent)',
            }}
          />

          {/* Corner labels */}
          <div className="absolute top-8 left-8" style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', fontFamily: 'Inter Tight, sans-serif' }}>
            OBS-001
          </div>
          <div className="absolute top-8 right-8" style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', fontFamily: 'Inter Tight, sans-serif' }}>
            2025 // EST
          </div>
          <div className="absolute bottom-8 left-8" style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', fontFamily: 'Inter Tight, sans-serif' }}>
            SYSTEM READY
          </div>
          <div className="absolute bottom-8 right-8" style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', fontFamily: 'Inter Tight, sans-serif' }}>
            VENTURE STUDIO
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
