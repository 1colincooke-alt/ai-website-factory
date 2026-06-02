import { useEffect, useRef } from 'react'

const ORBS = [
  { x: 0.2, y: 0.3, r: 280, color: 'rgba(201,169,110,0.08)', sx: 0.0003 },
  { x: 0.8, y: 0.6, r: 350, color: 'rgba(212,160,160,0.06)', sx: 0.0002 },
  { x: 0.5, y: 0.8, r: 200, color: 'rgba(139,168,154,0.07)', sx: 0.0004 },
]

export default function OrbCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let t = 0

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resize()
    window.addEventListener('resize', resize)

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ORBS.forEach((o) => {
        const x = (o.x + Math.sin(t * o.sx * 1000) * 0.08) * canvas.width
        const y = (o.y + Math.cos(t * o.sx * 800) * 0.06) * canvas.height
        const grad = ctx.createRadialGradient(x, y, 0, x, y, o.r)
        grad.addColorStop(0, o.color)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(x, y, o.r, 0, Math.PI * 2)
        ctx.fill()
      })
      t++
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}
