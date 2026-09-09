'use client'
import { Zap, MapPin, CreditCard, Bell, Star, Store, CalendarCheck, Gift } from 'lucide-react'

const features = [
  { icon: Zap, title: 'Zero Wait Time', desc: 'Walk in to food already on the table. Dineflow syncs your arrival with kitchen prep.', color: '#f97316' },
  { icon: MapPin, title: 'Real-time Tracking', desc: 'Live status updates from order confirmed → kitchen prep → ready to serve.', color: '#22c55e' },
  { icon: CreditCard, title: 'Chapa Payments', desc: 'Secure checkout through Chapa. Pay and confirm in one smooth flow.', color: '#3b82f6' },
  { icon: Bell, title: 'Smart Notifications', desc: 'Get pinged when your table is ready, when food is being prepared, and when it\'s done.', color: '#a855f7' },
  { icon: Star, title: 'Review & Rating', desc: 'Rate your experience after every meal and help others discover the best restaurants, hotels, and cafes.', color: '#f59e0b' },
  { icon: Store, title: 'Venue Discovery', desc: 'Browse curated restaurants, hotels, and cafes by cuisine, rating, or neighborhood across Ethiopia.', color: '#ef4444' },
  { icon: CalendarCheck, title: 'Table Reservations', desc: 'Reserve your table when you pre-order. Your spot is guaranteed, no calls needed.', color: '#14b8a6' },
  { icon: Gift, title: 'Rewards & Loyalty', desc: 'Earn points every time you order. Redeem for free meals and exclusive deals.', color: '#f97316' },
]

export default function Features() {
  return (
    <section id="features" style={{ padding: '7rem 0', background: '#ffffff', position: 'relative', overflow: 'hidden' }}>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ color: '#f97316', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Features</span>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, marginTop: '1rem', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#111827' }}>
            Everything you need,<br />
            <span style={{ backgroundImage: 'linear-gradient(135deg, #f97316, #ea6c0a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>nothing you don't.</span>
          </h2>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '18px' }} className="four-col">
          {features.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} style={{
              background: '#fff', border: '1px solid #F0F0F0',
              borderRadius: '18px', padding: '24px',
              transition: 'all 0.3s ease', cursor: 'default', position: 'relative', overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${color}40`
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 12px 32px ${color}15`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#F0F0F0'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px', marginBottom: '16px',
                background: `${color}12`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={20} color={color} />
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '15px', color: '#111827', marginBottom: '8px' }}>{title}</div>
              <div style={{ color: '#6B7280', fontSize: '13px', lineHeight: 1.65 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
