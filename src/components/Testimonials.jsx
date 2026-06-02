'use client'

const testimonials = [
  { name: 'Bereket Tadesse', role: 'Owner, Taste of Hawassa', avatar: 'B', color: '#f97316', text: 'Before Dineflow we were taking orders by phone and writing them on paper. Now everything is on the screen, orders come in automatically, and I can see my revenue every day. It changed how we run the restaurant completely.', rating: 5 },
  { name: 'Selam Girma', role: 'Regular Customer, Hawassa', avatar: 'S', color: '#22c55e', text: 'I order from my favorite place every day before I leave work. When I arrive my food is already ready on the table. I never wait anymore. This app is the best thing that happened to lunchtime.', rating: 5 },
  { name: 'Dawit Haile', role: 'Owner, Grill House Sidama', avatar: 'D', color: '#a855f7', text: 'The QR table system is amazing. Customers sit down, scan the code, and order from their phone. My waiters just bring the food. It is faster, cleaner, and customers love it.', rating: 5 },
  { name: 'Tigist Bekele', role: 'Customer, Addis Ababa', avatar: 'T', color: '#60a5fa', text: 'The payment is so easy. I pay with Telebirr in two seconds. I can see exactly when my food is being prepared and when it is ready. It feels like the future.', rating: 5 },
]

export default function Testimonials() {
  return (
    <section style={{ padding: '8rem 0', background: '#0d0d0d', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Testimonials</span>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900, marginTop: '1rem', lineHeight: 1.05,
          }}>
            Loved by restaurants<br />
            <span style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              and food lovers.
            </span>
          </h2>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {testimonials.map((t, i) => (
            <div key={t.name} style={{
              background: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '24px', padding: '32px',
              transition: 'all 0.3s ease', cursor: 'default',
              borderImage: 'none',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(249,115,22,0.2)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              {/* Quote mark */}
              <div style={{ fontSize: '4rem', color: 'rgba(249,115,22,0.15)', fontFamily: 'Georgia, serif', lineHeight: 1, marginBottom: '16px', marginTop: '-10px' }}>"</div>

              {/* Stars */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                {Array(t.rating).fill(0).map((_, i) => (
                  <span key={i} style={{ color: '#f97316', fontSize: '14px' }}>★</span>
                ))}
              </div>

              <p style={{ color: '#d1d5db', lineHeight: 1.7, marginBottom: '28px', fontSize: '15px', fontStyle: 'italic' }}>
                {t.text}
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: `rgba(${t.color === '#f97316' ? '249,115,22' : t.color === '#22c55e' ? '34,197,94' : t.color === '#a855f7' ? '168,85,247' : '96,165,250'},0.15)`,
                  border: `1px solid ${t.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: '16px', color: t.color,
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>{t.name}</div>
                  <div style={{ color: '#6b7280', fontSize: '12px', marginTop: '2px' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}