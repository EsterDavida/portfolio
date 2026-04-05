import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function ProjectCard({ project, index }) {
  const cardRef = useRef()
  const navigate = useNavigate()

  const handleMouseMove = (e) => {
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateX = ((y - rect.height / 2) / rect.height) * -10
    const rotateY = ((x - rect.width / 2) / rect.width) * 10
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
    card.style.boxShadow = `0 25px 60px rgba(0,0,0,0.5), 0 0 40px ${project.color}18`
    card.style.borderColor = `${project.color}50`
  }

  const handleMouseLeave = () => {
    cardRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)'
    cardRef.current.style.boxShadow = 'none'
    cardRef.current.style.borderColor = 'rgba(201,168,76,0.12)'
  }

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/project/${project.id}`)}
      style={{
        background: 'linear-gradient(145deg, #1e1e1e 0%, #161616 100%)',
        border: `1px solid ${project.color}40`,
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.3s ease',
        transformStyle: 'preserve-3d',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '320px',
        position: 'relative',
        overflow: 'hidden',
        animation: `glowPulse${index % 4} 3s ease-in-out infinite`,
        animationDelay: `${index * 0.3}s`,
      }}
    >
      {/* Top color bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: `linear-gradient(90deg, transparent 0%, ${project.color} 50%, transparent 100%)`,
      }} />

      {/* Watermark number */}
      <div style={{
        position: 'absolute', bottom: '-20px', right: '16px',
        fontFamily: 'Playfair Display, serif',
        fontSize: '8rem', fontWeight: 900, lineHeight: 1,
        color: `${project.color}08`,
        userSelect: 'none', pointerEvents: 'none',
        letterSpacing: '-4px',
      }}>
        {project.num}
      </div>

      {/* Card content */}
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '1.2rem' }}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '0.85rem', color: `${project.color}70`,
            letterSpacing: '3px',
          }}>
            {project.num}
          </span>
          <div style={{
            width: '36px', height: '36px',
            border: `1px solid ${project.color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: project.color, fontSize: '1rem',
            transition: 'background 0.3s, border-color 0.3s',
          }}>
            →
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: `linear-gradient(90deg, ${project.color}30, transparent)` }} />

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {project.tags.slice(0, 3).map(t => (
            <span key={t} style={{
              fontSize: '0.6rem', letterSpacing: '1.5px', padding: '0.25rem 0.65rem',
              border: `1px solid ${project.color}40`, color: project.color,
              textTransform: 'uppercase', background: `${project.color}08`,
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* Title & subtitle */}
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.5rem', color: '#f5f0e8',
            marginBottom: '0.6rem', lineHeight: 1.2,
          }}>
            {project.title}
          </h3>
          <p style={{
            fontSize: '0.82rem', color: 'rgba(245,240,232,0.4)',
            lineHeight: 1.7,
          }}>
            {project.subtitle}
          </p>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: '1.2rem',
          borderTop: '1px solid rgba(201,168,76,0.08)',
          marginTop: 'auto',
        }}>
          <span style={{
            fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.4)',
          }}>
            View Project
          </span>
          <span style={{ color: project.color, fontSize: '1.1rem', transition: 'transform 0.3s' }}>
            ↗
          </span>
        </div>

      </div>
    </motion.article>
  )
}
