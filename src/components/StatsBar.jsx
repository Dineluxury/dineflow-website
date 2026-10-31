'use client'

const stats = [
  'Free to Download',
  '4.9 App Rating',
  '40 Venues on Waitlist',
  '130 Users on Waitlist',
  'LakiPay Payments',
  'Real-time Order Tracking',
  'Built in Ethiopia',
  'Zero Wait Time',
  'Secure & Fast Checkout',
]

export default function StatsBar() {
  const doubled = [...stats, ...stats]

  return (
    <div style={{
      background: '#f6f7f8', overflow: 'hidden',
      padding: '18px 0', position: 'relative',
      borderTop: '1px solid #e4e8ec',
      borderBottom: '1px solid #e4e8ec',
    }}>
      {/* Fade masks */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(90deg, #f6f7f8, transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(270deg, #f6f7f8, transparent)', zIndex: 2, pointerEvents: 'none' }} />

      <div style={{ display: 'flex', animation: 'marquee 30s linear infinite', width: 'max-content' }}>
        {doubled.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '0 28px', whiteSpace: 'nowrap' }}>
            <span style={{ color: '#65717e', fontSize: '13px', fontWeight: 500 }}>{s}</span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#e96b22', display: 'inline-block', flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  )
}


