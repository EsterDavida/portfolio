import { motion } from 'framer-motion'

const filters = ['All', 'Angular', 'React', 'AI', 'Python', '.NET']

export default function ProjectFilter({ active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
      {filters.map(f => (
        <motion.button
          key={f}
          onClick={() => onChange(f)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '0.5rem 1.4rem',
            fontSize: '0.7rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            border: `1px solid ${active === f ? '#c9a84c' : 'rgba(201,168,76,0.2)'}`,
            background: active === f ? 'rgba(201,168,76,0.12)' : 'transparent',
            color: active === f ? '#c9a84c' : 'rgba(245,240,232,0.4)',
            transition: 'all 0.3s',
          }}
        >
          {f}
        </motion.button>
      ))}
    </div>
  )
}
