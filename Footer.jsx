import { useState } from 'react'
import { COLORS } from '../constants.js'
import GoldLine from './GoldLine.jsx'

const FOOTER_COLS = [
  {
    title: 'Services',
    links: [
      { label: 'Neuromodulators', href: '#services' },
      { label: 'Dermal Fillers', href: '#services' },
      { label: 'Skin Rejuvenation', href: '#services' },
      { label: 'PRP Therapy', href: '#services' },
      { label: 'Body Contouring', href: '#services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Amy', href: '#about' },
      { label: 'Our Process', href: '#process' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Book Now', href: '#contact' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: '(916) 900-9434', href: 'tel:9169009434' },
      { label: 'onemedspa.co', href: 'https://onemedspa.co' },
      { label: 'Google Maps', href: 'https://maps.google.com/?q=950+Fulton+Ave+Ste+260+Sacramento+CA+95825' },
      { label: 'Book Online', href: 'https://mangomint.com' },
    ],
  },
]

function FooterLink({ href, children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 16,
        color: hovered ? COLORS.gold : COLORS.mist,
        opacity: hovered ? 1 : 0.45,
        textDecoration: 'none',
        transition: 'all 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer
      style={{
        background: COLORS.obsidian,
        padding: '72px 24px 40px',
        borderTop: '1px solid rgba(201,169,110,0.12)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 48,
            marginBottom: 60,
          }}
        >
          <div style={{ maxWidth: 300 }}>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 28,
                color: COLORS.cream,
                letterSpacing: '0.15em',
                fontWeight: 600,
                marginBottom: 10,
              }}
            >
              ONE <span style={{ color: COLORS.gold }}>MED SPA</span>
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 15,
                color: COLORS.mist,
                opacity: 0.45,
                marginBottom: 20,
              }}
            >
              Sacramento&apos;s Premier Medical Spa
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 15,
                color: COLORS.mist,
                opacity: 0.45,
                lineHeight: 1.7,
              }}
            >
              950 Fulton Ave, Ste 260<br />
              Sacramento, CA 95825
            </div>
          </div>

          <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 13,
                    color: COLORS.gold,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    marginBottom: 20,
                  }}
                >
                  {col.title}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {col.links.map((l) => (
                    <FooterLink key={l.label} href={l.href}>
                      {l.label}
                    </FooterLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <GoldLine style={{ marginBottom: 32 }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 13,
              color: COLORS.mist,
              opacity: 0.35,
            }}
          >
            &copy; {new Date().getFullYear()} One Med Spa &middot; 950 Fulton Ave Ste 260, Sacramento, CA 95825
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 13,
              color: COLORS.mist,
              opacity: 0.35,
            }}
          >
            Women-Owned &middot; Asian-Owned &middot; LGBTQ+ Welcoming
          </p>
        </div>
      </div>
    </footer>
  )
}
