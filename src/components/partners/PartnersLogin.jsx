'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import PartnerForgotPassword from './PartnerForgotPassword'

export default function PartnersLogin({ expectedType }) {
  const router = useRouter()
  const [form, setForm] = useState({ phone: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const isCreator = expectedType === 'creator'
  const accent = isCreator ? '#a855f7' : '#e96b22'

  if (showForgotPassword) {
    return <PartnerForgotPassword expectedType={expectedType} accent={accent} onBack={() => setShowForgotPassword(false)} />
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    if (form.phone.includes('@')) {
      setError('Enter the phone number used for your partner account, not your email address.')
      return
    }
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/partners/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: expectedType }),
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || data.message || 'We could not sign you in. Check your details and try again.')
        return
      }

      if (data.type !== expectedType) {
        await fetch('/api/partners/logout', { method: 'POST' })
        const accountType = data.type === 'creator' ? 'content creator' : 'student ambassador'
        setError(`These credentials belong to a ${accountType} account. Choose the matching partner login.`)
        return
      }

      router.push(isCreator ? '/partners/dashboard/creator' : '/partners/dashboard/ambassador')
    } catch {
      setError('Connection failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="partner-auth">
      <section className="partner-auth-card">
        <Link className="partner-auth-brand" href="/partners"><img className="partner-brand-mark" src="/dineflow-logo.png" alt="" /><span>Dineflow <small>PARTNERS</small></span></Link>
        <p className="partner-auth-eyebrow" style={{ color: accent }}>{isCreator ? 'Creator account' : 'Ambassador account'}</p>
        <h1>Welcome back</h1>
        <p className="partner-auth-description">Sign in to access your partner workspace.</p>

        <form onSubmit={handleLogin} className="partner-login-form">
          <label htmlFor="partner-phone">Phone number</label>
          <input id="partner-phone" name="phone" type="tel" inputMode="tel" autoComplete="off" pattern="[0-9+() -]{9,16}" title="Enter a phone number, for example 0911 234 567" required value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="0911 234 567" />
          <label htmlFor="partner-password">Password</label>
          <input id="partner-password" name="password" type="password" autoComplete="current-password" required value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Your password" />
          <button className="partner-forgot-password" type="button" onClick={() => setShowForgotPassword(true)}>
            Forgot password?
          </button>
          {error && <p className="partner-login-error" role="alert">{error}</p>}
          <button className="partner-button partner-button-primary" style={{ background: accent }} type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
        </form>

        <div className="partner-auth-links">
          <Link href="/partners/login">Choose a different account type</Link>
          <span>New to this program? <Link href={`/partners/signup/${expectedType}`}>Apply here</Link></span>
        </div>
      </section>
    </main>
  )
}
