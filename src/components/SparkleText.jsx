import { useEffect, useRef } from 'react'

export default function SparkleText() {
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

    const HOLD_FRAMES = 10 * 60

    const getTextPixels = () => {
      const offscreen = document.createElement('canvas')
      offscreen.width = canvas.width
      offscreen.height = canvas.height
      const octx = offscreen.getContext('2d')
      const fontSize = Math.floor(canvas.height * 0.75)
      octx.font = `700 ${fontSize}px Playfair Display, serif`
      octx.fillStyle = '#ffffff'
      octx.textAlign = 'center'
      octx.textBaseline = 'middle'
      octx.fillText('Ester Davida', canvas.width / 2, canvas.height / 2)
      const data = octx.getImageData(0, 0, canvas.width, canvas.height).data
      const pixels = []
      const gap = 2
      for (let y = 0; y < canvas.height; y += gap) {
        for (let x = 0; x < canvas.width; x += gap) {
          if (data[(y * canvas.width + x) * 4 + 3] > 128) pixels.push({ x, y })
        }
      }
      return pixels
    }

    class Particle {
      constructor(tx, ty) {
        this.tx = tx
        this.ty = ty
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 0.8 + 0.4
        this.speed = Math.random() * 0.06 + 0.04
        this.alpha = 0
        this.color = `hsl(${44 + Math.random() * 8}, 100%, ${82 + Math.random() * 12}%)`
        this.phase = 'fly'
        this.holdTimer = HOLD_FRAMES + Math.random() * 30
        this.twinkle = Math.random() * Math.PI * 2
      }

      update() {
        this.twinkle += 0.1
        if (this.phase === 'fly') {
          this.x += (this.tx - this.x) * this.speed
          this.y += (this.ty - this.y) * this.speed
          this.alpha = Math.min(this.alpha + 0.05, 1)
          if (Math.abs(this.tx - this.x) < 0.8 && Math.abs(this.ty - this.y) < 0.8) {
            this.phase = 'hold'
          }
        } else if (this.phase === 'hold') {
          this.holdTimer--
          this.alpha = 0.7 + Math.sin(this.twinkle) * 0.3
          if (this.holdTimer <= 0) this.phase = 'fade'
        } else {
          this.alpha -= 0.018
          this.x += (Math.random() - 0.5) * 0.6
          this.y -= Math.random() * 0.4
        }
      }

      draw() {
        if (this.alpha <= 0) return
        ctx.save()
        ctx.globalAlpha = Math.max(0, this.alpha)

        const s = this.size * (0.9 + Math.sin(this.twinkle) * 0.1)

        // outer glow
        ctx.shadowBlur = 6
        ctx.shadowColor = this.color

        // tiny circle dot
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, s, 0, Math.PI * 2)
        ctx.fill()

        // cross sparkle lines
        ctx.strokeStyle = this.color
        ctx.lineWidth = 0.4
        ctx.globalAlpha = Math.max(0, this.alpha) * 0.6
        ctx.beginPath()
        ctx.moveTo(this.x - s * 2.5, this.y)
        ctx.lineTo(this.x + s * 2.5, this.y)
        ctx.moveTo(this.x, this.y - s * 2.5)
        ctx.lineTo(this.x, this.y + s * 2.5)
        ctx.stroke()

        ctx.restore()
      }

      isDead() { return this.phase === 'fade' && this.alpha <= 0 }
    }

    const spawn = () => {
      particles = []
      const pixels = getTextPixels()
      const count = Math.min(pixels.length, 2500)
      const step = Math.max(1, Math.floor(pixels.length / count))
      for (let i = 0; i < pixels.length; i += step) {
        particles.push(new Particle(pixels[i].x, pixels[i].y))
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      particles = particles.filter(p => !p.isDead())
      animId = requestAnimationFrame(animate)
    }

    spawn()
    animate()
    const interval = setInterval(spawn, 18000)

    return () => {
      cancelAnimationFrame(animId)
      clearInterval(interval)
    }
  }, [])

  return (
    <div ref={containerRef} style={{
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '860px',
      height: '64px',
      pointerEvents: 'none',
    }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  )
}
