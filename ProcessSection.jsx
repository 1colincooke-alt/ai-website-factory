import { COLORS, PROCESS_STEPS } from '../constants.js'
import AnimateIn from './AnimateIn.jsx'
import GoldLine from './GoldLine.jsx'

export default function ProcessSection() {
  return (
    <section
      id="process"
      style={{
        background: COLORS.graphite,
        padding: '120px 24px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <AnimateIn style={{ textAlign: 'center', marginBottom: 80 }}>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 13,
              color: COLORS.gold,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: 20,
            }}
          >
            The Experience
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(36px, 4vw, 56px)',
              color: COLORS.cream,
              fontWeight: 300,
              lineHeight: 1.1,
              margin: '0 0 24px',
            }}
          >
            Your Journey to{' '}
            <em style={{ color: COLORS.gold, fontStyle: 'italic' }}>
              Radiance
            </em>
          </h2>
          <GoldLine width={60} />
        </AnimateIn>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 2,
          }}
        >
          {PROCESS_STEPS.map((s, i) => (
            <AnimateIn key={i} delay={i * 0.1}>
              <div
                style={{
                  padding: '52px 32px 44px',
                  borderTop: '2px solid rgba(201,169,110,0.15)',
                  position: 'relative',
                }}
              >
                {/* Gold top accent */}
                <div
                  style={{
                    position: 'absolute',
                    top: -2,
                    left: 32,
                    width: 48,
                    height: 2,
                    background: COLORS.gold,
                  }}
                />

                {/* Large background number */}
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 72,
                    color: 'rgba(201,169,110,0.1)',
                    fontWeight: 700,
                    lineHeight: 1,
                    position: 'absolute',
                    top: 20,
                    right: 24,
                    userSelect: 'none',
                  }}
                >
                  {s.num}
                </div>

                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 13,
                    color: COLORS.gold,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    marginBottom: 18,
                  }}
                >
                  Step {s.num}
                </div>

                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 30,
                    color: COLORS.cream,
                    fontWeight: 600,
                    margin: '0 0 18px',
                  }}
                >
                  {s.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 17,
                    color: COLORS.mist,
                    lineHeight: 1.75,
                    opacity: 0.68,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
