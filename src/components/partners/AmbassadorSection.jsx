'use client'
import { useMemo, useState } from 'react'

// 👇 Emojis taken from the SECOND code (📧, 🏫, 🚶, 🔗, ✅, 💰, etc.)
const steps = [
  { emoji: '📧', title: 'Sign Up with Student Email', desc: 'Create your ambassador account using your university email or upload your student ID card.' },
  { emoji: '🏫', title: 'Select Your University', desc: 'Choose your university from the list. We assign you a unique ambassador code like HARAMAYA-247.' },
  { emoji: '🚶', title: 'Visit Restaurants Near You', desc: 'Go to restaurants, cafes, and hotels near your campus. Show them the Dineflow app and help them sign up.' },
  { emoji: '🔗', title: 'Restaurant Uses Your Code', desc: 'When the restaurant registers on the Dineflow desktop app, they enter your unique code.' },
  { emoji: '✅', title: 'Dineflow Reviews and Approves', desc: 'We verify the restaurant and approve them. Once their first real order comes in, you start earning.' },
  { emoji: '💰', title: 'Earn for 3 Months', desc: 'You receive 50% of our commission from that restaurant every month for 3 full months. Paid via Telebirr or bank transfer.' },
]

const universities = [
  { name: 'Addis Ababa University', code: 'AAU' },
  { name: 'Adama Science and Technology University', code: 'ASTU' },
  { name: 'Addis Ababa Science and Technology University', code: 'AASTU' },
  { name: 'Adigrat University', code: 'AGU' },
  { name: 'Ambo University', code: 'AMU' },
  { name: 'Arba Minch University', code: 'AMU-ARB' },
  { name: 'Arsi University', code: 'ARU' },
  { name: 'Bahir Dar University', code: 'BDU' },
  { name: 'Bule Hora University', code: 'BHU' },
  { name: 'Debre Berhan University', code: 'DBU' },
  { name: 'Debre Markos University', code: 'DMU' },
  { name: 'Dilla University', code: 'DU' },
  { name: 'Dire Dawa University', code: 'DDU' },
  { name: 'Gondar University', code: 'UOG' },
  { name: 'Haramaya University', code: 'HU' },
  { name: 'Hawassa University', code: 'HWU' },
  { name: 'Jimma University', code: 'JU' },
  { name: 'Mekelle University', code: 'MU' },
  { name: 'Wolkite University', code: 'WKU' },
  { name: 'Wollo University', code: 'WU' },
  { name: 'Other', code: 'OTHER' },
]

export default function AmbassadorSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    universityCode: '',
    phone: '',
    password: '',
    confirmPassword: '',
    idCard: null,
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const selectedUniversity = useMemo(
    () => universities.find(university => university.code === form.universityCode),
    [form.universityCode]
  )

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: '#0f0f0f',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  }

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
      const payload = new FormData()
      payload.append('name', form.name)
      payload.append('email', form.email)
      payload.append('password', form.password)
      payload.append('phone', form.phone)
      payload.append('type', 'ambassador')
      payload.append('university', selectedUniversity?.name || form.universityCode)
      payload.append('universityCode', selectedUniversity?.code || form.universityCode)

      if (form.idCard) {
        payload.append('studentIdFile', form.idCard)
        payload.append('studentIdFileName', form.idCard.name)
      }

      const res = await fetch('/api/partners/register', {
        method: 'POST',
        body: payload,
      })

      const data = await res.json()
      if (!res.ok) {
        alert(data.error || data.message || 'Registration failed')
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
    <section id="ambassador" style={{ padding: '8rem 0', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 50%, rgba(249,115,22,0.05) 0%, transparent 60%)' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 20px', borderRadius: '999px', border: '1px solid rgba(249,115,22,0.3)', background: 'rgba(249,115,22,0.08)', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '16px' }}>🎓</span>   {/* from second code */}
            <span style={{ color: '#fb923c', fontSize: '14px', fontWeight: 600 }}>Student Ambassador Program</span>
          </div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginTop: '1rem', marginBottom: '1.5rem', lineHeight: 1.05 }}>
            Turn campus walks<br />
            <span style={{ backgroundImage: 'linear-gradient(135deg, #f97316, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              into real income.
            </span>
          </h2>
          <p style={{ color: '#6b7280', fontSize: '16px', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
            You already walk past dozens of restaurants every day. Now get paid for talking to them.
            No experience needed. No investment required.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
          <div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontSize: '1.3rem', fontWeight: 800, marginBottom: '2rem' }}>How it works</h3>
            <div>
              {steps.map((step, i) => (
                <div key={step.title} style={{ display: 'flex', gap: '16px', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ width: '48px', height: '48px', background: '#1a1a1a', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
                      {step.emoji}
                    </div>
                    {i < steps.length - 1 && (
                      <div style={{ width: '1px', height: '28px', background: 'linear-gradient(to bottom, rgba(249,115,22,0.3), transparent)', marginTop: '4px' }} />
                    )}
                  </div>
                  <div style={{ paddingTop: '10px', paddingBottom: '20px' }}>
                    <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>{step.title}</h4>
                    <p style={{ color: '#6b7280', fontSize: '13px', lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: '#1a1a1a', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '20px', padding: '24px', marginTop: '2rem' }}>
              <div style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>💰 Earning potential</div>  {/* from second code */}
              {[
                { restaurants: 1, monthly: 'ETB 500 - 2,500', total: 'ETB 1,500 - 7,500' },
                { restaurants: 3, monthly: 'ETB 1,500 - 7,500', total: 'ETB 4,500 - 22,500' },
                { restaurants: 5, monthly: 'ETB 2,500 - 12,500', total: 'ETB 7,500 - 37,500' },
              ].map(row => (
                <div key={row.restaurants} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color: '#9ca3af', fontSize: '13px' }}>{row.restaurants} restaurant{row.restaurants > 1 ? 's' : ''} referred</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#f97316', fontWeight: 700, fontSize: '13px' }}>{row.monthly}/mo</div>
                    <div style={{ color: '#6b7280', fontSize: '11px' }}>{row.total} total</div>
                  </div>
                </div>
              ))}
              <p style={{ color: '#4b5563', fontSize: '11px', marginTop: '12px', lineHeight: 1.5 }}>
                Based on average restaurant doing ETB 50,000-250,000/month in orders. Your 50% of our 5% commission.
              </p>
            </div>
          </div>

          <div>
            <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2.5rem' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>   {/* from second code */}
                  <h3 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontSize: '1.5rem', fontWeight: 900, marginBottom: '12px' }}>Application received!</h3>
                  <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.7, marginBottom: '8px' }}>
                    We'll review your student ID and send your unique ambassador code to your email within 24 hours.
                  </p>
                  <p style={{ color: '#f97316', fontWeight: 600, fontSize: '14px' }}>Check your inbox, including spam.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontSize: '1.3rem', fontWeight: 900, marginBottom: '8px' }}>Apply as Ambassador</h3>
                  <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '2rem' }}>Takes 2 minutes. We review within 24 hours.</p>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                      { key: 'name', label: 'Full Name', placeholder: 'Ahmed Mohammed', type: 'text', autoComplete: 'name' },
                      { key: 'email', label: 'Student Email', placeholder: 'ahmed@university.edu.et', type: 'email', autoComplete: 'email' },
                      { key: 'phone', label: 'Phone Number', placeholder: '0911 234 567', type: 'tel', autoComplete: 'tel' },
                      { key: 'password', label: 'Password', placeholder: 'At least 8 characters', type: 'password', autoComplete: 'new-password' },
                      { key: 'confirmPassword', label: 'Confirm Password', placeholder: 'Repeat your password', type: 'password', autoComplete: 'new-password' },
                    ].map(f => (
                      <div key={f.key}>
                        <label style={{ color: '#6b7280', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>{f.label}</label>
                        <input
                          type={f.type}
                          required
                          minLength={f.key.includes('password') ? 8 : undefined}
                          value={form[f.key]}
                          onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                          placeholder={f.placeholder}
                          autoComplete={f.autoComplete}
                          style={inputStyle}
                          onFocus={e => e.target.style.borderColor = 'rgba(249,115,22,0.5)'}
                          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                        />
                      </div>
                    ))}

                    <div>
                      <label style={{ color: '#6b7280', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>University</label>
                      <select
                        required
                        value={form.universityCode}
                        onChange={e => setForm({ ...form, universityCode: e.target.value })}
                        style={{ width: '100%', padding: '14px 16px', background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: form.universityCode ? '#fff' : '#6b7280', fontSize: '14px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                      >
                        <option value="">Select your university</option>
                        {universities.map(university => (
                          <option key={university.code} value={university.code} style={{ background: '#0f0f0f', color: '#fff' }}>
                            {university.name} ({university.code})
                          </option>
                        ))}
                      </select>
                      {selectedUniversity && selectedUniversity.code !== 'OTHER' && (
                        <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '6px' }}>Campus code: {selectedUniversity.code}</p>
                      )}
                    </div>

                    <div>
                      <label style={{ color: '#6b7280', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>Student ID Card</label>
                      <div style={{ border: '1px dashed rgba(249,115,22,0.3)', borderRadius: '12px', padding: '24px', textAlign: 'center', cursor: 'pointer', background: 'rgba(249,115,22,0.03)', position: 'relative' }}>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={e => setForm({ ...form, idCard: e.target.files[0] })}
                          style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
                        />
                        {form.idCard ? (
                          <p style={{ color: '#22c55e', fontSize: '14px', fontWeight: 600 }}>✅ {form.idCard.name}</p>
                        ) : (
                          <>
                            <p style={{ color: '#f97316', fontSize: '24px', marginBottom: '8px' }}>📄</p>   {/* from second code */}
                            <p style={{ color: '#9ca3af', fontSize: '13px' }}>Click to upload your student ID</p>
                            <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '4px' }}>JPG, PNG, or PDF - max 5MB</p>
                          </>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      style={{ padding: '16px', background: loading ? 'rgba(249,115,22,0.5)' : '#f97316', color: '#fff', fontWeight: 700, fontSize: '16px', border: 'none', borderRadius: '14px', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: '0 8px 30px rgba(249,115,22,0.3)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                      onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#ea6c0a' }}
                      onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#f97316' }}
                    >
                      {loading ? <div style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> : '🎓 Submit Application'}   {/* from second code */}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  )
}
