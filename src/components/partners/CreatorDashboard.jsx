'use client'
import { useState, useEffect } from 'react'
import DashboardLayout from './DashboardLayout'

const API = 'https://backend-production-aa34.up.railway.app/api'

const tabs = [
  { id: 'overview', emoji: '📊', label: 'Overview' },
  { id: 'links', emoji: '🔗', label: 'My Links' },
  { id: 'generate', emoji: '✨', label: 'Generate Link' },
  { id: 'earnings', emoji: '💰', label: 'Earnings' },
  { id: 'calculator', emoji: '🧮', label: 'Calculator' },
]

export default function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [profile, setProfile] = useState(null)
  const [links, setLinks] = useState([])
  const [earnings, setEarnings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('partner_token')
    if (!token) return

    const headers = { Authorization: `Bearer ${token}` }

    Promise.all([
      fetch(`${API}/partners/me`, { headers }).then(r => r.json()),
      fetch(`${API}/partners/creator/links`, { headers }).then(r => r.json()),
      fetch(`${API}/partners/earnings`, { headers }).then(r => r.json()),
    ]).then(([prof, lnks, earn]) => {
      setProfile(prof)
      setLinks(Array.isArray(lnks) ? lnks : [])
      setEarnings(earn)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const refreshLinks = async () => {
    const token = localStorage.getItem('partner_token')
    const res = await fetch(`${API}/partners/creator/links`, { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    setLinks(Array.isArray(data) ? data : [])
  }

  return (
    <DashboardLayout type="creator" activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs}>
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px', gap: '16px' }}>
          <div style={{ width: '32px', height: '32px', border: '3px solid rgba(168,85,247,0.2)', borderTopColor: '#a855f7', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <span style={{ color: '#6b7280' }}>Loading your dashboard...</span>
        </div>
      ) : (
        <>
          {activeTab === 'overview' && <CreatorOverview profile={profile} links={links} earnings={earnings} />}
          {activeTab === 'links' && <CreatorLinks links={links} />}
          {activeTab === 'generate' && <GenerateLink profile={profile} onGenerated={refreshLinks} />}
          {activeTab === 'earnings' && <CreatorEarnings earnings={earnings} />}
          {activeTab === 'calculator' && <CreatorCalculator />}
        </>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </DashboardLayout>
  )
}

function CreatorOverview({ profile, links, earnings }) {
  const totalClicks = links.reduce((s, l) => s + (l.clicks || 0), 0)
  const totalOrders = links.reduce((s, l) => s + (l.totalOrders || 0), 0)

  const stats = [
    { label: 'Active Links', value: links.length, emoji: '🔗', color: '#a855f7' },
    { label: 'Total Clicks', value: totalClicks.toLocaleString(), emoji: '👆', color: '#60a5fa' },
    { label: 'Total Orders', value: totalOrders.toLocaleString(), emoji: '🛒', color: '#22c55e' },
    { label: 'Pending Earnings (ETB)', value: earnings?.pendingEarnings || '0.00', emoji: '💰', color: '#fbbf24' },
  ]

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontSize: '1.8rem', fontWeight: 900, marginBottom: '6px' }}>
          Welcome back, {profile?.name?.split(' ')[0] || 'Creator'} 🎬
        </h1>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          {profile?.handle && `${profile.handle} · `}
          Your code: <span style={{ color: '#a855f7', fontWeight: 700, fontFamily: 'monospace' }}>{profile?.uniqueCode || 'Pending approval'}</span>
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '2.5rem' }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px', padding: '1.5rem', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${s.color}30`; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <div style={{ fontSize: '28px', marginBottom: '12px' }}>{s.emoji}</div>
            <div style={{ color: s.color, fontSize: '2rem', fontWeight: 900, fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>{s.value}</div>
            <div style={{ color: '#6b7280', fontSize: '12px', marginTop: '6px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Pending approval */}
      {!profile?.uniqueCode && (
        <div style={{ background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '20px', padding: '2rem', marginBottom: '2rem' }}>
          <h3 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontWeight: 800, marginBottom: '1rem' }}>⏳ Application under review</h3>
          <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 1.7 }}>
            We'll review your creator profile within 48 hours. Once approved you can generate your personal food links and start earning from every order.
          </p>
        </div>
      )}

      {/* How it works reminder */}
      <div style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '1.5rem' }}>
        <h3 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontWeight: 800, fontSize: '1rem', marginBottom: '1.5rem' }}>How your earnings work</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {[
            { emoji: '🔗', title: 'Generate link', desc: 'For any food item on Dineflow' },
            { emoji: '🎬', title: 'Share it', desc: 'On TikTok, YouTube, Instagram' },
            { emoji: '👆', title: 'Followers order', desc: 'Through your personal link' },
            { emoji: '💰', title: 'You earn ETB 3', desc: 'Per completed paid order' },
          ].map(step => (
            <div key={step.title} style={{ textAlign: 'center', padding: '16px', background: 'rgba(168,85,247,0.05)', borderRadius: '14px', border: '1px solid rgba(168,85,247,0.1)' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{step.emoji}</div>
              <p style={{ color: '#fff', fontWeight: 700, fontSize: '12px', marginBottom: '4px' }}>{step.title}</p>
              <p style={{ color: '#6b7280', fontSize: '11px', lineHeight: 1.5 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CreatorLinks({ links }) {
  const copyLink = (link) => {
    navigator.clipboard.writeText(link)
    alert('Link copied!')
  }

  return (
    <div>
      <h2 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>My Food Links</h2>

      {links.length === 0 ? (
        <div style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '4rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔗</div>
          <h3 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontWeight: 800, marginBottom: '8px' }}>No links yet</h3>
          <p style={{ color: '#6b7280', fontSize: '14px', maxWidth: '400px', margin: '0 auto', lineHeight: 1.7 }}>
            Go to the "Generate Link" tab to create your first personal food link. Share it in your next video and start earning.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {links.map(link => (
            <div key={link.id} style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px', padding: '1.5rem', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {link.foodPhoto ? (
                    <img src={link.foodPhoto} style={{ width: '52px', height: '52px', borderRadius: '12px', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '52px', height: '52px', background: 'rgba(168,85,247,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🍽️</div>
                  )}
                  <div>
                    <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '15px', marginBottom: '2px' }}>{link.foodName || 'Food Item'}</h4>
                    <p style={{ color: '#6b7280', fontSize: '12px' }}>{link.restaurantName} · ETB {link.foodPrice}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: '#22c55e', fontWeight: 700, fontSize: '15px' }}>ETB {(link.totalOrders || 0) * 3}</p>
                  <p style={{ color: '#6b7280', fontSize: '11px' }}>earned</p>
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
                {[
                  { label: 'Clicks', value: link.clicks || 0, color: '#60a5fa' },
                  { label: 'Orders', value: link.totalOrders || 0, color: '#22c55e' },
                  { label: 'Conversion', value: link.clicks ? `${Math.round((link.totalOrders / link.clicks) * 100)}%` : '0%', color: '#a855f7' },
                ].map(s => (
                  <div key={s.label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                    <p style={{ color: s.color, fontWeight: 900, fontSize: '18px', fontFamily: 'Syne, sans-serif' }}>{s.value}</p>
                    <p style={{ color: '#6b7280', fontSize: '11px' }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Link + copy */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ flex: 1, background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 14px', overflow: 'hidden' }}>
                  <p style={{ color: '#a855f7', fontSize: '12px', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    dineflow.et/food/{link.shortCode}
                  </p>
                </div>
                <button
                  onClick={() => copyLink(`https://dineflow.et/food/${link.shortCode}`)}
                  style={{ padding: '10px 18px', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '10px', color: '#a855f7', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#a855f7'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(168,85,247,0.1)'; e.currentTarget.style.color = '#a855f7' }}
                >
                  📋 Copy Link
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function GenerateLink({ profile, onGenerated }) {
  const [menuItemId, setMenuItemId] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const isApproved = localStorage.getItem('partner_status') === 'approved'

  const handleGenerate = async () => {
    if (!menuItemId.trim()) { setError('Please enter a Menu Item ID'); return }
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const token = localStorage.getItem('partner_token')
      const res = await fetch(`${API}/partners/creator/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ menuItemId }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Failed to generate link'); return }
      setResult(data)
      onGenerated()
    } catch {
      setError('Connection failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isApproved) {
    return (
      <div>
        <h2 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Generate Food Link</h2>
        <div style={{ background: 'rgba(234,179,8,0.06)', border: '1px solid rgba(234,179,8,0.2)', borderRadius: '20px', padding: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
          <h3 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontWeight: 800, marginBottom: '8px' }}>Waiting for approval</h3>
          <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 1.7 }}>
            Once your creator account is approved (within 48 hours), you can generate personal links for any food item on Dineflow.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontSize: '1.5rem', fontWeight: 900, marginBottom: '8px' }}>Generate Food Link</h2>
      <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '2rem' }}>Enter a Dineflow food item ID to create your personal affiliate link.</p>

      <div style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', padding: '2.5rem', maxWidth: '600px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: '#6b7280', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>
            Menu Item ID
          </label>
          <input
            type="text"
            value={menuItemId}
            onChange={e => setMenuItemId(e.target.value)}
            placeholder="e.g. a1b2c3d4-e5f6-7890-..."
            style={{ width: '100%', padding: '14px 16px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: '#fff', fontSize: '14px', outline: 'none', fontFamily: 'monospace', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
            onFocus={e => e.target.style.borderColor = 'rgba(168,85,247,0.5)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
          />
          <p style={{ color: '#4b5563', fontSize: '12px', marginTop: '8px' }}>
            You can find the menu item ID in the Dineflow app URL when viewing a food item.
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '10px', padding: '12px', color: '#f87171', fontSize: '13px', marginBottom: '16px' }}>
            ⚠️ {error}
          </div>
        )}

        <button
          onClick={handleGenerate} disabled={loading}
          style={{ width: '100%', padding: '16px', background: loading ? 'rgba(168,85,247,0.4)' : '#a855f7', color: '#fff', fontWeight: 700, fontSize: '16px', border: 'none', borderRadius: '14px', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#9333ea' }}
          onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#a855f7' }}
        >
          {loading
            ? <><div style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Generating...</>
            : '✨ Generate My Link'
          }
        </button>

        {result && (
          <div style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.25)', borderRadius: '16px', padding: '1.5rem', marginTop: '1.5rem' }}>
            <p style={{ color: '#22c55e', fontWeight: 700, fontSize: '14px', marginBottom: '12px' }}>✅ Link generated for: {result.foodName}</p>
            <div style={{ background: '#0a0a0a', borderRadius: '10px', padding: '12px 16px', marginBottom: '12px' }}>
              <p style={{ color: '#a855f7', fontSize: '13px', fontFamily: 'monospace', wordBreak: 'break-all' }}>{result.fullLink}</p>
            </div>
            <button
              onClick={() => { navigator.clipboard.writeText(result.fullLink); alert('Copied!') }}
              style={{ width: '100%', padding: '12px', background: '#a855f7', color: '#fff', fontWeight: 700, border: 'none', borderRadius: '10px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px' }}
            >
              📋 Copy Link
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function CreatorEarnings({ earnings }) {
  const history = earnings?.history || []
  const pending = earnings?.pendingEarnings || 0
  const paid = earnings?.paidEarnings || 0
  const total = earnings?.totalEarnings || 0

  return (
    <div>
      <h2 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Earnings</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '2rem' }}>
        {[
          { label: 'Pending Payout', value: `ETB ${pending}`, color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.2)' },
          { label: 'Total Paid', value: `ETB ${paid}`, color: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)' },
          { label: 'Total Earned', value: `ETB ${total}`, color: '#a855f7', bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.2)' },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: '18px', padding: '1.5rem', textAlign: 'center' }}>
            <p style={{ color: '#6b7280', fontSize: '12px', marginBottom: '8px' }}>{s.label}</p>
            <p style={{ color: s.color, fontSize: '1.8rem', fontWeight: 900, fontFamily: 'Syne, sans-serif' }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div style={{ background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.15)', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ fontSize: '28px' }}>💳</span>
        <div>
          <p style={{ color: '#60a5fa', fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>ETB 3 per completed and paid order through your links</p>
          <p style={{ color: '#6b7280', fontSize: '13px' }}>Paid monthly via Telebirr or bank. Minimum ETB 100 to withdraw.</p>
        </div>
      </div>

      <div style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '1.5rem' }}>
        <h3 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontWeight: 800, fontSize: '1rem', marginBottom: '1.5rem' }}>Transaction History</h3>
        {history.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#4b5563' }}>
            <p style={{ fontSize: '14px' }}>No transactions yet. Share your food links and earnings appear here when followers order.</p>
          </div>
        ) : (
          history.map(e => (
            <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div>
                <p style={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>🔗 Food Link Order</p>
                <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '2px' }}>{new Date(e.createdAt).toLocaleDateString()}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: '#a855f7', fontWeight: 700 }}>+ ETB {e.amount}</p>
                <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '999px', background: e.status === 'paid' ? 'rgba(34,197,94,0.1)' : 'rgba(251,191,36,0.1)', color: e.status === 'paid' ? '#22c55e' : '#fbbf24', fontWeight: 600 }}>
                  {e.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function CreatorCalculator() {
  const [views, setViews] = useState(50000)
  const [rate, setOrderRate] = useState(3)

  const orders = Math.round(views * (rate / 100))
  const earnings = orders * 3

  return (
    <div>
      <h2 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontSize: '1.5rem', fontWeight: 900, marginBottom: '8px' }}>Earnings Calculator</h2>
      <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '2rem' }}>See how much your next video could earn.</p>

      <div style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', padding: '2.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ color: '#9ca3af', fontSize: '14px', fontWeight: 600 }}>Video views</span>
              <span style={{ color: '#a855f7', fontWeight: 900, fontSize: '20px', fontFamily: 'Syne, sans-serif' }}>{views.toLocaleString()}</span>
            </div>
            <input type="range" min={1000} max={1000000} step={1000} value={views} onChange={e => setViews(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#a855f7', height: '6px', cursor: 'pointer' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <span style={{ color: '#4b5563', fontSize: '11px' }}>1,000</span>
              <span style={{ color: '#4b5563', fontSize: '11px' }}>1,000,000</span>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ color: '#9ca3af', fontSize: '14px', fontWeight: 600 }}>% of viewers who order</span>
              <span style={{ color: '#a855f7', fontWeight: 900, fontSize: '20px', fontFamily: 'Syne, sans-serif' }}>{rate}%</span>
            </div>
            <input type="range" min={1} max={15} value={rate} onChange={e => setOrderRate(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#a855f7', height: '6px', cursor: 'pointer' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <span style={{ color: '#4b5563', fontSize: '11px' }}>1% (low)</span>
              <span style={{ color: '#4b5563', fontSize: '11px' }}>15% (viral)</span>
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '20px', padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>Earnings from this video</p>
          <p style={{ color: '#a855f7', fontSize: '4rem', fontWeight: 900, fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>
            ETB {earnings.toLocaleString()}
          </p>
          <p style={{ color: '#9ca3af', fontSize: '15px', marginTop: '12px' }}>
            From <span style={{ color: '#c084fc', fontWeight: 700 }}>{orders.toLocaleString()} orders</span> at ETB 3 per order
          </p>
          <p style={{ color: '#4b5563', fontSize: '12px', marginTop: '12px' }}>
            {views.toLocaleString()} views × {rate}% = {orders.toLocaleString()} orders × ETB 3
          </p>
        </div>
      </div>
    </div>
  )
}