import { useEffect, useRef } from 'react'

export default function SparkleBorder({ color = '#c9a84c' }) {
  const canvasRef = useRef()
  const containerRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    const ctx = canvas.getContext('2d')
    let particles = []
    let animId

    const setSize = () => {
      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
    }
    setSize()

    // Get perimeter points of the card border
    const getBorderPoints = () => {
      const w = canvas.width
      const h = canvas.height
      const gap = 3
      const points = []
      // top
      for (let x = 0; x <= w; x += gap) points.push({ x, y: 0 })
      // right
      for (let y = 0; y <= h; y += gap) points.push({ x: w, y })
      // bottom
      for (let x = w; x >= 0; x -= gap) points.push({ x, y: h })
      // left
      for (let y = h; y >= 0; y -= gap) points.push({ x: 0, y })
      return points
    }

    class Particle {
      constructor(x, y) {
        this.x = x + (Math.random() - 0.5) * 4
        this.y = y + (Math.random() - 0.5) * 4
        this.size = Math.random() * 0.9 + 0.3
        this.alpha = Math.random() * 0.8 + 0.2
        this.life = Math.random() * 60 + 30
        this.maxLife = this.life
        this.vx = (Math.random() - 0.5) * 0.4
        this.vy = (Math.random() - 0.5) * 0.4
        this.twinkle = Math.random() * Math.PI * 2
        this.hue = 44 + Math.random() * 10
        this.light = 78 + Math.random() * 16
      }

      update() {
        this.twinkle += 0.15
        this.x += this.vx
        this.y += this.vy
        this.life--
        this.alpha = (this.life / this.maxLife) * (0.6 + Math.sin(this.twinkle) * 0.4)
      }

      draw() {
        if (this.alpha <= 0) return
        ctx.save()
        ctx.globalAlpha = Math.max(0, this.alpha)
        ctx.shadowBlur = 5
        ctx.shadowColor = `hsl(${this.hue}, 100%, ${this.light}%)`
        ctx.fillStyle = `hsl(${this.hue}, 100%, ${this.light}%)`
        ctx.strokeStyle = `hsl(${this.hue}, 100%, ${this.light}%)`
        ctx.lineWidth = 0.3

        const s = this.size * (0.9 + Math.sin(this.twinkle) * 0.1)

        // dot
        ctx.beginPath()
        ctx.arc(this.x, this.y, s, 0, Math.PI * 2)
        ctx.fill()

        // cross
        ctx.globalAlpha = Math.max(0, this.alpha) * 0.5
        ctx.beginPath()
        ctx.moveTo(this.x - s * 2.5, this.y)
        ctx.lineTo(this.x + s * 2.5, this.y)
        ctx.moveTo(this.x, this.y - s * 2.5)
        ctx.lineTo(this.x, this.y + s * 2.5)
        ctx.stroke()

        ctx.restore()
      }

      isDead() { return this.life <= 0 }
    }

    let borderPoints = getBorderPoints()
    let pointIndex = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // spawn 3 particles per frame along the border
      for (let i = 0; i < 3; i++) {
        const pt = borderPoints[pointIndex % borderPoints.length]
        particles.push(new Particle(pt.x, pt.y))
        pointIndex++
      }

      particles.forEach(p => { p.update(); p.draw() })
      particles = particles.filter(p => !p.isDead())

      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  )
}
