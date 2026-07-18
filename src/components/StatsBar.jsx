'use client'

const stats = [
  'Free to Download',
  '4.9 App Rating',
  '50+ Restaurant Partners',
  'Telebirr Payments',
  'Real-time Order Tracking',
  'Built in Ethiopia',
  'Zero Wait Time',
  'Secure & Fast Checkout',
]

export default function StatsBar() {
  const doubled = [...stats, ...stats]

  return (
    <div style={{
      background: '#F9FAFB', overflow: 'hidden',
      padding: '18px 0', position: 'relative',
      borderTop: '1px solid #F0F0F0',
      borderBottom: '1px solid #F0F0F0',
    }}>
      {/* Fade masks */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(90deg, #F9FAFB, transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(270deg, #F9FAFB, transparent)', zIndex: 2, pointerEvents: 'none' }} />

      <div style={{ display: 'flex', animation: 'marquee 30s linear infinite', width: 'max-content' }}>
        {doubled.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '0 28px', whiteSpace: 'nowrap' }}>
            <span style={{ color: '#6B7280', fontSize: '13px', fontWeight: 500 }}>{s}</span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#f97316', display: 'inline-block', flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  )
}