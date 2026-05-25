import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface BuilderCard {
  id: number;
  type: string;
  title: string;
  subtitle: string;
  tag: string;
  size: 'large' | 'medium' | 'small';
  accent: string;
  icon: string;
  description: string;
  metrics?: { label: string; value: string }[];
}

const cards: BuilderCard[] = [
  {
    id: 1,
    type: 'Main Character Energy',
    title: 'AI Chaos Lab',
    subtitle: 'Building products before the market catches up',
    tag: 'AI · Future Stuff',
    size: 'large',
    accent: '#6378ff',
    icon: '◈',
    description:
      'We build internet-first AI products that feel illegal to be this early. Fast execution, crazy ideas, zero corporate energy.',
    metrics: [
      { label: 'Things Shipped', value: '10+' },
      { label: 'Sleepless Nights', value: '∞' },
    ],
  },
  {
    id: 2,
    type: 'Inner Circle',
    title: 'Builders Club',
    subtitle: 'Cool people building cooler things',
    tag: 'Founders · Creators',
    size: 'medium',
    accent: '#a78bfa',
    icon: '◉',
    description:
      'A small internet circle of founders, designers, developers, and overthinkers building the next wave of startups.',
  },
  {
    id: 3,
    type: 'Internet Culture',
    title: 'Culture Engine',
    subtitle: 'Where brands stop acting boring',
    tag: 'Content · Community',
    size: 'medium',
    accent: '#818cf8',
    icon: '◐',
    description:
      'Memes, storytelling, creators, trends — basically the stuff that actually makes people care online.',
  },
  {
    id: 4,
    type: 'Creative Playground',
    title: 'Offbeat Studio',
    subtitle: 'Designs that make people stop scrolling',
    tag: 'Design · Motion · Web',
    size: 'large',
    accent: '#6378ff',
    icon: '◑',
    description:
      'We create cinematic digital experiences with startup energy, Apple-level visuals, and internet-native storytelling.',
    metrics: [
      { label: 'Crazy Projects', value: '25+' },
      { label: '“Bro WTF” Reactions', value: '100+' },
    ],
  },
  {
    id: 5,
    type: 'Future Tech',
    title: 'Open Internet',
    subtitle: 'Building for the next version of the web',
    tag: 'Web3 · Experiments',
    size: 'small',
    accent: '#7c3aed',
    icon: '◒',
    description:
      'Exploring decentralized ideas, digital ownership, and internet systems that don’t feel outdated.',
  },
  {
    id: 6,
    type: 'Launch Mode',
    title: '0 → 1 Sprint',
    subtitle: 'Turning random ideas into real startups',
    tag: 'Startup · Build Fast',
    size: 'small',
    accent: '#4f46e5',
    icon: '◓',
    description:
      'From Figma concepts to live products in weeks. We move fast, test faster, and learn publicly.',
  },
];

function BentoCard({ card, index }: { card: BuilderCard; index: number }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: '-60px' });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(1000px) rotateX(${-y * 0.3}deg) rotateY(${x * 0.3}deg) scale(1.02)`;
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
  };

  const isLarge = card.size === 'large';
  const isMedium = card.size === 'medium';

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 0.1, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      data-hover
      style={{
        gridColumn: isLarge ? 'span 2' : 'span 1',
        gridRow: isLarge ? 'span 2' : isMedium ? 'span 1' : 'span 1',
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden',
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? `${card.accent}40` : 'rgba(255,255,255,0.06)'}`,
        padding: isLarge ? '30px' : '32px',
        cursor: 'none',
        transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
        boxShadow: hovered ? `0 0 60px ${card.accent}15, 0 0 120px ${card.accent}08` : 'none',
        backdropFilter: 'blur(10px)',
        minHeight: isLarge ? '380px' : isMedium ? '240px' : '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Glow gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse at top left, ${card.accent}0a 0%, transparent 60%)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none',
      }} />

      {/* Top bar glow line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: `linear-gradient(90deg, transparent, ${card.accent}60, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }} />

      {/* Scanning line on hover */}
      {hovered && (
        <motion.div
          initial={{ top: 0 }}
          animate={{ top: '100%' }}
          transition={{ duration: 1.5, ease: 'linear', repeat: Infinity }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${card.accent}40, transparent)`,
            pointerEvents: 'none',
          }}
        />
      )}

      <div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{
              fontSize: '9px',
              letterSpacing: '0.25em',
              color: card.accent,
              fontFamily: 'Inter Tight, sans-serif',
              fontWeight: 600,
              textTransform: 'uppercase',
              opacity: 0.8,
            }}>
              {card.type}
            </span>
            <span style={{
              fontSize: '9px',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.2)',
              fontFamily: 'Inter Tight, sans-serif',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}>
              {card.tag}
            </span>
          </div>
          <span style={{ fontSize: isLarge ? '28px' : '22px', opacity: 0.4, color: card.accent }}>
            {card.icon}
          </span>
        </div>

        {/* Title */}
        <div style={{
          fontFamily: 'Inter Tight, sans-serif',
          fontWeight: 400,
          fontSize: isLarge ? 'clamp(24px, 3vw, 40px)' : 'clamp(18px, 2vw, 26px)',
          letterSpacing: '-0.03em',
          color: '#f8f8f8',
          lineHeight: 1.1,
          marginBottom: '8px',
        }}>
          {card.title}
        </div>

        <div style={{
          fontSize: '12px',
          color: 'rgba(255,255,255,0.35)',
          fontFamily: 'Inter Tight, sans-serif',
          marginBottom: '16px',
          letterSpacing: '0.02em',
        }}>
          {card.subtitle}
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: hovered || isLarge ? 1 : 0, height: hovered || isLarge ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.45)',
            fontFamily: 'Inter Tight, sans-serif',
            lineHeight: 1.7,
            overflow: 'hidden',
          }}
        >
          {card.description}
        </motion.div>
      </div>

      {/* Bottom */}
      <div>
        {/* Metrics */}
        {card.metrics && (
          <div style={{ display: 'flex', gap: '24px', marginBottom: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {card.metrics.map((m, i) => (
              <div key={i}>
                <div style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#f8f8f8', fontFamily: 'Inter Tight, sans-serif' }}>
                  {m.value}
                </div>
                <div style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter Tight, sans-serif', textTransform: 'uppercase' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '11px',
            letterSpacing: '0.1em',
            color: card.accent,
            fontFamily: 'Inter Tight, sans-serif',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          Explore
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function BuildersSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="builders"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#080808',
        overflow: 'hidden',
        padding: 'clamp(80px, 12vw, 160px) 0',
      }}
    >
      {/* Background gradients */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-20%',
        width: '60vw',
        height: '60vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,120,255,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '-10%',
        width: '40vw',
        height: '40vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(24px, 6vw, 80px)' }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column' as const,
          gap: '24px',
          marginBottom: 'clamp(60px, 8vw, 100px)',
        }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div style={{ width: 1, height: 48, background: 'rgba(99,120,255,0.4)' }} />
            <div>
              <div style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter Tight, sans-serif', textTransform: 'uppercase', marginBottom: '4px' }}>
                01 / ECOSYSTEM
              </div>
              <div style={{ fontSize: '11px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter Tight, sans-serif', fontWeight: 500, textTransform: 'uppercase' }}>
                Builders Ecosystem
              </div>
            </div>
          </motion.div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              {['The Builder', 'Network'].map((word, i) => (
                <div key={i} style={{ overflow: 'hidden' }}>
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={inView ? { y: '0%' } : {}}
                    transition={{ delay: 0.1 , duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                    style={{
                      fontFamily: 'Inter Tight, sans-serif',
                      fontWeight: 900,
                      fontSize: 'clamp(32px, 7vw, 70px)',
                      lineHeight: 0.88,
                      letterSpacing: '-0.04em',
                      color: i === 1 ? 'rgba(255,255,255,0.2)' : '#f8f8f8',
                    }}
                  >
                    {word}
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{
                maxWidth: '320px',
                fontSize: '18px',
                color: 'rgba(255,255,255,0.4)',
                fontFamily: 'Inter Tight, sans-serif',
                lineHeight: 1.7,
                letterSpacing: '-0.005em',
              }}
            >
              An elite ecosystem of founders, and creative technologists shaping what comes next.
            </motion.p>
          </div>
        </div>

        {/* Bento Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '12px',
        }}>
          {cards.map((card, i) => (
            <BentoCard key={card.id} card={card} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '64px',
          }}
        >
          <a
            href="#"
            data-hover
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 36px',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '2px',
              fontSize: '11px',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'Inter Tight, sans-serif',
              fontWeight: 600,
              textTransform: 'uppercase',
              textDecoration: 'none',
              background: 'rgba(255,255,255,0.02)',
              transition: 'all 0.3s ease',
              cursor: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(99,120,255,0.4)';
              e.currentTarget.style.background = 'rgba(99,120,255,0.06)';
              e.currentTarget.style.color = '#f8f8f8';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
            }}
          >
            Apply to Join
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
