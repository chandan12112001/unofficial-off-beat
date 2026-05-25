import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const statements = [
  {
    text: 'Being normal is expensive.',
    sub: 'Safe brands get ignored. Different brands get remembered.',
  },
  {
    text: 'Don’t chase trends. Start them.',
    sub: 'Anybody can copy. Very few can create culture.',
  },
  {
    text: 'Virality fades. Community stays.',
    sub: 'People don’t join products anymore — they join energy.',
  },
  {
    text: 'AI won’t replace builders.',
    sub: 'But builders using AI will replace everyone else.',
  },
  {
    text: 'Ideas are cute. Shipping is savage.',
    sub: 'The internet rewards people who execute fast.',
  },
];

function StatementBlock({ statement, index }: { statement: { text: string; sub: string }; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 === 0 ? -60 : 60, 0, index % 2 === 0 ? 30 : -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.6, 0.9], [0, 1, 1, 0.3]);

  const words = statement.text.split(' ');

  return (
    <div
      ref={ref}
      style={{
        padding: 'clamp(40px, 6vw, 60px) 0',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        style={{
          x,
          opacity,
          position: 'relative',
        }}
      >
        {/* Background number */}
        <div style={{
          position: 'absolute',
          right: '0',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'Inter Tight, sans-serif',
          fontWeight: 500,
          fontSize: 'clamp(50px, 10vw, 130px)',
          color: 'rgba(255,255,255,0.02)',
          letterSpacing: '-0.06em',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '24px',
            marginBottom: '20px',
          }}>
            <span style={{
              fontSize: '9px',
              letterSpacing: '0.25em',
              color: 'rgba(99,120,255,0.6)',
              fontFamily: 'Inter Tight, sans-serif',
              fontWeight: 600,
              textTransform: 'uppercase',
              paddingTop: '8px',
              whiteSpace: 'nowrap',
            }}>
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Main text */}
            <div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0 0.25em',
              }}>
                {words.map((word, wi) => (
                  <div key={wi} style={{ overflow: 'hidden', display: 'inline-block' }}>
                    <motion.span
                      initial={{ y: '110%' }}
                      animate={inView ? { y: '0%' } : {}}
                      transition={{
                        delay: wi * 0.06,
                        duration: 0.9,
                        ease: [0.76, 0, 0.24, 1],
                      }}
                      style={{
                        display: 'inline-block',
                        fontFamily: 'Inter Tight, sans-serif',
                        fontWeight: 500,
                        fontSize: 'clamp(30px, 6vw, 60px)',
                        letterSpacing: '-0.04em',
                        lineHeight: 0.95,
                        color: wi === 0 && index === 4 ? '#f8f8f8' : '#f8f8f8',
                        paddingRight: '0.1em',
                      }}
                    >
                      {word}
                    </motion.span>
                  </div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: words.length * 0.06 + 0.2, duration: 0.7 }}
                style={{
                  fontSize: 'clamp(13px, 1.5vw, 16px)',
                  color: 'rgba(255,255,255,0.3)',
                  fontFamily: 'Inter Tight, sans-serif',
                  fontWeight: 400,
                  marginTop: '16px',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.6,
                }}
              >
                {statement.sub}
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function PhilosophySection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#080808',
        overflow: 'hidden',
        padding: 'clamp(80px, 12vw, 160px) 0',
      }}
    >
      {/* Background effect */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          scale: bgScale,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(99,120,255,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />



      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(24px, 6vw, 80px)' }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: 'clamp(40px, 6vw, 40px)',
          }}
        >
          <div style={{ width: 1, height: 48, background: 'rgba(99,120,255,0.4)' }} />
          <div>
            <div style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter Tight, sans-serif', textTransform: 'uppercase', marginBottom: '4px' }}>
              02 / PHILOSOPHY
            </div>
            <div style={{ fontSize: '11px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter Tight, sans-serif', fontWeight: 500, textTransform: 'uppercase' }}>
              How We Think
            </div>
          </div>
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{ marginBottom: 'clamp(60px, 10vw, 120px)' }}
        >
          <div style={{
            fontFamily: 'Inter Tight, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(32px, 6vw, 70px)',
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            color: '#f8f8f8',
            marginBottom: '24px',
          }}>
            Our<br />Manifesto
          </div>
          <p style={{
            maxWidth: '520px',
            fontSize: 'clamp(14px, 1.5vw, 17px)',
            color: 'rgba(255,255,255,0.4)',
            fontFamily: 'Inter Tight, sans-serif',
            lineHeight: 1.7,
            letterSpacing: '-0.01em',
          }}>
            This isn’t a manifesto ~ It’s the energy behind every product, decision, and crazy idea we ship.
          </p>
        </motion.div>

        {/* Statements */}
        {statements.map((statement, i) => (
          <StatementBlock key={i} statement={statement} index={i} />
        ))}
      </div>
    </section>
  );
}
