'use client'
import { Smartphone, UtensilsCrossed, CreditCard, CheckCircle } from 'lucide-react'

const steps = [
  { num: '01', icon: Smartphone, title: 'Browse Venues', desc: 'Open Dineflow and discover restaurants, hotels, and cafes near you. Filter by cuisine, rating, or pre-order availability.' },
  { num: '02', icon: UtensilsCrossed, title: 'Choose Your Meal', desc: 'Pick your dishes ahead of time and customize them exactly how you like them.' },
  { num: '03', icon: CreditCard, title: 'Choose How to Pay', desc: 'Pay securely with supported local options, including Telebirr, M-Pesa, or bank payments. Your order is confirmed and the kitchen starts immediately.' },
  { num: '04', icon: CheckCircle, title: 'Walk In & Enjoy', desc: 'Arrive at your scheduled time and your food is hot, fresh, and waiting on the table for you.' },
]

export default function ForCustomers() {
  return (
    <section id="customers" style={{ padding: '7rem 0', background: '#f6f7f8', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ color: '#e96b22', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>For Customers</span>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, marginTop: '1rem', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#18212b' }}>
            No more waiting.<br />
            <span style={{ backgroundImage: 'linear-gradient(135deg, #e96b22, #c95a19)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Ever again.</span>
          </h2>
          <p style={{ color: '#65717e', fontSize: '16px', maxWidth: '520px', margin: '1.5rem auto 0', lineHeight: 1.7 }}>
            Order from your phone, pay with a local method that works for you, and walk into a restaurant, hotel, or cafe where your food is already there.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px' }} className="two-col">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={s.num} style={{
                background: '#fff', borderRadius: '20px', padding: '32px 24px',
                border: '1px solid #e4e8ec',
                transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 10px 26px rgba(60,45,35,0.08)'; e.currentTarget.style.borderColor = 'rgba(233,107,34,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = '#e4e8ec' }}
              >
                <div style={{ position: 'absolute', top: '16px', right: '16px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '3.5rem', fontWeight: 900, color: 'rgba(0,0,0,0.04)', lineHeight: 1 }}>{s.num}</div>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(233,107,34,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                  <Icon size={22} color="#e96b22" />
                </div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '17px', color: '#18212b', marginBottom: '10px' }}>{s.title}</div>
                <div style={{ color: '#65717e', fontSize: '14px', lineHeight: 1.65 }}>{s.desc}</div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: i === 0 ? '#e96b22' : 'transparent', borderRadius: '0 0 20px 20px' }} />
              </div>
            )
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <a href="/waitlist" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '15px 28px',
              background: '#e96b22',
              color: '#fff', fontWeight: 700, borderRadius: '14px',
              textDecoration: 'none', fontSize: '15px',
              boxShadow: '0 3px 10px rgba(60,45,35,0.12)',
              transition: 'all 0.25s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#c95a19'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 5px 14px rgba(60,45,35,0.16)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#e96b22'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 3px 10px rgba(60,45,35,0.12)' }}
            >
              Android App - Coming Soon
            </a>
            <a href="/waitlist" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '15px 28px',
              border: '1.5px solid #e4e8ec',
              color: '#374151', fontWeight: 700, borderRadius: '14px',
              textDecoration: 'none', fontSize: '15px',
              background: '#fff',
              transition: 'all 0.25s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#e96b22'; e.currentTarget.style.color = '#e96b22'; e.currentTarget.style.background = 'rgba(233,107,34,0.04)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e4e8ec'; e.currentTarget.style.color = '#374151'; e.currentTarget.style.background = '#fff' }}
            >
              iOS App - Coming Soon
            </a>
          </div>
          <p style={{ color: '#9CA3AF', fontSize: '13px', marginTop: '12px' }}>Join our waitlist and we will notify you when the app launches.</p>
        </div>
      </div>
    </section>
  )
}


