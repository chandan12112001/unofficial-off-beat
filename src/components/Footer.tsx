import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const linkColumns = {
    Studio: ['About', 'Ventures', 'Philosophy', 'Team'],
    Connect: ['X / Twitter', 'LinkedIn', 'Instagram', 'Newsletter'],
  };

  return (
    <footer style={{
      position: 'relative',
      background: '#080808',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      overflow: 'hidden',
    }}>
      {/* Top glow line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(99,120,255,0.4), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Grid */}
      <div className="grid-lines absolute inset-0 opacity-30" />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px)' }}>

        {/* Top section — large brand name left, CTA right */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 'clamp(60px, 8vw, 100px)',
          flexWrap: 'wrap',
          gap: '40px',
        }}>
          {/* Large brand text — gradient fading effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div style={{
              fontFamily: 'Inter Tight, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(60px, 12vw, 140px)',
              letterSpacing: '-0.05em',
              lineHeight: 0.9,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.08) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              userSelect: 'none',
            }}>
              OFF/BEAT
            </div>
          </motion.div>

          {/* Right side — CTA + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '12px',
              paddingTop: '16px',
            }}
          >
            <a
              href="#cta"
              data-hover
              style={{
                fontSize: '16px',
                fontFamily: 'Inter Tight, sans-serif',
                fontWeight: 500,
                color: '#f8f8f8',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'color 0.3s ease',
                cursor: 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#6378ff'}
              onMouseLeave={e => e.currentTarget.style.color = '#f8f8f8'}
            >
              Enter Ecosystem
              <span style={{ fontSize: '18px' }}>→</span>
            </a>
            <span style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.25)',
              fontFamily: 'Inter Tight, sans-serif',
              fontWeight: 400,
              letterSpacing: '0.02em',
            }}>
              Startup • Culture-First
            </span>
          </motion.div>
        </div>

        {/* Divider */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'rgba(255,255,255,0.05)',
          marginBottom: '40px',
        }} />

        {/* Bottom section — link columns left, status/copyright right */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '48px',
        }}>
          {/* Link columns */}
          <div style={{
            display: 'flex',
            gap: 'clamp(60px, 10vw, 160px)',
          }}>
            {Object.entries(linkColumns).map(([category, items], ci) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1, duration: 0.8 }}
              >
                <div style={{
                  fontSize: '9px',
                  letterSpacing: '0.3em',
                  color: 'rgba(255,255,255,0.25)',
                  fontFamily: 'Inter Tight, sans-serif',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                }}>
                  {category}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {items.map((item, i) => (
                    <a
                      key={i}
                      href="#"
                      data-hover
                      style={{
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.4)',
                        fontFamily: 'Inter Tight, sans-serif',
                        fontWeight: 400,
                        textDecoration: 'none',
                        cursor: 'none',
                        transition: 'color 0.3s ease',
                        display: 'inline-block',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#f8f8f8'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right side — status + copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '12px',
              textAlign: 'right',
            }}
          >
            {/* System status */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{
                fontSize: '9px',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.25)',
                fontFamily: 'Inter Tight, sans-serif',
                fontWeight: 500,
                textTransform: 'uppercase',
              }}>
                System Status:
              </span>
              <span style={{
                fontSize: '9px',
                letterSpacing: '0.15em',
                color: '#6378ff',
                fontFamily: 'Inter Tight, sans-serif',
                fontWeight: 700,
                textTransform: 'uppercase',
                padding: '2px 8px',
                border: '1px solid rgba(99,120,255,0.3)',
                borderRadius: '2px',
                background: 'rgba(99,120,255,0.08)',
              }}>
                Operational
              </span>
            </div>

            {/* Copyright */}
            <span style={{
              fontSize: '10px',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.15)',
              fontFamily: 'Inter Tight, sans-serif',
              fontWeight: 400,
              textTransform: 'uppercase',
            }}>
              © {currentYear} OFF/BEAT STUDIOS. <span style={{
      color: 'rgba(255, 255, 255, 0.51)',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      userSelect: 'all',
    }}>
                No rights reserved (Just for Fun).
                </span> 
            </span>

            {/* Developed by */}
           <span
  style={{
    fontSize: '9px',
    letterSpacing: '0.15em',
    color: 'rgba(255,255,255,0.12)',
    fontFamily: 'Inter Tight, sans-serif',
    fontWeight: 400,
    textTransform: 'uppercase',
  }}
>
  Built by{' '}
  <a
    href="https://www.linkedin.com/in/01chandan/"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: 'rgba(255, 255, 255, 0.52)',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      userSelect: 'all',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.color = '#ffffff'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
    }}
  >
    Chandan Kumar
  </a>
</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
