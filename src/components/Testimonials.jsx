'use client'
import { Star } from 'lucide-react'

const testimonials = [
  { name: 'Bereket Tadesse', role: 'Pre-launch tester, Hawassa cafe owner', avatar: 'B', color: '#e96b22', text: 'I tried the Dineflow preview before launch and immediately saw how much time it can save. Seeing orders come in clearly on screen feels exactly like what cafes and restaurants need.', rating: 5 },
  { name: 'Selam Girma', role: 'Pre-launch app tester, Hawassa', avatar: 'S', color: '#647a68', text: 'The app felt simple from the first tap. I picked food, chose my time, and tracked the order. I honestly cannot wait for Dineflow to launch so I can use it for real.', rating: 5 },
  { name: 'Dawit Haile', role: 'Pre-launch tester, hotel manager', avatar: 'D', color: '#85718a', text: 'The idea is perfect for hotels, cafes, and restaurants. Guests can order before they arrive, and the kitchen knows what to prepare. We are ready to join when it launches.', rating: 5 },
  { name: 'Tigist Bekele', role: 'Pre-launch customer tester, Addis Ababa', avatar: 'T', color: '#627589', text: 'I loved the order tracking and LakiPay checkout flow. It makes dining feel modern and organized. I am waiting for launch day because this is something I would actually use.', rating: 5 },
]

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: '7rem 0', background: '#f6f7f8', position: 'relative', overflow: 'hidden' }}>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ color: '#e96b22', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Testimonials</span>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, marginTop: '1rem', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#18212b' }}>
            People love<br />
            <span style={{ backgroundImage: 'linear-gradient(135deg, #e96b22, #c95a19)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Dineflow.</span>
          </h2>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="two-col">
          {testimonials.map(t => (
            <div key={t.name} style={{
              background: '#fff', borderRadius: '20px', padding: '32px',
              border: '1px solid #e4e8ec',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = '#e4e8ec' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = '#e4e8ec' }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                {Array(t.rating).fill(0).map((_, i) => <Star key={i} size={14} color="#e96b22" fill="#e96b22" />)}
              </div>

              {/* Quote */}
              <p style={{ color: '#374151', lineHeight: 1.75, marginBottom: '24px', fontSize: '15px' }}>
                "{t.text}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '20px', borderTop: '1px solid #e4e8ec' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: `${t.color}15`, border: `2px solid ${t.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '16px', color: t.color,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>{t.avatar}</div>
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '14px', color: '#18212b' }}>{t.name}</div>
                  <div style={{ color: '#9CA3AF', fontSize: '12px', marginTop: '2px' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


