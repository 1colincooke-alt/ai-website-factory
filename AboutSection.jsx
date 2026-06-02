import { COLORS } from '../constants.js'
import AnimateIn from './AnimateIn.jsx'
import GoldLine from './GoldLine.jsx'
import CTAButton from './CTAButton.jsx'
import StarRating from './StarRating.jsx'

const STATS = [
  { num: '19', label: '5-Star Reviews' },
  { num: '100%', label: 'Satisfaction Rate' },
  { num: '5+', label: 'Years Experience' },
]

const CORNERS = [
  { top: 20, left: 20, borderTop: '1px solid #C9A96E', borderLeft: '1px solid #C9A96E', width: 40, height: 40 },
  { top: 20, right: 20, borderTop: '1px solid #C9A96E', borderRight: '1px solid #C9A96E', width: 40, height: 40 },
  { bottom: 20, left: 20, borderBottom: '1px solid #C9A96E', borderLeft: '1px solid #C9A96E', width: 40, height: 40 },
  { bottom: 20, right: 20, borderBottom: '1px solid #C9A96E', borderRight: '1px solid #C9A96E', width: 40, height: 40 },
]

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        background: COLORS.obsidian,
        padding: '120px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          right: -200,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 80,
          alignItems: 'center',
        }}
      >
        {/* Text column */}
        <AnimateIn>
          <div>
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
              About Amy &amp; One Med Spa
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(34px, 4vw, 56px)',
                color: COLORS.cream,
                fontWeight: 300,
                margin: '0 0 32px',
                lineHeight: 1.15,
              }}
            >
              A New Standard of{' '}
              <em style={{ fontStyle: 'italic', color: COLORS.gold }}>
                Aesthetic Excellence
              </em>
            </h2>
            <GoldLine width={60} style={{ marginLeft: 0, marginBottom: 36 }} />
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 19,
                color: COLORS.mist,
                lineHeight: 1.8,
                marginBottom: 24,
                opacity: 0.8,
              }}
            >
              Located in the heart of Sacramento, One Med Spa was founded on a
              singular belief: that aesthetic medicine is an art form demanding
              both clinical precision and deep compassion.
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 19,
                color: COLORS.mist,
                lineHeight: 1.8,
                marginBottom: 44,
                opacity: 0.8,
              }}
            >
              Amy, our lead injector and founder, brings an obsessive attention
              to detail — triple-checking every marking, studying every angle,
              honoring every individual's unique facial anatomy. You won't leave
              here looking "done." You'll leave looking like yourself, elevated.
            </p>

            <div
              style={{
                display: 'flex',
                gap: 48,
                marginBottom: 44,
                flexWrap: 'wrap',
              }}
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 44,
                      color: COLORS.gold,
                      fontWeight: 300,
                      lineHeight: 1,
                    }}
                  >
                    {s.num}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 14,
                      color: COLORS.mist,
                      opacity: 0.55,
                      letterSpacing: '0.08em',
                      marginTop: 6,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <CTAButton href="#contact">Book a Consultation</CTAButton>
          </div>
        </AnimateIn>

        {/* Visual column */}
        <AnimateIn delay={0.2}>
          <div style={{ position: 'relative', maxWidth: 460, margin: '0 auto' }}>
            <div
              style={{
                width: '100%',
                paddingBottom: '120%',
                background: COLORS.graphite,
                border: '1px solid rgba(201,169,110,0.2)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: 20,
                }}
              >
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    border: '1px solid rgba(201,169,110,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 52,
                      color: COLORS.gold,
                    }}
                  >
                    ✦
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 24,
                    color: COLORS.cream,
                    letterSpacing: '0.12em',
                  }}
                >
                  One Med Spa
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 14,
                    color: COLORS.gold,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}
                >
                  Sacramento, CA
                </div>
                <div style={{ textAlign: 'center' }}>
                  <StarRating />
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 14,
                      color: COLORS.mist,
                      opacity: 0.5,
                      marginTop: 8,
                    }}
                  >
                    Perfect 5.0 Rating
                  </div>
                </div>
              </div>

              {/* Decorative corner brackets */}
              {CORNERS.map((s, i) => (
                <div
                  key={i}
                  style={{ position: 'absolute', opacity: 0.45, ...s }}
                />
              ))}
            </div>

            {/* Floating badge */}
            <div
              style={{
                position: 'absolute',
                bottom: -24,
                right: -24,
                background: COLORS.gold,
                padding: '20px 28px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 13,
                  color: COLORS.obsidian,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                Women-Owned
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 12,
                  color: COLORS.obsidian,
                  opacity: 0.7,
                  marginTop: 3,
                }}
              >
                Asian-Owned · LGBTQ+ Welcoming
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
