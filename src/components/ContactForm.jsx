import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

const SERVICE_ID = 'service_px2jev9'
const TEMPLATE_ID = 'template_iwvx3yw'
const PUBLIC_KEY = 'mc_OmYMfi8n-MO3bf'

export default function ContactForm() {
  const formRef = useRef()
  const [form, setForm] = useState({ name: '', email: '', message: '', title: 'Portfolio Contact' })
  const [status, setStatus] = useState('idle')

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        name: form.name,
        email: form.email,
        message: form.message,
        title: 'Portfolio Contact',
      }, PUBLIC_KEY)
      setStatus('success')
      setForm({ name: '', email: '', message: '', title: 'Portfolio Contact' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch (err) {
      console.error(err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const INPUT = {
    width: '100%', padding: '0.9rem 1.2rem',
    background: '#111', border: '1px solid rgba(201,168,76,0.2)',
    color: '#f5f0e8', fontSize: '0.9rem', outline: 'none',
    fontFamily: 'Heebo, sans-serif', direction: 'rtl',
  }

  return (
    <form ref={formRef} onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <input name="title" value={form.title} type="hidden" readOnly />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <input name="name" placeholder="שם מלא" value={form.name} onChange={handle} required style={INPUT} />
        <input name="email" type="email" placeholder="אימייל" value={form.email} onChange={handle} required style={INPUT} />
      </div>
      <textarea name="message" placeholder="הודעה..." value={form.message} onChange={handle} required rows={5}
        style={{ ...INPUT, resize: 'vertical' }} />
      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(201,168,76,0.4)' }}
        whileTap={{ scale: 0.97 }}
        className="btn-gold"
        style={{ alignSelf: 'flex-start', opacity: status === 'sending' ? 0.7 : 1 }}
      >
        {status === 'sending' ? '...שולח' : status === 'success' ? '✓ נשלח בהצלחה!' : status === 'error' ? '✕ שגיאה, נסי שוב' : 'שלח הודעה'}
      </motion.button>
    </form>
  )
}
