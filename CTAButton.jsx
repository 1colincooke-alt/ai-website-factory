import { useState } from 'react'
import { COLORS } from '../constants.js'

export default function CTAButton({ children, primary = false, onClick, href, style = {} }) {
  const [hovered, setHovered] = useState(false)

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    padding: primary ? '16px 40px' : '14px 36px',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: primary ? 17 : 15,
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    textDecoration: 'none',
    border: 'none',
    transition: 'all 0.3s ease',
    ...style,
  }

  const normal = primary
    ? { ...base, background: COLORS.gold, color: COLORS.obsidian }
    : { ...base, background: 'transparent', color: COLORS.gold, border: `1px solid ${COLORS.gold}` }

  const hover = primary
    ? { background: COLORS.goldLight, transform: 'translateY(-2px)', boxShadow: '0 8px 32px rgba(201,169,110,0.3)' }
    : { background: 'rgba(201,169,110,0.08)', transform: 'translateY(-2px)' }

  const finalStyle = { ...normal, ...(hovered ? hover : {}) }

  if (href) {
    return (
      <a
        href={href}
        style={finalStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
        <span style={{ fontSize: 18 }}>→</span>
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      style={finalStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <span style={{ fontSize: 18 }}>→</span>
    </button>
  )
}
