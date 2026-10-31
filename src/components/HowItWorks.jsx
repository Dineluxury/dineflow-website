'use client'
import { Smartphone, Store, Clock, CreditCard, CheckCircle } from 'lucide-react'

const steps = [
  { num: 1, icon: Smartphone, title: 'Download the App', desc: 'Available free on Android and iOS. Sign up in under 60 seconds with your phone number.' },
  { num: 2, icon: Store, title: 'Pick a Restaurant', desc: 'Browse nearby restaurants, check menus, read reviews, and see real-time table availability.' },
  { num: 3, icon: Clock, title: 'Choose Your Arrival Time', desc: 'Schedule when you\'ll arrive. Dineflow tells the restaurant kitchen exactly when to start cooking.' },
  { num: 4, icon: CreditCard, title: 'Pay Securely', desc: 'Checkout with Telebirr in one tap. Your payment is confirmed and your spot is reserved instantly.' },
  { num: 5, icon: CheckCircle, title: 'Walk in & Enjoy', desc: 'Arrive to your table with your meal already ready. No waiting. Just eating.' },
]

export default function HowItWorks() {
  return (
    <section id="how" style={{ padding: '7rem 0', background: '#f6f7f8', position: 'relative', overflow: 'hidden' }}>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ color: '#e96b22', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>How It Works</span>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, marginTop: '1rem', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#18212b' }}>
            Simple as <span style={{ backgroundImage: 'linear-gradient(135deg, #e96b22, #c95a19)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>1, 2, 3, 4, 5.</span>
          </h2>
        </div>

        {/* Steps */}
        <div style={{ position: 'relative' }}>
          {/* Connecting line */}
          <div style={{ position: 'absolute', left: '27px', top: '40px', bottom: '40px', width: '2px', background: '#e4e8ec', borderRadius: '1px' }} />

          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={s.num} style={{
                display: 'flex', gap: '28px', alignItems: 'flex-start',
                marginBottom: i < steps.length - 1 ? '32px' : 0,
              }}>
                {/* Circle number */}
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%', flexShrink: 0,
                  background: '#e96b22',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '18px', color: '#fff',
                  boxShadow: '0 3px 10px rgba(60,45,35,0.14)',
                  position: 'relative', zIndex: 1,
                }}>{s.num}</div>

                {/* Content card */}
                <div style={{
                  flex: 1, background: '#fff', borderRadius: '16px', padding: '22px 26px',
                  border: '1px solid #e4e8ec',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 10px 28px rgba(233,107,34,0.1)'; e.currentTarget.style.borderColor = 'rgba(233,107,34,0.25)'; e.currentTarget.style.transform = 'translateX(4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = '#e4e8ec'; e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <Icon size={18} color="#e96b22" />
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '16px', color: '#18212b' }}>{s.title}</div>
                  </div>
                  <div style={{ color: '#65717e', fontSize: '14px', lineHeight: 1.7 }}>{s.desc}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

