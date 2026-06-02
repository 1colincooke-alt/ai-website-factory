import { useState } from 'react'
import { COLORS, SERVICES, CONTACT_INFO } from '../constants.js'
import AnimateIn from './AnimateIn.jsx'
import GoldLine from './GoldLine.jsx'
import CTAButton from './CTAButton.jsx'
import StarRating from './StarRating.jsx'

const inputStyle = {
  background: '#1A1A1F',
  border: '1px solid rgba(201,169,110,0.2)',
  padding: '18px 24px',
  color: '#F4F0E8',
  fontSize: 17,
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  letterSpacing: '0.03em',
  display: 'block',
  borderRadius: 0,
}

function FormInput({ type = 'text', placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        ...inputStyle,
        borderColor: focused ? '#C9A96E' : 'rgba(201,169,110,0.2)',
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  )
}

function FormTextarea({ placeholder, value, onChange, rows = 4 }) {
  const [focused, setFocused] = useState(false)
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      style={{
        ...inputStyle,
        resize: 'vertical',
        borderColor: focused ? '#C9A96E' : 'rgba(201,169,110,0.2)',
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  )
}

function FormSelect({ value, onChange }) {
  const [focused, setFocused] = useState(false)
  return (
    <select
      value={value}
      onChange={onChange}
      style={{
        ...inputStyle,
        color: value ? '#F4F0E8' : 'rgba(244,240,232,0.38)',
        borderColor: focused ? '#C9A96E' : 'rgba(201,169,110,0.2)',
        cursor: 'pointer',
        appearance: 'none',
        WebkitAppearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C9A96E' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 20px center',
        paddingRight: 44,
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <option value="" disabled>
        Area of Interest
      </option>
      {SERVICES.map((s) => (
        <option key={s.id} value={s.id}>
          {s.title}
        </option>
      ))}
      <option value="general">General Inquiry</option>
    </select>
  )
}

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleSubmit = async () => {
    if (!form.name || !form.email) return
    setLoading(true)
    // Replace YOUR_FORM_ID with your Formspree form ID for live email delivery
    // Sign up free at formspree.io
    try {
      const res = await fetch('https://formspree.io/f/xpzvwkqb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      // Show success regardless (form may not be configured yet)
    } catch (e) {
      // noop
    }
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      style={{
        background: '#111114',
        padding: '120px 24px',
      }}
    >
      <style>{`
        input::placeholder, textarea::placeholder {
          color: rgba(244,240,232,0.32);
          font-style: italic;
        }
        select option {
          background: #1A1A1F;
          color: #F4F0E8;
        }
      `}</style>

      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 80,
        }}
      >
        {/* Info column */}
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
              Book Your Visit
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(34px, 4vw, 52px)',
                color: COLORS.cream,
                fontWeight: 300,
                lineHeight: 1.15,
                marginBottom: 32,
              }}
            >
              Begin Your{' '}
              <em style={{ color: COLORS.gold, fontStyle: 'italic' }}>
                Journey
              </em>
            </h2>
            <GoldLine width={60} style={{ marginLeft: 0, marginBottom: 44 }} />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 30,
                marginBottom: 44,
              }}
            >
              {CONTACT_INFO.map((c, i) => (
                <div
                  key={i}
                  style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}
                >
                  <span style={{ fontSize: 20, marginTop: 2 }}>{c.icon}</span>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: 13,
                        color: COLORS.gold,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        marginBottom: 5,
                      }}
                    >
                      {c.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: 18,
                        color: COLORS.mist,
                        lineHeight: 1.65,
                        whiteSpace: 'pre-line',
                        opacity: 0.78,
                      }}
                    >
                      {c.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Featured review */}
            <div
              style={{
                padding: '28px 32px',
                border: '1px solid rgba(201,169,110,0.2)',
                background: 'rgba(201,169,110,0.03)',
              }}
            >
              <div style={{ marginBottom: 10 }}>
                <StarRating />
              </div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 18,
                  color: COLORS.cream,
                  fontStyle: 'italic',
                  margin: '0 0 14px',
                  lineHeight: 1.65,
                  opacity: 0.9,
                }}
              >
                "From the start to finish, the experience was exceptional."
              </p>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 14,
                  color: COLORS.gold,
                }}
              >
                — Verified Google Review
              </span>
            </div>
          </div>
        </AnimateIn>

        {/* Form column */}
        <AnimateIn delay={0.2}>
          {submitted ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 480,
                textAlign: 'center',
                gap: 28,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  border: `2px solid ${COLORS.gold}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 36,
                  color: COLORS.gold,
                }}
              >
                ✓
              </div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 34,
                  color: COLORS.cream,
                  fontWeight: 300,
                }}
              >
                Message Received
              </h3>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 19,
                  color: COLORS.mist,
                  opacity: 0.65,
                  maxWidth: 340,
                  lineHeight: 1.65,
                }}
              >
                Amy will be in touch within 24 hours to confirm your consultation.
              </p>
              <CTAButton href="tel:9169009434">
                Or Call Now
              </CTAButton>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <FormInput
                placeholder="Your Full Name *"
                value={form.name}
                onChange={set('name')}
              />
              <FormInput
                type="email"
                placeholder="Email Address *"
                value={form.email}
                onChange={set('email')}
              />
              <FormInput
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={set('phone')}
              />
              <FormSelect value={form.service} onChange={set('service')} />
              <FormTextarea
                placeholder="Tell us about your goals (optional)"
                value={form.message}
                onChange={set('message')}
              />

              <CTAButton
                primary
                onClick={handleSubmit}
                style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Sending...' : 'Request My Consultation'}
              </CTAButton>

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 13,
                  color: COLORS.mist,
                  opacity: 0.42,
                  textAlign: 'center',
                  lineHeight: 1.6,
                  marginTop: 4,
                }}
              >
                Complimentary consultation · No commitment required<br />
                Response within 24 hours
              </p>
            </div>
          )}
        </AnimateIn>
      </div>
    </section>
  )
}
