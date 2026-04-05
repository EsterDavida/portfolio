import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dot = useRef()
  const ring = useRef()

  useEffect(() => {
    const move = (e) => {
      const x = e.clientX
      const y = e.clientY
      if (dot.current) {
        dot.current.style.left = x + 'px'
        dot.current.style.top = y + 'px'
      }
      if (ring.current) {
        ring.current.style.left = x + 'px'
        ring.current.style.top = y + 'px'
      }
    }

    const grow = () => ring.current && (ring.current.style.transform = 'translate(-50%,-50%) scale(1.8)')
    const shrink = () => ring.current && (ring.current.style.transform = 'translate(-50%,-50%) scale(1)')

    window.addEventListener('mousemove', move)
    document.querySelectorAll('a,button,[class*="card"],article').forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })

    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div ref={dot} style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 9999,
        width: '6px', height: '6px', borderRadius: '50%',
        background: '#c9a84c',
        transform: 'translate(-50%,-50%)',
        transition: 'left 0.05s, top 0.05s',
      }} />
      <div ref={ring} style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 9998,
        width: '32px', height: '32px', borderRadius: '50%',
        border: '1px solid rgba(201,168,76,0.6)',
        transform: 'translate(-50%,-50%)',
        transition: 'left 0.12s, top 0.12s, transform 0.3s',
      }} />
    </>
  )
}
