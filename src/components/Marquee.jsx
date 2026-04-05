const techs = ['Angular', 'React', 'Next.js', 'TypeScript', 'Python', 'Flask', '.NET', 'SQL Server', 'MongoDB', 'OpenAI', 'LangChain', 'Pinecone', 'Node.js', 'RxJS', 'Tailwind', 'UI/UX Design']

export default function Marquee() {
  const items = [...techs, ...techs]

  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)', padding: '1rem 0', background: 'rgba(201,168,76,0.02)' }}>
      <div style={{ display: 'flex', gap: '3rem', animation: 'marquee 25s linear infinite', width: 'max-content' }}>
        {items.map((t, i) => (
          <span key={i} style={{ fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '3rem' }}>
            {t}
            <span style={{ color: 'rgba(201,168,76,0.2)', fontSize: '0.5rem' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
