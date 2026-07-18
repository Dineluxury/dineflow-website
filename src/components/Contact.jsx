'use client'
import { useState } from 'react'
import { Store, User, Lightbulb, TrendingUp, Mail, MessageSquare, Send, CheckCircle } from 'lucide-react'

const EMAILJS_SERVICE_ID = 'service_paczsiv'
const EMAILJS_TEMPLATE_ID = 'template_5ybzx4q'
const EMAILJS_PUBLIC_KEY = 'AEb0huD-y3PKEsQd0'

const types = [
  { id: 'Restaurant Partner', icon: Store, label: 'Restaurant Owner' },
  { id: 'Customer', icon: User, label: 'Customer' },
  { id: 'Idea', icon: Lightbulb, label: 'Idea / Feedback' },
  { id: 'Investor', icon: TrendingUp, label: 'Investor' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: 'Restaurant Partner', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [focused, setFocused] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const emailjs = await import('@emailjs/browser')
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: form.name, from_email: form.email,
        type: form.type, message: form.message,
        to_email: 'ahmedrediwan591@gmail.com',
      }, EMAILJS_PUBLIC_KEY)
      setForm({ name: '', email: '', type: 'Restaurant Partner', message: '' })
      setSent(true)
    } catch (err) {
      setError('Failed to send. Please email us directly at ahmedrediwan591@gmail.com')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = (name) => ({
    width: '100%', padding: '13px 16px',
    background: '#fff',
    border: `1.5px solid ${focused === name ? '#f97316' : '#E5E7EB'}`,
    borderRadius: '12px', color: '#111827', fontSize: '14px',
    outline: 'none', transition: 'all 0.2s ease',
    fontFamily: 'inherit', boxSizing: 'border-box',
    boxShadow: focused === name ? '0 0 0 3px rgba(249,115,22,0.1)' : 'none',
  })

  const labelStyle = {
    color: '#6B7280', fontSize: '11px', fontWeight: 700,
    letterSpacing: '0.12em', textTransform: 'uppercase',
    display: 'block', marginBottom: '8px',
  }

  return (
    <section id="contact" style={{ padding: '7rem 0', background: '#ffffff', position: 'relative', overflow: 'hidden' }}>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>

        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: '#f97316', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Get In Touch</span>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, marginTop: '1rem', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#111827' }}>
            Have something<br />
            <span style={{ backgroundImage: 'linear-gradient(135deg, #f97316, #ea6c0a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>to say?</span>
          </h2>
          <p style={{ color: '#6B7280', fontSize: '15px', maxWidth: '440px', margin: '1.5rem auto 0', lineHeight: 1.7 }}>
            Restaurant owner, food lover, or investor — we'd love to hear from you.
          </p>
        </div>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <CheckCircle size={56} color="#22c55e" />
            </div>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#111827', fontSize: '1.75rem', fontWeight: 800, marginBottom: '10px' }}>Message sent!</h3>
            <p style={{ color: '#6B7280', marginBottom: '8px', fontSize: '14px' }}>We'll reply within 24 hours.</p>
            <p style={{ color: '#f97316', fontWeight: 600, fontSize: '13px', fontFamily: 'Geist Mono, monospace' }}>ahmedrediwan591@gmail.com</p>
            <button onClick={() => setSent(false)} style={{ marginTop: '2rem', padding: '10px 22px', border: '1.5px solid #E5E7EB', background: '#fff', color: '#374151', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit', fontWeight: 600, transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#f97316'; e.currentTarget.style.color = '#f97316' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.color = '#374151' }}
            >Send another →</button>
          </div>
        ) : (
          <div style={{ background: '#fff', border: '1px solid #F0F0F0', borderRadius: '24px', padding: '3rem 2.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <form onSubmit={handleSubmit}>
              {/* Name + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }} className="two-col">
                <div>
                  <label style={labelStyle}>Your Name</label>
                  <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} onFocus={() => setFocused('name')} onBlur={() => setFocused('')} placeholder="Ahmed Mohammed" style={inputStyle('name')} />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} onFocus={() => setFocused('email')} onBlur={() => setFocused('')} placeholder="you@email.com" style={inputStyle('email')} />
                </div>
              </div>

              {/* Type */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>I am a...</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px' }} className="four-col">
                  {types.map(({ id, icon: Icon, label }) => (
                    <button key={id} type="button" onClick={() => setForm({ ...form, type: id })} style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '14px 8px',
                      borderRadius: '12px',
                      border: form.type === id ? '1.5px solid #f97316' : '1.5px solid #E5E7EB',
                      background: form.type === id ? 'rgba(249,115,22,0.06)' : '#fff',
                      color: form.type === id ? '#f97316' : '#6B7280',
                      cursor: 'pointer', fontSize: '11px', fontWeight: 700, fontFamily: 'inherit', transition: 'all 0.2s',
                    }}>
                      <Icon size={18} color={form.type === id ? '#f97316' : '#9CA3AF'} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: '24px' }}>
                <label style={labelStyle}>Message</label>
                <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} onFocus={() => setFocused('message')} onBlur={() => setFocused('')} placeholder="Tell us what's on your mind..." rows={5} style={{ ...inputStyle('message'), resize: 'none' }} />
              </div>

              {error && <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '12px 16px', color: '#dc2626', fontSize: '13px', marginBottom: '16px' }}>{error}</div>}

              <button type="submit" disabled={loading} style={{ width: '100%', padding: '15px', background: loading ? '#fed7aa' : '#f97316', color: '#fff', fontWeight: 700, fontSize: '15px', border: 'none', borderRadius: '12px', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 16px rgba(249,115,22,0.3)' }}
                onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = '#ea6c0a'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(249,115,22,0.4)' } }}
                onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = '#f97316'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(249,115,22,0.3)' } }}
              >
                {loading ? <><div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Sending...</> : <><Send size={16} /> Send Message</>}
              </button>
            </form>

            <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #F0F0F0', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <a href="mailto:ahmedrediwan591@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6B7280', textDecoration: 'none', fontSize: '13px', fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#f97316'} onMouseLeave={e => e.currentTarget.style.color = '#6B7280'}>
                <Mail size={14} /> ahmedrediwan591@gmail.com
              </a>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9CA3AF', fontSize: '13px' }}>
                <MessageSquare size={14} /> We reply in 24h
              </span>
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  )
}