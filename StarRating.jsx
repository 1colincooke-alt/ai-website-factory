import { COLORS } from '../constants.js'

export default function StarRating({ count = 5 }) {
  return (
    <span style={{ color: COLORS.gold, letterSpacing: 2, fontSize: 14 }}>
      {'★'.repeat(count)}
    </span>
  )
}
