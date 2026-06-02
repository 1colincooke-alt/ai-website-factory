import { useInView } from '../hooks/useInView.js'

export default function AnimateIn({ children, delay = 0, y = 32, style = {} }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      style={{
        transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
        opacity: inView ? 1 : 0,
        transition: `transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, opacity 0.9s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
