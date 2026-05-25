import { motion } from 'framer-motion';

const items = [
  'Startup-Native', 'Venture Studio', 'Creative Technology', 'Builder Ecosystem',
  'Future-First', 'Disruptive Innovation', 'Culture Lab', 'Digital Frontier',
];

export default function MarqueeStrip() {
  return (
    <div style={{
      position: 'relative',
      background: '#080808',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      padding: '18px 0',
      overflow: 'hidden',
    }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
        style={{ display: 'flex', gap: '48px', width: 'fit-content' }}
      >
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '48px',
              flexShrink: 0,
            }}
          >
            <span style={{
              fontSize: '10px',
              letterSpacing: '0.3em',
              color: 'rgba(255,255,255,0.18)',
              fontFamily: 'Inter Tight, sans-serif',
              fontWeight: 600,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>
              {item}
            </span>
            <span style={{ color: 'rgba(99,120,255,0.3)', fontSize: '6px' }}>◆</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
