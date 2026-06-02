import { COLORS, DIFFERENTIATORS } from '../constants.js'

export default function DifferentiatorsBar() {
  return (
    <section
      style={{
        background: COLORS.charcoal,
        borderTop: '1px solid rgba(201,169,110,0.15)',
        borderBottom: '1px solid rgba(201,169,110,0.15)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        }}
      >
        {DIFFERENTIATORS.map((d, i) => (
          <div
            key={i}
            style={{
              padding: '36px 32px',
              textAlign: 'center',
              borderRight:
                i < DIFFERENTIATORS.length - 1
                  ? '1px solid rgba(201,169,110,0.12)'
                  : 'none',
            }}
          >
            <div
              style={{
                fontSize: 22,
                color: COLORS.gold,
                marginBottom: 12,
              }}
            >
              {d.icon}
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 20,
                color: COLORS.cream,
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              {d.title}
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 14,
                color: COLORS.mist,
                opacity: 0.55,
                letterSpacing: '0.04em',
              }}
            >
              {d.sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
