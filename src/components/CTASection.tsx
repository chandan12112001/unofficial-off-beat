import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

function MagneticCTA({ children }: { children: React.ReactNode }) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
    btn.style.transition = 'transform 0.1s ease';
  };

  const handleMouseLeave = () => {
    if (btnRef.current) {
      btnRef.current.style.transform = 'translate(0,0)';
      btnRef.current.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
  };

  return (
    <button
      ref={btnRef}
      data-hover
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        padding: '20px 52px',
        background: '#f8f8f8',
        color: '#080808',
        border: 'none',
        borderRadius: '2px',
        fontSize: '12px',
        letterSpacing: '0.15em',
        fontWeight: 700,
        fontFamily: 'Inter Tight, sans-serif',
        textTransform: 'uppercase',
        cursor: 'none',
        overflow: 'hidden',
        transition: 'background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = '#6378ff';
        e.currentTarget.style.color = '#ffffff';
        e.currentTarget.style.boxShadow = '0 0 60px rgba(99,120,255,0.5), 0 0 120px rgba(99,120,255,0.2)';
      }}
    >
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </button>
  );
}

export default function CTASection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1.02]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const titleWords = ['BUILD', 'THE', 'OFF/BEAT', 'FUTURE'];

  return (
    <section
      id="cta"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#080808',
        overflow: 'hidden',
        padding: 'clamp(100px, 15vw, 140px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
      }}
    >
      {/* Background elements */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-20%',
          y: bgY,
          background: 'radial-gradient(ellipse at 50% 40%, rgba(99,120,255,0.1) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Grid */}
      <div className="grid-lines absolute inset-0 opacity-20" />

      <motion.div
        style={{ scale }}
        className="relative z-10 text-center px-6"
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '60px',
          }}
        >
          <div style={{ width: 32, height: '1px', background: 'linear-gradient(to right, transparent, rgba(99,120,255,0.6))' }} />
          <span style={{
            fontSize: '9px',
            letterSpacing: '0.35em',
            color: 'rgba(99,120,255,0.6)',
            fontFamily: 'Inter Tight, sans-serif',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}>
            03 / JOIN US
          </span>
          <div style={{ width: 32, height: '1px', background: 'linear-gradient(to left, transparent, rgba(99,120,255,0.6))' }} />
        </motion.div>

        {/* Title */}
        <div style={{ marginBottom: '40px' }}>
          {titleWords.map((word, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <motion.div
                initial={{ y: '110%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{ delay: 0.1 + i * 0.08, duration: 1, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  fontFamily: 'Inter Tight, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(42px, 10vw, 100px)',
                  lineHeight: 0.88,
                  letterSpacing: '-0.04em',
                  color: word === 'OFF/BEAT' ? '#FF00B5' : '#f8f8f8',
                }}
              >
                {word}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            fontSize: 'clamp(16px, 2vw, 22px)',
            color: 'rgba(255,255,255,0.35)',
            fontFamily: 'Inter Tight, sans-serif',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            marginBottom: '60px',
            maxWidth: '480px',
            margin: '0 auto 60px',
          }}
        >
          Join the ecosystem. Build what comes next.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <MagneticCTA>Apply to the Ecosystem</MagneticCTA>

          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {['Founders', 'Builders', 'Investors'].map((type, i) => (
              <motion.a
                key={i}
                href="#"
                data-hover
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.3)',
                  fontFamily: 'Inter Tight, sans-serif',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  cursor: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
              >
                {type} →
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
