import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import HeroScene from './HeroScene';

function MagneticButton({ children, href, variant = 'outline' }: { children: React.ReactNode; href: string; variant?: 'outline' | 'solid' }) {
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLAnchorElement;
    el.style.transform = 'translate(0,0)';
    el.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    if (variant === 'solid') {
      el.style.background = '#f8f8f8';
      el.style.color = '#080808';
      el.style.boxShadow = 'none';
    } else {
      el.style.borderColor = 'rgba(255,255,255,0.2)';
      el.style.background = 'transparent';
      el.style.boxShadow = 'none';
    }
  };

  return (
    <a
      ref={btnRef}
      href={href}
      data-hover
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: variant === 'solid' ? '16px 36px' : '13px 31px',
        borderRadius: '2px',
        fontSize: '11px',
        letterSpacing: '0.15em',
        fontWeight: 600,
        fontFamily: 'Inter Tight, sans-serif',
        textTransform: 'uppercase',
        textDecoration: 'none',
        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'none',
        ...(variant === 'solid' ? {
          background: '#f8f8f8',
          color: '#080808',
          border: 'none',
        } : {
          background: 'transparent',
          color: '#f8f8f8',
          border: '1px solid rgba(255,255,255,0.2)',
        }),
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        if (variant === 'solid') {
          el.style.background = '#6378ff';
          el.style.color = '#ffffff';
          el.style.boxShadow = '0 0 40px rgba(99,120,255,0.4)';
        } else {
          el.style.borderColor = 'rgba(99,120,255,0.5)';
          el.style.background = 'rgba(99,120,255,0.08)';
          el.style.boxShadow = '0 0 30px rgba(99,120,255,0.15)';
        }
      }}
    >
      {/* Shimmer effect */}
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
          transform: 'translateX(-100%)',
          transition: 'transform 0.6s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateX(100%)';
        }}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ position: 'relative', zIndex: 1 }}>
        <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const { scrollY } = useScroll();
  const scrollProgress = useTransform(scrollY, [0, 800], [0, 1]);
  const springScrollProgress = useSpring(scrollProgress, { stiffness: 50, damping: 20 });

  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroY = useTransform(scrollY, [0, 800], [0, -150]);
  const titleY = useTransform(scrollY, [0, 600], [0, -80]);
  const subtitleY = useTransform(scrollY, [0, 600], [0, -40]);

  const [scrollVal, setScrollVal] = useState(0);

  useEffect(() => {
    const unsub = springScrollProgress.on('change', v => setScrollVal(v));
    return unsub;
  }, [springScrollProgress]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouseX(x);
      setMouseY(-y);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '700px',
        overflow: 'hidden',
        background: '#080808',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none select-none bg-black"
      >
        <source src="/background-home.mp4" type="video/mp4" />
      </video>

      {/* Radial gradient center glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        height: '80vh',
        background: 'radial-gradient(ellipse at center, rgba(99,120,255,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Grid lines */}
      <div className="grid-lines absolute inset-0" />

      {/* Main content — left-aligned, positioned at the bottom-left area */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'left',
          y: heroY,
          opacity: heroOpacity,
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
        className="px-8 md:px-12"
      >
        {/* Tag badges — top left, pill style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '32px',
          }}
        >
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 14px',
            borderRadius: '999px',
            border: '1px solid rgba(99,120,255,0.3)',
            background: 'rgba(99,120,255,0.08)',
            fontSize: '10px',
            letterSpacing: '0.2em',
            color: 'rgba(99,120,255,0.9)',
            fontFamily: 'Inter Tight, sans-serif',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}>
            <span style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#6378ff',
              boxShadow: '0 0 8px rgba(99,120,255,0.8)',
              display: 'inline-block',
            }} />
            Future-First
          </span>
        </motion.div>

        {/* Hero typography — left aligned, large, 2 lines */}
        <motion.div style={{ y: titleY }}>
          <div className="overflow-hidden">
            {/* Line 1 — solid white */}
            <motion.div
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{
                delay: 0.25,
                duration: 1,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="block font-[900] text-[clamp(52px,10vw,110px)] leading-[0.9] tracking-tighter text-white"
              style={{ fontFamily: 'Inter Tight, sans-serif' }}
            >
              Building What?
            </motion.div>

            {/* Line 2 — gradient fade from white to gray */}
            <motion.div
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{
                delay: 0.35,
                duration: 1,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="block font-[900] font-medium text-[clamp(52px,10vw,110px)] leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-600"
              style={{ fontFamily: 'Inter Tight, sans-serif' }}
            >
              Comes Next.
            </motion.div>
          </div>
        </motion.div>

        {/* Subtitle + CTA row — below the title, left-aligned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '40px',
            marginTop: '48px',
            flexWrap: 'wrap',
          }}
        >
          {/* Left: subtitle paragraph */}
          <motion.p
            style={{
              y: subtitleY,
              fontSize: 'clamp(14px, 1.5vw, 20px)',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'Inter Tight, sans-serif',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              maxWidth: '600px',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Startup ventures. Creative technology. Disruptive culture.
            A future-first venture ecosystem built for people who think differently.
          </motion.p>

          {/* Center: CTA button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
          }}>
            <MagneticButton href="#builders" variant="solid">
              Explore Builders
            </MagneticButton>

            {/* Right: Scroll to explore */}
            <div
              className="hidden md:flex"
              style={{
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div style={{
                width: '40px',
                height: '1px',
                background: 'rgba(255, 255, 255, 1)',
              }} />
              <span style={{
                fontSize: '9px',
                letterSpacing: '0.25em',
                color: 'rgba(255, 255, 255, 1)',
                fontFamily: 'Inter Tight, sans-serif',
                fontWeight: 500,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}>
                Scroll to<br />Explore
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Corner element — bottom right */}
      <div style={{ position: 'absolute', bottom: '40px', right: '40px', zIndex: 10 }}>
        <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.15)', fontFamily: 'Inter Tight, sans-serif' }}>
          VENTURE STUDIO
        </span>
      </div>
    </section>
  );
}
