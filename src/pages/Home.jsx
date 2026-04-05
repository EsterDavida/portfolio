import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Scene3D from '../components/Scene3D'
import ProjectCard from '../components/ProjectCard'
import ProjectFilter from '../components/ProjectFilter'
import { projects } from '../data/projects'

export default function Home() {
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All'
    ? projects
    : projects.filter(p => p.tags.some(t => t.toLowerCase().includes(filter.toLowerCase())))

  return (
    <>
      {/* HERO */}
      <section style={{ height: '100vh', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.13) 0%, transparent 70%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 40% 40% at 50% 100%, rgba(201,168,76,0.06) 0%, transparent 60%)' }} />
        <Scene3D />

        <motion.div style={{ position: 'relative', zIndex: 10, padding: '0 1.5rem', textAlign: 'center' }}
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>

          <motion.p style={{ color: '#c9a84c', fontSize: '0.75rem', letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '1.2rem' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Full Stack Developer · AI Builder
          </motion.p>

          <motion.h1 className="font-playfair gold-text"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', lineHeight: 1, marginBottom: '1.5rem' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
            Ester Davida
          </motion.h1>

          <motion.p style={{ color: 'rgba(245,240,232,0.5)', fontSize: '1.05rem', fontWeight: 300, letterSpacing: '1px', marginBottom: '2.5rem' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            Building impressive digital experiences with cutting-edge technologies
          </motion.p>

          <motion.div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
            <a href="#projects" className="btn-gold">View Projects</a>
            <Link to="/about" className="btn-outline">About Me</Link>
          </motion.div>
        </motion.div>

        <motion.div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', color: 'rgba(201,168,76,0.5)', fontSize: '1rem' }}
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>↓</motion.div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: '7rem 5vw' }}>

        <motion.div style={{ textAlign: 'center', marginBottom: '4rem' }}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p style={{ color: '#c9a84c', fontSize: '0.7rem', letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '1rem' }}>My Work</p>
          <h2 className="font-playfair gold-text" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>Portfolio</h2>
          <div style={{ width: '80px', height: '1px', background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)', margin: '0 auto 3rem' }} />
          <ProjectFilter active={filter} onChange={setFilter} />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', maxWidth: '1400px', margin: '0 auto' }}
          >
            {filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: 'rgba(201,168,76,0.4)', letterSpacing: '3px', fontSize: '0.8rem', textTransform: 'uppercase' }}>
            No projects found
          </p>
        )}
      </section>

      <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid rgba(201,168,76,0.1)', color: 'rgba(245,240,232,0.3)', fontSize: '0.75rem', letterSpacing: '2px' }}>
        © 2024 Ester Davida · All Rights Reserved
      </footer>
    </>
  )
}
