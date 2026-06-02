'use client'

const benefits = [
  { emoji: '⏰', title: 'Order Ahead', desc: 'Food ready when you arrive' },
  { emoji: '📍', title: 'Live Tracking', desc: 'Watch your order in real time' },
  { emoji: '💳', title: 'Easy Payment', desc: 'Telebirr, CBE Birr, bank cards' },
  { emoji: '🗺️', title: 'Find Nearby', desc: 'Restaurants sorted by distance' },
  { emoji: '⭐', title: 'Rate & Review', desc: 'Share your experience' },
  { emoji: '🛍️', title: 'Order History', desc: 'Reorder favorites in one tap' },
]

export default function ForCustomers() {
  return (
    <section id="customers" style={{ padding: '8rem 0', background: '#0d0d0d', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 85% 50%, rgba(249,115,22,0.05) 0%, transparent 60%)',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

          {/* Phone mockup */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(249,115,22,0.1)', filter: 'blur(50px)',
                borderRadius: '50%', animation: 'float 5s ease-in-out infinite',
              }} />

              {/* Main phone */}
              <div style={{
                position: 'relative',
                width: '260px', height: '520px',
                background: 'linear-gradient(145deg, #1a1a1a, #111)',
                borderRadius: '44px',
                border: '2px solid rgba(255,255,255,0.1)',
                overflow: 'hidden',
                transform: 'perspective(900px) rotateY(8deg) rotateX(2deg)',
                boxShadow: '25px 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(249,115,22,0.08)',
                animation: 'float 5s ease-in-out infinite',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                  width: '90px', height: '24px', background: '#000',
                  borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px', zIndex: 10,
                }} />

                <div style={{ height: '44px', display: 'flex', alignItems: 'flex-end', padding: '0 20px 8px', justifyContent: 'space-between' }}>
                  <span style={{ color: '#fff', fontSize: '11px', fontWeight: 600 }}>9:41</span>
                </div>

                <div style={{ padding: '0 16px' }}>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '14px', marginBottom: '16px' }}>Order Tracking</div>

                  {/* Status */}
                  <div style={{
                    background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)',
                    borderRadius: '20px', padding: '20px', textAlign: 'center', marginBottom: '20px',
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: '8px' }}>👨‍🍳</div>
                    <div style={{ color: '#fb923c', fontWeight: 700, fontSize: '13px' }}>Preparing Your Food</div>
                    <div style={{ color: '#6b7280', fontSize: '11px', marginTop: '4px' }}>Chef is cooking your order</div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', marginTop: '12px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: '60%', background: '#f97316', borderRadius: '999px' }} />
                    </div>
                    <div style={{ color: '#fb923c', fontSize: '11px', marginTop: '8px', fontWeight: 600 }}>⏱ Ready in ~12 min</div>
                  </div>

                  {/* Steps */}
                  {[
                    { label: 'Order Placed', done: true },
                    { label: 'Restaurant Accepted', done: true },
                    { label: 'Preparing', done: true, active: true },
                    { label: 'Ready for Pickup', done: false },
                    { label: 'Completed', done: false },
                  ].map((step, i) => (
                    <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                      <div style={{
                        width: '24px', height: '24px', borderRadius: '50%',
                        background: step.active ? '#f97316' : step.done ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.08)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '11px', fontWeight: 700, flexShrink: 0,
                        color: step.active ? '#fff' : step.done ? '#22c55e' : '#4b5563',
                      }}>
                        {step.done ? '✓' : i + 1}
                      </div>
                      <span style={{
                        fontSize: '11px', fontWeight: 500,
                        color: step.active ? '#fb923c' : step.done ? '#fff' : '#4b5563',
                      }}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div style={{
                position: 'absolute', left: '-70px', bottom: '80px',
                background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px', padding: '12px 14px',
                display: 'flex', alignItems: 'center', gap: '10px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
                animation: 'float-delay 5s ease-in-out infinite',
              }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>✅</div>
                <div>
                  <div style={{ color: '#fff', fontSize: '11px', fontWeight: 700 }}>Payment Done</div>
                  <div style={{ color: '#22c55e', fontSize: '10px' }}>via Telebirr</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>For Customers</span>
            <h2 style={{
              fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 900, marginTop: '1rem', marginBottom: '1.5rem', lineHeight: 1.1,
            }}>
              Order food like<br />
              <span style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                never before.
              </span>
            </h2>
            <p style={{ color: '#6b7280', lineHeight: 1.7, marginBottom: '2.5rem', fontSize: '15px' }}>
              Browse restaurants near you, order ahead, pay instantly with Telebirr or your bank card,
              and track your food in real time. Arrive when your food is ready. Not a minute sooner.
            </p>

            {/* Benefits grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '2.5rem' }}>
              {benefits.map(b => (
                <div key={b.title} style={{
                  background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '14px', padding: '16px',
                  transition: 'all 0.3s ease', cursor: 'default',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(249,115,22,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ fontSize: '22px', marginBottom: '8px' }}>{b.emoji}</div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>{b.title}</div>
                  <div style={{ color: '#6b7280', fontSize: '12px' }}>{b.desc}</div>
                </div>
              ))}
            </div>

            {/* Download buttons */}
            <p style={{ color: '#4b5563', fontSize: '13px', marginBottom: '12px' }}>Available soon on all platforms:</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {[
                { icon: '', store: 'App Store', sub: 'Download on the' },
                { icon: '▶', store: 'Google Play', sub: 'Get it on' },
              ].map(btn => (
                <div key={btn.store} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '14px 20px', background: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px', cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(249,115,22,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <span style={{ fontSize: '24px' }}>{btn.icon}</span>
                  <div>
                    <div style={{ color: '#6b7280', fontSize: '11px' }}>{btn.sub}</div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>{btn.store}</div>
                  </div>
                  <span style={{
                    fontSize: '11px', background: 'rgba(249,115,22,0.15)',
                    color: '#fb923c', padding: '3px 10px', borderRadius: '999px',
                    fontWeight: 600, border: '1px solid rgba(249,115,22,0.2)',
                  }}>Soon</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}