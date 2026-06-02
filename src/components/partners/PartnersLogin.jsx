'use client'
import { useState } from 'react'
import Link from 'next/link'

const API = 'https://backend-production-aa34.up.railway.app/api'

export default function PartnersLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${API}/partners/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Invalid email or password')
        return
      }

      localStorage.setItem('partner_token', data.token)
      localStorage.setItem('partner_type', data.type)
      localStorage.setItem('partner_name', data.name)
      localStorage.setItem('partner_status', data.status)
      localStorage.setItem('partner_code', data.uniqueCode || '')

      // Redirect based on type
      if (data.type === 'creator') {
        window.location.href = '/partners/dashboard/creator'
      } else {
        window.location.href = '/partners/dashboard/ambassador'
      }
    } catch (err) {
      setError('Connection failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1.5rem', position: 'relative',
      background: '#0a0a0a',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 40%, rgba(249,115,22,0.07) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '60px 60px', pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ width: '48px', height: '48px', background: '#f97316', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '24px', fontFamily: 'Syne, sans-serif', boxShadow: '0 0 40px rgba(249,115,22,0.4)' }}>D</div>
            <span style={{ color: '#fff', fontWeight: 900, fontSize: '24px', fontFamily: 'Syne, sans-serif' }}>Dineflow</span>
          </Link>
          <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '10px' }}>Partner Dashboard</p>
        </div>

        <div style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 30px 80px rgba(0,0,0,0.4)' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontSize: '1.6rem', fontWeight: 900, marginBottom: '6px' }}>Welcome back</h2>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '2rem' }}>Sign in to track your earnings and performance.</p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { key: 'email', label: 'Email Address', placeholder: 'you@email.com', type: 'email' },
              { key: 'password', label: 'Password', placeholder: '••••••••', type: 'password' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ color: '#6b7280', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>{f.label}</label>
                <input
                  type={f.type} required
                  value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  style={{ width: '100%', padding: '14px 16px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: '#fff', fontSize: '15px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(249,115,22,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
            ))}

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '12px 16px', color: '#f87171', fontSize: '13px' }}>
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              style={{ padding: '16px', background: loading ? 'rgba(249,115,22,0.4)' : '#f97316', color: '#fff', fontWeight: 700, fontSize: '16px', border: 'none', borderRadius: '14px', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: loading ? 'none' : '0 8px 30px rgba(249,115,22,0.3)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '4px' }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#ea6c0a' }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#f97316' }}
            >
              {loading
                ? <><div style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Signing in...</>
                : 'Sign In →'
              }
            </button>
          </form>

          <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              Not a partner yet?{' '}
              <Link href="/partners" style={{ color: '#f97316', textDecoration: 'none', fontWeight: 600 }}>Apply now →</Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}