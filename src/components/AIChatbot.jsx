import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY

const SYSTEM_PROMPT = `אתה אסתר דוידה, מפתחת Full-Stack ומומחית בינה מלאכותית. ענה תמיד בעברית, בגוף ראשון, בצורה חמה ומקצועית. תשובות קצרות וממוקדות — משפט או שניים בלבד. 

פרטים עליך:
- שם: אסתר דוידה
- תפקיד: Software Engineer & Full-Stack Developer
- מייל: esterd6720259@gmail.com
- טלפון: 055-6720259
- GitHub: github.com/EsterDavida

טכנולוגיות:
- Frontend: Angular, React, Next.js, TypeScript, HTML5, CSS3, SASS
- Backend: Node.js, .NET Framework, Python, Flask, Java, C#
- Databases: SQL Server, MongoDB, SQL
- AI: OpenAI GPT-4o, LangChain, Pinecone, RAG Pipelines

ניסיון מקצועי:
- פרקטיקום ברשות המסים בישראל — פיתוח מערכות פנימיות ברמה ארגונית כולל "כסא חם" לניהול מקומות ישיבה ונוכחות עובדים. Java, SQL Server, Angular.

השכלה:
- תעודת הנדסאי תוכנה — מה"ט (הסמכה ממשלתית)
- פיתוח תוכנה — KamaTech (Boot Camp אינטנסיבי)
- עיצוב UI/UX — קורס מקצועי
- פיתוח AI — צ'אטבוטים ולוגיקת משחקים

פרויקטים עיקריים:
1. Luxury Real Estate — Angular + .NET + SQL Server — מערכת תיווך נדל"ן יוקרתית
2. Smart-Audit AI — Next.js + LangChain + GPT-4o + Pinecone — ניתוח מסמכים משפטיים עם AI
3. Course Marketplace — React + TypeScript — פלטפורמת E-Learning
4. DrawBattle vs AI — React + Python + Flask + GPT-4o Vision — משחק ציור נגד AI
5. Hot Seat — Angular + Java — מערכת פנימית לרשות המסים
6. Recipe Management — REST API
7. Trip Manager — Angular + TypeScript + JSON Server

התמחויות ב-AI:
- בניית צ'אטבוטים חכמים
- RAG Pipelines עם Pinecone
- אינטגרציה עם OpenAI GPT-4o
- אוטומציה חכמה ודיוור אוטומטי
- לוגיקת משחקים עם AI

ענה על שאלות לגבי הניסיון, הפרויקטים, הכישורים והשכלה. אם שואלים משהו שלא קשור לקריירה שלך, הפנה בנדיבות לנושא המקצועי.`

export default function AIChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'שלום! אני אסתר 👋 אשמח לענות על כל שאלה לגבי הניסיון, הפרויקטים והכישורים שלי. במה אוכל לעזור?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages,
            userMsg,
          ],
        }),
      })
      const data = await res.json()
      const reply = data.choices?.[0]?.message?.content || 'מצטערת, לא הצלחתי לענות. נסי שוב.'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'אופס! משהו השתבש. נסי שוב.' }])
    }
    setLoading(false)
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(201,168,76,0.8), 0 0 80px rgba(201,168,76,0.4)' }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 500,
          padding: '0.9rem 1.6rem',
          background: 'linear-gradient(135deg, #e8c97a 0%, #c9a84c 50%, #9a7a2e 100%)',
          border: '1px solid rgba(201,168,76,0.8)', cursor: 'pointer',
          boxShadow: '0 0 20px rgba(201,168,76,0.5), 0 0 40px rgba(201,168,76,0.2)',
          display: 'flex', alignItems: 'center', gap: '0.6rem',
          animation: 'glowPulse0 1.5s ease-in-out infinite',
          clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>{open ? '✕' : '🤖'}</span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ color: '#0a0a0a', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', lineHeight: 1 }}>שאלי אותי</span>
          <span style={{ color: 'rgba(10,10,10,0.6)', fontSize: '0.6rem', letterSpacing: '1px' }}>AI Assistant</span>
        </div>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', bottom: '6rem', left: '2rem', zIndex: 500,
              width: '360px', height: '500px',
              background: '#111', border: '1px solid rgba(201,168,76,0.3)',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(201,168,76,0.1)',
            }}
          >
            {/* Header */}
            <div style={{ padding: '1rem 1.2rem', borderBottom: '1px solid rgba(201,168,76,0.15)', background: 'rgba(201,168,76,0.05)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #c9a84c, #9a7a2e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>👩‍💻</div>
              <div>
                <p style={{ color: '#f5f0e8', fontSize: '0.9rem', fontFamily: 'Playfair Display, serif' }}>Ester Davida</p>
                <p style={{ color: '#c9a84c', fontSize: '0.65rem', letterSpacing: '2px' }}>AI Assistant · Online</p>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {messages.map((m, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  style={{
                    alignSelf: m.role === 'user' ? 'flex-start' : 'flex-end',
                    maxWidth: '80%',
                    padding: '0.7rem 1rem',
                    background: m.role === 'user' ? 'rgba(201,168,76,0.1)' : '#1a1a1a',
                    border: `1px solid ${m.role === 'user' ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.06)'}`,
                    color: 'rgba(245,240,232,0.85)',
                    fontSize: '0.85rem',
                    lineHeight: 1.7,
                    direction: 'rtl',
                    textAlign: 'right',
                  }}>
                  {m.content}
                </motion.div>
              ))}
              {loading && (
                <div style={{ alignSelf: 'flex-end', padding: '0.7rem 1rem', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', color: '#c9a84c', fontSize: '0.85rem' }}>
                  ✦ ✦ ✦
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{ padding: '0.8rem', borderTop: '1px solid rgba(201,168,76,0.15)', display: 'flex', gap: '0.5rem' }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="שאל/י אותי משהו..."
                style={{
                  flex: 1, padding: '0.7rem 1rem',
                  background: '#1a1a1a', border: '1px solid rgba(201,168,76,0.2)',
                  color: '#f5f0e8', fontSize: '0.85rem', outline: 'none',
                  fontFamily: 'Heebo, sans-serif', direction: 'rtl',
                }}
              />
              <motion.button
                onClick={send}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                style={{
                  padding: '0.7rem 1rem',
                  background: 'linear-gradient(135deg, #c9a84c, #9a7a2e)',
                  border: 'none', cursor: 'pointer', color: '#0a0a0a',
                  fontSize: '0.85rem', fontWeight: 700,
                }}
              >
                ←
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
