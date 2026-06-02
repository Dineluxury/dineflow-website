'use client'

const features = [
  { emoji: '🔔', title: 'Real-Time Orders', desc: 'New orders appear on your dashboard instantly with OS desktop notifications. Zero delay, zero missed orders. Your staff always knows.', large: true, color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.2)' },
  { emoji: '🪑', title: 'QR Table System', desc: 'Print QR codes for every table. Customers scan and order directly from their phone.', large: false, color: '#a855f7', bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.2)' },
  { emoji: '💳', title: 'Instant Payouts', desc: '95% goes to your bank automatically via Chapa. Telebirr, CBE Birr, bank cards.', large: false, color: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)' },
  { emoji: '📦', title: 'Smart Stock Control', desc: 'Items auto-hide when stock hits zero. Restock with +/- buttons in seconds.', large: false, color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.2)' },
  { emoji: '🔒', title: 'Secure by Default', desc: 'JWT authentication, encrypted payments, HTTPS everywhere.', large: false, color: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)' },
  { emoji: '📊', title: 'Analytics & ERP', desc: 'Revenue trends, top-selling items, peak hours, staff performance — everything you need to grow your restaurant in one beautiful dashboard.', large: true, color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.2)' },
  { emoji: '⏱️', title: 'Smart Timing', desc: 'AI suggests prep times based on your current order queue.', large: false, color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.2)' },
  { emoji: '👥', title: 'Waiter App', desc: 'Dedicated mobile app for your floor staff to manage tables.', large: false, color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.2)' },
  { emoji: '📱', title: 'iOS & Android', desc: 'Beautiful, fast mobile app for customers on any device.', large: false, color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.2)' },
  { emoji: '📍', title: 'Location Search', desc: 'Customers find nearby restaurants using real GPS. Sorted by distance.', large: false, color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.2)' },
  { emoji: '🎭', title: 'Order Tracking', desc: 'Live status updates — Placed, Accepted, Preparing, Ready, Completed.', large: false, color: '#a855f7', bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.2)' },
  { emoji: '📶', title: 'Offline Resilience', desc: 'App works without internet. Syncs when connection returns.', large: false, color: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)' },
]

export default function Features() {
  return (
    <section id="features" style={{ padding: '8rem 0', background: '#0a0a0a' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Features</span>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900, marginTop: '1rem', marginBottom: '1.5rem', lineHeight: 1.05,
          }}>
            Everything you need.<br />
            <span style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Nothing you don't.
            </span>
          </h2>
          <p style={{ color: '#6b7280', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Built specifically for Ethiopian restaurants. Every feature was designed based on real problems real restaurant owners told us about.
          </p>
        </div>

        {/* Bento grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {features.map((f, i) => (
            <div key={f.title} style={{
              gridColumn: f.large ? 'span 2' : 'span 1',
              background: '#1a1a1a',
              border: `1px solid rgba(255,255,255,0.06)`,
              borderRadius: '20px',
              padding: '24px',
              transition: 'all 0.3s ease',
              cursor: 'default',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = f.border; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: '14px',
                background: f.bg, border: `1px solid ${f.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px', marginBottom: '20px',
                transition: 'transform 0.3s ease',
              }}>
                {f.emoji}
              </div>
              <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: '10px', fontSize: '15px' }}>{f.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '13px', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}