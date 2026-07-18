'use client'
import { Store, SmilePlus, Star, Timer, Zap, Handshake, Globe, Lock } from 'lucide-react'

const stats = [
  { value: '50+', label: 'Restaurant Partners', icon: Store },
  { value: '5K+', label: 'Happy Customers', icon: SmilePlus },
  { value: '4.9', label: 'App Store Rating', icon: Star },
  { value: '15min', label: 'Avg Wait Saved', icon: Timer },
]

const values = [
  { icon: Zap, title: 'Built for Speed', desc: 'From order to table in minutes. No phone calls, no waiting, no stress.' },
  { icon: Handshake, title: 'Partner-First', desc: 'We help restaurants grow revenue, reduce waste, and serve smarter.' },
  { icon: Globe, title: 'Made in Ethiopia', desc: 'Designed for Ethiopian culture, food, and the way we dine together.' },
  { icon: Lock, title: 'Trusted & Secure', desc: 'Every payment is secured through Telebirr\'s verified infrastructure.' },
]

export default function About() {
  return (
    <section id="about" style={{ padding: '7rem 0', background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ color: '#f97316', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Our Mission</span>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, marginTop: '1rem', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#111827' }}>
            Changing the way Ethiopia
            <br /><span style={{ backgroundImage: 'linear-gradient(135deg, #f97316, #ea6c0a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>eats out.</span>
          </h2>
          <p style={{ color: '#6B7280', fontSize: '16px', maxWidth: '560px', margin: '1.5rem auto 0', lineHeight: 1.7 }}>
            Dineflow bridges the gap between restaurants and food lovers — making pre-ordering as natural as walking in.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px', marginBottom: '5rem' }} className="four-col">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={value} style={{
              background: '#fff', border: '1px solid #F0F0F0',
              borderRadius: '16px', padding: '28px 20px', textAlign: 'center',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(249,115,22,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(249,115,22,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#F0F0F0'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)' }}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(249,115,22,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                <Icon size={20} color="#f97316" />
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: '#111827', lineHeight: 1.1, marginBottom: '6px' }}>{value}</div>
              <div style={{ color: '#6B7280', fontSize: '13px', fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="two-col">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} style={{
              background: '#fff', border: '1px solid #F0F0F0',
              borderRadius: '16px', padding: '28px', display: 'flex', gap: '18px', alignItems: 'flex-start',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(249,115,22,0.25)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(249,115,22,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#F0F0F0'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)' }}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(249,115,22,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={20} color="#f97316" />
              </div>
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '16px', color: '#111827', marginBottom: '8px' }}>{title}</div>
                <div style={{ color: '#6B7280', fontSize: '14px', lineHeight: 1.65 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
