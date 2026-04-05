import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Scene3D from '../components/Scene3D'
import ContactForm from '../components/ContactForm'

const skills = [
  { category: 'Frontend', color: '#c9a84c', items: ['Angular', 'React', 'Next.js', 'TypeScript', 'HTML5', 'CSS3', 'SASS'] },
  { category: 'Backend', color: '#7c3aed', items: ['Node.js', '.NET Framework', 'Python', 'Flask', 'Java', 'C#'] },
  { category: 'Databases', color: '#0ea5e9', items: ['SQL Server', 'MongoDB', 'SQL'] },
  { category: 'AI & Tools', color: '#10b981', items: ['OpenAI GPT-4o', 'LangChain', 'Pinecone', 'Git', 'UI/UX Design'] },
]

const stats = [
  { value: 7, label: 'Projects', suffix: '+' },
  { value: 15, label: 'Technologies', suffix: '+' },
  { value: 3, label: 'Years Learning', suffix: '+' },
  { value: 4, label: 'Certifications', suffix: '' },
]

const timeline = [
  { year: '2024', title: 'Practicum — Israel Tax Authority', desc: 'Developed enterprise internal systems including Hot Seat resource management. Java, SQL Server, Angular.', color: '#c9a84c' },
  { year: '2024', title: 'KamaTech Boot Camp', desc: 'Intensive Full-Stack development program. Built multiple real-world projects with modern technologies.', color: '#7c3aed' },
  { year: '2023', title: 'MAHAT Software Engineering', desc: 'Government-certified software engineering diploma. Core CS studies and national certification exams.', color: '#0ea5e9' },
  { year: '2023', title: 'UI/UX Design Certification', desc: 'Professional course in user interface design, wireframing and user experience principles.', color: '#10b981' },
]

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef()
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = value / 40
    const timer = setInterval(() => {
      start += step
      if (start >= value) { setCount(value); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 40)
    return () => clearInterval(timer)
  }, [inView, value])

  return <span ref={ref}>{count}{suffix}</span>
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
})

export default function About() {
  return (
    <>
      {/* HERO */}
      <section style={{ minHeight: '65vh', textAlign: 'center', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: '6rem', paddingBottom: '4rem' }}>
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,168,76,0.1) 0%, transparent 70%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 40% 40% at 50% 100%, rgba(201,168,76,0.07) 0%, transparent 60%)' }} />
        <Scene3D height="65vh" />
        <motion.div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 1.5rem' }} {...fadeUp()}>
          <p style={{ color: '#c9a84c', fontSize: '0.7rem', letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '1rem' }}>Software Engineer</p>
          <h1 className="font-playfair gold-text" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 1, marginBottom: '1rem' }}>Ester Davida</h1>
          <p style={{ color: 'rgba(245,240,232,0.55)', maxWidth: '600px', margin: '0 auto 2rem', fontWeight: 300, lineHeight: 1.8 }}>
            Full-Stack Developer · AI Builder · Chatbot Developer · Game Logic
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
            {['AI Development', 'Chatbot Builder', 'Smart Automation', 'Email Workflows', 'RAG Pipelines'].map(b => (
              <span key={b} style={{ fontSize: '0.65rem', letterSpacing: '1.5px', padding: '0.3rem 0.9rem', border: '1px solid rgba(201,168,76,0.35)', color: '#c9a84c', background: 'rgba(201,168,76,0.06)', textTransform: 'uppercase' }}>{b}</span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section style={{ padding: '4rem 5vw', borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)', background: 'rgba(201,168,76,0.02)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          {stats.map((s, i) => (
            <motion.div key={s.label} {...fadeUp(i * 0.1)}>
              <div className="font-playfair gold-text" style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '0.5rem' }}>
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase' }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '6rem 1.5rem 8rem', display: 'flex', flexDirection: 'column', gap: '6rem' }}>

        {/* SUMMARY */}
        <motion.section style={{ textAlign: 'center' }} {...fadeUp()}>
          <SectionTitle label="Professional Summary" />
          <div style={{ background: '#1a1a1a', border: '1px solid rgba(201,168,76,0.12)', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)' }} />
            <p style={{ color: 'rgba(245,240,232,0.75)', lineHeight: 2.2, fontSize: '1rem', maxWidth: '700px', margin: '0 auto' }}>
              Highly motivated Software Engineer and Full-Stack Developer with a sharp analytical mind and a passion for solving complex algorithmic challenges. Certified in UI/UX Design, enabling the creation of intuitive interfaces alongside efficient, scalable code. Gained hands-on experience developing Enterprise-level systems.
            </p>
          </div>
        </motion.section>

        {/* SKILLS */}
        <motion.section style={{ textAlign: 'center' }} {...fadeUp(0.1)}>
          <SectionTitle label="Technical Skills" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.2rem' }}>
            {skills.map((s, i) => (
              <motion.div key={s.category}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ background: '#1a1a1a', border: `1px solid ${s.color}25`, padding: '1.8rem 1.2rem', position: 'relative', overflow: 'hidden', animation: `glowPulse${i} 3s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
                <p style={{ color: s.color, fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1.2rem' }}>{s.category}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                  {s.items.map(item => (
                    <span key={item} style={{ fontSize: '0.65rem', letterSpacing: '1px', padding: '0.25rem 0.6rem', border: `1px solid ${s.color}40`, color: s.color, background: `${s.color}08` }}>{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* TIMELINE */}
        <motion.section {...fadeUp(0.1)}>
          <SectionTitle label="Experience & Education" />
          <div style={{ position: 'relative', paddingRight: '2rem' }}>
            <div style={{ position: 'absolute', right: '6px', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg, #c9a84c, rgba(201,168,76,0.05))' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {timeline.map((t, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', direction: 'rtl' }}>
                  <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: t.color, flexShrink: 0, marginTop: '0.4rem', boxShadow: `0 0 12px ${t.color}` }} />
                  <div style={{ background: '#1a1a1a', border: `1px solid ${t.color}20`, padding: '1.5rem', flex: 1, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, left: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${t.color}, transparent)` }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ color: t.color, fontSize: '0.65rem', letterSpacing: '3px' }}>{t.year}</span>
                      <h3 className="font-playfair" style={{ color: '#f5f0e8', fontSize: '1.05rem' }}>{t.title}</h3>
                    </div>
                    <p style={{ color: 'rgba(245,240,232,0.55)', fontSize: '0.85rem', lineHeight: 1.8, textAlign: 'right' }}>{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CONTACT */}
        <motion.section style={{ textAlign: 'center' }} {...fadeUp(0.1)}>
          <SectionTitle label="Contact" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Email', value: 'esterd6720259@gmail.com', href: 'mailto:esterd6720259@gmail.com', color: '#c9a84c' },
                { label: 'GitHub', value: 'EsterDavida', href: 'https://github.com/EsterDavida', color: '#7c3aed' },
                { label: 'Phone', value: '055-6720259', href: 'tel:0556720259', color: '#0ea5e9' },
              ].map((c) => (
                <motion.a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                  whileHover={{ x: -4 }}
                  style={{ background: '#1a1a1a', border: `1px solid ${c.color}25`, padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '3px', background: c.color }} />
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ color: c.color, fontSize: '0.6rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{c.label}</p>
                    <p style={{ color: 'rgba(245,240,232,0.7)', fontSize: '0.85rem' }}>{c.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
            <div style={{ background: '#1a1a1a', border: '1px solid rgba(201,168,76,0.12)', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)' }} />
              <p style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1.5rem', textAlign: 'center' }}>Send a Message</p>
              <ContactForm />
            </div>
          </div>
        </motion.section>

      </div>

      <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid rgba(201,168,76,0.1)', color: 'rgba(245,240,232,0.3)', fontSize: '0.75rem', letterSpacing: '2px' }}>
        © 2024 Ester Davida · All Rights Reserved
      </footer>
    </>
  )
}

function SectionTitle({ label }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
      <h2 className="font-playfair gold-text" style={{ fontSize: '1.8rem', marginBottom: '0.8rem' }}>{label}</h2>
      <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)', margin: '0 auto' }} />
    </div>
  )
}
