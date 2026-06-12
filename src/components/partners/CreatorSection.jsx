'use client'
import { useState } from 'react'

const steps = [
  { emoji: '📝', title: 'Apply as a Creator', desc: 'Sign up with your social media profile. We review and approve within 48 hours.' },
  { emoji: '🔗', title: 'Get Your Personal Food Links', desc: 'For any food item or restaurant on Dineflow, you get a unique link that tracks orders back to you.' },
  { emoji: '🎬', title: 'Make Your Content', desc: 'Review the restaurant or food on TikTok, YouTube, or Instagram. Share your Dineflow food link in the description or bio.' },
  { emoji: '👆', title: 'Followers Click and Order', desc: 'Your followers click the link, open the specific food item in the Dineflow app, and order it.' },
  { emoji: '💸', title: 'Earn After Every Payment', desc: 'Only when the customer pays do you earn. No clicks, no installs — only real paid orders.' },
]

const platforms = ['TikTok', 'YouTube', 'Instagram', 'Telegram Channel', 'Facebook', 'Other']

export default function CreatorSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    platform: '',
    handle: '',
    followers: '',
    niche: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
  e.preventDefault()

  if (form.password.length < 8) {
    alert('Password must be at least 8 characters long.')
    return
  }

  if (form.password !== form.confirmPassword) {
    alert('Password and confirm password do not match.')
    return
  }

  setLoading(true)

  try {
    const res = await fetch(
      '/api/partners/register',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
          type: 'creator',
          platform: form.platform,
          handle: form.handle,
          followersRange: form.followers,
        }),
      }
    )

    const data = await res.json()
    if (!res.ok) {
      alert(data.error || 'Registration failed')
      return
    }

    setSubmitted(true)
  } catch (err) {
    alert('Connection failed. Please try again.')
  } finally {
    setLoading(false)
  }
}

  return (
    <section id="creator" style={{ padding: '8rem 0', background: '#0d0d0d', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 50%, rgba(168,85,247,0.05) 0%, transparent 60%)' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 20px', borderRadius: '999px', border: '1px solid rgba(168,85,247,0.3)', background: 'rgba(168,85,247,0.08)', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '16px' }}>🎬</span>
            <span style={{ color: '#c084fc', fontSize: '14px', fontWeight: 600 }}>Creator Partner Program</span>
          </div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginTop: '1rem', marginBottom: '1.5rem', lineHeight: 1.05 }}>
            Your content.<br />
            <span style={{ background: 'linear-gradient(135deg, #a855f7, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Their order. Your money.
            </span>
          </h2>
          <p style={{ color: '#6b7280', fontSize: '16px', maxWidth: '580px', margin: '0 auto', lineHeight: 1.7 }}>
            You review the food. You share your unique food link. Every time a follower orders through that link and pays — you earn. Simple as that.
          </p>
        </div>

        {/* How the link works — visual explanation */}
        <div style={{ background: '#1a1a1a', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '20px', padding: '2rem', marginBottom: '5rem' }}>
          <div style={{ color: '#a855f7', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>🔗 How your food link works</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {[
              { label: 'Normal link', value: 'dineflow.et/food/tibs-123', color: '#6b7280' },
              { label: '→', value: null, color: '#4b5563' },
              { label: 'Your personal link', value: 'dineflow.et/food/tibs-123?ref=FOODIE247', color: '#a855f7' },
            ].map((item, i) => (
              item.value ? (
                <div key={i}>
                  <div style={{ color: '#6b7280', fontSize: '11px', marginBottom: '6px' }}>{item.label}</div>
                  <div style={{ background: '#0f0f0f', border: `1px solid ${item.color === '#a855f7' ? 'rgba(168,85,247,0.4)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '10px', padding: '10px 16px', color: item.color, fontSize: '13px', fontFamily: 'monospace', fontWeight: 600 }}>
                    {item.value}
                  </div>
                </div>
              ) : (
                <div key={i} style={{ color: '#4b5563', fontSize: '24px', paddingTop: '18px' }}>→</div>
              )
            ))}
          </div>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {[
              { emoji: '👆', text: 'Follower clicks your link' },
              { emoji: '🍲', text: 'Opens that exact food in the app' },
              { emoji: '💳', text: 'Orders and pays' },
              { emoji: '💰', text: 'You earn commission' },
            ].map(step => (
              <div key={step.text} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>{step.emoji}</span>
                <span style={{ color: '#9ca3af', fontSize: '13px' }}>{step.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>

          {/* Steps + earnings */}
          <div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontSize: '1.3rem', fontWeight: 800, marginBottom: '2rem' }}>How it works</h3>
            <div>
              {steps.map((step, i) => (
                <div key={step.title} style={{ display: 'flex', gap: '16px', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ width: '48px', height: '48px', background: '#1a1a1a', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
                      {step.emoji}
                    </div>
                    {i < steps.length - 1 && (
                      <div style={{ width: '1px', height: '28px', background: 'linear-gradient(to bottom, rgba(168,85,247,0.3), transparent)', marginTop: '4px' }} />
                    )}
                  </div>
                  <div style={{ paddingTop: '10px', paddingBottom: '20px' }}>
                    <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>{step.title}</h4>
                    <p style={{ color: '#6b7280', fontSize: '13px', lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Earning table */}
            <div style={{ background: '#1a1a1a', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '20px', padding: '24px', marginTop: '2rem' }}>
              <div style={{ color: '#a855f7', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>💰 Earning potential</div>
              {[
                { orders: '100 orders', earn: 'ETB 300', from: '1 video' },
                { orders: '500 orders', earn: 'ETB 1,500', from: '1 viral video' },
                { orders: '2,000 orders', earn: 'ETB 6,000', from: 'multiple videos' },
              ].map(row => (
                <div key={row.orders} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <div style={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>{row.orders}</div>
                    <div style={{ color: '#6b7280', fontSize: '11px' }}>{row.from}</div>
                  </div>
                  <div style={{ color: '#a855f7', fontWeight: 700, fontSize: '16px' }}>{row.earn}</div>
                </div>
              ))}
              <p style={{ color: '#4b5563', fontSize: '11px', marginTop: '12px', lineHeight: 1.5 }}>
                Based on ETB 3 commission per completed and paid order through your food link.
              </p>
            </div>
          </div>

          {/* Application form */}
          <div>
            <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2.5rem' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎬</div>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontSize: '1.5rem', fontWeight: 900, marginBottom: '12px' }}>Application received!</h3>
                  <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.7, marginBottom: '8px' }}>
                    We'll review your profile and send your creator dashboard access within 48 hours.
                  </p>
                  <p style={{ color: '#a855f7', fontWeight: 600, fontSize: '14px' }}>Check your email inbox.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontSize: '1.3rem', fontWeight: 900, marginBottom: '8px' }}>Apply as Creator</h3>
                  <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '2rem' }}>Any following size welcome. Quality matters more than numbers.</p>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                      { key: 'name', label: 'Full Name', placeholder: 'Mekdes Haile', type: 'text' },
                      { key: 'email', label: 'Email Address', placeholder: 'you@email.com', type: 'email' },
                      { key: 'phone', label: 'Phone Number', placeholder: '0911 234 567', type: 'tel' },
                      { key: 'password', label: 'Password', placeholder: 'At least 8 characters', type: 'password' },
                      { key: 'confirmPassword', label: 'Confirm Password', placeholder: 'Repeat your password', type: 'password' },
                      { key: 'handle', label: 'Social Media Handle', placeholder: '@foodie_ethiopia', type: 'text' },
                    ].map(f => (
                      <div key={f.key}>
                        <label style={{ color: '#6b7280', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>{f.label}</label>
                        <input
                          type={f.type} required
                          minLength={f.key.includes('password') ? 8 : undefined}
                          value={form[f.key]}
                          onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                          placeholder={f.placeholder}
                          style={{ width: '100%', padding: '14px 16px', background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: '#fff', fontSize: '14px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                          onFocus={e => e.target.style.borderColor = 'rgba(168,85,247,0.5)'}
                          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                        />
                      </div>
                    ))}

                    <div>
                      <label style={{ color: '#6b7280', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>Primary Platform</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                        {platforms.map(p => (
                          <button
                            key={p} type="button"
                            onClick={() => setForm({ ...form, platform: p })}
                            style={{ padding: '10px', borderRadius: '10px', border: form.platform === p ? '1px solid rgba(168,85,247,0.5)' : '1px solid rgba(255,255,255,0.08)', background: form.platform === p ? 'rgba(168,85,247,0.15)' : '#0f0f0f', color: form.platform === p ? '#c084fc' : '#6b7280', cursor: 'pointer', fontSize: '12px', fontWeight: 600, fontFamily: 'inherit', transition: 'all 0.2s' }}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label style={{ color: '#6b7280', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>Approximate Followers</label>
                      <select
                        value={form.followers}
                        onChange={e => setForm({ ...form, followers: e.target.value })}
                        style={{ width: '100%', padding: '14px 16px', background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: form.followers ? '#fff' : '#6b7280', fontSize: '14px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                      >
                        <option value="">Select range</option>
                        {['Under 1,000', '1,000 – 10,000', '10,000 – 50,000', '50,000 – 200,000', '200,000+'].map(o => (
                          <option key={o} value={o} style={{ background: '#0f0f0f', color: '#fff' }}>{o}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      style={{ padding: '16px', background: loading ? 'rgba(168,85,247,0.5)' : '#a855f7', color: '#fff', fontWeight: 700, fontSize: '16px', border: 'none', borderRadius: '14px', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: '0 8px 30px rgba(168,85,247,0.25)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                      onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#9333ea' }}
                      onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#a855f7' }}
                    >
                      {loading ? <div style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> : '🎬 Submit Application'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
