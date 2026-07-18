'use client'
import { Smartphone, UtensilsCrossed, CreditCard, CheckCircle } from 'lucide-react'

const steps = [
  { num: '01', icon: Smartphone, title: 'Browse Restaurants', desc: 'Open Dineflow and discover restaurants near you. Filter by cuisine, rating, or pre-order availability.' },
  { num: '02', icon: UtensilsCrossed, title: 'Choose Your Meal', desc: 'Pick your dishes ahead of time and customize them exactly how you like them.' },
  { num: '03', icon: CreditCard, title: 'Pay with Telebirr', desc: 'Checkout securely in seconds using Telebirr. Your order is confirmed and the kitchen starts immediately.' },
  { num: '04', icon: CheckCircle, title: 'Walk In & Enjoy', desc: 'Arrive at your scheduled time and your food is hot, fresh, and waiting on the table for you.' },
]

export default function ForCustomers() {
  return (
    <section id="customers" style={{ padding: '7rem 0', background: '#F9FAFB', position: 'relative', overflow: 'hidden' }}>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ color: '#f97316', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>For Customers</span>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, marginTop: '1rem', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#111827' }}>
            No more waiting.<br />
            <span style={{ backgroundImage: 'linear-gradient(135deg, #f97316, #ea6c0a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Ever again.</span>
          </h2>
          <p style={{ color: '#6B7280', fontSize: '16px', maxWidth: '520px', margin: '1.5rem auto 0', lineHeight: 1.7 }}>
            Order from your phone, pay instantly with Telebirr, and walk into a restaurant where your food is already there.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px' }} className="two-col">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={s.num} style={{
                background: '#fff', borderRadius: '20px', padding: '32px 24px',
                border: '1px solid #F0F0F0',
                transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(249,115,22,0.12)'; e.currentTarget.style.borderColor = 'rgba(249,115,22,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = '#F0F0F0' }}
              >
                {/* Step number bg */}
                <div style={{ position: 'absolute', top: '16px', right: '16px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '3.5rem', fontWeight: 900, color: 'rgba(0,0,0,0.04)', lineHeight: 1 }}>{s.num}</div>

                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(249,115,22,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                  <Icon size={22} color="#f97316" />
                </div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '17px', color: '#111827', marginBottom: '10px' }}>{s.title}</div>
                <div style={{ color: '#6B7280', fontSize: '14px', lineHeight: 1.65 }}>{s.desc}</div>

                {/* Bottom accent — only first card */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: i === 0 ? '#f97316' : 'transparent', borderRadius: '0 0 20px 20px' }} />
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <a href="#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '15px 32px',
            background: '#f97316',
            color: '#fff', fontWeight: 700, borderRadius: '14px',
            textDecoration: 'none', fontSize: '15px',
            boxShadow: '0 6px 20px rgba(249,115,22,0.35)',
            transition: 'all 0.25s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#ea6c0a'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(249,115,22,0.45)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#f97316'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(249,115,22,0.35)' }}
          >
            Download Free — Available Now
          </a>
        </div>
      </div>
    </section>
  )
}