'use client'

const stats = [
  { value: '500+', label: 'Restaurants' },
  { value: 'ETB 0', label: 'Setup Fee' },
  { value: '95%', label: 'Payout to Restaurants' },
  { value: '10K+', label: 'Happy Users' },
  { value: '< 1 sec', label: 'Order Notification' },
  { value: 'Telebirr', label: 'Supported' },
  { value: 'CBE Birr', label: 'Supported' },
  { value: '24/7', label: 'Always Live' },
  { value: 'Free', label: 'Customer App' },
  { value: '2 Cities', label: 'Launched' },
]

export default function StatsBar() {
  return (
    <div style={{ background: '#f97316', padding: '14px 0', overflow: 'hidden', position: 'relative' }}>
      <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 25s linear infinite' }}>
        {[...stats, ...stats, ...stats].map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0 32px', flexShrink: 0 }}>
            <span style={{ color: '#fff', fontWeight: 900, fontSize: '14px' }}>{s.value}</span>
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '20px', margin: '0 8px' }}>·</span>
          </div>
        ))}
      </div>
    </div>
  )
}