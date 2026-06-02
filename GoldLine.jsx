import { COLORS } from '../constants.js'

export default function GoldLine({ width = '100%', style = {} }) {
  return (
    <div
      style={{
        width,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
        margin: '0 auto',
        ...style,
      }}
    />
  )
}
