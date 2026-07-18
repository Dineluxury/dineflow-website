'use client'
import { useState, useEffect } from 'react'
import DashboardLayout from './DashboardLayout'

const tabs = [
  { id: 'overview', emoji: '📊', label: 'Overview' },
  { id: 'referrals', emoji: '🏪', label: 'My Referrals' },
  { id: 'earnings', emoji: '💰', label: 'Earnings' },
  { id: 'calculator', emoji: '🧮', label: 'Calculator' },
  { id: 'guide', emoji: '📖', label: 'Pitch Guide' },
]

export default function AmbassadorDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [profile, setProfile] = useState(null)
  const [referrals, setReferrals] = useState([])
  const [earnings, setEarnings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/partners/me').then(r => r.json()),
      fetch('/api/partners/ambassador/referrals').then(r => r.json()),
      fetch('/api/partners/earnings').then(r => r.json()),
    ]).then(([prof, refs, earn]) => {
      setProfile(prof)
      setReferrals(Array.isArray(refs) ? refs : [])
      setEarnings(earn)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <DashboardLayout type="ambassador" activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs}>
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px', gap: '16px' }}>
          <div style={{ width: '32px', height: '32px', border: '3px solid rgba(249,115,22,0.2)', borderTopColor: '#f97316', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <span style={{ color: '#6b7280' }}>Loading your dashboard...</span>
        </div>
      ) : (
        <>
          {activeTab === 'overview' && <AmbassadorOverview profile={profile} referrals={referrals} earnings={earnings} />}
          {activeTab === 'referrals' && <AmbassadorReferrals referrals={referrals} />}
          {activeTab === 'earnings' && <AmbassadorEarnings earnings={earnings} />}
          {activeTab === 'calculator' && <AmbassadorCalculator />}
          {activeTab === 'guide' && <AmbassadorGuide code={profile?.uniqueCode} />}
        </>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </DashboardLayout>
  )
}

function AmbassadorOverview({ profile, referrals, earnings }) {
  const stats = [
    { label: 'Restaurants Referred', value: profile?.totalReferrals || 0, emoji: '🏪', color: '#f97316' },
    { label: 'Active Referrals', value: profile?.activeReferrals || 0, emoji: '✅', color: '#22c55e' },
    { label: 'Pending Earnings (ETB)', value: earnings?.pendingEarnings || '0.00', emoji: '💰', color: '#fbbf24' },
    { label: 'Total Paid (ETB)', value: earnings?.paidEarnings || '0.00', emoji: '🏦', color: '#60a5fa' },
  ]

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontSize: '1.8rem', fontWeight: 900, marginBottom: '6px' }}>
          Welcome back, {profile?.name?.split(' ')[0] || 'Ambassador'} 👋
        </h1>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          {profile?.university && `${profile.university} · `}
          Your code: <span style={{ color: '#f97316', fontWeight: 700, fontFamily: 'monospace' }}>{profile?.uniqueCode || 'Pending approval'}</span>
        </p>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '2.5rem' }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px', padding: '1.5rem', transition: 'all 0.3s ease' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${s.color}30`; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <div style={{ fontSize: '28px', marginBottom: '12px' }}>{s.emoji}</div>
            <div style={{ color: s.color, fontSize: '2rem', fontWeight: 900, fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>{s.value}</div>
            <div style={{ color: '#6b7280', fontSize: '12px', marginTop: '6px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* How to get started */}
      {(!profile?.uniqueCode) && (
        <div style={{ background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '20px', padding: '2rem', marginBottom: '2rem' }}>
          <h3 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontWeight: 800, marginBottom: '1rem' }}>⏳ Your application is being reviewed</h3>
          <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 1.7 }}>
            We'll review your student ID and send your unique ambassador code to your email within 24 hours.
            Once approved you can start referring restaurants and earning immediately.
          </p>
        </div>
      )}

      {/* Recent referrals preview */}
      <div style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontWeight: 800, fontSize: '1rem' }}>Recent Referrals</h3>
          <button onClick={() => {}} style={{ background: 'transparent', border: 'none', color: '#f97316', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>View all →</button>
        </div>
        {referrals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#4b5563' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🏪</div>
            <p style={{ fontSize: '14px' }}>No referrals yet. Start visiting restaurants near your university!</p>
          </div>
        ) : (
          referrals.slice(0, 3).map(r => (
            <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', background: 'rgba(249,115,22,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🏪</div>
                <div>
                  <p style={{ color: '#fff', fontWeight: 600, fontSize: '14px' }}>{r.restaurantName || 'Restaurant'}</p>
                  <p style={{ color: '#6b7280', fontSize: '12px' }}>{r.restaurantAddress || ''}</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ padding: '4px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, background: r.status === 'active' ? 'rgba(34,197,94,0.1)' : 'rgba(107,114,128,0.1)', color: r.status === 'active' ? '#22c55e' : '#6b7280' }}>
                  {r.status === 'active' ? '● Active' : 'Expired'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function AmbassadorReferrals({ referrals }) {
  return (
    <div>
      <h2 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>My Restaurant Referrals</h2>

      {referrals.length === 0 ? (
        <div style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '4rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏪</div>
          <h3 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontWeight: 800, marginBottom: '8px' }}>No referrals yet</h3>
          <p style={{ color: '#6b7280', fontSize: '14px', maxWidth: '400px', margin: '0 auto', lineHeight: 1.7 }}>
            Visit restaurants near your university, show them the Dineflow desktop app, and help them sign up using your unique code.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {referrals.map(r => {
            const daysLeft = r.earningEndsAt ? Math.max(0, Math.ceil((new Date(r.earningEndsAt) - new Date()) / (1000 * 60 * 60 * 24))) : 90
            const progress = Math.min(100, ((90 - daysLeft) / 90) * 100)

            return (
              <div key={r.id} style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px', padding: '1.5rem', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(249,115,22,0.2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '48px', height: '48px', background: 'rgba(249,115,22,0.1)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>🏪</div>
                    <div>
                      <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '15px', marginBottom: '2px' }}>{r.restaurantName || 'Restaurant'}</h4>
                      <p style={{ color: '#6b7280', fontSize: '12px' }}>{r.restaurantAddress || 'No address'}</p>
                    </div>
                  </div>
                  <span style={{ padding: '5px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, background: r.status === 'active' ? 'rgba(34,197,94,0.1)' : 'rgba(107,114,128,0.1)', color: r.status === 'active' ? '#22c55e' : '#6b7280' }}>
                    {r.status === 'active' ? '● Active' : 'Expired'}
                  </span>
                </div>

                {/* 3-month progress */}
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: '#6b7280', fontSize: '12px' }}>Earning period</span>
                    <span style={{ color: '#f97316', fontSize: '12px', fontWeight: 600 }}>{daysLeft} days remaining</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #f97316, #fbbf24)', borderRadius: '999px', transition: 'width 0.5s ease' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                    <p style={{ color: '#6b7280', fontSize: '11px', marginBottom: '4px' }}>Total Earned</p>
                    <p style={{ color: '#f97316', fontWeight: 700, fontSize: '16px', fontFamily: 'Syne, sans-serif' }}>ETB {r.totalEarned || '0.00'}</p>
                  </div>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                    <p style={{ color: '#6b7280', fontSize: '11px', marginBottom: '4px' }}>Referred On</p>
                    <p style={{ color: '#9ca3af', fontWeight: 600, fontSize: '13px' }}>{r.referredAt ? new Date(r.referredAt).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function AmbassadorEarnings({ earnings }) {
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
          { label: 'Total Earned', value: `ETB ${total}`, color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.2)' },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: '18px', padding: '1.5rem', textAlign: 'center' }}>
            <p style={{ color: '#6b7280', fontSize: '12px', marginBottom: '8px' }}>{s.label}</p>
            <p style={{ color: s.color, fontSize: '1.8rem', fontWeight: 900, fontFamily: 'Syne, sans-serif' }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Payout info */}
      <div style={{ background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.15)', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ fontSize: '28px' }}>💳</span>
        <div>
          <p style={{ color: '#60a5fa', fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>Payouts sent monthly via Telebirr or bank transfer</p>
          <p style={{ color: '#6b7280', fontSize: '13px' }}>Minimum ETB 200 to request payout. Contact support@dineflow.et to request early payout.</p>
        </div>
      </div>

      {/* History */}
      <div style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '1.5rem' }}>
        <h3 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontWeight: 800, fontSize: '1rem', marginBottom: '1.5rem' }}>Transaction History</h3>
        {history.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#4b5563' }}>
            <p style={{ fontSize: '14px' }}>No transactions yet. Earnings appear here after restaurants receive paid orders.</p>
          </div>
        ) : (
          history.map(e => (
            <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div>
                <p style={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>{e.type === 'ambassador_commission' ? '🏪 Restaurant Commission' : e.type}</p>
                <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '2px' }}>{new Date(e.createdAt).toLocaleDateString()}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: '#f97316', fontWeight: 700 }}>+ ETB {e.amount}</p>
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

function AmbassadorCalculator() {
  const [restaurants, setRestaurants] = useState(3)
  const [avgRevenue, setAvgRevenue] = useState(80000)

  const monthly = Math.round(restaurants * avgRevenue * 0.05 * 0.5)
  const total = monthly * 3

  return (
    <div>
      <h2 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontSize: '1.5rem', fontWeight: 900, marginBottom: '8px' }}>Earnings Calculator</h2>
      <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '2rem' }}>See how much you could earn based on the restaurants you refer.</p>

      <div style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', padding: '2.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ color: '#9ca3af', fontSize: '14px', fontWeight: 600 }}>Restaurants you refer</span>
              <span style={{ color: '#f97316', fontWeight: 900, fontSize: '20px', fontFamily: 'Syne, sans-serif' }}>{restaurants}</span>
            </div>
            <input type="range" min={1} max={20} value={restaurants} onChange={e => setRestaurants(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#f97316', height: '6px', cursor: 'pointer' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <span style={{ color: '#4b5563', fontSize: '11px' }}>1</span>
              <span style={{ color: '#4b5563', fontSize: '11px' }}>20</span>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ color: '#9ca3af', fontSize: '14px', fontWeight: 600 }}>Avg monthly revenue per restaurant (ETB)</span>
              <span style={{ color: '#f97316', fontWeight: 900, fontSize: '20px', fontFamily: 'Syne, sans-serif' }}>{avgRevenue.toLocaleString()}</span>
            </div>
            <input type="range" min={10000} max={500000} step={10000} value={avgRevenue} onChange={e => setAvgRevenue(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#f97316', height: '6px', cursor: 'pointer' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <span style={{ color: '#4b5563', fontSize: '11px' }}>ETB 10,000</span>
              <span style={{ color: '#4b5563', fontSize: '11px' }}>ETB 500,000</span>
            </div>
          </div>
        </div>

        {/* Result */}
        <div style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '20px', padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>Your monthly earnings</p>
          <p style={{ color: '#f97316', fontSize: '4rem', fontWeight: 900, fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>
            ETB {monthly.toLocaleString()}
          </p>
          <p style={{ color: '#9ca3af', fontSize: '15px', marginTop: '12px' }}>
            Over 3 months: <span style={{ color: '#fbbf24', fontWeight: 700, fontSize: '18px' }}>ETB {total.toLocaleString()}</span>
          </p>
          <p style={{ color: '#4b5563', fontSize: '12px', marginTop: '16px' }}>
            {restaurants} restaurants × ETB {avgRevenue.toLocaleString()} × 5% Dineflow commission × 50% your share
          </p>
        </div>
      </div>
    </div>
  )
}

function AmbassadorGuide({ code }) {
  const steps = [
    { emoji: '1️⃣', title: 'Find a restaurant near your university', desc: 'Any restaurant, cafe, hotel, or food place counts. Start with places you already visit.' },
    { emoji: '2️⃣', title: 'Ask to speak with the owner or manager', desc: 'Say: "I have a free app that will bring more customers to your restaurant and manage your orders automatically."' },
    { emoji: '3️⃣', title: 'Show them the Dineflow desktop app', desc: 'Open the app and show them the orders page, menu manager, and QR table system. Let them see it live.' },
    { emoji: '4️⃣', title: 'Help them create their account', desc: 'Go to dineflow.et, help them register, and make sure they enter your code: ' + (code || 'YOUR-CODE') + ' when signing up.' },
    { emoji: '5️⃣', title: 'Help them fill their profile', desc: 'Add their menu items, photos, categories, location, and bank account. A complete profile gets approved faster.' },
    { emoji: '6️⃣', title: 'Submit and wait for Dineflow approval', desc: 'We review and approve within 24 hours. Once live, you start earning from every order they receive for 3 months.' },
  ]

  return (
    <div>
      <h2 style={{ fontFamily: 'Syne, sans-serif', color: '#fff', fontSize: '1.5rem', fontWeight: 900, marginBottom: '8px' }}>Restaurant Pitch Guide</h2>
      <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '2rem' }}>Follow these steps to successfully onboard a restaurant and start earning.</p>

      {code && (
        <div style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '28px' }}>🔑</span>
          <div>
            <p style={{ color: '#f97316', fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>Your unique ambassador code</p>
            <p style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 900, fontFamily: 'monospace' }}>{code}</p>
            <p style={{ color: '#6b7280', fontSize: '12px', marginTop: '4px' }}>Share this with every restaurant when they sign up on the Dineflow desktop app.</p>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {steps.map((step, i) => (
          <div key={i} style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.5rem', display: 'flex', gap: '16px', transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(249,115,22,0.2)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
          >
            <span style={{ fontSize: '24px', flexShrink: 0 }}>{step.emoji}</span>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>{step.title}</h4>
              <p style={{ color: '#6b7280', fontSize: '13px', lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Script */}
      <div style={{ background: '#141414', border: '1px solid rgba(96,165,250,0.2)', borderRadius: '20px', padding: '2rem', marginTop: '2rem' }}>
        <h3 style={{ fontFamily: 'Syne, sans-serif', color: '#60a5fa', fontWeight: 800, marginBottom: '1rem', fontSize: '1rem' }}>💬 What to say (sample pitch)</h3>
        <div style={{ background: '#0a0a0a', borderRadius: '12px', padding: '1.5rem', borderLeft: '3px solid #60a5fa' }}>
          <p style={{ color: '#d1d5db', fontSize: '14px', lineHeight: 1.8, fontStyle: 'italic' }}>
            "Good morning! My name is [your name] and I'm a student at [your university]. I represent Dineflow — a free app that lets customers order food before they arrive, so they come to your restaurant without waiting. You get a desktop app to manage all orders in real time, and payments go directly to your bank account. It's free to set up. Would you like me to show you how it works?"
          </p>
        </div>
      </div>
    </div>
  )
}
