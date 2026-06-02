import { useState, useEffect } from 'react'
import { COLORS } from '../constants.js'
import OrbCanvas from './OrbCanvas.jsx'
import ParticleField from './ParticleField.jsx'
import GoldLine from './GoldLine.jsx'
import CTAButton from './CTAButton.jsx'
import StarRating from './StarRating.jsx'

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="top"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: COLORS.obsidian,
      }}
    >
      <OrbCanvas />
      <ParticleField />

      {/* Geometric grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(201,169,110,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,11,0.6) 100%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '140px 24px 100px',
          maxWidth: 960,
          margin: '0 auto',
        }}
      >
        {/* Star badge */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1.2s cubic-bezier(0.16,1,0.3,1)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 44,
            padding: '10px 28px',
            border: '1px solid rgba(201,169,110,0.3)',
            borderRadius: 100,
          }}
        >
          <StarRating />
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 15,
              color: COLORS.mist,
              letterSpacing: '0.08em',
            }}
          >
            5.0 · 19 Reviews · Sacramento, CA
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 1.4s cubic-bezier(0.16,1,0.3,1) 0.15s',
          }}
        >
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(50px, 8vw, 108px)',
              fontWeight: 300,
              lineHeight: 0.92,
              color: COLORS.cream,
              margin: '0 0 4px',
              letterSpacing: '-0.02em',
            }}
          >
            Where Artistry
          </h1>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(50px, 8vw, 108px)',
              fontWeight: 600,
              fontStyle: 'italic',
              lineHeight: 0.92,
              background: `linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.goldLight} 50%, ${COLORS.gold} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: '0 0 32px',
              letterSpacing: '-0.02em',
            }}
          >
            Meets Medicine
          </h1>
        </div>

        {/* Subtext and CTAs */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1.2s ease 0.45s',
          }}
        >
          <GoldLine width={80} style={{ marginBottom: 36 }} />
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(18px, 2.5vw, 24px)',
              fontWeight: 300,
              color: COLORS.mist,
              lineHeight: 1.7,
              maxWidth: 580,
              margin: '0 auto 52px',
              opacity: 0.85,
            }}
          >
            Sacramento's premier medical spa where precision injection artistry
            and evidence-based skincare converge to reveal your most radiant self.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 16,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <CTAButton href="#contact" primary>
              Book Consultation
            </CTAButton>
            <CTAButton href="#services">Explore Services</CTAButton>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 1s ease 1.8s',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 11,
              color: COLORS.gold,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: 1,
              height: 48,
              background: `linear-gradient(${COLORS.gold}, transparent)`,
              animation: 'scrollPulse 2s ease infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
          50% { opacity: 1; transform: scaleY(1); }
        }
      `}</style>
    </section>
  )
}
