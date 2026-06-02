import { useState } from 'react'
import { COLORS, SERVICES } from '../constants.js'
import AnimateIn from './AnimateIn.jsx'
import GoldLine from './GoldLine.jsx'
import CTAButton from './CTAButton.jsx'

function ServiceCard({ service, isActive, onEnter, onLeave }) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        padding: '48px 40px',
        background: isActive ? COLORS.graphite : 'transparent',
        border: `1px solid ${isActive ? 'rgba(201,169,110,0.3)' : 'rgba(201,169,110,0.1)'}`,
        cursor: 'pointer',
        transition: 'all 0.4s ease',
        transform: isActive ? 'translateY(-4px)' : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {isActive && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`,
          }}
        />
      )}
      <div
        style={{
          fontSize: 26,
          color: service.color,
          marginBottom: 20,
          transition: 'transform 0.3s',
          transform: isActive ? 'scale(1.1)' : 'scale(1)',
          display: 'inline-block',
        }}
      >
        {service.icon}
      </div>
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 28,
          color: COLORS.cream,
          fontWeight: 600,
          margin: '0 0 8px',
        }}
      >
        {service.title}
      </h3>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 13,
          color: service.color,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          margin: '0 0 18px',
          opacity: 0.85,
        }}
      >
        {service.subtitle}
      </p>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 17,
          color: COLORS.mist,
          lineHeight: 1.7,
          margin: '0 0 24px',
          opacity: 0.72,
        }}
      >
        {service.desc}
      </p>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 15,
          color: COLORS.gold,
          fontStyle: 'italic',
        }}
      >
        {service.price}
      </div>
    </div>
  )
}

export default function ServicesSection() {
  const [active, setActive] = useState(null)

  return (
    <section
      id="services"
      style={{
        background: COLORS.charcoal,
        padding: '120px 24px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <AnimateIn>
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
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
              Our Offerings
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(38px, 5vw, 64px)',
                color: COLORS.cream,
                fontWeight: 300,
                margin: '0 0 24px',
                lineHeight: 1.1,
              }}
            >
              Treatments Crafted{' '}
              <em style={{ fontStyle: 'italic', color: COLORS.gold }}>
                For You
              </em>
            </h2>
            <GoldLine width={60} />
          </div>
        </AnimateIn>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 2,
          }}
        >
          {SERVICES.map((s, i) => (
            <AnimateIn key={s.id} delay={i * 0.07}>
              <ServiceCard
                service={s}
                isActive={active === s.id}
                onEnter={() => setActive(s.id)}
                onLeave={() => setActive(null)}
              />
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={0.3} style={{ textAlign: 'center', marginTop: 68 }}>
          <CTAButton href="tel:9169009434" primary>
            Schedule Your Consultation
          </CTAButton>
        </AnimateIn>
      </div>
    </section>
  )
}
