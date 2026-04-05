import { motion } from 'framer-motion'

const skills = [
  { name: 'Angular', level: 90 },
  { name: 'React / Next.js', level: 88 },
  { name: 'TypeScript', level: 85 },
  { name: '.NET / C#', level: 80 },
  { name: 'Python / Flask', level: 78 },
  { name: 'SQL Server', level: 82 },
  { name: 'OpenAI / LangChain', level: 85 },
  { name: 'UI/UX Design', level: 80 },
]

export default function SkillsBars() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      {skills.map((s, i) => (
        <div key={s.name}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'rgba(245,240,232,0.8)' }}>{s.name}</span>
            <span style={{ fontSize: '0.75rem', color: '#c9a84c' }}>{s.level}%</span>
          </div>
          <div style={{ height: '4px', background: 'rgba(201,168,76,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
            <motion.div
              style={{ height: '100%', background: 'linear-gradient(90deg, #c9a84c, #e8c97a)', borderRadius: '2px' }}
              initial={{ width: 0 }}
              whileInView={{ width: `${s.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.08, ease: 'easeOut' }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
