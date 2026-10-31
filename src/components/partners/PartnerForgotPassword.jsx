'use client'

import { useState } from 'react'
import Link from 'next/link'

function normalizePhoneNumber(phone) {
  let cleaned = phone.replace(/[^\d]/g, '')
  if (cleaned.startsWith('251')) cleaned = cleaned.slice(3)
  while (cleaned.startsWith('0')) cleaned = cleaned.slice(1)
  if (cleaned.length === 9) return `0${cleaned}`
  return cleaned ? `0${cleaned}` : phone.trim()
}

export default function PartnerForgotPassword({ expectedType, accent, onBack }) {
  const [step, setStep] = useState('request')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function submitRequest(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/partners/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: normalizePhoneNumber(phone), type: expectedType }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || data.message || 'Could not send a reset code. Check the phone number and try again.')
      setStep('reset')
      setSuccess('If this number is registered, a reset code has been sent by SMS.')
    } catch (requestError) {
      setError(requestError.message || 'Connection failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function submitReset(event) {
    event.preventDefault()
    setError('')
    setSuccess('')
    if (!/^\d{6}$/.test(code)) return setError('Enter the 6-digit code sent to your phone.')
    if (newPassword.length < 8) return setError('Your new password must be at least 8 characters.')
    if (newPassword !== confirmPassword) return setError('The passwords do not match.')

    setLoading(true)
    try {
      const response = await fetch('/api/partners/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: normalizePhoneNumber(phone), type: expectedType, code: code.trim(), newPassword }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || data.message || 'The code could not be verified. Check it and try again.')
      setSuccess('Password reset successfully. You can now sign in with your new password.')
      setTimeout(onBack, 1200)
    } catch (requestError) {
      setError(requestError.message || 'Connection failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const accountLabel = expectedType === 'creator' ? 'Creator' : 'Ambassador'

  return (
    <main className="partner-auth">
      <section className="partner-auth-card" aria-labelledby="partner-forgot-title">
        <Link className="partner-auth-brand" href="/partners"><img className="partner-brand-mark" src="/dineflow-logo.png" alt="" /><span>Dineflow <small>PARTNERS</small></span></Link>
        <p className="partner-auth-eyebrow" style={{ color: accent }}>{accountLabel} account</p>
        <h1 id="partner-forgot-title">{step === 'request' ? 'Forgot password?' : 'Reset your password'}</h1>
        <p className="partner-auth-description">
          {step === 'request'
            ? 'Enter the phone number linked to your account. We’ll send you a reset code by SMS.'
            : `Enter the 6-digit code sent to ${phone}, then choose a new password of at least 8 characters.`}
        </p>

        {step === 'request' ? (
          <form className="partner-login-form" onSubmit={submitRequest}>
            <label htmlFor="reset-phone">Phone number</label>
            <input id="reset-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="0911 234 567" />
            {error && <p className="partner-login-error" role="alert">{error}</p>}
            {success && <p className="partner-reset-success" role="status">{success}</p>}
            <button className="partner-button partner-button-primary" style={{ background: accent }} type="submit" disabled={loading}>{loading ? 'Sending code…' : 'Send reset code'}</button>
          </form>
        ) : (
          <form className="partner-login-form" onSubmit={submitReset}>
            <label htmlFor="reset-code">SMS reset code</label>
            <input id="reset-code" name="code" type="text" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} required value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="6-digit code" />
            <label htmlFor="reset-new-password">New password</label>
            <input id="reset-new-password" name="newPassword" type="password" autoComplete="new-password" minLength={8} required value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder="At least 8 characters" />
            <label htmlFor="reset-confirm-password">Confirm new password</label>
            <input id="reset-confirm-password" name="confirmPassword" type="password" autoComplete="new-password" minLength={8} required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Re-enter your password" />
            {error && <p className="partner-login-error" role="alert">{error}</p>}
            {success && <p className="partner-reset-success" role="status">{success}</p>}
            <button className="partner-button partner-button-primary" style={{ background: accent }} type="submit" disabled={loading}>{loading ? 'Resetting…' : 'Reset password'}</button>
            <button className="partner-reset-retry" type="button" onClick={() => { setStep('request'); setError(''); setSuccess('') }}>Didn’t get a code? Try again</button>
          </form>
        )}

        <div className="partner-auth-links">
          <button className="partner-reset-back" type="button" onClick={onBack}>Back to sign in</button>
        </div>
      </section>
    </main>
  )
}
