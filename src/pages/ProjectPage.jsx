import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'

const RTL = { direction: 'rtl', textAlign: 'right' }
const CARD = { background: '#1a1a1a', border: '1px solid rgba(201,168,76,0.12)', padding: '2rem', ...RTL }

export default function ProjectPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = projects.find(p => p.id === id)
  const [activeImg, setActiveImg] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  if (!project) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: '1.5rem' }}>
      <p className="font-playfair gold-text" style={{ fontSize: '4rem' }}>404</p>
      <Link to="/" className="btn-gold">Back to Home</Link>
    </div>
  )

  const idx = projects.findIndex(p => p.id === id)
  const prev = projects[idx - 1]
  const next = projects[idx + 1]

  return (
    <>
      {/* HERO */}
      <section style={{ minHeight: '50vh', paddingTop: '8rem', paddingBottom: '4rem', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${project.color}15 0%, transparent 70%), #0a0a0a` }} />
        <div className="absolute inset-0 grid-bg" style={{ opacity: 0.3 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${project.color}50, transparent)` }} />

        <motion.div
          style={{ position: 'relative', zIndex: 10, padding: '0 2rem', maxWidth: '800px', margin: '0 auto' }}
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        >
          <p style={{ color: project.color, fontSize: '0.7rem', letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
            {project.num} / 07
          </p>
          <h1 className="font-playfair" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1, color: '#f5f0e8', marginBottom: '1rem' }}>
            {project.title}
          </h1>
          <p style={{ color: 'rgba(245,240,232,0.45)', fontSize: '1.1rem', fontWeight: 300, marginBottom: '1.8rem' }}>
            {project.subtitle}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            {project.tags.map(t => (
              <span key={t} style={{ fontSize: '0.65rem', letterSpacing: '1.5px', padding: '0.3rem 0.8rem', border: `1px solid ${project.color}50`, color: project.color, textTransform: 'uppercase', background: `${project.color}10` }}>
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CONTENT */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem 8rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>

        {/* GALLERY */}
        {project.images.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div onClick={() => setLightbox(true)} style={{ position: 'relative', overflow: 'hidden', cursor: 'zoom-in', border: `1px solid ${project.color}25`, marginBottom: '0.75rem', maxHeight: '600px' }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={project.images[activeImg]}
                  alt={project.title}
                  style={{ width: '100%', height: 'auto', maxHeight: '600px', objectFit: 'contain', display: 'block', background: '#111' }}
                  initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
                />
              </AnimatePresence>
              <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(0,0,0,0.75)', color: project.color, fontSize: '0.7rem', letterSpacing: '2px', padding: '0.3rem 0.8rem', border: `1px solid ${project.color}30` }}>
                {activeImg + 1} / {project.images.length}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {project.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} style={{ width: '72px', aspectRatio: '16/9', overflow: 'hidden', cursor: 'pointer', border: `1px solid ${i === activeImg ? project.color : 'rgba(201,168,76,0.15)'}`, opacity: i === activeImg ? 1 : 0.45, transition: 'opacity 0.3s, border-color 0.3s', background: 'none', padding: 0 }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {project.images.length === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem', background: '#1a1a1a', border: '1px solid rgba(201,168,76,0.12)', gap: '1rem' }}>
            <span style={{ fontSize: '5rem' }}>🍽️</span>
            <p style={{ color: 'rgba(201,168,76,0.4)', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase' }}>Backend API — No UI Screenshots</p>
          </div>
        )}

        {/* DESCRIPTION + FEATURES */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

          <motion.div style={CARD} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p style={{ color: project.color, fontSize: '1rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
              אודות הפרויקט
            </p>
            <p style={{ color: 'rgba(245,240,232,0.85)', lineHeight: 2, fontSize: '1rem' }}>
              {project.description}
            </p>
          </motion.div>

          <motion.div style={CARD} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p style={{ color: project.color, fontSize: '1rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
              פיצ'רים עיקריים
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {project.features.map((f, i) => (
                <motion.li key={i} style={{ display: 'flex', gap: '0.75rem', color: 'rgba(245,240,232,0.85)', fontSize: '1rem', lineHeight: 1.8, direction: 'rtl', textAlign: 'right' }}
                  initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                  <span style={{ color: project.color, flexShrink: 0, marginTop: '0.3rem' }}>◆</span>
                  {f}
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* ACTIONS */}
        <motion.div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="btn-gold">GitHub →</a>}
          {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className="btn-outline">{project.demoLabel}</a>}
          {project.isPrivate && <span className="btn-gold" style={{ opacity: 0.5, cursor: 'default' }}>מערכת פנימית — קוד חסוי</span>}
        </motion.div>

        {/* PREV / NEXT */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          {prev ? (
            <Link to={`/project/${prev.id}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <span style={{ color: 'rgba(201,168,76,0.4)', fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase' }}>← Previous</span>
              <span className="font-playfair" style={{ color: '#f5f0e8', fontSize: '1.2rem' }}>{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link to={`/project/${next.id}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem', textAlign: 'right' }}>
              <span style={{ color: 'rgba(201,168,76,0.4)', fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase' }}>Next →</span>
              <span className="font-playfair" style={{ color: '#f5f0e8', fontSize: '1.2rem' }}>{next.title}</span>
            </Link>
          ) : <div />}
        </div>

      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'rgba(0,0,0,0.95)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
          >
            <motion.img src={project.images[activeImg]} alt="" style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }} initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }} onClick={e => e.stopPropagation()} />
            <button onClick={() => setLightbox(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: `1px solid ${project.color}50`, color: project.color, width: '40px', height: '40px', cursor: 'pointer', fontSize: '1rem' }}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid rgba(201,168,76,0.1)', color: 'rgba(245,240,232,0.3)', fontSize: '0.75rem', letterSpacing: '2px' }}>
        © 2024 Ester Davida · All Rights Reserved
      </footer>
    </>
  )
}
