'use client'
import { BarChart2, CalendarCheck, CreditCard, TrendingUp, Bell, Users } from 'lucide-react'

const features = [
  { icon: BarChart2, title: 'Live Order Dashboard', desc: 'See every incoming order in real-time. Accept, prepare, and track — all from one screen.' },
  { icon: CalendarCheck, title: 'Smart Scheduling', desc: 'Customers book time slots. You prepare at the right time. Zero confusion, zero rush.' },
  { icon: CreditCard, title: 'Telebirr Integration', desc: 'Get paid instantly through Telebirr. No cash handling, no delays, no disputes.' },
  { icon: TrendingUp, title: 'Revenue Analytics', desc: 'Daily, weekly and monthly reports. Understand your peak hours and best-selling dishes.' },
  { icon: Bell, title: 'Instant Notifications', desc: 'Get pinged the moment a new order comes in. Never miss a pre-order again.' },
  { icon: Users, title: 'Commission Program', desc: 'Earn through our ambassador network. Partners refer restaurants and earn recurring commissions.' },
]

export default function ForRestaurants() {
  return (
    <section id="restaurants" style={{ padding: '7rem 0', background: '#ffffff', position: 'relative', overflow: 'hidden' }}>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ color: '#f97316', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>For Restaurants</span>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, marginTop: '1rem', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#111827' }}>
            Run a smarter
            <br /><span style={{ backgroundImage: 'linear-gradient(135deg, #f97316, #ea6c0a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>restaurant.</span>
          </h2>
          <p style={{ color: '#6B7280', fontSize: '16px', maxWidth: '520px', margin: '1.5rem auto 0', lineHeight: 1.7 }}>
            Dineflow gives your kitchen full visibility and control. Know what's coming before customers even leave their house.
          </p>
        </div>

        {/* Feature grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px', marginBottom: '4rem' }} className="three-col">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} style={{
              background: '#fff', border: '1px solid #F0F0F0',
              borderRadius: '18px', padding: '28px',
              transition: 'all 0.3s ease', cursor: 'default',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(249,115,22,0.25)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(249,115,22,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#F0F0F0'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)' }}
            >
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px',
                background: 'rgba(249,115,22,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '18px',
              }}>
                <Icon size={22} color="#f97316" />
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '16px', color: '#111827', marginBottom: '8px' }}>{title}</div>
              <div style={{ color: '#6B7280', fontSize: '14px', lineHeight: 1.65 }}>{desc}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <a href="#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '15px 32px', background: '#f97316',
            color: '#fff', fontWeight: 700, borderRadius: '14px',
            textDecoration: 'none', fontSize: '15px',
            boxShadow: '0 6px 20px rgba(249,115,22,0.35)',
            transition: 'all 0.25s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#ea6c0a'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(249,115,22,0.45)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#f97316'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(249,115,22,0.35)' }}
          >
            Partner With Dineflow — Free Setup
          </a>
          <p style={{ color: '#9CA3AF', fontSize: '13px', marginTop: '12px' }}>No upfront cost · We set everything up · Cancel anytime</p>
        </div>
      </div>
    </section>
  )
}