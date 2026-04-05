import { useState, useEffect } from 'react'

const words = ['Full Stack Developer', 'AI Builder', 'Chatbot Developer', 'UI/UX Designer', 'Problem Solver']

export default function Typewriter() {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[idx]
    const speed = deleting ? 40 : 80

    const timer = setTimeout(() => {
      if (!deleting && text === current) {
        setTimeout(() => setDeleting(true), 1800)
        return
      }
      if (deleting && text === '') {
        setDeleting(false)
        setIdx(i => (i + 1) % words.length)
        return
      }
      setText(prev => deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1))
    }, speed)

    return () => clearTimeout(timer)
  }, [text, deleting, idx])

  return (
    <span style={{ color: '#c9a84c' }}>
      {text}
      <span style={{ borderRight: '2px solid #c9a84c', marginLeft: '2px', animation: 'blink 1s infinite' }} />
    </span>
  )
}
