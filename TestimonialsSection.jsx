import { useState, useEffect, useRef } from 'react'
import { COLORS, TESTIMONIALS } from '../constants.js'
import AnimateIn from './AnimateIn.jsx'
import GoldLine from './GoldLine.jsx'
import StarRating from './StarRating.jsx'

const PULL_QUOTES = [
  { text: '"Amazing prices, amazing skills"', attr: '— Google Review' },
  { text: '"Exceptional from start to finish"', attr: '— Google Review' },
  { text: '"I highly recommend Amy"', attr: '— Google Review' },
]

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const timerRef = useRef(null)

  const startTimer = () => {
    timerRef.current = setInterval(
      () => setActive((a) => (a + 1) % TESTIMONIALS.length),
      5500
    )
  }

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [])

  const goTo = (i) => {
    clearInterval(timerRef.current)
    setActive(i)
    startTimer()
  }

  return (
    <section
      id="testimonials"
      style={{
        background: COLORS.obsidian,
        padding: '120px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative rings */}
      {[700, 500, 300].map((size) => (
        <div
          key={size}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: size,
            height: size,
            borderRadius: '50%',
            border: `1px solid rgba(201,169,110,${size === 700 ? 0.04 : size === 500 ? 0.07 : 0.1})`,
            pointerEvents: 'none',
          }}
        />
      ))}

      <div
        style={{
          maxWidth: 880,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
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
            Client Stories
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(36px, 4vw, 56px)',
              color: COLORS.cream,
              fontWeight: 300,
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Real Results,{' '}
            <em style={{ color: COLORS.gold, fontStyle: 'italic' }}>
              Real People
            </em>
          </h2>
        </AnimateIn>

        {/* Carousel */}
        <div style={{ position: 'relative', minHeight: 280 }}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              style={{
                position: i === 0 ? 'relative' : 'absolute',
                top: 0,
                left: 0,
                right: 0,
                opacity: active === i ? 1 : 0,
                transform: active === i ? 'translateY(0)' : 'translateY(24px)',
                transition: 'all 0.85s cubic-bezier(0.16,1,0.3,1)',
                pointerEvents: active === i ? 'auto' : 'none',
              }}
            >
              <div style={{ textAlign: 'center', padding: '0 24px' }}>
                <div
                  style={{
                    fontSize: 72,
                    color: 'rgba(201,169,110,0.18)',
                    fontFamily: 'Georgia, serif',
                    lineHeight: 0.7,
                    marginBottom: 28,
                    userSelect: 'none',
                  }}
                >
                  "
                </div>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 'clamp(19px, 2.5vw, 27px)',
                    color: COLORS.cream,
                    lineHeight: 1.7,
                    fontStyle: 'italic',
                    fontWeight: 300,
                    marginBottom: 40,
                    maxWidth: 680,
                    margin: '0 auto 40px',
                  }}
                >
                  {t.text}
                </p>
                <GoldLine width={40} style={{ marginBottom: 24 }} />
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 19,
                    color: COLORS.cream,
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 14,
                    color: COLORS.gold,
                    letterSpacing: '0.08em',
                    marginBottom: 8,
                  }}
                >
                  {t.role}
                </div>
                <StarRating count={t.stars} />
              </div>
            </div>
          ))}
        </div>

        {/* Dot navigation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 10,
            marginTop: 52,
          }}
        >
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              style={{
                width: active === i ? 32 : 8,
                height: 8,
                background:
                  active === i ? COLORS.gold : 'rgba(201,169,110,0.28)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.35s ease',
                borderRadius: 4,
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Pull quotes grid */}
        <AnimateIn
          delay={0.2}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 2,
            marginTop: 88,
          }}
        >
          {PULL_QUOTES.map((q, i) => (
            <div
              key={i}
              style={{
                padding: '28px 24px',
                border: '1px solid rgba(201,169,110,0.12)',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 17,
                  color: COLORS.mist,
                  fontStyle: 'italic',
                  margin: '0 0 12px',
                  lineHeight: 1.5,
                  opacity: 0.85,
                }}
              >
                {q.text}
              </p>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 13,
                  color: COLORS.gold,
                  opacity: 0.7,
                }}
              >
                {q.attr}
              </span>
            </div>
          ))}
        </AnimateIn>
      </div>
    </section>
  )
}
