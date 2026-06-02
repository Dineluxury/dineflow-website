'use client'

const features = [
  { emoji: '🔔', title: 'Real-Time Orders', desc: 'Instant notifications — never miss an order' },
  { emoji: '🪑', title: 'QR Table System', desc: 'Customers order from their phones at the table' },
  { emoji: '📦', title: 'Stock Control', desc: 'Auto-hide items when sold out' },
  { emoji: '📊', title: 'Analytics', desc: 'Revenue, trends, top items daily' },
  { emoji: '👥', title: 'Staff Management', desc: 'Waiter app for your floor team' },
  { emoji: '💰', title: 'Auto Payouts', desc: '95% deposited to your bank via Chapa' },
]

export default function ForRestaurants() {
  return (
    <section id="restaurants" style={{ padding: '8rem 0', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 15% 50%, rgba(249,115,22,0.05) 0%, transparent 60%)',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

          {/* Left content */}
          <div>
            <span style={{ color: '#f97316', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>For Restaurants</span>
            <h2 style={{
              fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 900, marginTop: '1rem', marginBottom: '1.5rem', lineHeight: 1.1,
            }}>
              Run your restaurant<br />
              <span style={{ background: 'linear-gradient(135deg, #f97316, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                smarter.
              </span>
            </h2>
            <p style={{ color: '#6b7280', lineHeight: 1.7, marginBottom: '2.5rem', fontSize: '15px' }}>
              A powerful desktop app built with Tauri + Rust. Lightweight, instant startup,
              real-time order notifications. Built for restaurant owners who want to focus on food, not paperwork.
            </p>

            {/* Features grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '2.5rem' }}>
              {features.map(f => (
                <div key={f.title} style={{
                  background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '14px', padding: '16px',
                  transition: 'all 0.3s ease', cursor: 'default',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(249,115,22,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ fontSize: '22px', marginBottom: '8px' }}>{f.emoji}</div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>{f.title}</div>
                  <div style={{ color: '#6b7280', fontSize: '12px' }}>{f.desc}</div>
                </div>
              ))}
            </div>

            {/* Download CTA */}
            <div style={{
              background: '#1a1a1a', border: '1px solid rgba(249,115,22,0.2)',
              borderRadius: '20px', padding: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '22px' }}>💻</span>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '15px' }}>Restaurant Desktop App</span>
                <span style={{
                  fontSize: '11px', background: 'rgba(249,115,22,0.15)',
                  color: '#fb923c', padding: '3px 10px', borderRadius: '999px',
                  fontWeight: 600, border: '1px solid rgba(249,115,22,0.2)',
                }}>Windows</span>
              </div>
              <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '16px', lineHeight: 1.6 }}>
                Lightweight Tauri app. Uses 10x less RAM than Electron. Starts in under 1 second.
              </p>
              <button style={{
                width: '100%', padding: '14px', background: '#f97316',
                color: '#fff', fontWeight: 700, fontSize: '15px',
                border: 'none', borderRadius: '14px', cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(249,115,22,0.3)',
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#ea6c0a'}
                onMouseLeave={e => e.currentTarget.style.background = '#f97316'}
              >
                ⬇️ Download for Windows — Coming Soon
              </button>
            </div>
          </div>

          {/* Desktop mockup */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(249,115,22,0.04)', filter: 'blur(40px)', borderRadius: '24px' }} />
            <div style={{
              position: 'relative',
              background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px', overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
            }}>
              {/* Title bar */}
              <div style={{
                height: '40px', background: '#1a1a1a',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', padding: '0 16px', gap: '8px',
              }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(239,68,68,0.7)' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(234,179,8,0.7)' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(34,197,94,0.7)' }} />
                <span style={{ color: '#4b5563', fontSize: '12px', marginLeft: '8px' }}>Dineflow Restaurant</span>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f97316' }} />
                  <span style={{ color: '#f97316', fontSize: '11px' }}>3 active orders</span>
                </div>
              </div>

              <div style={{ display: 'flex', height: '340px' }}>
                {/* Sidebar */}
                <div style={{
                  width: '160px', background: '#1a1a1a',
                  borderRight: '1px solid rgba(255,255,255,0.05)',
                  padding: '12px', display: 'flex', flexDirection: 'column',
                }}>
                  <div style={{ flex: 1 }}>
                    {[
                      { label: 'Dashboard', active: false },
                      { label: 'Orders', active: true, badge: '3' },
                      { label: 'Menu', active: false },
                      { label: 'Analytics', active: false },
                      { label: 'Tables', active: false },
                      { label: 'Staff', active: false },
                      { label: 'Profile', active: false },
                    ].map(item => (
                      <div key={item.label} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '8px 12px', borderRadius: '8px', marginBottom: '2px',
                        background: item.active ? '#f97316' : 'transparent',
                        color: item.active ? '#fff' : '#6b7280', fontSize: '12px', fontWeight: item.active ? 700 : 400,
                      }}>
                        <span>{item.label}</span>
                        {item.badge && (
                          <span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: '999px', padding: '1px 7px', fontSize: '10px' }}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 900 }}>I</div>
                    <div>
                      <div style={{ color: '#fff', fontSize: '11px', fontWeight: 600 }}>Injohi</div>
                      <div style={{ color: '#6b7280', fontSize: '10px' }}>Owner</div>
                    </div>
                  </div>
                </div>

                {/* Orders panel */}
                <div style={{ flex: 1, padding: '16px', overflow: 'hidden' }}>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '14px', marginBottom: '12px' }}>Incoming Orders</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { id: 'A1B2C3D4', type: 'Dine In', status: 'PENDING', amount: '650', table: '5', isNew: true },
                      { id: 'E5F6G7H8', type: 'Takeaway', status: 'PREPARING', amount: '280', table: null, isNew: false },
                      { id: 'I9J0K1L2', type: 'Dine In', status: 'READY', amount: '450', table: '3', isNew: false },
                    ].map(order => (
                      <div key={order.id} style={{
                        borderRadius: '12px', padding: '12px',
                        border: order.isNew ? '1px solid rgba(249,115,22,0.4)' : '1px solid rgba(255,255,255,0.05)',
                        background: order.isNew ? 'rgba(249,115,22,0.06)' : 'rgba(255,255,255,0.02)',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: order.isNew ? '8px' : 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {order.isNew && <span style={{ color: '#f97316', fontSize: '10px', fontWeight: 900 }}>NEW</span>}
                            {order.table && !order.isNew && <span style={{ color: '#a855f7', fontSize: '10px', fontWeight: 700 }}>🪑 T{order.table}</span>}
                            <span style={{ color: '#fff', fontSize: '11px', fontWeight: 600 }}>#{order.id}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: '#f97316', fontSize: '11px', fontWeight: 700 }}>ETB {order.amount}</span>
                            <span style={{
                              fontSize: '10px', padding: '2px 8px', borderRadius: '999px', fontWeight: 600,
                              background: order.status === 'PENDING' ? 'rgba(234,179,8,0.15)' : order.status === 'PREPARING' ? 'rgba(249,115,22,0.15)' : 'rgba(34,197,94,0.15)',
                              color: order.status === 'PENDING' ? '#fbbf24' : order.status === 'PREPARING' ? '#fb923c' : '#22c55e',
                            }}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        {order.isNew && (
                          <div style={{
                            width: '100%', padding: '6px', background: '#f97316',
                            borderRadius: '8px', color: '#fff', fontSize: '11px',
                            fontWeight: 700, textAlign: 'center', cursor: 'pointer',
                          }}>
                            Accept Order
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}