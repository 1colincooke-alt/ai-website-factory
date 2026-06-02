import { COLORS } from '../constants.js'
import AnimateIn from './AnimateIn.jsx'
import CTAButton from './CTAButton.jsx'

export default function CtaBanner() {
  return (
    <section
      style={{
        background: COLORS.graphite,
        padding: '88px 24px',
        borderTop: '1px solid rgba(201,169,110,0.15)',
        borderBottom: '1px solid rgba(201,169,110,0.15)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(201,169,110,0.06) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 800,
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <AnimateIn>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(30px, 4vw, 52px)',
              color: COLORS.cream,
              fontWeight: 300,
              margin: '0 0 20px',
              lineHeight: 1.15,
            }}
          >
            Ready to Begin Your{' '}
            <em style={{ color: COLORS.gold, fontStyle: 'italic' }}>
              Transformation?
            </em>
          </h2>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 20,
              color: COLORS.mist,
              opacity: 0.68,
              marginBottom: 44,
              lineHeight: 1.65,
            }}
          >
            Your complimentary consultation includes a full facial assessment
            and personalized treatment roadmap — no commitment required.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 16,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <CTAButton href="tel:9169009434" primary>
              Call (916) 900-9434
            </CTAButton>
            <CTAButton
              href="https://onemedspa.co"
              style={{
                color: COLORS.mist,
                borderColor: 'rgba(255,255,255,0.18)',
              }}
            >
              View Full Site
            </CTAButton>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
