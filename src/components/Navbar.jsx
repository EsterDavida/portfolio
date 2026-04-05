import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import SparkleText from './SparkleText'

export default function Navbar() {
  const { pathname } = useLocation()

  const linkStyle = (path) => ({
    fontSize: '0.8rem',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: pathname === path ? '#c9a84c' : 'rgba(245,240,232,0.55)',
    transition: 'color 0.3s',
    fontWeight: 400,
  })

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.6rem 4rem',
        background: 'rgba(10,10,10,0.9)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(201,168,76,0.15)',
        position: 'fixed',
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <span className="font-playfair gold-text" style={{ fontSize: '2rem', letterSpacing: '4px' }}>ED</span>
      </Link>

      {/* Sparkle name in center */}
      <SparkleText />

      {/* Links */}
      <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
        <Link to="/" style={linkStyle('/')}>Home</Link>
        <Link to="/about" style={linkStyle('/about')}>About</Link>
        <a href="/#projects" style={{ ...linkStyle(''), textDecoration: 'none' }}>Projects</a>
      </div>
    </motion.nav>
  )
}
