import { useEffect, useRef } from 'react'

export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const pts = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      life: Math.random(),
      size: Math.random() * 1.5 + 0.5,
    }))

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.life += 0.003
        if (p.y < 0 || p.life > 1) {
          p.x = Math.random() * canvas.width
          p.y = canvas.height + 10
          p.life = 0
        }
        const alpha = Math.sin(p.life * Math.PI) * 0.5
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,169,110,${alpha})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(raf)
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
