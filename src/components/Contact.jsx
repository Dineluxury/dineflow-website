'use client'
import { useState, useRef } from 'react'

// Replace these with your real EmailJS values
const EMAILJS_SERVICE_ID = 'service_paczsiv'
const EMAILJS_TEMPLATE_ID = 'template_5ybzx4q'
const EMAILJS_PUBLIC_KEY = 'AEb0huD-y3PKEsQd0'

const types = [
  { id: 'Restaurant Partner', emoji: '🏪', label: 'Restaurant Owner' },
  { id: 'Customer', emoji: '👤', label: 'Customer' },
  { id: 'Investor', emoji: '📈', label: 'Investor' },
  { id: 'Idea', emoji: '💡', label: 'Sharing an Idea' },
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
      // Dynamic import to avoid SSR issues
      const emailjs = await import('@emailjs/browser')
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          type: form.type,
          message: form.message,
          to_email: 'ahmedrediwan591@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      )
      setSent(true)
    } catch (err) {
      console.error('EmailJS error:', err)
      setError('Failed to send message. Please email us directly at ahmedrediwan591@gmail.com')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = (name) => ({
    width: '100%', padding: '14px 16px',
    background: '#0f0f0f',
    border: `1px solid ${focused === name ? 'rgba(249,115,22,0.5)' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: '12px', color: '#fff', fontSize: '14px',
    outline: 'none', transition: 'all 0.2s ease',
    fontFamily: 'inherit', boxSizing: 'border-box',
  })

  return (
    <section id="contact" style={{ padding: '8rem 0', background: '#0d0d0d', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(249,115,22,0.06) 0%, transparent 60%)' }} />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Get In Touch</span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginTop: '1rem', marginBottom: '1.5rem', lineHeight: 1.05 }}>
            Have an idea?<br />
            <span style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              We want to hear it.
            </span>
          </h2>
          <p style={{ color: '#6b7280', fontSize: '16px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Whether you're a restaurant owner, a food lover, or an investor — we'd love to talk.
          </p>
        </div>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', background: '#1a1a1a', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '24px' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🎉</div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontSize: '2rem', fontWeight: 900, marginBottom: '12px' }}>Message sent!</h3>
            <p style={{ color: '#6b7280', marginBottom: '8px' }}>We'll get back to you within 24 hours.</p>
            <p style={{ color: '#f97316', fontWeight: 600, fontSize: '14px' }}>ahmedrediwan591@gmail.com</p>
            <button
              onClick={() => { setSent(false); setForm({ name: '', email: '', type: 'Restaurant Partner', message: '' }) }}
              style={{ marginTop: '2rem', padding: '12px 24px', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#fff', borderRadius: '12px', cursor: 'pointer', fontSize: '14px', fontFamily: 'inherit' }}
            >
              Send another message
            </button>
          </div>
        ) : (
          <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '3rem' }}>
            <form onSubmit={handleSubmit}>
              {/* Name + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={{ color: '#6b7280', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Your Name</label>
                  <input type="text" required value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                    placeholder="Ahmed Mohammed" style={inputStyle('name')} />
                </div>
                <div>
                  <label style={{ color: '#6b7280', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Email Address</label>
                  <input type="email" required value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                    placeholder="you@email.com" style={inputStyle('email')} />
                </div>
              </div>

              {/* Type */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ color: '#6b7280', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>I am a...</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  {types.map(t => (
                    <button key={t.id} type="button" onClick={() => setForm({ ...form, type: t.id })}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '14px 8px', borderRadius: '14px', border: form.type === t.id ? '1px solid rgba(249,115,22,0.5)' : '1px solid rgba(255,255,255,0.08)', background: form.type === t.id ? 'rgba(249,115,22,0.1)' : '#0f0f0f', color: form.type === t.id ? '#fb923c' : '#6b7280', cursor: 'pointer', fontSize: '12px', fontWeight: 600, fontFamily: 'inherit', transition: 'all 0.2s' }}>
                      <span style={{ fontSize: '20px' }}>{t.emoji}</span>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ color: '#6b7280', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Message</label>
                <textarea required value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                  placeholder="Tell us what's on your mind..."
                  rows={5} style={{ ...inputStyle('message'), resize: 'none' }} />
              </div>

              {error && (
                <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '10px', padding: '12px 16px', color: '#f87171', fontSize: '13px', marginBottom: '16px' }}>
                  ⚠️ {error}
                </div>
              )}

              <button type="submit" disabled={loading}
                style={{ width: '100%', padding: '16px', background: loading ? 'rgba(249,115,22,0.5)' : '#f97316', color: '#fff', fontWeight: 700, fontSize: '16px', border: 'none', borderRadius: '14px', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: loading ? 'none' : '0 8px 30px rgba(249,115,22,0.3)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#ea6c0a' }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#f97316' }}
              >
                {loading
                  ? <><div style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Sending...</>
                  : '✉️ Send Message'
                }
              </button>
            </form>

            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:ahmedrediwan591@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
              >
                <span style={{ color: '#f97316' }}>✉️</span> ahmedrediwan591@gmail.com
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '14px' }}>
                <span style={{ color: '#f97316' }}>💬</span> We reply within 24 hours
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  )
}