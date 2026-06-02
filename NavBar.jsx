import { useState, useEffect } from 'react'
import { COLORS } from '../constants.js'
import CTAButton from './CTAButton.jsx'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    handleResize()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '14px 48px' : '24px 48px',
          background: scrolled ? 'rgba(10,10,11,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,169,110,0.15)' : 'none',
          transition: 'all 0.4s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <a
          href="#top"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 22,
            color: COLORS.cream,
            letterSpacing: '0.15em',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          ONE <span style={{ color: COLORS.gold }}>MED SPA</span>
        </a>

        {!isMobile && (
          <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
            {NAV_LINKS.map((l) => (
              <NavLink key={l.label} href={l.href}>
                {l.label}
              </NavLink>
            ))}
            <CTAButton href="tel:9169009434" style={{ padding: '10px 24px', fontSize: 13 }}>
              Book Now
            </CTAButton>
          </div>
        )}

        {isMobile && (
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: COLORS.gold,
              fontSize: 28,
              lineHeight: 1,
              padding: 4,
            }}
          >
            ≡
          </button>
        )}
      </nav>

      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: COLORS.obsidian,
            zIndex: 2000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 36,
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              position: 'absolute',
              top: 24,
              right: 32,
              background: 'none',
              border: 'none',
              color: COLORS.gold,
              fontSize: 36,
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            ×
          </button>

          <div
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 20,
              color: COLORS.gold,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            ONE MED SPA
          </div>

          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 32,
                color: COLORS.cream,
                textDecoration: 'none',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {l.label}
            </a>
          ))}

          <div style={{ marginTop: 16 }}>
            <CTAButton href="tel:9169009434" primary onClick={() => setMenuOpen(false)}>
              Book Consultation
            </CTAButton>
          </div>
        </div>
      )}
    </>
  )
}

function NavLink({ href, children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      style={{
        color: hovered ? COLORS.gold : COLORS.mist,
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 15,
        letterSpacing: '0.1em',
        textDecoration: 'none',
        textTransform: 'uppercase',
        opacity: hovered ? 1 : 0.8,
        transition: 'all 0.2s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  )
}
